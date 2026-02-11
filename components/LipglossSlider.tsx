'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

type Product = any;

type Props = {
  products: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onSelectShade: (shadeProduct: Product) => void;
};

export default function LipglossSlider({ products, isFavorite, toggleFavorite, onSelectShade }: Props) {
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
              .filter((p) => p.category === 'Lipgloss' && p.isShade === true)
              .sort((a, b) => {
                if (a.bestSeller && !b.bestSeller) return -1;
                if (!a.bestSeller && b.bestSeller) return 1;
                return 0;
              })
              .slice(0, 8)
              .map((product: Product) => (
                <div key={product.id} className="flex-none w-[280px] sm:w-[320px] snap-start">
                  <div className="group relative h-full">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectShade(product)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') onSelectShade(product);
                      }}
                      className="block w-full text-left cursor-pointer"
                    >
                      <div className="relative h-[340px] sm:h-[420px] mb-4 overflow-hidden rounded-3xl bg-[#ffe9f0] border border-[#ffd3df] shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(e, product);
                          }}
                          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white z-10 shadow-lg border border-[#ffe9f0]"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="space-y-3 text-start">
                        <h3 className="text-lg sm:text-xl font-medium tracking-wide text-gray-900 group-hover:text-[#d6869d] transition-colors line-clamp-1">
                          {product.name.replace('Lipgloss - ', '')}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                        <div className="flex items-center justify-between gap-3">
                          <p className="text-base text-[#d6869d] font-semibold">
                            {product.price} EGP
                            {product.originalPrice ? (
                              <span className="line-through text-gray-400 font-medium ml-2">{product.originalPrice} EGP</span>
                            ) : null}
                          </p>
                        </div>

                        <div className="w-full">
                          <span className="inline-flex items-center gap-2 bg-[#d6869d] text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-medium rounded-full shadow-lg group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all">
                            <ShoppingBag className="w-4 h-4" />
                            Add To Cart
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
