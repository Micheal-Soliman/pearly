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

    const categoryResponse = await supabaseRequest('categories?select=*&order=homepage_order.asc.nullslast,name.asc');
    const categoryRows = categoryResponse.ok ? await categoryResponse.json() : [];
    const storedCategories = Array.isArray(categoryRows)
      ? categoryRows.map((category: { id: string; name: string; homepage_visible?: boolean; homepage_order?: number }, index: number) => ({
          id: category.id,
          name: category.name,
          homepageVisible: category.homepage_visible ?? true,
          homepageOrder: category.homepage_order ?? index,
        }))
      : [];
    const productCategories = rows.map(rowToProduct).map((product) => product.category);
    const missingCategories = productCategories
      .filter((name, index, names) => names.indexOf(name) === index && !storedCategories.some((category) => category.name === name))
      .map((name, index) => ({ name, homepageVisible: true, homepageOrder: storedCategories.length + index }));

    return NextResponse.json({ products: rows.map(rowToProduct), categories: [{ name: 'All' }, ...storedCategories, ...missingCategories], source: 'supabase' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
