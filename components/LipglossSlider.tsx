'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

type Product = any;

type Props = {
  products: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, product: Product) => void;
  onSelectShade: (shadeProduct: Product) => void;
};

export default function LipglossSlider({ products, isFavorite, toggleFavorite, onSelectShade }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [swipedCards, setSwipedCards] = useState<Set<string>>(new Set());
  const touchStartX = useRef<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-[#ffe9f0] to-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      {/* Subtle decorative dots */}
      <div className="absolute top-16 left-[8%] w-2 h-2 rounded-full bg-[#d6869d]/20"></div>
      <div className="absolute top-24 right-[12%] w-1.5 h-1.5 rounded-full bg-[#d6869d]/25"></div>
      <div className="absolute bottom-20 left-[15%] w-2 h-2 rounded-full bg-[#d6869d]/15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Elegant Header */}
        <motion.div 
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-[#d6869d] text-[10px] tracking-[0.4em] uppercase font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block mx-3">✦</span>
            Best Sellers
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase mb-4">
            <span className="text-[#d6869d]">Lipgloss Collection</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="text-base text-[#d6869d] font-light tracking-wide mb-2">Shine bright with our signature glosses</p>
          <p className="text-sm text-gray-500 font-light tracking-wide">Swipe to explore all shades</p>
        </motion.div>

        <div className="relative">
          <div 
            ref={sliderRef} 
            className={`flex gap-14 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth px-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {products
              .filter((p) => p.category === 'Lipgloss' && p.isShade === true && p.images?.some((img: string) => img.includes('/1.jpg')) && !p.name.includes('Gold Honey') && !p.name.includes('Libre'))
              .sort((a, b) => {
                if (a.bestSeller && !b.bestSeller) return -1;
                if (!a.bestSeller && b.bestSeller) return 1;
                return 0;
              })
              .slice(0, 8)
              .map((product: Product) => {
                const isSwiped = swipedCards.has(product.id);
                return (
                <div key={product.id} className="flex-none w-[280px] sm:w-[320px] snap-start">
                  <div className="group relative h-full">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => router.push(`/products/lipgloss?shade=${product.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') router.push(`/products/lipgloss?shade=${product.id}`);
                      }}
                      className="block w-full text-left cursor-pointer"
                    >
                      <div
                        className="relative h-[340px] sm:h-[420px] mb-4 overflow-hidden rounded-3xl bg-[#ffe9f0] border border-[#ffd3df] shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 touch-pan-y"
                        onTouchStart={(e) => {
                          touchStartX.current[product.id] = e.touches[0].clientX;
                        }}
                        onTouchEnd={(e) => {
                          const startX = touchStartX.current[product.id];
                          const endX = e.changedTouches[0].clientX;
                          const diff = startX - endX;
                          if (Math.abs(diff) > 30) {
                            e.stopPropagation();
                            setSwipedCards((prev) => {
                              const next = new Set(prev);
                              if (next.has(product.id)) {
                                next.delete(product.id);
                              } else {
                                next.add(product.id);
                              }
                              return next;
                            });
                          }
                        }}
                      >
                        {/* Default image - Big Brush */}
                        <Image
                          src={product.images?.find((img: string) => img.includes('big brush')) || product.image}
                          alt={`${product.name} - Big Brush`}
                          fill
                          className={`object-cover transition-all duration-500 ${isSwiped ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0`}
                        />
                        {/* Hover/Swiped image - 1.jpg */}
                        <Image
                          src={product.images?.find((img: string) => img.includes('/1.jpg')) || product.image}
                          alt={product.name}
                          fill
                          className={`object-cover transition-all duration-500 ${isSwiped ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}
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

                      {/* Image indicators - lines */}
                      <div className="flex justify-center gap-2 mt-3 mb-2">
                        <div
                          className={`h-1 w-8 rounded-full transition-all duration-300 ${!isSwiped ? 'bg-[#d6869d]' : 'bg-gray-300'}`}
                          onMouseEnter={() => setSwipedCards((prev) => { const next = new Set(prev); next.delete(product.id); return next; })}
                        />
                        <div
                          className={`h-1 w-8 rounded-full transition-all duration-300 ${isSwiped ? 'bg-[#d6869d]' : 'bg-gray-300'}`}
                          onMouseEnter={() => setSwipedCards((prev) => { const next = new Set(prev); next.add(product.id); return next; })}
                        />
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

                        <div className="w-full" onClick={(e) => { e.stopPropagation(); onSelectShade(product); }}>
                          <span className="inline-flex items-center gap-2 bg-[#d6869d] text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-medium rounded-full shadow-lg group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all cursor-pointer">
                            <ShoppingBag className="w-4 h-4" />
                            Add To Cart
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/products?category=Lipgloss"
            className="group relative inline-block bg-[#d6869d] text-white px-16 py-5 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium transition-all duration-700 shadow-lg hover:shadow-[0_10px_40px_rgba(214,134,157,0.3)] hover:-translate-y-1 rounded-full overflow-hidden"
          >
            <span className="relative z-10">View All Lipgloss</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
