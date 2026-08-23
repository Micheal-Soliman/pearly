import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, productToRow, rowToProduct, supabaseRequest } from '@/lib/supabase-admin';
import { Product } from '@/types';
import { isAdminRequest } from '@/lib/admin-auth';
import { products as seedProducts } from '@/data/products';

function unauthorized(request: NextRequest) {
  return !isAdminRequest(request)
    ? NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    : null;
}

function invalid(product: Product) {
  if (!product?.id || !product?.name?.trim() || !product?.category?.trim()) return 'Name and category are required.';
  if (!Number.isFinite(Number(product.price)) || Number(product.price) < 0) return 'Price must be zero or greater.';
  if (product.image?.startsWith('data:') && product.image.length > 2_100_000) return 'Base64 image is too large (maximum 1.5 MB).';
  return null;
}

export async function GET(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ configured: false, products: [] });
  try {
    const response = await supabaseRequest('products?select=*&order=created_at.desc');
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
    let rows = await response.json();

    if (Array.isArray(rows) && rows.length === 0) {
      const seedResponse = await supabaseRequest('products', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(seedProducts.map(productToRow)),
      });
      if (!seedResponse.ok) return NextResponse.json({ error: await seedResponse.text() }, { status: seedResponse.status });
      rows = await seedResponse.json();
    }

    return NextResponse.json({ configured: true, products: rows.map(rowToProduct) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not connect to Supabase.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const product = (await request.json()) as Product;
  const error = invalid(product);
  if (error) return NextResponse.json({ error }, { status: 400 });
  const response = await supabaseRequest('products', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(productToRow(product)),
  });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  const [row] = await response.json();
  return NextResponse.json(rowToProduct(row), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const product = (await request.json()) as Product;
  const error = invalid(product);
  if (error) return NextResponse.json({ error }, { status: 400 });
  const response = await supabaseRequest(`products?id=eq.${encodeURIComponent(product.id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(productToRow(product)),
  });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  const [row] = await response.json();
  return NextResponse.json(rowToProduct(row));
}

export async function DELETE(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Product id is required.' }, { status: 400 });
  const response = await supabaseRequest(`products?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json({ ok: true });
}
