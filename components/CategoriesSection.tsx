'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProducts } from '@/context/ProductsContext';

const legacyImages: Record<string, string> = {
  'Big Brush': '/4.2.jpg',
  'Liquid Blush': '/Liquid blush/1.png',
};

export default function CategoriesSection() {
  const { categories, products } = useProducts();
  const homepageCategories = categories
    .filter((category) => category.name !== 'All' && category.homepageVisible !== false)
    .sort((a, b) => (a.homepageOrder ?? Number.MAX_SAFE_INTEGER) - (b.homepageOrder ?? Number.MAX_SAFE_INTEGER));

  if (!homepageCategories.length) return null;

  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16 md:mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <motion.span className="inline-block text-[#d6869d] text-[10px] tracking-[0.4em] uppercase font-medium mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="inline-block mx-3">✦</span>Explore Our Collections<span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase">Shop By Category</h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40" />
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40" />
          </div>
          <p className="mt-6 text-sm text-gray-500 font-light tracking-wide md:hidden">Swipe to explore our collections</p>
        </motion.div>

        <div className="md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {homepageCategories.map((category, index) => {
            const categoryProducts = products.filter((product) => product.category === category.name);
            const product = categoryProducts.find((item) => !item.isShade && item.image) || categoryProducts.find((item) => item.image);
            const image = product?.image || legacyImages[category.name];

            return <motion.div key={category.id || category.name} initial={{ opacity: 0, x: index % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: Math.min(index * 0.08, 0.32) }}>
              <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="group relative h-[450px] md:h-[580px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(214,134,157,0.3)] hover:shadow-[0_30px_80px_-15px_rgba(214,134,157,0.4)] transition-all duration-700 snap-center block bg-gradient-to-br from-[#fce8ee] via-[#e8afbf] to-[#d6869d]">
                {image && <Image unoptimized src={image} alt={category.name} fill sizes="(min-width: 768px) 50vw, 85vw" className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />}
                {!image && <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10rem] font-extralight">P</div>}
                <div className="absolute inset-0 bg-gradient-to-t from-[#a74f68]/80 via-[#d6869d]/20 to-transparent group-hover:from-[#a74f68]/90 transition-all duration-700" />
                <div className="absolute top-8 right-8 w-14 h-14 border border-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 px-6 text-center">
                  <span className="text-white/80 text-[10px] tracking-[0.35em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">Collection</span>
                  <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.1em] mb-6 uppercase group-hover:scale-105 transition-transform duration-700">{category.name}</h3>
                  <div className="flex items-center gap-3 text-white/90 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                    <span className="border-b border-white/50 pb-1">Shop Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/80 group-hover:w-40 transition-all duration-700" />
                <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </Link>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}
