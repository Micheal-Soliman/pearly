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
  const lipglossProducts = products.filter((p) => p.category === 'Lipgloss').slice(0, 4);
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
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-8 sm:pb-12 md:pb-0 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 min-h-screen flex items-center">
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
                  src="/hero.png"
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

      {/* Categories Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Explore our curated collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Bundles */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link
                href="/products?category=Bundles"
                className="block group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 md:h-80">
                  <Image
                    src="/double-gloss.jpg"
                    alt="Bundles"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl">Bundles</h3>
                  <p className="text-sm sm:text-base text-white drop-shadow-lg">Special combo deals</p>
                </div>
              </Link>
            </motion.div>

            {/* Lipgloss */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link
                href="/products?category=Lipgloss"
                className="block group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 md:h-80">
                  <Image
                    src="/lipgloss-clear-1.jpg"
                    alt="Lipgloss"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl">Lipgloss</h3>
                  <p className="text-sm sm:text-base text-white drop-shadow-lg">Shine & hydration</p>
                </div>
              </Link>
            </motion.div>

            {/* Eyebrow Wax */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link
                href="/products?category=Eyebrow Wax"
                className="block group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 md:h-80">
                  <Image
                    src="/eyebrow-wax-1.jpg"
                    alt="Eyebrow Wax"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl">Eyebrow Wax</h3>
                  <p className="text-sm sm:text-base text-white drop-shadow-lg">Perfect brows</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
        <Image
          src="/all products2.png"
          alt="Pearly Products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
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
              Lipgloss Collection
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Shine, hydrate, and glow with our luxury lipgloss range
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
            {lipglossProducts.map((product: any, index: number) => (
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
                          e.stopPropagation();
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
              href="/products?category=Lipgloss"
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 hover-glow animate-pulse-soft"
            >
              View All Lipgloss
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              Best Sellers 🔥
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Our customers' favorite picks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bundle - Double Gloss */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/products/7" className="block">
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    #1 Best Seller
                  </div>
                  <div className="relative h-64 mb-4 rounded-2xl overflow-hidden">
                    <Image
                      src="/double-gloss.jpg"
                      alt="Double Gloss"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Double Gloss Bundle</h3>
                  <p className="text-gray-600 text-sm mb-3">2 Full-Size Lipgloss of your choice</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">335 EGP</span>
                    <span className="text-sm text-gray-500">⭐ 4.9/5</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Lipgloss - Clear */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/products/1" className="block">
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    #2 Best Seller
                  </div>
                  <div className="relative h-64 mb-4 rounded-2xl overflow-hidden">
                    <Image
                      src="/lipgloss-clear-1.jpg"
                      alt="Clear Lipgloss"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Lipgloss</h3>
                  <p className="text-gray-600 text-sm mb-3">Natural shine & hydration</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">From 180 EGP</span>
                    <span className="text-sm text-gray-500">⭐ 4.8/5</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Triple Gloss Bundle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href="/products/8" className="block">
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-rose-50 to-purple-50 p-6">
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    #3 Best Seller
                  </div>
                  <div className="relative h-64 mb-4 rounded-2xl overflow-hidden">
                    <Image
                      src="/triple-gloss.jpg"
                      alt="Triple Gloss"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Triple Gloss Bundle</h3>
                  <p className="text-gray-600 text-sm mb-3">3 Full-Size Lipgloss of your choice</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">470 EGP</span>
                    <span className="text-sm text-gray-500">⭐ 5.0/5</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              Loved by Thousands 💕
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Discover why our customers choose Pearly for their beauty routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "The best lipgloss I've ever used! The shine is natural and the scent is absolutely divine. Pearly has become my go-to brand for all things beauty. 🩷"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  S
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Sara Ahmed</p>
                  <p className="text-sm text-pink-600 font-semibold">✓ Verified Buyer</p>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "The bundle deal is absolutely amazing! I saved so much and all the shades are gorgeous. Fast delivery and beautiful packaging. Highly recommend! ✨"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  N
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Nour Hassan</p>
                  <p className="text-sm text-pink-600 font-semibold">✓ Verified Buyer</p>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Exceptional quality at an incredible price! The lipgloss lasts all day and keeps my lips hydrated. This is luxury beauty made accessible. 💄"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  M
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Mona Ali</p>
                  <p className="text-sm text-pink-600 font-semibold">✓ Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              Why Choose Pearly? 💎
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Your beauty, our promise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fast Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Delivery to all governorates in 2-3 business days. Track your order every step of the way! 🚚
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Payment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cash on Delivery - 100% safe and secure. Pay only when you receive your order! 💳
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-purple-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Luxury Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully selected products to ensure the highest quality. Your satisfaction is guaranteed! ✨
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              #PearlyGlow 📸
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6">
              Share your Pearly moments with us on Instagram
            </p>
            <a
              href="https://instagram.com/pearly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              Follow @Pearly
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white/50" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 gradient-text-animate">
              How to Use 📖
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Get the most out of your Pearly products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                1
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prep Your Lips</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Start with clean, moisturized lips for the best application and longest-lasting shine.
                </p>
                <div className="w-full h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white/50" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                2
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Apply Evenly</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Use the applicator to glide the gloss smoothly across your lips from center to edges.
                </p>
                <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center">
                  <Heart className="w-16 h-16 text-white/50" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                3
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-8 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy the Glow</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Reapply throughout the day for continuous shine and hydration. Perfect for any occasion!
                </p>
                <div className="w-full h-40 bg-gradient-to-br from-rose-200 to-purple-200 rounded-2xl flex items-center justify-center">
                  <Star className="w-16 h-16 text-white/50" />
                </div>
              </div>
            </motion.div>
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
