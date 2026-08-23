import { Product } from '@/types';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  image: string;
  images: string[];
  category: string;
  in_stock: boolean;
  featured: boolean;
  best_seller: boolean;
  is_shade: boolean;
  bundle_steps: { label: string }[];
  created_at?: string;
};

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    originalPrice: row.original_price ?? undefined,
    image: row.image,
    images: row.images || (row.image ? [row.image] : []),
    category: row.category,
    inStock: row.in_stock,
    featured: row.featured,
    bestSeller: row.best_seller,
    isShade: row.is_shade,
    bundleSteps: row.bundle_steps || [],
  };
}

export function productToRow(product: Product): ProductRow {
  return {
    id: product.id,
    name: product.name.trim(),
    description: product.description.trim(),
    price: Number(product.price),
    original_price: product.originalPrice ? Number(product.originalPrice) : null,
    image: product.image,
    images: product.images?.length ? product.images : product.image ? [product.image] : [],
    category: product.category,
    in_stock: product.inStock,
    featured: product.featured,
    best_seller: Boolean(product.bestSeller),
    is_shade: Boolean(product.isShade),
    bundle_steps: product.bundleSteps || [],
  };
}

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  if (!url || !key) throw new Error('Supabase is not configured');
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
}
