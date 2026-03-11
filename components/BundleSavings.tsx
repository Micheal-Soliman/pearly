'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { products } from '@/data/products';

export default function BundleSavings() {
  const bundles = products.filter((p) => p.category === 'Bundles');
  
  // Existing bundles
  const bundle9 = bundles.find((p) => p.id === '9'); // Squeez + Big Brush (13.5% off)
  const bundle32 = bundles.find((p) => p.id === '32'); // 2 Big Brush + 1 Squeez Free (27% off)
  
  const getSaveAmount = (bundle: typeof bundle9) => {
    if (!bundle?.originalPrice || !bundle?.price) return 0;
    return bundle.originalPrice - bundle.price;
  };

  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Title */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d6869d] text-xs tracking-[0.4em] uppercase font-medium">
            Special Offers
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase">
            Save More With Bundles
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#d6869d]/40"></span>
            <Sparkles className="w-5 h-5 text-[#d6869d]" />
            <span className="h-px w-16 bg-[#d6869d]/40"></span>
          </div>
          <p className="mt-4 text-base text-gray-500 font-light tracking-wide">
            The more you buy, the more you save
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* BEST VALUE - 2 Big Brush + 1 Squeez Free */}
          {bundle32 && (
            <motion.div 
              className="relative text-center p-8 rounded-[2rem] bg-gradient-to-b from-[#d6869d]/20 to-[#ffe9f0] border-2 border-[#d6869d] shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 text-xs tracking-[0.2em] uppercase rounded-full shadow-lg font-bold">
                BEST VALUE
              </div>
              <div className="mt-6 mb-6">
                <p className="text-xs text-[#d6869d] font-medium tracking-[0.2em] uppercase mb-2">Bundle Deal</p>
                <h3 className="text-xl font-light tracking-wide">{bundle32.name}</h3>
              </div>
              <p className="text-5xl font-light mb-2 text-[#d6869d]">{bundle32.price} <span className="text-xl">EGP</span></p>
              <p className="text-lg text-gray-400 font-light mb-3 line-through">{bundle32.originalPrice} EGP</p>
              <div className="inline-block bg-[#d6869d]/10 text-[#d6869d] px-4 py-1 rounded-full text-sm font-medium mb-6 tracking-wide">
                Save {getSaveAmount(bundle32)} EGP
              </div>
              <p className="text-sm text-gray-500 font-light mb-8 px-4 leading-relaxed">{bundle32.description}</p>
              <Link href={`/products/${bundle32.id}`} className="inline-block bg-[#d6869d] text-white px-10 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                SHOP NOW
              </Link>
            </motion.div>
          )}

          {/* POPULAR - Squeez + Big Brush */}
          {bundle9 && (
            <motion.div 
              className="relative text-center p-8 rounded-[2rem] bg-white border-2 border-[#ffd3df] hover:border-[#d6869d] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d6869d] text-white px-6 py-2 text-xs tracking-[0.2em] uppercase rounded-full shadow-lg">
                POPULAR
              </div>
              <div className="mt-6 mb-6">
                <p className="text-xs text-[#d6869d] font-medium tracking-[0.2em] uppercase mb-2">Bundle Deal</p>
                <h3 className="text-xl font-light tracking-wide">{bundle9.name}</h3>
              </div>
              <p className="text-5xl font-light mb-2 text-gray-800">{bundle9.price} <span className="text-xl">EGP</span></p>
              <p className="text-lg text-gray-400 font-light mb-3 line-through">{bundle9.originalPrice} EGP</p>
              <div className="inline-block bg-[#d6869d]/10 text-[#d6869d] px-4 py-1 rounded-full text-sm font-medium mb-6 tracking-wide">
                Save {getSaveAmount(bundle9)} EGP
              </div>
              <p className="text-sm text-gray-500 font-light mb-8 px-4 leading-relaxed">{bundle9.description}</p>
              <Link href={`/products/${bundle9.id}`} className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-10 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#ffe9f0] hover:-translate-y-0.5 transition-all duration-300 rounded-full">
                SHOP NOW
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
