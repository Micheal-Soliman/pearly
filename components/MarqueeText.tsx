'use client';

import { motion } from 'framer-motion';

const marqueeTexts = [
  '✦ Pearly Glow',
  '✧ Cruelty Free',
  '✦ Vegan Beauty',
  '✧ Made with Love',
  '✦ Premium Quality',
  '✧ Long Lasting',
  '✦ Hydrating Formula',
  '✧ Egyptian Brand',
];

export default function MarqueeText() {
  return (
    <div className="w-full bg-[#d6869d] py-3 overflow-hidden">
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {[...marqueeTexts, ...marqueeTexts, ...marqueeTexts, ...marqueeTexts].map((text, index) => (
            <span
              key={index}
              className="mx-8 text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-light"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
