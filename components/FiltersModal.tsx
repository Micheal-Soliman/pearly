'use client';

import { X, Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  show: boolean;
  onClose: () => void;
  categories: Array<{ name: string }>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  minP: number;
  maxP: number;
  minPrice: number;
  maxPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  inStockOnly: boolean;
  setInStockOnly: Dispatch<SetStateAction<boolean>>;
  bestSellerOnly: boolean;
  setBestSellerOnly: Dispatch<SetStateAction<boolean>>;
  onSaleOnly: boolean;
  setOnSaleOnly: Dispatch<SetStateAction<boolean>>;
  featuredOnly: boolean;
  setFeaturedOnly: Dispatch<SetStateAction<boolean>>;
  shadeOptions: string[];
  selectedShades: string[];
  setSelectedShades: Dispatch<SetStateAction<string[]>>;
  onApply: () => void;
  onReset: () => void;
};

export default function FiltersModal({
  show,
  onClose,
  categories,
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
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
  shadeOptions,
  selectedShades,
  setSelectedShades,
  onApply,
  onReset,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full p-6 rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#d6869d]">Search & Filters</h3>
          <button className="text-sm text-gray-500 hover:text-[#d6869d]" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Search</label>
              <div className="flex items-center gap-2 border-2 border-[#ffe9f0] rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-[#d6869d]" />
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Type product name..." className="w-full outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`px-3 py-1.5 text-xs rounded-full ${selectedCategory === cat.name ? 'bg-[#d6869d] text-white' : 'border-2 border-[#ffe9f0] text-[#d6869d]'}`}>{cat.name}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input type="number" value={minPrice} min={minP} max={maxPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full border-2 border-[#ffe9f0] rounded-xl px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input type="number" value={maxPrice} min={minPrice} max={maxP} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full border-2 border-[#ffe9f0] rounded-xl px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} /><span>In Stock</span></label>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} /><span>On Sale</span></label>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={bestSellerOnly} onChange={(e) => setBestSellerOnly(e.target.checked)} /><span>Best Seller</span></label>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} /><span>Featured</span></label>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">Shades (Lipgloss)</label>
              <div className="flex flex-wrap gap-2">
                {shadeOptions.map((s) => {
                  const active = selectedShades.includes(s);
                  return (
                    <button key={s} onClick={() => setSelectedShades(active ? selectedShades.filter(x => x !== s) : [...selectedShades, s])} className={`px-3 py-1.5 text-xs rounded-full ${active ? 'bg-[#d6869d] text-white' : 'border-2 border-[#ffe9f0] text-[#d6869d]'}`}>{s}</button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button onClick={onReset} className="px-5 py-2 rounded-full border-2 border-[#ffe9f0] text-[#d6869d] text-xs tracking-[0.2em] font-medium">Reset</button>
          <button onClick={onApply} className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md">Apply</button>
        </div>
      </div>
    </div>
  );
}
