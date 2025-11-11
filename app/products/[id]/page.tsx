'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Minus, Plus, Check } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-wide mb-6">Product Not Found</h1>
          <Link href="/products" className="text-sm tracking-widest uppercase hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = product.category === 'Lipgloss' 
      ? { ...product, selectedType, price: selectedType === 'big-brush' ? 200 : 180 }
      : product;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getCurrentPrice = () => {
    if (product.category === 'Lipgloss') {
      return selectedType === 'big-brush' ? 200 : 180;
    }
    return product.price;
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-8 text-pink-600 hover:text-pink-700 transition-colors font-medium"
          >
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <div className="relative h-[500px] lg:h-[700px] bg-gradient-to-br from-white to-pink-50 rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-100">
                {images[selectedImage].toLowerCase().endsWith('.mov') || 
                 images[selectedImage].toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={images[selectedImage]}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-28 bg-gradient-to-br from-white to-pink-50 rounded-2xl overflow-hidden transition-all duration-300 ${
                        selectedImage === idx ? 'ring-4 ring-pink-400 shadow-lg scale-105' : 'ring-2 ring-pink-100 hover:ring-pink-300'
                      }`}
                    >
                      {img.toLowerCase().endsWith('.mov') || img.toLowerCase().endsWith('.mp4') ? (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                            <span className="text-xs">Video</span>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg">
                <p className="text-xs tracking-widest uppercase text-pink-500 font-medium mb-3 flex items-center gap-2">
                  ✨ {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-6 text-gray-800">
                  {product.name}
                </h1>
                <p className="text-4xl font-medium bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {getCurrentPrice()} EGP
                </p>
                {product.bestSeller && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                    ⭐ Best Seller
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg">
                <h3 className="text-sm tracking-widest uppercase text-pink-600 font-medium mb-4">💕 Description</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.category === 'Lipgloss' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg">
                  <p className="text-sm tracking-wide mb-4 text-pink-600 font-medium">✨ SELECT TYPE</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedType('squeez')}
                      className={`p-4 border-2 text-left transition-all rounded-2xl ${
                        selectedType === 'squeez'
                          ? 'border-pink-400 bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg scale-105'
                          : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                      }`}
                    >
                      <p className="font-medium">Squeez</p>
                      <p className="text-sm opacity-80">180 EGP</p>
                    </button>
                    <button
                      onClick={() => setSelectedType('big-brush')}
                      className={`p-4 border-2 text-left transition-all rounded-2xl ${
                        selectedType === 'big-brush'
                          ? 'border-pink-400 bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg scale-105'
                          : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                      }`}
                    >
                      <p className="font-medium">Big Brush</p>
                      <p className="text-sm opacity-80">200 EGP</p>
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg">
                <p className="text-sm tracking-wide mb-4 text-pink-600 font-medium">🔢 QUANTITY</p>
                <div className="flex items-center border-2 border-pink-200 rounded-full overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-pink-50 transition-colors text-pink-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium text-pink-600">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-pink-50 transition-colors text-pink-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:from-pink-500 hover:to-rose-500 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      ✨ ADDED TO CART ✨
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      🛍️ ADD TO CART
                    </>
                  )}
                </button>

                <button
                  onClick={toggleFavorite}
                  className="w-full border-2 border-pink-300 text-pink-600 px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id) ? 'fill-pink-500 text-pink-500' : ''
                    }`}
                  />
                  {isFavorite(product.id) ? '💔 REMOVE FROM FAVORITES' : '💕 ADD TO FAVORITES'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 font-medium">🏷️ Category</span>
                  <span className="font-medium text-gray-800">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 font-medium">📦 Availability</span>
                  <span className={`font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide mb-12 text-center">
              <span className="inline-block">💖</span>
              <span className="text-gradient-pearly"> You May Also Like </span>
              <span className="inline-block">💖</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <div className="group">
                      <div className="relative h-[300px] sm:h-[400px] mb-4 overflow-hidden bg-gradient-to-br from-white to-pink-50 rounded-3xl border-2 border-pink-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      </div>
                      <h3 className="text-base font-medium tracking-wide mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                        {relatedProduct.name.toLowerCase()}
                      </h3>
                      <p className="text-sm text-pink-600 font-medium">
                        {relatedProduct.price} EGP
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
