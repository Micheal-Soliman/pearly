'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeHero() {
  return (
    <section className="relative w-full h-screen mt-20 sm:mt-24">
      <Image
        src="/All Products Upp.jpg"
        alt="Pearly"
        fill
        className="object-cover object-[45%_center]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 text-[#d6869d] text-4xl animate-float opacity-30"></div>
      <div className="absolute top-40 right-20 text-[#d6869d] text-3xl animate-sparkle opacity-30"></div>
      <div className="absolute bottom-32 left-20 text-[#d6869d] text-5xl animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 text-[#d6869d] text-3xl animate-sparkle opacity-30" style={{ animationDelay: '0.5s' }}></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-amsterdam text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal mb-6"
          >
            Pearly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed tracking-wide mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] max-w-2xl md:max-w-3xl mx-auto"
          >
            Discover your pearly glow
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Link
              href="/products"
              className="inline-block bg-[#d6869d] text-white px-16 py-4 text-xs tracking-[0.3em] font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:opacity-90 rounded-full glow-pink"
            >
              Shop now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
