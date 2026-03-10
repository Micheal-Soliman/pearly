'use client';

import { useRef, useState } from 'react';
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

export default function BundlesSection({ products, isFavorite, toggleFavorite, handleAddToCart }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
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

  const bundleProducts = products
    .filter((p) => p.category === 'Bundles')
    .sort((a, b) => {
      if (a.originalPrice && !b.originalPrice) return -1;
      if (!a.originalPrice && b.originalPrice) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-white to-[#ffe9f0] relative overflow-hidden">
      {/* Elegant top and bottom borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#d6869d]/20"></div>
      <div className="absolute top-32 right-16 w-1.5 h-1.5 rounded-full bg-[#d6869d]/20"></div>
      <div className="absolute bottom-24 left-[20%] w-2 h-2 rounded-full bg-[#d6869d]/15"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Elegant Header */}
        <motion.div 
          className="text-center mb-14 md:mb-18"
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
            Special Offers
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase mb-4">
            <span className="text-[#d6869d]">Bundles</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="text-base text-[#d6869d] font-light tracking-wide mb-3">Save more, shine brighter</p>
          <p className="text-sm text-[#d6869d]/70 font-light tracking-wide">Swipe or drag to explore</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className={`flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide scroll-smooth px-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {bundleProducts.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group flex-none w-[300px] sm:w-[340px] snap-start"
              >
                {/* Bundle Card - Fixed Height */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(214,134,157,0.25)] hover:shadow-[0_20px_60px_-15px_rgba(214,134,157,0.4)] transition-all duration-500 hover:-translate-y-2 h-[610px] flex flex-col">
                  {/* Image - Fixed Height */}
                  <div className="relative h-[350px] overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, product)}
                      className="absolute top-4 left-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 z-10 shadow-lg border border-[#ffe9f0]"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-700'}`} />
                    </button>
                    
                    {/* Sale Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#d6869d] to-[#e8a4b8] text-white px-4 py-1.5 text-[10px] font-medium tracking-[0.25em] uppercase shadow-lg rounded-full">
                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  {/* Content - Flex to fill remaining space */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Bundle Name */}
                    <h3 className="text-lg font-medium tracking-wide text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Description - Fixed Height - Remove Save text */}
                    <div className="flex-1 min-h-[60px]">
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                        {product.description?.replace(/\.?\s*Save\s+\d+\.?\d*%?/i, '').trim()}
                      </p>
                    </div>
                    
                    {/* Price Section */}
                    <div className="mt-4 pt-4 border-t border-[#ffe9f0]">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-light text-[#d6869d]">{product.price} EGP</span>
                        {product.originalPrice && (
                          <span className="text-base text-gray-400 line-through">{product.originalPrice} EGP</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Add to Cart Button - Always at bottom */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-4 bg-[#d6869d] text-white px-6 py-3.5 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#c97a8f]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
