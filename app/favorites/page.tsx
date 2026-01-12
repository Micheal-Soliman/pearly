'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FavoritesEmptyState from '@/components/FavoritesEmptyState';
import FavoriteCard from '@/components/FavoriteCard';
import LipglossOptionModal from '@/components/LipglossOptionModal';

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
    return <FavoritesEmptyState />;
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
                <FavoriteCard
                  key={product.id}
                  product={product as any}
                  onRemove={() => removeFromFavorites(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />

      {/* Size Selection Modal */}
      <LipglossOptionModal
        show={showModal && !!selectedProduct}
        onClose={() => setShowModal(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        priceSqueez={selectedProduct ? selectedProduct.price : 180}
        priceBigBrush={250}
        onConfirm={confirmAddToCart}
      />
    </div>
  );
}
