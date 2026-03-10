'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { products } from '@/data/products';

export default function BundleSavings() {
  const bundles = products.filter((p) => p.category === 'Bundles');
  
  // Top 3 bundles by savings (best value)
  const bundle31 = bundles.find((p) => p.id === '31'); // 2 Big Brush + 1 Free (33.3% off)
  const bundle32 = bundles.find((p) => p.id === '32'); // 2 Big Brush + 1 Squeez Free (27% off)
  const bundle30 = bundles.find((p) => p.id === '30'); // 3 Big Brush (22.2% off)
  
  const getSaveAmount = (bundle: typeof bundle31) => 
    bundle?.originalPrice !== undefined ? bundle.originalPrice - bundle.price : undefined;
  
  const getDiscountPercent = (bundle: typeof bundle31) => {
    if (!bundle?.originalPrice || !bundle?.price) return 0;
    return Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);
  };

  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BEST VALUE - 2 Big Brush + 1 Free */}
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
              <h3 className="text-xl font-light tracking-wide">2 Big Brush + 1 Free</h3>
            </div>
            {bundle31?.price !== undefined && (
              <p className="text-5xl font-light mb-2 text-[#d6869d]">{bundle31.price} <span className="text-xl">EGP</span></p>
            )}
            <p className="text-lg text-gray-400 font-light mb-3 line-through">{bundle31?.originalPrice} EGP</p>
            <div className="inline-block bg-[#d6869d]/10 text-[#d6869d] px-4 py-1 rounded-full text-sm font-medium mb-6 tracking-wide">
              Save {getDiscountPercent(bundle31)}%
            </div>
            <p className="text-sm text-gray-500 font-light mb-8 px-4 leading-relaxed">{bundle31?.description}</p>
            <Link href={`/products/${bundle31?.id || ''}`} className="inline-block bg-[#d6869d] text-white px-10 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              SHOP NOW
            </Link>
          </motion.div>

          {/* POPULAR - 2 Big Brush + 1 Squeez Free */}
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
              <h3 className="text-xl font-light tracking-wide">2 Big Brush + 1 Squeez Free</h3>
            </div>
            {bundle32?.price !== undefined && (
              <p className="text-5xl font-light mb-2 text-gray-800">{bundle32.price} <span className="text-xl">EGP</span></p>
            )}
            <p className="text-lg text-gray-400 font-light mb-3 line-through">{bundle32?.originalPrice} EGP</p>
            <div className="inline-block bg-[#d6869d]/10 text-[#d6869d] px-4 py-1 rounded-full text-sm font-medium mb-6 tracking-wide">
              Save {getDiscountPercent(bundle32)}%
            </div>
            <p className="text-sm text-gray-500 font-light mb-8 px-4 leading-relaxed">{bundle32?.description}</p>
            <Link href={`/products/${bundle32?.id || ''}`} className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-10 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#ffe9f0] hover:-translate-y-0.5 transition-all duration-300 rounded-full">
              SHOP NOW
            </Link>
          </motion.div>

          {/* FAMILY PACK - 3 Big Brush */}
          <motion.div 
            className="relative text-center p-8 rounded-[2rem] bg-white border-2 border-[#ffd3df] hover:border-[#d6869d] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-6 py-2 text-xs tracking-[0.2em] uppercase rounded-full shadow-lg">
              FAMILY PACK
            </div>
            <div className="mt-6 mb-6">
              <p className="text-xs text-[#d6869d] font-medium tracking-[0.2em] uppercase mb-2">Bundle Deal</p>
              <h3 className="text-xl font-light tracking-wide">3 Big Brush</h3>
            </div>
            {bundle30?.price !== undefined && (
              <p className="text-5xl font-light mb-2 text-gray-800">{bundle30.price} <span className="text-xl">EGP</span></p>
            )}
            <p className="text-lg text-gray-400 font-light mb-3 line-through">{bundle30?.originalPrice} EGP</p>
            <div className="inline-block bg-[#d6869d]/10 text-[#d6869d] px-4 py-1 rounded-full text-sm font-medium mb-6 tracking-wide">
              Save {getDiscountPercent(bundle30)}%
            </div>
            <p className="text-sm text-gray-500 font-light mb-8 px-4 leading-relaxed">{bundle30?.description}</p>
            <Link href={`/products/${bundle30?.id || ''}`} className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-10 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#ffe9f0] hover:-translate-y-0.5 transition-all duration-300 rounded-full">
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
