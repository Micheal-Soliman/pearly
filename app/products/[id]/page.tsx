'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Star, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-pink-500 hover:text-pink-600">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = product.category === 'Lipgloss' 
      ? { ...product, selectedType, price: selectedType === 'big-brush' ? 250 : 180 }
      : product;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getCurrentPrice = () => {
    if (product.category === 'Lipgloss') {
      return selectedType === 'big-brush' ? 250 : 180;
    }
    return product.price;
  };

  const getOldPrice = () => {
    if (product.category === 'Lipgloss') {
      return selectedType === 'big-brush' ? 280 : 205;
    }
    if (product.id === '9') return 140;
    return null;
  };

  const getFlavour = () => {
    const flavours: { [key: string]: string } = {
      '10': 'Bubble Gum',
      '11': 'Coffee',
      '12': 'Vanilla',
      '13': 'Coconut',
      '14': 'Mixed Berries',
      '15': 'Mixed Berries',
      '16': 'Mixed Berries',
      '17': 'Vanilla',
      '18': 'Bubble Gum',
      '19': 'Mixed Berries',
      '20': 'Strawberry',
      '21': 'Bubble Gum',
      '22': 'Coffee',
      '23': 'Strawberry',
      '24': 'Cheesecake',
      '25': 'Coffee',
      '26': 'Mixed Berries',
      '27': 'Strawberry',
      '28': 'Watermelon',
      '29': 'Coffee',
    };
    return flavours[product.id] || 'Vanilla';
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-pink-500">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-pink-500">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image or Video */}
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-4 bg-gradient-to-br from-pink-50 to-rose-50">
                {product.images[selectedImage].toLowerCase().endsWith('.mov') || 
                 product.images[selectedImage].toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={product.images[selectedImage]}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
                {product.featured && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedImage === index
                          ? 'ring-4 ring-pink-500 shadow-lg scale-105'
                          : 'ring-2 ring-gray-200 hover:ring-pink-300'
                      }`}
                    >
                      {img.toLowerCase().endsWith('.mov') || img.toLowerCase().endsWith('.mp4') ? (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-pink-500 flex items-center justify-center">
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
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-pink-600">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <span className="text-gray-600">(4.9/5 - 127 reviews)</span>
              </div>

              {/* Price & Favorite */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-pink-600">{getCurrentPrice()} EGP</span>
                  {getOldPrice() && (
                    <span className="text-2xl text-gray-400 line-through">{getOldPrice()} EGP</span>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (isFavorite(product.id)) {
                      removeFromFavorites(product.id);
                    } else {
                      addToFavorites({
                        id: product.id,
                        name: product.name,
                        price: getCurrentPrice(),
                        image: product.image,
                        category: product.category,
                      });
                    }
                  }}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    isFavorite(product.id)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-pink-500 border-2 border-pink-500'
                  } hover:scale-110`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Product Details for Eyebrow Wax */}
              {product.id === '9' && (
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Size</p>
                      <p className="text-lg font-bold text-pink-600">20 ml</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Items</p>
                      <p className="text-lg font-bold text-pink-600">2 pieces</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <p className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      Ingredients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Wax', 'Fixative material', 'Aloe vera extract', 'Panthenol', 'Moisturizer'].map((ingredient, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 text-gray-700 rounded-full text-sm border border-pink-200"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details for Lipgloss */}
              {product.category === 'Lipgloss' && (
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Choose Your Type</h3>
                  
                  {/* Big Brush Option */}
                  <button
                    onClick={() => setSelectedType('big-brush')}
                    className={`w-full bg-white rounded-xl p-6 border-2 transition-all ${
                      selectedType === 'big-brush'
                        ? 'border-pink-500 ring-4 ring-pink-200 shadow-lg'
                        : 'border-pink-200 hover:border-pink-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900">Big Brush</h4>
                          {selectedType === 'big-brush' && (
                            <Check className="w-5 h-5 text-pink-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">6 ml</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-pink-600">250 EGP</p>
                        <p className="text-sm text-gray-400 line-through">280 EGP</p>
                      </div>
                    </div>
                  </button>

                  {/* Squeez Option */}
                  <button
                    onClick={() => setSelectedType('squeez')}
                    className={`w-full bg-white rounded-xl p-6 border-2 transition-all ${
                      selectedType === 'squeez'
                        ? 'border-pink-500 ring-4 ring-pink-200 shadow-lg'
                        : 'border-pink-200 hover:border-pink-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900">Squeez</h4>
                          {selectedType === 'squeez' && (
                            <Check className="w-5 h-5 text-pink-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">8 ml</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-pink-600">180 EGP</p>
                        <p className="text-sm text-gray-400 line-through">205 EGP</p>
                      </div>
                    </div>
                  </button>

                  {/* Flavour */}
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Flavour</p>
                    <p className="text-lg font-bold text-pink-600">
                      {getFlavour()} {
                        getFlavour() === 'Bubble Gum' ? '🍬' : 
                        getFlavour() === 'Coffee' ? '☕' : 
                        getFlavour() === 'Coconut' ? '🥥' : 
                        getFlavour() === 'Mixed Berries' ? '🍓' : 
                        getFlavour() === 'Strawberry' ? '🍓' : 
                        getFlavour() === 'Cheesecake' ? '🍰' : 
                        getFlavour() === 'Watermelon' ? '🍉' : 
                        '🍦'
                      }
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div className="bg-white rounded-xl p-6">
                    <p className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      Ingredients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Mineral Oil', 'Ethylene/Propylene/Styrene Copolymer', 'Coconut oil', 'Castor seed oil', 'Vitamin E'].map((ingredient, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 text-gray-700 rounded-full text-sm border border-pink-200"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">In Stock - Ready to Ship</span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Buttons */}
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-pink-100">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                  <Truck className="w-6 h-6 text-pink-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On all orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <Shield className="w-6 h-6 text-pink-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">100% Secure</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-2xl font-bold text-pink-600">
                        {relatedProduct.price} EGP
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
