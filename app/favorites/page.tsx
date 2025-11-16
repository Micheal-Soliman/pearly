'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Heart, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (product: any) => {
    if (product.category === 'Lipgloss') {
      setSelectedProduct(product);
      setSelectedType('squeez');
      setShowModal(true);
    } else {
      addToCart(product);
      // Show added to cart feedback
      const button = document.getElementById(`add-to-cart-${product.id}`);
      if (button) {
        button.textContent = 'Added!';
        setTimeout(() => {
          button.textContent = 'Add to Cart';
        }, 1500);
      }
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        selectedType,
      };
      addToCart(productToAdd);
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="h-12 bg-gray-100 rounded-full w-1/3 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-100 rounded w-1/2 mx-auto mb-12"></div>
          </div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 bg-gradient-to-b from-white to-[#fff9fb]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-6 text-gray-900">
              Your Favorites
            </h1>
            <div className="w-24 h-1 bg-[#d6869d]/30 mx-auto mb-8"></div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-50 max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#fff5f8] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#d6869d]" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-light text-gray-800 mb-3">Your wishlist is empty</h2>
              <p className="text-gray-500 font-light mb-8">
                Looks like you haven't added any products to your favorites yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#d6869d] hover:bg-[#c5758c] text-white px-8 py-3.5 text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-300 group"
              >
                <span>Discover Our Collection</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#fff9fb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
              Your Favorites
            </h1>
            <div className="w-24 h-1 bg-[#d6869d]/30 mx-auto mb-6"></div>
            <p className="text-gray-500 font-light">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {favorites.map((product) => (
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
                      onClick={() => removeFromFavorites(product.id)}
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
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
                        {product.description}
                      </p>
                    )}
                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#d6869d] hover:bg-[#c5758c] text-white text-sm font-medium py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center group/button"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2 group-hover/button:animate-bounce" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />

      {/* Size Selection Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Select Option</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div 
                  className="flex items-center p-4 border rounded-xl hover:border-[#d6869d] transition-colors cursor-pointer"
                  onClick={() => setSelectedType('squeez')}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-[#d6869d] flex-shrink-0 flex items-center justify-center mr-3">
                    {selectedType === 'squeez' && <div className="w-2 h-2 bg-[#d6869d] rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Squeeze Tube</span>
                      <span className="text-[#d6869d] font-medium">
                        <span className="line-through mr-2 opacity-70">205 EGP</span>
                        <span className="font-semibold">180 EGP</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Standard size, perfect for on-the-go</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-center p-4 border rounded-xl hover:border-[#d6869d] transition-colors cursor-pointer"
                  onClick={() => setSelectedType('big-brush')}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-[#d6869d] flex-shrink-0 flex items-center justify-center mr-3">
                    {selectedType === 'big-brush' && <div className="w-2 h-2 bg-[#d6869d] rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Big Brush</span>
                      <span className="text-[#d6869d] font-medium">
                        <span className="line-through mr-2 opacity-70">280 EGP</span>
                        <span className="font-semibold">250 EGP</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Larger size with precision applicator</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={confirmAddToCart}
                className="w-full bg-[#d6869d] hover:bg-[#c5758c] text-white font-medium py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart - {selectedType === 'big-brush' ? 250 : selectedProduct.price} EGP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
