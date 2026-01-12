'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:hidden">
          <h2 className="text-xl sm:text-2xl font-light tracking-widest uppercase">
            <span className="text-[#d6869d]"> Shop By Category</span>
          </h2>
          <p className="text-sm text-gray-600 font-light mt-2">Swipe to explore our collections</p>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <Link href="/products?category=Lipgloss" className="group relative h-[400px] md:h-[500px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-3xl border-4 border-[#ffe9f0] md:border-transparent md:hover:border-[#d6869d] transition-all duration-300 shadow-xl hover:shadow-2xl snap-center">
            <Image src="/lipgloss-clear-1.jpg" alt="Lipgloss" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/50 via-black/20 to-black/20 md:from-[#d6869d]/40 md:group-hover:from-[#d6869d]/60 md:group-hover:via-[#d6869d]/30 transition-all duration-300"></div>
            <div className="absolute top-6 right-6 text-white text-3xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 animate-sparkle"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest mb-4 group-hover:scale-110 transition-transform duration-300">LIPGLOSS</h3>
              <div className="flex items-center gap-2 text-white text-sm tracking-widest uppercase md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                <span>Shop Now</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">View Collection →</div>
          </Link>

          <Link href="/products?category=Eyebrow" className="group relative h-[400px] md:h-[500px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-3xl border-4 border-[#ffe9f0] md:border-transparent md:hover:border-[#d6869d] transition-all duration-300 shadow-xl hover:shadow-2xl snap-center">
            <Image src="/eyebrow-wax-1.jpg" alt="Eyebrow Wax" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/50 via-black/20 to-black/20 md:from-[#d6869d]/40 md:group-hover:from-[#d6869d]/60 md:group-hover:via-[#d6869d]/30 transition-all duration-300"></div>
            <div className="absolute top-6 right-6 text-white text-3xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 animate-sparkle"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest mb-4 group-hover:scale-110 transition-transform duration-300">EYEBROW</h3>
              <div className="flex items-center gap-2 text-white text-sm tracking-widest uppercase md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                <span>Shop Now</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">View Collection →</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
