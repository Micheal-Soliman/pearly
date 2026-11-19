'use client';

import Image from 'next/image';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Boxes, Check, ChevronLeft, ChevronRight, Edit3, Eye, EyeOff, FolderPlus, ImagePlus, LayoutDashboard, Megaphone, Package, Plus, Search, Sparkles, Star, Trash2, X } from 'lucide-react';
import { categories as seedCategoryNames, products as seedProducts } from '@/data/products';
import { BundleStep, Category, Product } from '@/types';
import { DEFAULT_ANNOUNCEMENT, type AnnouncementSettings } from '@/lib/announcement';
import { LOCAL_ANNOUNCEMENT_KEY, LOCAL_CATALOGUE_KEY, LOCAL_CATEGORIES_KEY, PRODUCTS_SYNC_KEY, PRODUCTS_UPDATED_EVENT } from '@/lib/products-sync';
import './admin.css';

type Tab = 'products' | 'bundles' | 'categories' | 'announcement';
type Notice = { kind: 'success' | 'error'; text: string } | null;

const blankProduct = (tab: Tab): Product => ({
  id: crypto.randomUUID(), name: '', description: '', price: 0, image: '', images: [],
  category: tab === 'bundles' ? 'Bundles' : 'Lipgloss', inStock: true, featured: false,
  bundleSteps: tab === 'bundles' ? [{ label: 'Choose Lipgloss', category: 'Lipgloss' }] : [],
});

export default function AdminPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [categories, setCategories] = useState<Category[]>(seedCategoryNames.filter((category) => category.name !== 'All').map((category, index) => ({ id: category.name.toLowerCase().replace(/\s+/g, '-'), name: category.name, homepageVisible: true, homepageOrder: index })));
  const [newCategory, setNewCategory] = useState('');
  const [announcement, setAnnouncement] = useState<AnnouncementSettings>(DEFAULT_ANNOUNCEMENT);
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
    const localAnnouncement = localStorage.getItem(LOCAL_ANNOUNCEMENT_KEY);
    if (localAnnouncement) { try { setAnnouncement(JSON.parse(localAnnouncement)); } catch {} }
    fetch('/api/admin/products').then((r) => r.json()).then((data) => {
      setConfigured(Boolean(data.configured));
      if (data.configured && Array.isArray(data.products)) setItems(data.products);
    }).catch(() => {}).finally(() => setLoading(false));
    fetch('/api/admin/categories').then((r) => r.json()).then((data) => {
      if (data.configured && Array.isArray(data.categories)) setCategories(data.categories);
    }).catch(() => {});
    fetch('/api/admin/announcement').then((r) => r.json()).then((data) => {
      if (data.settings) setAnnouncement(data.settings);
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
      let category: Category = { id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${crypto.randomUUID().slice(0, 6)}`, name, homepageVisible: true, homepageOrder: categories.length };
      if (configured) {
        const response = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not add category.');
        category = result;
      }
      persistCategories([...categories, category]);
      setNewCategory('');
      setNotice({ kind: 'success', text: `Category “${name}” created.` });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not add category.' }); }
  }

  async function saveCategoryLayout(next: Category[], changed: Category[]) {
    try {
      if (configured) {
        const response = await fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categories: changed }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not update homepage categories.');
      }
      persistCategories(next);
      setNotice({ kind: 'success', text: 'Homepage categories updated.' });
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not update homepage categories.' });
    }
  }

  function toggleCategoryVisibility(category: Category) {
    const updated = { ...category, homepageVisible: category.homepageVisible === false };
    const next = categories.map((item) => item.id === category.id ? updated : item);
    void saveCategoryLayout(next, [updated]);
  }

  function moveCategory(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const next = [...categories];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    const ordered = next.map((category, position) => ({ ...category, homepageOrder: position }));
    void saveCategoryLayout(ordered, [ordered[index], ordered[targetIndex]]);
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

  async function saveAnnouncement() {
    setSaving(true); setNotice(null);
    try {
      if (announcement.enabled && !announcement.text.trim()) throw new Error('Write announcement text before enabling the bar.');
      if (configured) {
        const response = await fetch('/api/admin/announcement', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(announcement) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not save announcement.');
        setAnnouncement(result);
      } else {
        localStorage.setItem(LOCAL_ANNOUNCEMENT_KEY, JSON.stringify(announcement));
      }
      setNotice({ kind: 'success', text: announcement.enabled ? 'Announcement bar is live.' : 'Announcement bar is hidden.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Could not save announcement.' }); }
    finally { setSaving(false); }
  }

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div><div className="admin-wordmark">Pearly</div><p>Pearly Admin</p></div>
      <nav>
        <button type="button"><LayoutDashboard size={19}/> Overview</button>
        <button type="button" className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}><Package size={19}/> Products</button>
        <button type="button" className={tab === 'bundles' ? 'active' : ''} onClick={() => setTab('bundles')}><Boxes size={19}/> Bundles</button>
        <button type="button" className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}><FolderPlus size={19}/> Categories</button>
        <button type="button" className={tab === 'announcement' ? 'active' : ''} onClick={() => setTab('announcement')}><Megaphone size={19}/> Announcement</button>
      </nav>
      <div className={`connection ${configured ? 'online' : ''}`}><span />{configured ? 'Supabase connected' : 'Local preview mode'}</div>
    </aside>

    <section className="admin-content">
      <header className="admin-header">
        <div><h1>{tab === 'products' ? 'Products' : tab === 'bundles' ? 'Bundles' : tab === 'categories' ? 'Categories' : 'Announcement Bar'}</h1><p>{tab === 'announcement' ? 'Control the message displayed across your store.' : 'Manage your Pearly catalogue in one place.'}</p></div>
        {(tab === 'products' || tab === 'bundles') && <div className="header-actions"><label className="search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab}`} /></label>
          <button className="primary" onClick={() => { setEditing(blankProduct(tab)); setIsNew(true); }}><Plus size={18}/> Add {tab === 'products' ? 'product' : 'bundle'}</button></div>}
      </header>

      {notice && <div className={`notice ${notice.kind}`}>{notice.text}<button onClick={() => setNotice(null)}><X size={16}/></button></div>}
      {tab !== 'announcement' && <div className="stats">{stats.map(({ label, value, icon: Icon }) => <article key={label}><span><Icon size={20}/></span><div><p>{label}</p><strong>{value}</strong></div></article>)}</div>}
      <div className="tabs"><button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button><button className={tab === 'bundles' ? 'active' : ''} onClick={() => setTab('bundles')}>Bundles</button><button className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}>Categories</button><button className={tab === 'announcement' ? 'active' : ''} onClick={() => setTab('announcement')}>Announcement</button></div>

      {tab === 'announcement' ? <AnnouncementEditor settings={announcement} saving={saving} onChange={setAnnouncement} onSave={() => void saveAnnouncement()}/> : tab === 'categories' ? <div className="category-manager">
        <div className="category-create"><input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void addCategory(); }} placeholder="New category name"/><button className="primary" type="button" onClick={() => void addCategory()}><Plus size={18}/> Create category</button></div>
        <p className="category-help">Use the arrows to control the homepage order. The eye button shows or hides a category on the homepage only.</p>
        <div className="category-list">{categories.map((category, index) => <div key={category.id} className={category.homepageVisible === false ? 'category-hidden' : ''}>
          <span><FolderPlus size={17}/><span>{category.name}<small>{items.filter((product) => product.category === category.name).length} products</small></span></span>
          <span className="category-status">{category.homepageVisible === false ? 'Hidden' : 'Visible'}</span>
          <div className="category-actions">
            <button type="button" disabled={index === 0} aria-label={`Move ${category.name} up`} title="Move up" onClick={() => moveCategory(index, -1)}><ArrowUp size={16}/></button>
            <button type="button" disabled={index === categories.length - 1} aria-label={`Move ${category.name} down`} title="Move down" onClick={() => moveCategory(index, 1)}><ArrowDown size={16}/></button>
            <button type="button" aria-label={`${category.homepageVisible === false ? 'Show' : 'Hide'} ${category.name} on homepage`} title={category.homepageVisible === false ? 'Show on homepage' : 'Hide from homepage'} onClick={() => toggleCategoryVisibility(category)}>{category.homepageVisible === false ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
            <button type="button" className="delete" aria-label={`Delete ${category.name}`} title="Delete category" onClick={() => void removeCategory(category)}><Trash2 size={17}/></button>
          </div>
        </div>)}</div>
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

    {editing && <ProductDrawer product={editing} catalogue={items} categories={categories} isNew={isNew} saving={saving} onClose={() => setEditing(null)} onSave={save}/>}
  </main>;
}

function ProductThumb({ product }: { product: Product }) {
  return <div className="thumb">{product.image ? <Image unoptimized fill sizes="48px" src={product.image} alt="" /> : <ImagePlus size={20}/>}</div>;
}

function AnnouncementEditor({ settings, saving, onChange, onSave }: { settings: AnnouncementSettings; saving: boolean; onChange: (settings: AnnouncementSettings) => void; onSave: () => void }) {
  const update = <K extends keyof AnnouncementSettings>(key: K, value: AnnouncementSettings[K]) => onChange({ ...settings, [key]: value });
  return <div className="announcement-editor">
    <div className="announcement-preview" style={{ backgroundColor: settings.backgroundColor, color: settings.textColor }}>
      <span>{settings.text || 'Your announcement preview will appear here'}</span>
      {settings.linkUrl && <strong>{settings.linkLabel || 'Shop now'}</strong>}
      {settings.dismissible && <X size={15}/>}
    </div>
    <div className="announcement-form">
      <label className="announcement-toggle"><input type="checkbox" checked={settings.enabled} onChange={(event) => update('enabled', event.target.checked)}/><span/><div><b>Show announcement bar</b><small>Turn it on or hide it instantly.</small></div></label>
      <Field label="Announcement text"><textarea rows={3} maxLength={300} value={settings.text} onChange={(event) => update('text', event.target.value)} placeholder="Free delivery on orders over 500 EGP"/><small className="field-hint">{settings.text.length}/300 characters</small></Field>
      <div className="form-grid"><Field label="Optional link"><input value={settings.linkUrl} onChange={(event) => update('linkUrl', event.target.value)} placeholder="/products or https://..."/></Field><Field label="Link label"><input value={settings.linkLabel} onChange={(event) => update('linkLabel', event.target.value)} placeholder="Shop now"/></Field></div>
      <div className="color-grid"><label><span>Background color</span><div><input type="color" value={settings.backgroundColor} onChange={(event) => update('backgroundColor', event.target.value)}/><code>{settings.backgroundColor}</code></div></label><label><span>Text color</span><div><input type="color" value={settings.textColor} onChange={(event) => update('textColor', event.target.value)}/><code>{settings.textColor}</code></div></label></div>
      <label className="announcement-toggle"><input type="checkbox" checked={settings.dismissible} onChange={(event) => update('dismissible', event.target.checked)}/><span/><div><b>Allow customers to close it</b><small>The bar returns when you change its text or in a new session.</small></div></label>
      <button type="button" disabled={saving} className="primary announcement-save" onClick={onSave}>{saving ? 'Saving…' : 'Save announcement'}</button>
    </div>
  </div>;
}

function ProductDrawer({ product: initial, catalogue, categories, isNew, saving, onClose, onSave }: { product: Product; catalogue: Product[]; categories: Category[]; isNew: boolean; saving: boolean; onClose: () => void; onSave: (p: Product) => void }) {
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

  function updateBundleStep(index: number, changes: Partial<BundleStep>) {
    update('bundleSteps', (product.bundleSteps || []).map((step, stepIndex) => stepIndex === index ? { ...step, ...changes } : step));
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
      {isBundle && <Field label="Bundle items"><div className="bundle-steps">
        {(product.bundleSteps || []).map((step, index) => {
          const mode = step.productId ? 'product' : 'category';
          return <div className="bundle-step-card" key={index}>
            <div className="bundle-step-head"><strong>Item {index + 1}</strong><button type="button" onClick={() => update('bundleSteps', (product.bundleSteps || []).filter((_, i) => i !== index))}><Trash2 size={15}/></button></div>
            <input required value={step.label} onChange={(event) => updateBundleStep(index, { label: event.target.value })} placeholder="Customer-facing label"/>
            <select value={mode} onChange={(event) => event.target.value === 'product'
              ? updateBundleStep(index, { productId: catalogue.find((item) => item.category !== 'Bundles')?.id || '', category: undefined })
              : updateBundleStep(index, { category: categories.find((item) => item.name !== 'Bundles')?.name || '', productId: undefined })}>
              <option value="category">Customer chooses from category</option>
              <option value="product">Fixed product</option>
            </select>
            {mode === 'category' ? <select required value={step.category || ''} onChange={(event) => updateBundleStep(index, { category: event.target.value, productId: undefined })}>
              <option value="" disabled>Select category</option>
              {categories.filter((category) => category.name !== 'Bundles').map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select> : <select required value={step.productId || ''} onChange={(event) => updateBundleStep(index, { productId: event.target.value, category: undefined })}>
              <option value="" disabled>Select product</option>
              {catalogue.filter((item) => item.category !== 'Bundles' && item.id !== product.id).map((item) => <option key={item.id} value={item.id}>{item.name} — {item.category}</option>)}
            </select>}
          </div>;
        })}
        <button type="button" className="add-step" onClick={() => update('bundleSteps', [...(product.bundleSteps || []), { label: 'Choose item', category: categories.find((item) => item.name !== 'Bundles')?.name || 'Lipgloss' }])}><Plus size={15}/> Add bundle item</button>
      </div></Field>}
      <div className="switches"><label><input type="checkbox" checked={product.inStock} onChange={(e) => update('inStock', e.target.checked)}/><span/> In stock</label><label><input type="checkbox" checked={product.featured} onChange={(e) => update('featured', e.target.checked)}/><span/> Featured</label>{!isBundle && <label title="Use this for a shade or variant that customers choose inside a product or bundle"><input type="checkbox" checked={Boolean(product.isShade)} onChange={(e) => update('isShade', e.target.checked)}/><span/> Shade / variant</label>}</div>
      <footer><button type="button" className="secondary" onClick={onClose}>Cancel</button><button disabled={saving} className="primary" type="submit">{saving ? 'Saving…' : 'Save changes'}</button></footer>
    </form>
  </aside></>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
