'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

type Product = any;

type Props = {
  products: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, product: Product) => void;
  handleAddToCart: (product: Product) => void;
};

export default function BundlesSection({ products, isFavorite, toggleFavorite, handleAddToCart }: Props) {
  const hrefQuery = { category: 'Bundles', page: '1' };
  const noopEvent = { preventDefault: () => {}, stopPropagation: () => {} } as any;

  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Bundles </span>
          </h2>
          <p className="text-lg text-[#d6869d] font-medium mb-2">save more, shine brighter</p>
          <p className="text-sm text-gray-600 font-light md:hidden">Swipe to see all bundles</p>
        </div>

        <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {products
            .filter((p) => p.category === 'Bundles')
            .sort((a, b) => {
              if (a.originalPrice && !b.originalPrice) return -1;
              if (!a.originalPrice && b.originalPrice) return 1;
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex-none w-[80vw] sm:w-[45vw] md:w-auto snap-center"
              >
                <ProductCard
                  product={product}
                  isFavorite={isFavorite}
                  onToggleFavorite={(p) => toggleFavorite(noopEvent, p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                  hrefQuery={hrefQuery}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
