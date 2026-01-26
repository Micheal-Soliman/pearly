'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

type Product = any;

type Props = {
  products: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, product: Product) => void;
  handleAddToCart: (product: Product) => void;
};

export default function LipglossSlider({ products, isFavorite, toggleFavorite, handleAddToCart }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const hrefQuery = { category: 'Lipgloss', page: '1' };
  const noopEvent = { preventDefault: () => {}, stopPropagation: () => {} } as any;

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
                <div key={product.id} className="flex-none w-[280px] sm:w-[320px] snap-start">
                  <ProductCard
                    product={product}
                    isFavorite={isFavorite}
                    onToggleFavorite={(p) => toggleFavorite(noopEvent, p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                    hrefQuery={hrefQuery}
                  />
                </div>
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
