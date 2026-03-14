'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarqueeText from './MarqueeText';

export default function HomeHero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] mt-20 overflow-hidden">
      <Image
        src="/4.1 (1).jpg.jpeg"
        alt="Pearly"
        fill
        className="object-cover object-[45%_80%]"
        priority
      />
      {/* Enhanced gradient overlay for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/30 via-transparent to-[#d6869d]/60"></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Elegant floating elements - more refined */}
      <motion.div 
        className="absolute top-28 left-[10%] w-2 h-2 rounded-full bg-white/70"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-36 right-[15%] w-1.5 h-1.5 rounded-full bg-white/60"
        animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-48 left-[20%] w-3 h-3 rounded-full bg-[#ffe9f0]/50"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div 
        className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-[#d6869d]/40"
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-[35%] left-[5%] w-1.5 h-1.5 rounded-full bg-white/50"
        animate={{ y: [0, -22, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Decorative corner ornaments */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute top-32 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30 rounded-tl-3xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute top-32 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30 rounded-tr-3xl"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          {/* Elegant subtitle with refined styling */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block text-white/90 text-[10px] sm:text-xs tracking-[0.5em] uppercase mb-8 font-light"
          >
            <span className="inline-block mx-2">✦</span>
            Premium Beauty Essentials
            <span className="inline-block mx-2">✦</span>
          </motion.span>
          
          {/* Main title with enhanced styling and animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-amsterdam text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            Pearly
          </motion.h1>
          
          {/* Decorative line with animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent mx-auto mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl font-extralight leading-relaxed tracking-[0.2em] mb-14 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] max-w-2xl md:max-w-3xl mx-auto"
          >
            Discover Your Pearly Glow
          </motion.p>
          
          {/* Enhanced CTA button with refined styling */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 1 }}
          >
            <Link
              href="/products"
              className="group relative inline-block bg-white/95 text-[#d6869d] px-16 py-4 text-[10px] sm:text-xs tracking-[0.35em] font-medium transition-all duration-700 shadow-2xl hover:shadow-[0_10px_40px_rgba(214,134,157,0.3)] hover:-translate-y-1 hover:bg-white rounded-full backdrop-blur-sm overflow-hidden"
            >
              <span className="relative z-10">SHOP NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

      {/* Marquee Text Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <MarqueeText />
      </div>
    </section>
  );
}
