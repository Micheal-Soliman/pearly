'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  if (product?.isShade) return null;
  const isLipgloss = product.category === 'Lipgloss';
  const isBundle = product.category === 'Bundles';
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('big-brush');
  const [quantity, setQuantity] = useState(1);
  const bundleSteps = isBundle ? getBundleSteps(product) : [];

  const pricing = useMemo(() => {
    return isLipgloss ? getLipglossVariantPricing(selectedType) : null;
  }, [isLipgloss, selectedType]);

  return (
    <motion.div 
      className="group relative h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <Link href={{ pathname: `/products/${product.id}`, query: hrefQuery }} className="block">
        <div className="relative h-[340px] sm:h-[380px] mb-4 overflow-hidden rounded-3xl bg-[#ffe9f0] border border-[#ffd3df] shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10 shadow-lg border border-[#ffe9f0]"
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'}`} />
          </button>

          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {product.bestSeller && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#d6869d] text-white px-3 py-1 text-[10px] font-medium tracking-[0.25em] uppercase shadow-lg rounded-full"
              >
                ✦ Best
              </motion.span>
            )}
            {product.originalPrice ? (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-sm text-[#d6869d] px-3 py-1 text-[10px] font-medium tracking-[0.25em] uppercase shadow-lg rounded-full border border-[#ffe9f0]"
              >
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </motion.span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="space-y-4 text-start flex-1 flex flex-col">
        <Link href={{ pathname: `/products/${product.id}`, query: hrefQuery }} className="block">
          <motion.h3 
            className="text-lg sm:text-xl font-medium tracking-wide text-gray-900 group-hover:text-[#d6869d] transition-colors line-clamp-1"
            whileHover={{ x: 2 }}
          >
            {product.name}
          </motion.h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">{product.description}</p>
        </Link>

        <div className="flex items-start justify-between gap-3 flex-1">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl text-[#d6869d] font-light">
                {(pricing ? pricing.price : product.price)} EGP
              </span>
              {isLipgloss ? (
                <span className="line-through text-gray-400 font-light text-sm">{pricing?.originalPrice} EGP</span>
              ) : product.originalPrice ? (
                <span className="line-through text-gray-400 font-light text-sm">{product.originalPrice} EGP</span>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-[#ffe9f0] text-[#d6869d] border border-[#ffd3df] font-medium">
                {product.category}
              </span>
              {isLipgloss && (
                <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-white text-[#d6869d] border border-[#ffd3df] font-medium">
                  ✦ Choose shade
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
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType('squeez')}
              className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border rounded-full transition-all duration-300 ${
                selectedType === 'squeez'
                  ? 'bg-[#d6869d] border-[#d6869d] text-white shadow-md'
                  : 'bg-white border-[#ffd3df] text-[#d6869d] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
              }`}
            >
              ✦ Squeez
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType('big-brush')}
              className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border rounded-full transition-all duration-300 ${
                selectedType === 'big-brush'
                  ? 'bg-[#d6869d] border-[#d6869d] text-white shadow-md'
                  : 'bg-white border-[#ffd3df] text-[#d6869d] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
              }`}
            >
              ✦ Big Brush
            </motion.button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#ffe9f0] mt-auto">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Qty</span>
          <div className="flex items-center border-2 border-[#ffe9f0] rounded-full overflow-hidden bg-white">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-10 text-center font-medium text-[#d6869d] text-lg">{quantity}</span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const base = isLipgloss ? { ...product, selectedType } : product;
            onAddToCart({ ...base, quantity });
          }}
          className="w-full bg-gradient-to-r from-[#d6869d] to-[#e8a4b8] text-white px-6 py-3.5 text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#c97a8f] hover:to-[#d6869d]"
        >
          <ShoppingBag className="w-4 h-4" />
          {isLipgloss ? '✦ Choose Shade' : '✦ Add To Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}
