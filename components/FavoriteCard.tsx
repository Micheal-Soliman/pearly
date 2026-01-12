'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  isNew?: boolean;
  rating?: number | string;
};

type Props = {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
};

export default function FavoriteCard({ product, onRemove, onAddToCart }: Props) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
    >
      <div className="relative h-72 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-[#d6869d] transition-colors duration-200 shadow-md"
          aria-label="Remove from favorites"
        >
          <Heart className="w-5 h-5 fill-current text-[#d6869d]" />
        </button>
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#d6869d] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            New Arrival
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">{product.price} EGP</span>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
              <span className="text-xs text-white font-medium">{product.rating || '4.8'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-medium text-gray-900 mb-1.5 line-clamp-1">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        )}
        <button
          id={`add-to-cart-${product.id}`}
          onClick={onAddToCart}
          className="w-full bg-[#d6869d] hover:bg-[#c5758c] text-white text-sm font-medium py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center group/button"
        >
          <ShoppingBag className="w-4 h-4 mr-2 group-hover/button:animate-bounce" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
