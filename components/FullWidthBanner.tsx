'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FullWidthBanner() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      <Image src="/all products2.png" alt="Pearly Collection" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/30 via-transparent to-[#d6869d]/60"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-white text-sm tracking-[0.3em] uppercase font-medium mb-4 drop-shadow-lg"
          >
            ✦ Discover Beauty ✦
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-amsterdam text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-2xl"
          >
            Pearly Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-lg sm:text-xl font-light tracking-wide mb-8 max-w-xl mx-auto drop-shadow-lg"
          >
            Elevate your look with our premium lip care essentials
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/products"
              className="inline-block bg-white text-[#d6869d] px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-full"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
