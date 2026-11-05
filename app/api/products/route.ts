import { NextResponse } from 'next/server';
import { categories as fallbackCategories, products as fallbackProducts } from '@/data/products';
import { isSupabaseConfigured, rowToProduct, supabaseRequest } from '@/lib/supabase-admin';

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const response = await supabaseRequest('products?select=*&order=created_at.asc');
    if (!response.ok) {
      return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const categoryResponse = await supabaseRequest('categories?select=id,name&order=name.asc');
    const categoryRows = categoryResponse.ok ? await categoryResponse.json() : [];
    const categoryNames = Array.isArray(categoryRows)
      ? categoryRows.map((category: { name: string }) => ({ name: category.name }))
      : [];
    const productCategories = rows.map(rowToProduct).map((product) => product.category);
    const names = Array.from(new Set(['All', ...categoryNames.map((category: { name: string }) => category.name), ...productCategories]));

    return NextResponse.json({ products: rows.map(rowToProduct), categories: names.map((name) => ({ name })), source: 'supabase' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
