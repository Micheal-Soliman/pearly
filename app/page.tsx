'use client';

import { Sparkles, ShoppingBag, Truck, Shield, Heart, Star, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const featuredProducts = products.filter((p) => p.featured);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');

  const handleAddToCart = (product: any) => {
    if (product.category === 'Lipgloss') {
      setSelectedProduct(product);
      setSelectedType('squeez');
      setShowModal(true);
    } else {
      addToCart(product);
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        selectedType,
        price: selectedType === 'big-brush' ? 250 : 180
      };
      addToCart(productToAdd);
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-8 sm:pb-12 md:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-xl border border-pink-200">
                <Sparkles className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-pink-500 animate-sparkle" />
                <span className="text-xs sm:text-xs md:text-sm font-bold text-gray-800">
                  New Collection 2024
                </span>
              </div>
              
              {/* Main Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                    Discover Your
                  </span>
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                    Pearly Glow 🩷
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-700 leading-relaxed px-2 sm:px-0">
                Luxury beauty products crafted with love for the modern woman who deserves to shine ✨
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-sm sm:text-base md:text-lg hover-glow flex-1 sm:flex-initial"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="bg-white text-gray-800 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-pink-300 text-sm sm:text-base md:text-lg hover-glow flex-1 sm:flex-initial"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-6 lg:mt-0"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/welcome.jpg"
                  alt="Pearly Collection"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent"></div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-40 blur-2xl animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section with Slogan */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-us.jpg"
                  alt="The Pearly Shop"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent"></div>
              </div>
              {/* Floating hearts decoration */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-float shadow-xl">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '1s'}}>
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                <span className="text-xs sm:text-sm font-semibold text-pink-600">Our Story</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Beauty Begins with <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">Self-Love</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed px-2 sm:px-0">
                At The Pearly Shop, we believe <strong className="text-pink-600">beauty begins with self-love</strong>. Our mission is to empower every woman to shine confidently through high-quality, affordable beauty products that reflect her unique style.
              </p>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed px-2 sm:px-0">
                We promise products made with care, so you always look and feel your best.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-glow"
                >
                  Learn More About Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl"></div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-shadow animate-fadeInUp hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Delivery to all governorates in 2-3 business days
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow animate-fadeInUp hover-lift" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '0.5s'}}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                Cash on Delivery - 100% safe and secure
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 hover:shadow-lg transition-shadow animate-fadeInUp hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '1s'}}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Luxury Quality
              </h3>
              <p className="text-gray-600">
                Carefully selected products to ensure the highest quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              Featured Products
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Discover our latest luxury additions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover-lift h-full flex flex-col"
              >
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.nameAr}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isFavorite(product.id)) {
                          removeFromFavorites(product.id);
                        } else {
                          addToFavorites({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                          });
                        }
                      }}
                      className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                        isFavorite(product.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs text-pink-500 font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl font-bold text-pink-600 whitespace-nowrap">
                        {product.category === 'Lipgloss' ? 'From ' : ''}{product.price} EGP
                      </span>
                      {product.category === 'Lipgloss' && (
                        <span className="text-xs text-gray-500 whitespace-nowrap">Multiple options</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 hover-glow animate-pulse-soft"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Lipgloss Options */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Option</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.name}</p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedType('squeez')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedType === 'squeez'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Squeez</p>
                    <p className="text-sm text-gray-600">8 ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">180 EGP</p>
                    <p className="text-xs text-gray-400 line-through">205 EGP</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedType('big-brush')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedType === 'big-brush'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Big Brush</p>
                    <p className="text-sm text-gray-600">6 ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">250 EGP</p>
                    <p className="text-xs text-gray-400 line-through">280 EGP</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={confirmAddToCart}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
