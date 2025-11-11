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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-block text-sm tracking-widest uppercase mb-8 hover:underline"
          >
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <div className="relative h-[500px] lg:h-[700px] bg-gray-50">
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
                      className={`relative h-28 bg-gray-50 ${
                        selectedImage === idx ? 'ring-2 ring-black' : ''
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
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                  {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-6">
                  {product.name}
                </h1>
                <p className="text-3xl font-light">
                  {getCurrentPrice()} EGP
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-8">
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.category === 'Lipgloss' && (
                <div>
                  <p className="text-sm tracking-wide mb-4">SELECT TYPE</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedType('squeez')}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedType === 'squeez'
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      <p className="font-medium">Squeez</p>
                      <p className="text-sm opacity-80">180 EGP</p>
                    </button>
                    <button
                      onClick={() => setSelectedType('big-brush')}
                      className={`p-4 border-2 text-left transition-all ${
                        selectedType === 'big-brush'
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      <p className="font-medium">Big Brush</p>
                      <p className="text-sm opacity-80">200 EGP</p>
                    </button>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm tracking-wide mb-4">QUANTITY</p>
                <div className="flex items-center border border-gray-300 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-light">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full bg-black text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-3 disabled:bg-gray-400"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      ADD TO CART
                    </>
                  )}
                </button>

                <button
                  onClick={toggleFavorite}
                  className="w-full border-2 border-gray-300 px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:border-black transition-colors duration-300 flex items-center justify-center gap-3"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id) ? 'fill-black' : ''
                    }`}
                  />
                  {isFavorite(product.id) ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
                </button>
              </div>

              <div className="border-t border-gray-200 pt-8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="font-light">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <span className="font-light">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <h2 className="text-3xl font-light tracking-wide mb-12 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <div className="group">
                      <div className="relative h-[300px] sm:h-[400px] mb-4 overflow-hidden bg-gray-50">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-base font-light tracking-wide mb-2">
                        {relatedProduct.name.toLowerCase()}
                      </h3>
                      <p className="text-sm text-gray-600 font-light">
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
