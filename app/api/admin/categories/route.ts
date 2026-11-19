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

function toCategory(row: { id: string; name: string; homepage_visible?: boolean; homepage_order?: number }, index = 0) {
  return {
    id: row.id,
    name: row.name,
    homepageVisible: row.homepage_visible ?? true,
    homepageOrder: row.homepage_order ?? index,
  };
}

export async function GET(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ configured: false, categories: [] });
  const response = await supabaseRequest('categories?select=*&order=homepage_order.asc.nullslast,name.asc');
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  const rows = await response.json();
  return NextResponse.json({ configured: true, categories: rows.map(toCategory) });
}

export async function POST(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { name: rawName } = await request.json();
  const name = String(rawName || '').trim();
  if (!name) return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
  const existingResponse = await supabaseRequest('categories?select=homepage_order&order=homepage_order.desc.nullslast&limit=1');
  const existing = existingResponse.ok ? await existingResponse.json() : [];
  const homepageOrder = Number(existing?.[0]?.homepage_order ?? -1) + 1;
  const response = await supabaseRequest('categories', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ id: `${slug(name)}-${crypto.randomUUID().slice(0, 6)}`, name, homepage_visible: true, homepage_order: homepageOrder }),
  });
  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json({ error: details.includes('duplicate') ? 'This category already exists.' : details }, { status: response.status });
  }
  const [category] = await response.json();
  return NextResponse.json(toCategory(category), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const unauthorized = denied(request);
  if (unauthorized) return unauthorized;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });

  const body = await request.json();
  const updates = Array.isArray(body.categories) ? body.categories : [];
  if (!updates.length) return NextResponse.json({ error: 'Categories are required.' }, { status: 400 });

  for (const category of updates) {
    if (!category.id) return NextResponse.json({ error: 'Category id is required.' }, { status: 400 });
    const response = await supabaseRequest(`categories?id=eq.${encodeURIComponent(category.id)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        homepage_visible: category.homepageVisible !== false,
        homepage_order: Number(category.homepageOrder || 0),
      }),
    });
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  }

  return NextResponse.json({ ok: true });
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
