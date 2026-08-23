'use client';

import Image from 'next/image';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Boxes, Check, Edit3, ImagePlus, LayoutDashboard, Package, Plus, Search, Sparkles, Trash2, X } from 'lucide-react';
import { products as seedProducts } from '@/data/products';
import { Product } from '@/types';
import { LOCAL_CATALOGUE_KEY, PRODUCTS_SYNC_KEY, PRODUCTS_UPDATED_EVENT } from '@/lib/products-sync';
import './admin.css';

type Tab = 'products' | 'bundles';
type Notice = { kind: 'success' | 'error'; text: string } | null;

const blankProduct = (tab: Tab): Product => ({
  id: crypto.randomUUID(), name: '', description: '', price: 0, image: '', images: [],
  category: tab === 'bundles' ? 'Bundles' : 'Lipgloss', inStock: true, featured: false,
  bundleSteps: tab === 'bundles' ? [{ label: 'Big Brush' }] : [],
});

export default function AdminPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
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
    fetch('/api/admin/products').then((r) => r.json()).then((data) => {
      setConfigured(Boolean(data.configured));
      if (data.configured && Array.isArray(data.products)) setItems(data.products);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => items.filter((item) => {
    const isBundle = item.category === 'Bundles';
    const rightTab = tab === 'bundles' ? isBundle : !isBundle;
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
      </nav>
      <div className={`connection ${configured ? 'online' : ''}`}><span />{configured ? 'Supabase connected' : 'Local preview mode'}</div>
    </aside>

    <section className="admin-content">
      <header className="admin-header">
        <div><h1>{tab === 'products' ? 'Products' : 'Bundles'}</h1><p>Manage your Pearly catalogue in one place.</p></div>
        <div className="header-actions"><label className="search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab}`} /></label>
          <button className="primary" onClick={() => { setEditing(blankProduct(tab)); setIsNew(true); }}><Plus size={18}/> Add {tab === 'products' ? 'product' : 'bundle'}</button></div>
      </header>

      {notice && <div className={`notice ${notice.kind}`}>{notice.text}<button onClick={() => setNotice(null)}><X size={16}/></button></div>}
      <div className="stats">{stats.map(({ label, value, icon: Icon }) => <article key={label}><span><Icon size={20}/></span><div><p>{label}</p><strong>{value}</strong></div></article>)}</div>
      <div className="tabs"><button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button><button className={tab === 'bundles' ? 'active' : ''} onClick={() => setTab('bundles')}>Bundles</button></div>

      <div className="table-wrap">
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
      </div>
    </section>

    {editing && <ProductDrawer product={editing} isNew={isNew} saving={saving} onClose={() => setEditing(null)} onSave={save}/>} 
  </main>;
}

function ProductThumb({ product }: { product: Product }) {
  return <div className="thumb">{product.image ? <Image unoptimized fill sizes="48px" src={product.image} alt="" /> : <ImagePlus size={20}/>}</div>;
}

function ProductDrawer({ product: initial, isNew, saving, onClose, onSave }: { product: Product; isNew: boolean; saving: boolean; onClose: () => void; onSave: (p: Product) => void }) {
  const [product, setProduct] = useState(initial);
  const [imageError, setImageError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const isBundle = product.category === 'Bundles';
  const update = <K extends keyof Product>(key: K, value: Product[K]) => setProduct((p) => ({ ...p, [key]: value }));

  function readImage(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setImageError('Please choose an image file.');
    if (file.size > 1_500_000) return setImageError('Maximum image size is 1.5 MB. Compress it first.');
    const reader = new FileReader();
    reader.onload = () => { const value = String(reader.result); update('image', value); update('images', [value]); setImageError(''); };
    reader.readAsDataURL(file);
  }

  return <><button className="drawer-backdrop" aria-label="Close editor" onClick={onClose}/><aside className="drawer">
    <header><div><h2>{isNew ? 'Add' : 'Edit'} {isBundle ? 'bundle' : 'product'}</h2><p>{isNew ? 'Create a new catalogue item' : 'Update catalogue details'}</p></div><button onClick={onClose}><X/></button></header>
    <form onSubmit={(e) => { e.preventDefault(); onSave(product); }}>
      <section><label className="field-label">Image</label><div className="image-upload">
        <div className="preview">{product.image ? <Image unoptimized fill sizes="138px" src={product.image} alt="Product preview"/> : <ImagePlus size={28}/>}</div>
        <button type="button" className="upload" onClick={() => fileRef.current?.click()}><ImagePlus size={22}/><b>Upload image</b><small>PNG or JPG · max 1.5 MB</small></button>
        <input ref={fileRef} hidden type="file" accept="image/*" onChange={(e) => readImage(e.target.files?.[0])}/>
      </div>{imageError && <p className="field-error">{imageError}</p>}{product.image.startsWith('data:') && <p className="base64-note"><Check size={14}/> Image converted to Base64 ({Math.round(product.image.length / 1024)} KB)</p>}</section>
      <Field label="Name"><input required value={product.name} onChange={(e) => update('name', e.target.value)} placeholder="Product name"/></Field>
      <Field label="Description"><textarea rows={4} value={product.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe this item"/></Field>
      <Field label="Category"><select value={product.category} onChange={(e) => update('category', e.target.value)}><option>Lipgloss</option><option>Liquid Blush</option><option>Eyebrow Wax</option><option>Bundles</option></select></Field>
      <div className="form-grid"><Field label="Price (EGP)"><input required min="0" step="0.01" type="number" value={product.price} onChange={(e) => update('price', Number(e.target.value))}/></Field><Field label="Original price"><input min="0" step="0.01" type="number" value={product.originalPrice || ''} onChange={(e) => update('originalPrice', e.target.value ? Number(e.target.value) : undefined)}/></Field></div>
      {isBundle && <Field label="Bundle items"><div className="bundle-steps">{(product.bundleSteps || []).map((step, index) => <div key={index}><input value={step.label} onChange={(e) => update('bundleSteps', (product.bundleSteps || []).map((s, i) => i === index ? { label: e.target.value } : s))}/><button type="button" onClick={() => update('bundleSteps', (product.bundleSteps || []).filter((_, i) => i !== index))}><X size={16}/></button></div>)}<button type="button" className="add-step" onClick={() => update('bundleSteps', [...(product.bundleSteps || []), { label: 'Lipgloss' }])}><Plus size={15}/> Add bundle item</button></div></Field>}
      <div className="switches"><label><input type="checkbox" checked={product.inStock} onChange={(e) => update('inStock', e.target.checked)}/><span/> In stock</label><label><input type="checkbox" checked={product.featured} onChange={(e) => update('featured', e.target.checked)}/><span/> Featured</label></div>
      <footer><button type="button" className="secondary" onClick={onClose}>Cancel</button><button disabled={saving} className="primary" type="submit">{saving ? 'Saving…' : 'Save changes'}</button></footer>
    </form>
  </aside></>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
