'use client';

import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-3 rounded-full mb-6">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            <span className="text-sm font-semibold text-pink-600">Your Favorites</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
              My Favorites 💖
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-white rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <Heart className="w-24 h-24 text-pink-200 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
              <p className="text-gray-600 mb-8">
                Start adding products to your favorites by clicking the ❤️ icon
              </p>
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <Link href={`/products/${product.id}`} className="block relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-pink-500 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-pink-600">{product.price} EGP</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="bg-red-50 text-red-500 px-4 py-3 rounded-xl hover:bg-red-100 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-pink-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
