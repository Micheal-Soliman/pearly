'use client';

import Image from 'next/image';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Boxes, Check, ChevronLeft, ChevronRight, Edit3, FolderPlus, ImagePlus, LayoutDashboard, Package, Plus, Search, Sparkles, Star, Trash2, X } from 'lucide-react';
import { categories as seedCategoryNames, products as seedProducts } from '@/data/products';
import { Category, Product } from '@/types';
import { LOCAL_CATALOGUE_KEY, LOCAL_CATEGORIES_KEY, PRODUCTS_SYNC_KEY, PRODUCTS_UPDATED_EVENT } from '@/lib/products-sync';
import './admin.css';

type Tab = 'products' | 'bundles' | 'categories';
type Notice = { kind: 'success' | 'error'; text: string } | null;

const blankProduct = (tab: Tab): Product => ({
  id: crypto.randomUUID(), name: '', description: '', price: 0, image: '', images: [],
  category: tab === 'bundles' ? 'Bundles' : 'Lipgloss', inStock: true, featured: false,
  bundleSteps: tab === 'bundles' ? [{ label: 'Big Brush' }] : [],
});

export default function AdminPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [categories, setCategories] = useState<Category[]>(seedCategoryNames.filter((category) => category.name !== 'All').map((category) => ({ id: category.name.toLowerCase().replace(/\s+/g, '-'), name: category.name })));
  const [newCategory, setNewCategory] = useState('');
  const [tab, setTab] = useState<Tab>('products');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_CATALOGUE_KEY);
    if (local) { try { setItems(JSON.parse(local)); } catch {} }
    const localCategories = localStorage.getItem(LOCAL_CATEGORIES_KEY);
    if (localCategories) { try { setCategories(JSON.parse(localCategories)); } catch {} }
    fetch('/api/admin/products').then((r) => r.json()).then((data) => {
      setConfigured(Boolean(data.configured));
      if (data.configured && Array.isArray(data.products)) setItems(data.products);
    }).catch(() => {}).finally(() => setLoading(false));
    fetch('/api/admin/categories').then((r) => r.json()).then((data) => {
      if (data.configured && Array.isArray(data.categories)) setCategories(data.categories);
    }).catch(() => {});
  }, []);

  const visible = useMemo(() => items.filter((item) => {
    const isBundle = item.category === 'Bundles';
    const rightTab = tab === 'bundles' ? isBundle : tab === 'products' ? !isBundle : false;
    return rightTab && `${item.name} ${item.category}`.toLowerCase().includes(deferredQuery);
  }), [deferredQuery, items, tab]);

  const stats = [
    { label: 'All products', value: items.length, icon: Package },
    { label: 'In stock', value: items.filter((p) => p.inStock).length, icon: Check },
    { label: 'Featured', value: items.filter((p) => p.featured).length, icon: Sparkles },
    { label: 'Bundles', value: items.filter((p) => p.category === 'Bundles').length, icon: Boxes },
  ];

  function persist(next: Product[]) {
    setItems(next);
    if (!configured) localStorage.setItem(LOCAL_CATALOGUE_KEY, JSON.stringify(next));
    localStorage.setItem(PRODUCTS_SYNC_KEY, String(Date.now()));
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  }

  function persistCategories(next: Category[]) {
    setCategories(next);
    if (!configured) localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(next));
    localStorage.setItem(PRODUCTS_SYNC_KEY, String(Date.now()));
    window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  }

  async function addCategory() {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
      return setNotice({ kind: 'error', text: 'This category already exists.' });
    }
    try {
      let category: Category = { id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${crypto.randomUUID().slice(0, 6)}`, name };
      if (configured) {
        const response = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not add category.');
        category = result;
      }
      persistCategories([...categories, category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategory('');
      setNotice({ kind: 'success', text: `Category “${name}” created.` });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not add category.' }); }
  }

  async function removeCategory(category: Category) {
    if (items.some((product) => product.category === category.name)) return setNotice({ kind: 'error', text: 'Move or delete products in this category first.' });
    if (!confirm(`Delete category “${category.name}”?`)) return;
    try {
      if (configured) {
        const response = await fetch(`/api/admin/categories?id=${encodeURIComponent(category.id)}&name=${encodeURIComponent(category.name)}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not delete category.');
      }
      persistCategories(categories.filter((item) => item.id !== category.id));
      setNotice({ kind: 'success', text: 'Category deleted.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not delete category.' }); }
  }

  async function save(product: Product) {
    setSaving(true); setNotice(null);
    const exists = items.some((p) => p.id === product.id);
    try {
      if (configured) {
        const response = await fetch('/api/admin/products', {
          method: exists ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not save product');
        product = result;
      }
      persist(exists ? items.map((p) => p.id === product.id ? product : p) : [product, ...items]);
      setEditing(null); setNotice({ kind: 'success', text: `${product.category === 'Bundles' ? 'Bundle' : 'Product'} saved successfully.` });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not save.' }); }
    finally { setSaving(false); }
  }

  async function remove(product: Product) {
    if (!confirm(`Delete “${product.name}”?`)) return;
    try {
      if (configured) {
        const response = await fetch(`/api/admin/products?id=${encodeURIComponent(product.id)}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Could not delete this item.');
      }
      persist(items.filter((p) => p.id !== product.id));
      setNotice({ kind: 'success', text: 'Item deleted.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not delete.' }); }
  }

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div><div className="admin-wordmark">Pearly</div><p>Pearly Admin</p></div>
      <nav>
        <button type="button"><LayoutDashboard size={19}/> Overview</button>
        <button type="button" className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}><Package size={19}/> Products</button>
        <button type="button" className={tab === 'bundles' ? 'active' : ''} onClick={() => setTab('bundles')}><Boxes size={19}/> Bundles</button>
        <button type="button" className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}><FolderPlus size={19}/> Categories</button>
      </nav>
      <div className={`connection ${configured ? 'online' : ''}`}><span />{configured ? 'Supabase connected' : 'Local preview mode'}</div>
    </aside>

    <section className="admin-content">
      <header className="admin-header">
        <div><h1>{tab === 'products' ? 'Products' : tab === 'bundles' ? 'Bundles' : 'Categories'}</h1><p>Manage your Pearly catalogue in one place.</p></div>
        {tab !== 'categories' && <div className="header-actions"><label className="search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab}`} /></label>
          <button className="primary" onClick={() => { setEditing(blankProduct(tab)); setIsNew(true); }}><Plus size={18}/> Add {tab === 'products' ? 'product' : 'bundle'}</button></div>}
      </header>

      {notice && <div className={`notice ${notice.kind}`}>{notice.text}<button onClick={() => setNotice(null)}><X size={16}/></button></div>}
      <div className="stats">{stats.map(({ label, value, icon: Icon }) => <article key={label}><span><Icon size={20}/></span><div><p>{label}</p><strong>{value}</strong></div></article>)}</div>
      <div className="tabs"><button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button><button className={tab === 'bundles' ? 'active' : ''} onClick={() => setTab('bundles')}>Bundles</button><button className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}>Categories</button></div>

      {tab === 'categories' ? <div className="category-manager">
        <div className="category-create"><input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void addCategory(); }} placeholder="New category name"/><button className="primary" type="button" onClick={() => void addCategory()}><Plus size={18}/> Create category</button></div>
        <div className="category-list">{categories.map((category) => <div key={category.id}><span><FolderPlus size={17}/>{category.name}</span><small>{items.filter((product) => product.category === category.name).length} products</small><button type="button" aria-label={`Delete ${category.name}`} onClick={() => void removeCategory(category)}><Trash2 size={17}/></button></div>)}</div>
      </div> : <div className="table-wrap">
        <table><thead><tr><th>{tab === 'products' ? 'Product' : 'Bundle'}</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th className="actions-col">Actions</th></tr></thead>
        <tbody>{visible.map((product) => <tr key={product.id}>
          <td><div className="product-cell"><ProductThumb product={product}/><div><b>{product.name}</b><small>{product.description || 'No description'}</small></div></div></td>
          <td>{product.category}</td><td>{product.price.toLocaleString()} EGP</td><td><span className={`stock ${product.inStock ? '' : 'out'}`}>{product.inStock ? 'In stock' : 'Out of stock'}</span></td>
          <td><span className={`featured ${product.featured ? 'yes' : ''}`}>{product.featured ? <Check size={14}/> : '—'}</span></td>
          <td><div className="row-actions"><button aria-label="Edit" onClick={() => { setEditing({...product}); setIsNew(false); }}><Edit3 size={17}/></button><button className="delete" aria-label="Delete" onClick={() => remove(product)}><Trash2 size={17}/></button></div></td>
        </tr>)}</tbody></table>
        {!loading && visible.length === 0 && <div className="empty"><Package size={32}/><h3>No {tab} found</h3><p>Try another search or add your first item.</p></div>}
        {loading && <div className="empty"><p>Loading catalogue…</p></div>}
        <footer>Showing {visible.length} of {items.length} catalogue items</footer>
      </div>}
    </section>

    {editing && <ProductDrawer product={editing} categories={categories} isNew={isNew} saving={saving} onClose={() => setEditing(null)} onSave={save}/>} 
  </main>;
}

function ProductThumb({ product }: { product: Product }) {
  return <div className="thumb">{product.image ? <Image unoptimized fill sizes="48px" src={product.image} alt="" /> : <ImagePlus size={20}/>}</div>;
}

function ProductDrawer({ product: initial, categories, isNew, saving, onClose, onSave }: { product: Product; categories: Category[]; isNew: boolean; saving: boolean; onClose: () => void; onSave: (p: Product) => void }) {
  const [product, setProduct] = useState({ ...initial, images: initial.images?.length ? initial.images : initial.image ? [initial.image] : [] });
  const [imageError, setImageError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const isBundle = product.category === 'Bundles';
  const update = <K extends keyof Product>(key: K, value: Product[K]) => setProduct((p) => ({ ...p, [key]: value }));

  async function readImages(files?: FileList | null) {
    if (!files?.length) return;
    const selected = Array.from(files);
    if (product.images.length + selected.length > 8) return setImageError('You can upload up to 8 images per product.');
    if (selected.some((file) => !file.type.startsWith('image/'))) return setImageError('Please choose image files only.');
    if (selected.some((file) => file.size > 1_500_000)) return setImageError('Each image must be 1.5 MB or smaller. Compress large images first.');
    const values = await Promise.all(selected.map((file) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })));
    const images = [...product.images, ...values];
    setProduct((current) => ({ ...current, images, image: current.image || images[0] }));
    setImageError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  function setMainImage(image: string) {
    const images = [image, ...product.images.filter((item) => item !== image)];
    setProduct((current) => ({ ...current, image, images }));
  }

  function removeImage(index: number) {
    const images = product.images.filter((_, imageIndex) => imageIndex !== index);
    setProduct((current) => ({ ...current, images, image: current.image === product.images[index] ? images[0] || '' : current.image }));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const destination = index + direction;
    if (destination < 0 || destination >= product.images.length) return;
    const images = [...product.images];
    [images[index], images[destination]] = [images[destination], images[index]];
    setProduct((current) => ({ ...current, images }));
  }

  return <><button className="drawer-backdrop" aria-label="Close editor" onClick={onClose}/><aside className="drawer">
    <header><div><h2>{isNew ? 'Add' : 'Edit'} {isBundle ? 'bundle' : 'product'}</h2><p>{isNew ? 'Create a new catalogue item' : 'Update catalogue details'}</p></div><button onClick={onClose}><X/></button></header>
    <form onSubmit={(e) => { e.preventDefault(); onSave(product); }}>
      <section><label className="field-label">Product images ({product.images.length}/8)</label><div className="image-upload">
        <div className="preview">{product.image ? <Image unoptimized fill sizes="138px" src={product.image} alt="Product preview"/> : <ImagePlus size={28}/>}</div>
        <button type="button" className="upload" onClick={() => fileRef.current?.click()}><ImagePlus size={22}/><b>Add images</b><small>Select multiple · 1.5 MB each</small></button>
        <input ref={fileRef} hidden multiple type="file" accept="image/*" onChange={(e) => void readImages(e.target.files)}/>
      </div>{imageError && <p className="field-error">{imageError}</p>}
      {product.images.length > 0 && <div className="image-gallery">{product.images.map((image, index) => <div key={`${image.slice(-24)}-${index}`} className={image === product.image ? 'main' : ''}>
        <div className="gallery-thumb"><Image unoptimized fill sizes="76px" src={image} alt={`Product image ${index + 1}`}/>{image === product.image && <span>Main</span>}</div>
        <div className="gallery-actions"><button type="button" title="Set as main image" onClick={() => setMainImage(image)}><Star size={14}/></button><button type="button" disabled={index === 0} title="Move left" onClick={() => moveImage(index, -1)}><ChevronLeft size={14}/></button><button type="button" disabled={index === product.images.length - 1} title="Move right" onClick={() => moveImage(index, 1)}><ChevronRight size={14}/></button><button type="button" title="Remove image" onClick={() => removeImage(index)}><X size={14}/></button></div>
      </div>)}</div>}
      {product.images.some((image) => image.startsWith('data:')) && <p className="base64-note"><Check size={14}/> Images ready to save</p>}</section>
      <Field label="Name"><input required value={product.name} onChange={(e) => update('name', e.target.value)} placeholder="Product name"/></Field>
      <Field label="Description"><textarea rows={4} value={product.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe this item"/></Field>
      <Field label="Category"><select required value={product.category} onChange={(e) => update('category', e.target.value)}>{!categories.some((category) => category.name === product.category) && <option>{product.category}</option>}{categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select></Field>
      <div className="form-grid"><Field label="Price (EGP)"><input required min="0" step="0.01" type="number" value={product.price} onChange={(e) => update('price', Number(e.target.value))}/></Field><Field label="Original price"><input min="0" step="0.01" type="number" value={product.originalPrice || ''} onChange={(e) => update('originalPrice', e.target.value ? Number(e.target.value) : undefined)}/></Field></div>
      {isBundle && <Field label="Bundle items"><div className="bundle-steps">{(product.bundleSteps || []).map((step, index) => <div key={index}><input value={step.label} onChange={(e) => update('bundleSteps', (product.bundleSteps || []).map((s, i) => i === index ? { label: e.target.value } : s))}/><button type="button" onClick={() => update('bundleSteps', (product.bundleSteps || []).filter((_, i) => i !== index))}><X size={16}/></button></div>)}<button type="button" className="add-step" onClick={() => update('bundleSteps', [...(product.bundleSteps || []), { label: 'Lipgloss' }])}><Plus size={15}/> Add bundle item</button></div></Field>}
      <div className="switches"><label><input type="checkbox" checked={product.inStock} onChange={(e) => update('inStock', e.target.checked)}/><span/> In stock</label><label><input type="checkbox" checked={product.featured} onChange={(e) => update('featured', e.target.checked)}/><span/> Featured</label></div>
      <footer><button type="button" className="secondary" onClick={onClose}>Cancel</button><button disabled={saving} className="primary" type="submit">{saving ? 'Saving…' : 'Save changes'}</button></footer>
    </form>
  </aside></>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
