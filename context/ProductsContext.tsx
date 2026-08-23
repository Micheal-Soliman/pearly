'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { products as fallbackProducts, categories } from '@/data/products';
import type { Product } from '@/types';
import { LOCAL_CATALOGUE_KEY, PRODUCTS_SYNC_KEY, PRODUCTS_UPDATED_EVENT } from '@/lib/products-sync';

type ProductsContextValue = {
  products: Product[];
  categories: typeof categories;
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
      if (data.source !== 'supabase') {
        const local = localStorage.getItem(LOCAL_CATALOGUE_KEY);
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed)) products = parsed;
          } catch {}
        }
      }

      setValue({
        products,
        categories,
        loading: false,
        source: data.source === 'supabase' ? 'supabase' : 'fallback',
      });
    } catch {
      setValue((current) => ({ ...current, loading: false }));
    }
  }, []);

  useEffect(() => {
    void loadProducts();

    const refresh = () => void loadProducts();
    const refreshOnStorage = (event: StorageEvent) => {
      if (event.key === PRODUCTS_SYNC_KEY || event.key === LOCAL_CATALOGUE_KEY) refresh();
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refreshOnStorage);
    return () => {
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
