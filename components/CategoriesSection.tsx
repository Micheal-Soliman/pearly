'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Title Section with more elegance */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
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
            Explore Our Collections
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase">
            Shop By Category
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="mt-6 text-sm text-gray-500 font-light tracking-wide md:hidden">
            Swipe to explore our collections
          </p>
        </motion.div>

        <div className="md:grid md:grid-cols-2 md:gap-12 flex md:flex-none overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {/* Lipgloss Card - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link 
              href="/products?category=Lipgloss" 
              className="group relative h-[450px] md:h-[580px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(214,134,157,0.3)] hover:shadow-[0_30px_80px_-15px_rgba(214,134,157,0.4)] transition-all duration-700 snap-center block"
            >
              <Image 
                src="/4.2.jpg" 
                alt="Lipgloss" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/70 via-[#d6869d]/20 to-transparent group-hover:from-[#d6869d]/80 transition-all duration-700"></div>
              
              {/* Elegant corner accent */}
              <div className="absolute top-8 right-8 w-14 h-14 border border-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110 backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24">
                <motion.span 
                  className="text-white/80 text-[10px] tracking-[0.35em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0"
                >
                  Collection
                </motion.span>
                <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.2em] mb-6 group-hover:scale-105 transition-transform duration-700">
                  LIPGLOSS
                </h3>
                <div className="flex items-center gap-3 text-white/90 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  <span className="border-b border-white/50 pb-1">Shop Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom accent line animation */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/80 group-hover:w-40 transition-all duration-700"></div>
              
              {/* Decorative corner frame */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </Link>
          </motion.div>

          {/* Eyebrow Card - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/products?category=Eyebrow" 
              className="group relative h-[450px] md:h-[580px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(214,134,157,0.3)] hover:shadow-[0_30px_80px_-15px_rgba(214,134,157,0.4)] transition-all duration-700 snap-center block"
            >
              <Image 
                src="/eyebrow-wax-1.jpg" 
                alt="Eyebrow Wax" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/70 via-[#d6869d]/20 to-transparent group-hover:from-[#d6869d]/80 transition-all duration-700"></div>
              
              {/* Elegant corner accent */}
              <div className="absolute top-8 right-8 w-14 h-14 border border-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110 backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24">
                <motion.span 
                  className="text-white/80 text-[10px] tracking-[0.35em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0"
                >
                  Collection
                </motion.span>
                <h3 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.2em] mb-6 group-hover:scale-105 transition-transform duration-700">
                  EYEBROW
                </h3>
                <div className="flex items-center gap-3 text-white/90 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  <span className="border-b border-white/50 pb-1">Shop Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom accent line animation */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/80 group-hover:w-40 transition-all duration-700"></div>
              
              {/* Decorative corner frame */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
