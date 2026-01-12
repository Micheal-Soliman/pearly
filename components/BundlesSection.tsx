'use client';

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

export default function BundlesSection({ products, isFavorite, toggleFavorite, handleAddToCart }: Props) {
  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Bundles </span>
          </h2>
          <p className="text-lg text-[#d6869d] font-medium mb-2">save more, shine brighter</p>
          <p className="text-sm text-gray-600 font-light md:hidden">Swipe to see all bundles</p>
        </div>

        <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {products
            .filter((p) => p.category === 'Bundles')
            .sort((a, b) => {
              if (a.originalPrice && !b.originalPrice) return -1;
              if (!a.originalPrice && b.originalPrice) return 1;
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex-none w-[80vw] sm:w-[45vw] md:w-auto snap-center"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-[380px] md:h-[400px] lg:h-[500px] mb-5 overflow-hidden rounded-3xl bg-[#ffe9f0] border-2 border-[#ffe9f0] shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle z-10"></div>
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 bg-white text-[#d6869d] px-3 py-1 rounded-full text-xs font-semibold shadow z-10">Sale</div>
                    )}
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
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
                    <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10 flex items-center gap-2">
                      <span>{product.price} EGP</span>
                      {product.originalPrice && <span className="line-through opacity-80">{product.originalPrice} EGP</span>}
                    </div>
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none glow-pink"></div>
                  </div>

                  <div className="text-center mt-4">
                    <h3 className="text-lg font-light tracking-wide mb-2 text-gray-800 group-hover:text-[#d6869d] transition-colors">{product.name.toLowerCase()}</h3>
                    <p className="text-xs tracking-widest uppercase text-[#d6869d] font-medium">Bundle Deal</p>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
