import { NextResponse } from 'next/server';
import { products as fallbackProducts } from '@/data/products';
import { isSupabaseConfigured, rowToProduct, supabaseRequest } from '@/lib/supabase-admin';

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ products: fallbackProducts, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const response = await supabaseRequest('products?select=*&order=created_at.asc');
    if (!response.ok) {
      return NextResponse.json({ products: fallbackProducts, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ products: fallbackProducts, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
    }

    return NextResponse.json({ products: rows.map(rowToProduct), source: 'supabase' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ products: fallbackProducts, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
