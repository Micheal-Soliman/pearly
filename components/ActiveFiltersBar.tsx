'use client';

import { X } from 'lucide-react';

type Props = {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  searchText: string;
  setSearchText: (v: string) => void;
  minP: number;
  maxP: number;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  bestSellerOnly: boolean;
  setBestSellerOnly: (v: boolean) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (v: boolean) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (v: boolean) => void;
  selectedShades: string[];
  setSelectedShades: (v: string[]) => void;
  updateQuery: (patch: Record<string, string | null>) => void;
};

export default function ActiveFiltersBar({
  selectedCategory,
  setSelectedCategory,
  searchText,
  setSearchText,
  minP,
  maxP,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  bestSellerOnly,
  setBestSellerOnly,
  onSaleOnly,
  setOnSaleOnly,
  featuredOnly,
  setFeaturedOnly,
  selectedShades,
  setSelectedShades,
  updateQuery,
}: Props) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {selectedCategory !== 'All' && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              updateQuery({ category: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Category: {selectedCategory}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {searchText.trim() && (
          <button
            onClick={() => {
              setSearchText('');
              updateQuery({ q: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Search: "{searchText.trim()}"</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {(minPrice > minP || maxPrice < maxP) && (
          <button
            onClick={() => {
              setMinPrice(minP);
              setMaxPrice(maxP);
              updateQuery({ min: String(minP), max: String(maxP), page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Price: {minPrice} - {maxPrice} EGP</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {inStockOnly && (
          <button
            onClick={() => {
              setInStockOnly(false);
              updateQuery({ instock: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>In Stock</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {bestSellerOnly && (
          <button
            onClick={() => {
              setBestSellerOnly(false);
              updateQuery({ bestseller: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Best Seller</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {onSaleOnly && (
          <button
            onClick={() => {
              setOnSaleOnly(false);
              updateQuery({ sale: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>On Sale</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {featuredOnly && (
          <button
            onClick={() => {
              setFeaturedOnly(false);
              updateQuery({ featured: null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Featured</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {selectedShades.map((shade) => (
          <button
            key={`shade-${shade}`}
            onClick={() => {
              const next = selectedShades.filter((s) => s !== shade);
              setSelectedShades(next);
              updateQuery({ shades: next.length ? next.join(',') : null, page: '1' });
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe9f0] text-[#d6869d] text-xs border border-[#d6869d]/20 hover:border-[#d6869d] transition"
          >
            <span>Shade: {shade}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
