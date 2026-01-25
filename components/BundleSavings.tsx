'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import { getLipglossVariantPricing } from '@/lib/pricing';

export default function BundleSavings() {
  const singlePrice = getLipglossVariantPricing('big-brush').price;
  const doubleBundle = products.find((p) => p.id === '7');
  const tripleBundle = products.find((p) => p.id === '8');

  const doublePrice = doubleBundle?.price;
  const triplePrice = tripleBundle?.price;

  const doubleSave = doubleBundle?.originalPrice !== undefined ? doubleBundle.originalPrice - doubleBundle.price : undefined;
  const tripleSave = tripleBundle?.originalPrice !== undefined ? tripleBundle.originalPrice - tripleBundle.price : undefined;

  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Save More With Bundles </span>
          </h2>
          <p className="text-lg text-[#d6869d] font-medium">The more you buy, the more you save</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SINGLE */}
          <div className="text-center p-8 rounded-3xl bg-white border-2 border-[#ffe9f0] hover:border-[#d6869d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative group">
            <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle"></div>
            <p className="text-sm tracking-widest uppercase text-[#d6869d] font-medium mb-4">SINGLE</p>
            <p className="text-5xl font-light mb-2 text-gray-800">{singlePrice} EGP</p>
            <p className="text-sm text-gray-600 font-light mb-6">Per lipgloss</p>
            <Link href="/products?category=Lipgloss" className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 rounded-full">
              SHOP NOW
            </Link>
          </div>

          {/* DOUBLE - Featured */}
          <div className="text-center p-8 rounded-3xl bg-[#ffe9f0] border-2 border-[#d6869d] relative shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            {doubleSave !== undefined && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d6869d] text-white px-6 py-2 text-xs tracking-widest uppercase rounded-full shadow-lg animate-pulse">SAVE {doubleSave} EGP</div>
            )}
            <div className="absolute top-3 right-3 text-pink-200 text-2xl animate-float"></div>
            <p className="text-sm tracking-widest uppercase text-[#d6869d] font-bold mb-4 mt-2">DOUBLE</p>
            {doublePrice !== undefined && (
              <p className="text-5xl font-light mb-2 text-[#d6869d]">{doublePrice} EGP</p>
            )}
            <p className="text-sm text-gray-600 font-light mb-6">2 lipgloss of your choice</p>
            <Link href="/products/7" className="inline-block bg-[#d6869d] text-white px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:opacity-90">
              SHOP NOW
            </Link>
          </div>

          {/* TRIPLE */}
          <div className="text-center p-8 rounded-3xl bg-white border-2 border-[#ffe9f0] hover:border-[#d6869d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative group">
            {tripleSave !== undefined && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d6869d] text-white px-6 py-2 text-xs tracking-widest uppercase rounded-full shadow-lg">SAVE {tripleSave} EGP</div>
            )}
            <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle"></div>
            <p className="text-sm tracking-widest uppercase text-[#d6869d] font-medium mb-4 mt-2">TRIPLE</p>
            {triplePrice !== undefined && (
              <p className="text-5xl font-light mb-2 text-gray-800">{triplePrice} EGP</p>
            )}
            <p className="text-sm text-gray-600 font-light mb-6">3 lipgloss of your choice</p>
            <Link href="/products/8" className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 rounded-full">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
