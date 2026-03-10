'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ShadesPalette() {
  const shades = [
    { name: 'Blossom', image: '/Product shades/blossom/IMG_1564.png', productId: '10' },
    { name: 'Chestnut', image: '/Product shades/chestnut/IMG_1563.png', productId: '11' },
    { name: 'Cinnamon', image: '/Product shades/cinnamon/IMG_2032.png', productId: '12' },
    { name: 'Clear', image: '/Product shades/clear/IMG_2082.png', productId: '13' },
    { name: 'Cozy Dream', image: '/Product shades/cozy dreams/IMG_1436.png', productId: '14' },
    { name: 'Daisy', image: '/Product shades/daisy/IMG_1470.png', productId: '15' },
    { name: 'Georgia', image: '/Product shades/georgia/IMG_1297 (1).png', productId: '16' },
    { name: 'Gold Honey', image: '/Product shades/gold honey/IMG_1417 (1).png', productId: '17' },
    { name: 'Heaven', image: '/Product shades/heaven/IMG_1463.png', productId: '18' },
    { name: 'Libre', image: '/Product shades/libre/IMG_1420 (1).png', productId: '19' },
    { name: 'Lover', image: '/Product shades/lover/IMG_1451.png', productId: '20' },
    { name: 'Pearl', image: '/Product shades/pearl/IMG_0436 (1).png', productId: '21' },
    { name: 'Pecan', image: '/Product shades/pecan/IMG_1446.png', productId: '22' },
    { name: 'Rosewood', image: '/Product shades/rosewood/IMG_1448.png', productId: '23' },
    { name: 'Shimmery Chestnut', image: '/Product shades/shimmery chestnut/IMG_1455.png', productId: '25' },
    { name: 'Sparkle Jam', image: '/Product shades/sparkle jam/IMG_1438.png', productId: '26' },
    { name: 'The Girl', image: '/Product shades/the girl/IMG_1569.png', productId: '27' },
    { name: 'Velvet Cherry', image: '/Product shades/velvet cherry/IMG_1560.png', productId: '28' },
    { name: 'Wood', image: '/Product shades/wood/IMG_1442.png', productId: '29' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-white to-[#ffe9f0] relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Elegant Title */}
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
            19 Beautiful Shades
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase">
            Find Your Shade
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <Sparkles className="w-5 h-5 text-[#d6869d]" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="mt-6 text-base text-gray-500 font-light tracking-wide">
            From subtle nudes to bold statements
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {shades.map((shade, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
            >
              <Link href={`/products/lipgloss?shade=${encodeURIComponent(shade.productId)}`} className="text-center group block">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 ring-2 ring-transparent group-hover:ring-[#d6869d]/30">
                  <Image src={shade.image} alt={shade.name} width={96} height={96} className="object-cover w-full h-full" />
                </div>
                <p className="text-xs font-light tracking-wide text-gray-600 group-hover:text-[#d6869d] transition-colors duration-300">{shade.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/products?category=Lipgloss" className="group relative inline-block bg-[#d6869d] text-white px-14 py-4 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium transition-all duration-700 shadow-lg hover:shadow-[0_10px_40px_rgba(214,134,157,0.3)] hover:-translate-y-0.5 rounded-full overflow-hidden">
            <span className="relative z-10">VIEW ALL SHADES</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
