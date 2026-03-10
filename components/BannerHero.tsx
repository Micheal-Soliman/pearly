'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  image: string;
  title: string;
};

export default function BannerHero({ image, title }: Props) {
  return (
    <section className="relative w-full h-[60vh] mt-20 sm:mt-24 overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover object-[50%_center] md:object-[70%_center]" 
        priority 
      />
      
      {/* Elegant gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/30 via-transparent to-[#d6869d]/60"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Decorative corner frames */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30 rounded-tl-3xl"></div>
      <div className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30 rounded-tr-3xl"></div>
      <div className="absolute bottom-24 left-8 w-16 h-16 border-l-2 border-b-2 border-white/30 rounded-bl-3xl"></div>
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30 rounded-br-3xl"></div>
      
      {/* Subtle decorative dots */}
      <div className="absolute top-32 left-[15%] w-2 h-2 rounded-full bg-white/30"></div>
      <div className="absolute top-40 right-[20%] w-1.5 h-1.5 rounded-full bg-white/25"></div>
      <div className="absolute bottom-32 left-[25%] w-2 h-2 rounded-full bg-white/20"></div>
      <div className="absolute bottom-40 right-[15%] w-1.5 h-1.5 rounded-full bg-white/25"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-white/80 text-[10px] tracking-[0.4em] uppercase font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block mx-3">✦</span>
            Discover Our Collection
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest text-white mb-6">
            <span>{title}</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-white/50"></span>
            <span className="text-white text-sm">✦</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-white/50"></span>
          </div>
          
          <p className="text-white/80 font-light tracking-wide text-sm sm:text-base">
            Premium lipgloss and beauty essentials
          </p>
        </motion.div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </section>
  );
}
