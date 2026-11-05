import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { isSupabaseConfigured, supabaseRequest } from '@/lib/supabase-admin';

function denied(request: NextRequest) {
  return !isAdminRequest(request)
    ? NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    : null;
}

function slug(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || crypto.randomUUID();
}

export async function GET(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ configured: false, categories: [] });
  const response = await supabaseRequest('categories?select=*&order=name.asc');
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json({ configured: true, categories: await response.json() });
}

export async function POST(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { name: rawName } = await request.json();
  const name = String(rawName || '').trim();
  if (!name) return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
  const response = await supabaseRequest('categories', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ id: `${slug(name)}-${crypto.randomUUID().slice(0, 6)}`, name }),
  });
  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json({ error: details.includes('duplicate') ? 'This category already exists.' : details }, { status: response.status });
  }
  const [category] = await response.json();
  return NextResponse.json(category, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const id = request.nextUrl.searchParams.get('id');
  const name = request.nextUrl.searchParams.get('name');
  if (!id || !name) return NextResponse.json({ error: 'Category id and name are required.' }, { status: 400 });

  const products = await supabaseRequest(`products?select=id&category=eq.${encodeURIComponent(name)}&limit=1`);
  if (!products.ok) return NextResponse.json({ error: await products.text() }, { status: products.status });
  if ((await products.json()).length) {
    return NextResponse.json({ error: 'Move or delete products in this category first.' }, { status: 409 });
  }

  const response = await supabaseRequest(`categories?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json({ ok: true });
}
