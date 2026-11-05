'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { products as fallbackProducts, categories } from '@/data/products';
import type { Product } from '@/types';
import { LOCAL_CATALOGUE_KEY, LOCAL_CATEGORIES_KEY, PRODUCTS_SYNC_KEY, PRODUCTS_UPDATED_EVENT } from '@/lib/products-sync';

type ProductsContextValue = {
  products: Product[];
  categories: Array<{ name: string }>;
  loading: boolean;
  source: 'supabase' | 'fallback';
};

const ProductsContext = createContext<ProductsContextValue>({
  products: fallbackProducts,
  categories,
  loading: true,
  source: 'fallback',
});

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<ProductsContextValue>({
    products: fallbackProducts,
    categories,
    loading: true,
    source: 'fallback',
  });

  const loadProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const data = await response.json();
      if (!Array.isArray(data.products)) return;

      let products = data.products as Product[];
      let nextCategories = Array.isArray(data.categories) ? data.categories : categories;
      if (data.source !== 'supabase') {
        const local = localStorage.getItem(LOCAL_CATALOGUE_KEY);
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed)) products = parsed;
          } catch {}
        }
        const localCategories = localStorage.getItem(LOCAL_CATEGORIES_KEY);
        if (localCategories) {
          try {
            const parsed = JSON.parse(localCategories);
            if (Array.isArray(parsed)) nextCategories = [{ name: 'All' }, ...parsed.map((category) => ({ name: category.name }))];
          } catch {}
        }
      }

      setValue({
        products,
        categories: nextCategories,
        loading: false,
        source: data.source === 'supabase' ? 'supabase' : 'fallback',
      });
    } catch {
      setValue((current) => ({ ...current, loading: false }));
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadProducts(), 0);

    const refresh = () => void loadProducts();
    const refreshOnStorage = (event: StorageEvent) => {
      if (event.key === PRODUCTS_SYNC_KEY || event.key === LOCAL_CATALOGUE_KEY || event.key === LOCAL_CATEGORIES_KEY) refresh();
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refreshOnStorage);
    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refreshOnStorage);
    };
  }, [loadProducts]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  return useContext(ProductsContext);
}
