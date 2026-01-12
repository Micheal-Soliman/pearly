'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';

type Props = {
  product: any;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onAddToCart: (e: React.MouseEvent) => void;
  hrefQuery: Record<string, string>;
};

export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, hrefQuery }: Props) {
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
            onClick={onToggleFavorite}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] z-10 shadow-lg"
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'}`} />
          </button>

          {product.bestSeller && (
            <div className="absolute top-4 right-4 bg-[#d6869d] text-white px-3 py-1 text-xs font-medium tracking-widest uppercase shadow-lg rounded-full z-10">Best</div>
          )}
        </div>
      </Link>

      <div className="space-y-2 text-center">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-light tracking-wide hover:text-[#d6869d] transition-colors">
            {product.name.toLowerCase()}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-sm text-[#d6869d] font-medium flex items-center gap-2">
            <span>{product.category === 'Lipgloss' ? 'from ' : ''}{product.price} EGP</span>
            {product.category === 'Lipgloss' ? (
              <span className="line-through text-gray-400">from 210 EGP</span>
            ) : product.originalPrice ? (
              <span className="line-through text-gray-400">{product.originalPrice} EGP</span>
            ) : null}
          </p>

          <button
            onClick={onAddToCart}
            className="w-9 h-9 border-2 border-[#d6869d] text-[#d6869d] rounded-full flex items-center justify-center hover:bg-[#d6869d] hover:text-white hover:border-[#d6869d] transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
