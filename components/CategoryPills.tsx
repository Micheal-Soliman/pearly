'use client';

import { motion } from 'framer-motion';

type Category = { name: string };

type Props = {
  categories: Category[];
  selectedCategory: string;
  onSelect: (name: string) => void;
};

export default function CategoryPills({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 relative z-10">
      {categories.map((cat, index) => (
        <motion.button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-3.5 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full shadow-sm ${
            selectedCategory === cat.name
              ? 'bg-[#d6869d] text-white shadow-[0_8px_30px_rgba(214,134,157,0.4)]'
              : 'border-2 border-[#ffd3df] text-[#d6869d] bg-white hover:border-[#d6869d] hover:bg-[#ffe9f0] hover:shadow-md'
          }`}
        >
          {selectedCategory === cat.name && (
            <span className="inline-block mr-2 text-white/80">✦</span>
          )}
          {cat.name}
          {selectedCategory === cat.name && (
            <span className="inline-block ml-2 text-white/80">✦</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
