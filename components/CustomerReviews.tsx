'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  onSelect: (imageName: string) => void;
};

export default function CustomerReviews({ onSelect }: Props) {
  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      {/* Elegant borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      
      {/* Subtle decorative dots */}
      <div className="absolute top-16 right-[10%] w-2 h-2 rounded-full bg-[#d6869d]/20"></div>
      <div className="absolute top-24 left-[15%] w-1.5 h-1.5 rounded-full bg-[#d6869d]/25"></div>
      
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
            Testimonials
            <span className="inline-block mx-3">✦</span>
          </motion.span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] uppercase mb-4">
            <span className="text-[#d6869d]">What Our Customers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6869d]/40"></span>
            <span className="text-[#d6869d] text-sm">✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6869d]/40"></span>
          </div>
          <p className="text-base text-gray-500 font-light tracking-wide mb-2">Real reviews from real customers</p>
          <p className="text-sm text-gray-400 font-light tracking-wide md:hidden">Swipe to see more reviews</p>
        </motion.div>

        <div className="md:grid md:grid-cols-3 md:gap-8 flex md:flex-none overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {[
            'IMG-20251110-WA0029.jpg',
            'IMG-20251110-WA0030.jpg',
            'IMG-20251110-WA0027.jpg',
          ].map((name) => (
            <div
              key={name}
              onClick={() => onSelect(name)}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl flex-none w-[85vw] md:w-auto snap-center"
            >
              <div className="relative h-[400px]">
                <Image src={`/Pearly feedbacks/${name}`} alt="Customer Feedback" fill className="object-contain pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
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
          <a
            href="/testimonials"
            className="group relative inline-block bg-[#d6869d] text-white px-14 py-4 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium transition-all duration-700 shadow-lg hover:shadow-[0_10px_40px_rgba(214,134,157,0.3)] hover:-translate-y-0.5 rounded-full overflow-hidden"
          >
            <span className="relative z-10">View All Reviews</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
