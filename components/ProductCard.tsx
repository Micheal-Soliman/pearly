'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getLipglossVariantPricing } from '@/lib/pricing';
import { getBundleSteps, getStepLabelForIndex } from '@/lib/bundles';

type Props = {
  product: any;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (product: any) => void;
  onAddToCart: (product: any) => void;
  hrefQuery: Record<string, string>;
};

export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, hrefQuery }: Props) {
  const isLipgloss = product.category === 'Lipgloss';
  const isBundle = product.category === 'Bundles';
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez' | 'squeez-mini'>('big-brush');
  const [quantity, setQuantity] = useState(1);
  const bundleSteps = isBundle ? getBundleSteps(product) : [];

  const pricing = useMemo(() => {
    return isLipgloss ? getLipglossVariantPricing(selectedType) : null;
  }, [isLipgloss, selectedType]);

  return (
    <div className="group relative">
      <Link href={{ pathname: `/products/${product.id}`, query: hrefQuery }}>
        <div className="relative h-[350px] sm:h-[450px] mb-4 overflow-hidden rounded-3xl bg-[#ffe9f0] border-2 border-[#ffe9f0] shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
          <div className="absolute top-2 right-2 text-pink-200 text-xl animate-sparkle z-10"></div>

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] z-10 shadow-lg"
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'}`} />
          </button>

          {product.bestSeller && (
            <div className="absolute top-4 right-4 bg-[#d6869d] text-white px-3 py-1 text-xs font-medium tracking-widest uppercase shadow-lg rounded-full z-10">Best</div>
          )}
        </div>
      </Link>

      <div className="space-y-3 text-start">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg sm:text-xl font-medium tracking-wide text-gray-900 hover:text-[#d6869d] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base text-[#d6869d] font-semibold flex items-center gap-2">
              <span>{(pricing ? pricing.price : product.price)} EGP</span>
              {isLipgloss ? (
                <span className="line-through text-gray-400 font-medium">{pricing?.originalPrice} EGP</span>
              ) : product.originalPrice ? (
                <span className="line-through text-gray-400 font-medium">{product.originalPrice} EGP</span>
              ) : null}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase bg-[#ffe9f0] text-[#d6869d] border border-[#ffd3df]">
                {product.category}
              </span>
              {product.bestSeller && (
                <span className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase bg-[#d6869d] text-white border border-[#d6869d]">
                  Best
                </span>
              )}
            </div>

            {isBundle && bundleSteps.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {bundleSteps.map((_: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase bg-white text-[#d6869d] border border-[#ffd3df]"
                  >
                    {getStepLabelForIndex(bundleSteps, idx)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {isLipgloss && (
          <div className="flex items-start justify-start gap-2">
            <button
              type="button"
              onClick={() => setSelectedType('squeez')}
              className={`px-3 py-1 text-[11px] tracking-widest uppercase border rounded-full transition-colors ${
                selectedType === 'squeez'
                  ? 'bg-[#d6869d] border-[#d6869d] text-white'
                  : 'bg-white border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
              }`}
            >
              Squeez
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('squeez-mini')}
              className={`px-3 py-1 text-[11px] tracking-widest uppercase border rounded-full transition-colors ${
                selectedType === 'squeez-mini'
                  ? 'bg-[#d6869d] border-[#d6869d] text-white'
                  : 'bg-white border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
              }`}
            >
              Squeez + Mini
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('big-brush')}
              className={`px-3 py-1 text-[11px] tracking-widest uppercase border rounded-full transition-colors ${
                selectedType === 'big-brush'
                  ? 'bg-[#d6869d] border-[#d6869d] text-white'
                  : 'bg-white border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
              }`}
            >
              Big Brush
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tracking-widest uppercase text-gray-500">Qty</span>
          <div className="flex items-center border-2 border-[#ffe9f0] rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-medium text-[#d6869d]">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const base = isLipgloss ? { ...product, selectedType } : product;
            onAddToCart({ ...base, quantity });
          }}
          className="w-full bg-[#d6869d] text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
        >
          <ShoppingBag className="w-4 h-4" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
