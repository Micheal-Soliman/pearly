'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';

type Product = any;

type Props = {
  products: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, product: Product) => void;
  handleAddToCart: (product: Product) => void;
};

export default function LipglossSlider({ products, isFavorite, toggleFavorite, handleAddToCart }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-pink-200 text-6xl animate-float"></div>
        <div className="absolute top-20 right-20 text-pink-200 text-5xl animate-sparkle"></div>
        <div className="absolute bottom-20 left-1/4 text-pink-200 text-7xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 text-pink-200 text-6xl animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Lipgloss Collection </span>
          </h2>
          <p className="text-lg text-[#d6869d] font-medium mb-2">shine bright with our signature glosses</p>
          <p className="text-sm text-gray-600 font-light">Swipe to explore all shades</p>
        </div>

        <div className="relative">
          <div ref={sliderRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth -mx-4 px-4">
            {products
              .filter((p) => p.category === 'Lipgloss')
              .sort((a, b) => {
                if (a.bestSeller && !b.bestSeller) return -1;
                if (!a.bestSeller && b.bestSeller) return 1;
                return 0;
              })
              .slice(0, 8)
              .map((product: Product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="flex-none w-[280px] sm:w-[320px] snap-start group/card">
                  <div className="relative">
                    <div className="relative h[420px] sm:h-[460px] mb-5 overflow-hidden bg-[#d6869d] rounded-3xl shadow-xl group-hover/card:shadow-2xl transition-all duration-500 transform group-hover/card:-translate-y-3 border-2 border-[#d6869d]">
                      <div className="absolute top-2 right-2 text-pink-200 text-2xl animate-sparkle"></div>
                      <div className="absolute bottom-2 left-2 text-pink-200 text-xl animate-float"></div>
                      <div className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-t-3xl">
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                          <button onClick={(e) => toggleFavorite(e, product)} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] shadow-lg hover:scale-110">
                            <Heart className={`w-5 h-5 transition-colors ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'}`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#d6869d] hover:text-white shadow-lg hover:scale-110"
                          >
                            <ShoppingBag className="w-5 h-5" />
                          </button>
                        </div>
                        {product.bestSeller && (
                          <div className="absolute top-4 right-4 bg-[#d6869d] text-white px-4 py-2 text-xs font-medium tracking-widest uppercase shadow-lg rounded-full animate-pulse z-10">Best Seller</div>
                        )}
                        <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white text-[11px] sm:text-sm rounded-full shadow-lg z-10 flex items-center justify-between gap-3 px-3 py-1.5 sm:px-4 sm:py-2">
                          <span className="font-semibold">from {product.price} EGP</span>
                          <span className="line-through opacity-80 text-[10px] sm:text-xs">210 EGP</span>
                        </div>
                      </div>
                      <div className="p-6 bg-[#d6869d]">
                        <h3 className="text-lg font-light tracking-wide mb-3 line-clamp-2 text-white group-hover/card:text-white transition-colors">{product.name.toLowerCase()}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs tracking-widest uppercase text-white font-medium">Lipgloss</span>
                          <div className="max-w-[60%] text-right overflow-hidden">
                            <span className="text-sm tracking-wide uppercase text-white/90 font-medium group-hover/card:hidden truncate whitespace-nowrap">View</span>
                            <span className="text-sm tracking-wide uppercase text-white font-semibold hidden group-hover/card:inline truncate whitespace-nowrap">Enjoy</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none glow-pink"></div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/products?category=Lipgloss"
            className="inline-block bg-[#d6869d] text-white px-16 py-5 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:opacity-90 rounded-full"
          >
            View All Lipgloss
          </Link>
        </div>
      </div>
    </section>
  );
}
