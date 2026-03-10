'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FlavoursGrid() {
  const flavours = [
    { name: 'Bubble Gum', image: '/bubble-gum.png', productId: '10' },
    { name: 'Coffee', image: '/coffe.png', productId: '11' },
    { name: 'Vanilla', image: '/vanilia.png', productId: '17' },
    { name: 'Coconut', image: '/coconut.png', productId: '13' },
    { name: 'Mixed Berries', image: '/berries.png', productId: '14' },
    { name: 'Strawberry', image: '/strawberrey.png', productId: '20' },
    { name: 'Watermelon', image: '/watermelon.png', productId: '28' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Elegant Title Section */}
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
            Tempting Scents
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase">
            Choose Your Flavour
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="mt-6 text-base text-gray-500 font-light tracking-wide">
            Delicious scents that make you smile
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 max-w-4xl mx-auto">
          {flavours.map((flavour, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex flex-col items-center"
            >
              <Link 
                href={`/products/lipgloss?shade=${encodeURIComponent(flavour.productId)}`} 
                className="group text-center block w-full"
              >
                <div className="relative w-full max-w-[100px] mx-auto aspect-square mb-3 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffe9f0] to-white"></div>
                  <Image 
                    src={flavour.image} 
                    alt={flavour.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#d6869d]/0 group-hover:bg-[#d6869d]/10 transition-all duration-500 rounded-full"></div>
                </div>
                <p className="text-xs font-light tracking-wide text-gray-700 group-hover:text-[#d6869d] transition-colors duration-300">
                  {flavour.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
