'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  onSelect: (name: string) => void;
};

export default function ClientMomentsGallery({ onSelect }: Props) {
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-[#ffe9f0] to-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      {/* Subtle decorative dots */}
      <div className="absolute top-16 left-[10%] w-2 h-2 rounded-full bg-[#d6869d]/20"></div>
      <div className="absolute top-24 right-[15%] w-1.5 h-1.5 rounded-full bg-[#d6869d]/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Elegant Header */}
        <motion.div 
          className="text-center mb-10 md:mb-14"
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
            Real Results
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase mb-4">
            <span className="text-[#d6869d]">Client Moments</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="text-base text-[#d6869d]/80 font-light tracking-wide">Capturing beautiful moments with Pearly</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'IMG-20251110-WA0025.jpg',
            'IMG-20251110-WA0042.jpg',
            'IMG-20251110-WA0097.jpg',
            'IMG-20251110-WA0099.jpg',
          ].map((name) => (
            <div
              key={name}
              onClick={() => onSelect(name)}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src={`/Clients moments with pearly/${name}`}
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/gallery"
            className="group relative inline-block bg-[#d6869d] text-white px-14 py-4 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium transition-all duration-700 shadow-lg hover:shadow-[0_10px_40px_rgba(214,134,157,0.3)] hover:-translate-y-0.5 rounded-full overflow-hidden"
          >
            <span className="relative z-10">View Full Gallery</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
