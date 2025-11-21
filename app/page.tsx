'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Heart } from 'lucide-react';

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const lipglossProducts = products.filter((p) => p.category === 'Lipgloss').slice(0, 4);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

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
      };
      addToCart(productToAdd);
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Full Screen */}
      <section className="relative w-full h-screen mt-20 sm:mt-24">
        <Image
          src="/All Products Upp.jpg"
          alt="Pearly"
          fill
          className="object-cover object-[45%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 text-[#d6869d] text-4xl animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 text-[#d6869d] text-3xl animate-sparkle opacity-30"></div>
        <div className="absolute bottom-32 left-20 text-[#d6869d] text-5xl animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 text-[#d6869d] text-3xl animate-sparkle opacity-30" style={{ animationDelay: '0.5s' }}></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-amsterdam text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal mb-6"
            >
              Pearly
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed tracking-wide mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] max-w-2xl md:max-w-3xl mx-auto"
            >
              Discover your pearly glow
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/products"
                className="inline-block bg-[#d6869d] text-white px-16 py-4 text-xs tracking-[0.3em] font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:opacity-90 rounded-full glow-pink"
              >
                Shop now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title - Mobile Only */}
          <div className="text-center mb-8 md:hidden">
            <h2 className="text-xl sm:text-2xl font-light tracking-widest uppercase">
              <span className="text-[#d6869d]"> Shop By Category</span>
            </h2>
            <p className="text-sm text-gray-600 font-light mt-2">
              Swipe to explore our collections
            </p>
          </div>

          {/* Mobile: Horizontal Slider, Desktop: Grid */}
          <div className="md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {/* Lipgloss Category */}
            <Link href="/products?category=Lipgloss" className="group relative h-[400px] md:h-[500px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-3xl border-4 border-[#ffe9f0] md:border-transparent md:hover:border-[#d6869d] transition-all duration-300 shadow-xl hover:shadow-2xl snap-center">
              <Image
                src="/lipgloss-clear-1.jpg"
                alt="Lipgloss"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/50 via-black/20 to-black/20 md:from-[#d6869d]/40 md:group-hover:from-[#d6869d]/60 md:group-hover:via-[#d6869d]/30 transition-all duration-300"></div>

              {/* Decorative Elements - Always visible on mobile */}
              <div className="absolute top-6 right-6 text-white text-3xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 animate-sparkle"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest mb-4 group-hover:scale-110 transition-transform duration-300">LIPGLOSS</h3>

                {/* Always visible on mobile, hover on desktop */}
                <div className="flex items-center gap-2 text-white text-sm tracking-widest uppercase md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner Indicator - Always visible on mobile */}
              <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                View Collection →
              </div>
            </Link>

            {/* Eyebrow Wax Category */}
            <Link href="/products?category=Eyebrow" className="group relative h-[400px] md:h-[500px] flex-none w-[85vw] md:w-auto overflow-hidden rounded-3xl border-4 border-[#ffe9f0] md:border-transparent md:hover:border-[#d6869d] transition-all duration-300 shadow-xl hover:shadow-2xl snap-center">
              <Image
                src="/eyebrow-wax-1.jpg"
                alt="Eyebrow Wax"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/50 via-black/20 to-black/20 md:from-[#d6869d]/40 md:group-hover:from-[#d6869d]/60 md:group-hover:via-[#d6869d]/30 transition-all duration-300"></div>

              {/* Decorative Elements - Always visible on mobile */}
              <div className="absolute top-6 right-6 text-white text-3xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 animate-sparkle"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest mb-4 group-hover:scale-110 transition-transform duration-300">EYEBROW</h3>

                {/* Always visible on mobile, hover on desktop */}
                <div className="flex items-center gap-2 text-white text-sm tracking-widest uppercase md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner Indicator - Always visible on mobile */}
              <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                View Collection →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Moments Gallery */}
      <section className="py-12 sm:py-16 bg-[#ffe9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> Client Moments </span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              capturing beautiful moments with pearly
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0025.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src="/Clients moments with pearly/IMG-20251110-WA0025.jpg"
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0042.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src="/Clients moments with pearly/IMG-20251110-WA0042.jpg"
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0097.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src="/Clients moments with pearly/IMG-20251110-WA0097.jpg"
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0099.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src="/Clients moments with pearly/IMG-20251110-WA0099.jpg"
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Real Feedbacks */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> What Our Customers Say </span>
            </h2>
            <p className="text-lg text-pink-400 font-medium mb-2">
              real reviews from real customers
            </p>
            <p className="text-sm text-gray-600 font-light md:hidden">
              Swipe to see more reviews
            </p>
          </div>

          {/* Mobile: Horizontal Slider, Desktop: Grid */}
          <div className="md:grid md:grid-cols-3 md:gap-8 flex md:flex-none overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0029.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl flex-none w-[85vw] md:w-auto snap-center"
            >
              <div className="relative h-[400px]">
                <Image
                  src="/Pearly feedbacks/IMG-20251110-WA0029.jpg"
                  alt="Customer Feedback"
                  fill
                  className="object-contain pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0030.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl flex-none w-[85vw] md:w-auto snap-center"
            >
              <div className="relative h-[400px]">
                <Image
                  src="/Pearly feedbacks/IMG-20251110-WA0030.jpg"
                  alt="Customer Feedback"
                  fill
                  className="object-contain pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
            <div
              onClick={() => setSelectedFeedback('IMG-20251110-WA0027.jpg')}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl flex-none w-[85vw] md:w-auto snap-center"
            >
              <div className="relative h-[400px]">
                <Image
                  src="/Pearly feedbacks/IMG-20251110-WA0027.jpg"
                  alt="Customer Feedback"
                  fill
                  className="object-contain pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>


      {/* Full Width Banner */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
        <Image
          src="/all products2.png"
          alt="Pearly Collection"
          fill
          className="object-cover"
        />
      </section>

      {/* Product Grid - Bundles */}
      <section className="py-12 sm:py-16 bg-[#ffe9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> Bundles </span>
            </h2>
            <p className="text-lg text-[#d6869d] font-medium mb-2">
              save more, shine brighter
            </p>
            <p className="text-sm text-gray-600 font-light md:hidden">
              Swipe to see all bundles
            </p>
          </div>

          {/* Mobile: Horizontal Slider, Desktop: Grid */}
          <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 md:gap-8 flex md:flex-none overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {products.filter(p => p.category === 'Bundles').map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex-none w-[80vw] sm:w-[45vw] md:w-auto snap-center"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-[380px] md:h-[400px] lg:h-[500px] mb-5 overflow-hidden rounded-3xl bg-[#ffe9f0] border-2 border-[#ffe9f0] shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Decorative Elements */}
                    <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle z-10"></div>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                    />

                    {/* Pink Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                      <button
                        onClick={(e) => toggleFavorite(e, product)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] shadow-lg hover:scale-110"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${isFavorite(product.id)
                            ? 'fill-[#d6869d] text-[#d6869d]'
                            : 'text-gray-700'
                            }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#d6869d] hover:text-white shadow-lg hover:scale-110"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-10">
                      {product.price} EGP
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none glow-pink"></div>
                  </div>

                  <div className="text-center mt-4">
                    <h3 className="text-lg font-light tracking-wide mb-2 text-gray-800 group-hover:text-[#d6869d] transition-colors">{product.name.toLowerCase()}</h3>
                    <p className="text-xs tracking-widest uppercase text-[#d6869d] font-medium">Bundle Deal</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-12 sm:py-16 bg-[#ffe9f0] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-pink-200 text-6xl animate-float"></div>
          <div className="absolute top-20 right-20 text-pink-200 text-5xl animate-sparkle"></div>
          <div className="absolute bottom-20 left-1/4 text-pink-200 text-7xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 right-10 text-pink-200 text-6xl animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> Lipgloss Collection </span>
            </h2>
            <p className="text-lg text-[#d6869d] font-medium mb-2">
              shine bright with our signature glosses
            </p>
            <p className="text-sm text-gray-600 font-light">Swipe to explore all shades</p>
          </div>

          <div className="relative">
            {/* Slider - No Arrows, Just Swipe */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth -mx-4 px-4"
            >
              {products
                .filter(p => p.category === 'Lipgloss')
                .sort((a, b) => {
                  // Best sellers first
                  if (a.bestSeller && !b.bestSeller) return -1;
                  if (!a.bestSeller && b.bestSeller) return 1;
                  return 0;
                })
                .slice(0, 8)
                .map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex-none w-[280px] sm:w-[320px] snap-start group/card"
                  >
                    <div className="relative">
                      {/* Card Container with Feminine Design */}
                      <div className="relative h-[420px] sm:h-[460px] mb-5 overflow-hidden bg-[#d6869d] rounded-3xl shadow-xl group-hover/card:shadow-2xl transition-all duration-500 transform group-hover/card:-translate-y-3 border-2 border-[#d6869d]">

                        {/* Decorative Corner Elements */}
                        <div className="absolute top-2 right-2 text-pink-200 text-2xl animate-sparkle"></div>
                        <div className="absolute bottom-2 left-2 text-pink-200 text-xl animate-float"></div>

                        {/* Image */}
                        <div className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-t-3xl">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                          />

                          {/* Pink Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                          {/* Action Buttons */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                            <button
                              onClick={(e) => toggleFavorite(e, product)}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] shadow-lg hover:scale-110"
                            >
                              <Heart
                                className={`w-5 h-5 transition-colors ${isFavorite(product.id)
                                  ? 'fill-[#d6869d] text-[#d6869d]'
                                  : 'text-gray-700'
                                  }`}
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#d6869d] hover:text-white shadow-lg hover:scale-110"
                            >
                              <ShoppingBag className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Best Seller Badge */}
                          {product.bestSeller && (
                            <div className="absolute top-4 right-4 bg-[#d6869d] text-white px-4 py-2 text-xs font-medium tracking-widest uppercase shadow-lg rounded-full animate-pulse z-10">
                              Best Seller
                            </div>
                          )}

                          {/* Price Badge */}
                          <div className="absolute bottom-4 right-4 bg-[#d6869d] text-white text-[11px] sm:text-sm rounded-full shadow-lg z-10 flex items-center justify-between gap-3 px-3 py-1.5 sm:px-4 sm:py-2">
                            <span className="font-semibold">from {product.price} EGP</span>
                            <span className="line-through opacity-80 text-[10px] sm:text-xs">210 EGP</span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 bg-[#d6869d]">
                          <h3 className="text-lg font-light tracking-wide mb-3 line-clamp-2 text-white group-hover/card:text-white transition-colors">
                            {product.name.toLowerCase()}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs tracking-widest uppercase text-white font-medium">Lipgloss</span>
                            <div className="max-w-[60%] text-right overflow-hidden">
                              <span className="text-sm tracking-wide uppercase text-white/90 font-medium group-hover/card:hidden truncate whitespace-nowrap">View</span>
                              <span className="text-sm tracking-wide uppercase text-white font-semibold hidden group-hover/card:inline truncate whitespace-nowrap">Enjoy</span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none glow-pink"></div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products?category=Lipgloss"
              className="inline-block bg-[#d6869d] text-white px-16 py-5 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:opacity-90 rounded-full"
            >
              View All Lipgloss
            </Link>
          </div>
        </div>
      </section>





      {/* Featured Flavours Section */}
      <section className="py-12 sm:py-16 bg-[#ffe9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> Choose Your Flavour </span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Delicious scents that make you smile
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'Bubble Gum', image: '/lipgloss-blossom-1.jpg', productId: '10' },
              { name: 'Coffee', image: '/lipgloss-chestnut-1.jpg', productId: '11' },
              { name: 'Vanilla', image: '/lipgloss-gold-honey-1.jpg', productId: '17' },
              { name: 'Coconut', image: '/lipgloss-clear-1.jpg', productId: '13' },
              { name: 'Mixed Berries', image: '/lipgloss-cozy-dream-1.jpg', productId: '14' },
              { name: 'Strawberry', image: '/lipgloss-lover-1.jpg', productId: '20' },
              { name: 'Watermelon', image: '/lipgloss-velvet-cherry-1.jpg', productId: '28' },
              { name: 'Cheesecake', image: '/lipgloss-sandstone-1.jpg', productId: '24' },
            ].map((flavour, idx) => (
              <Link key={idx} href={`/products/${flavour.productId}`} className="group text-center">
                <div className="relative w-full aspect-square mb-4 bg-white rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-black transition-colors">
                  <Image
                    src={flavour.image}
                    alt={flavour.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-light tracking-wide">{flavour.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Savings Section */}
      <section className="py-12 sm:py-16 bg-[#ffe9f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
              <span className="text-[#d6869d]"> Save More With Bundles </span>
            </h2>
            <p className="text-lg text-[#d6869d] font-medium">The more you buy, the more you save</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SINGLE */}
            <div className="text-center p-8 rounded-3xl bg-white border-2 border-[#ffe9f0] hover:border-[#d6869d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative group">
              <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle"></div>
              <p className="text-sm tracking-widest uppercase text-[#d6869d] font-medium mb-4">SINGLE</p>
              <p className="text-5xl font-light mb-2 text-gray-800">250 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">Per lipgloss</p>
              <Link href="/products?category=Lipgloss" className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 rounded-full">
                SHOP NOW
              </Link>
            </div>

            {/* DOUBLE - Featured */}
            <div className="text-center p-8 rounded-3xl bg-[#ffe9f0] border-2 border-[#d6869d] relative shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d6869d] text-white px-6 py-2 text-xs tracking-widest uppercase rounded-full shadow-lg animate-pulse">SAVE 20 EGP</div>
              <div className="absolute top-3 right-3 text-pink-200 text-2xl animate-float"></div>
              <p className="text-sm tracking-widest uppercase text-[#d6869d] font-bold mb-4 mt-2">DOUBLE</p>
              <p className="text-5xl font-light mb-2 text-[#d6869d]">480 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">2 lipgloss of your choice</p>
              <Link href="/products/7" className="inline-block bg-[#d6869d] text-white px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:opacity-90">
                SHOP NOW
              </Link>
            </div>

            {/* TRIPLE */}
            <div className="text-center p-8 rounded-3xl bg-white border-2 border-[#ffe9f0] hover:border-[#d6869d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d6869d] text-white px-6 py-2 text-xs tracking-widest uppercase rounded-full shadow-lg">SAVE 50 EGP</div>
              <div className="absolute top-3 right-3 text-pink-200 text-xl animate-sparkle"></div>
              <p className="text-sm tracking-widest uppercase text-[#d6869d] font-medium mb-4 mt-2">TRIPLE</p>
              <p className="text-5xl font-light mb-2 text-gray-800">700 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">3 lipgloss of your choice</p>
              <Link href="/products/8" className="inline-block border-2 border-[#d6869d] text-[#d6869d] px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 rounded-full">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Find Your Shade
            </h2>
            <p className="text-lg text-gray-600 font-light">
              From subtle nudes to bold statements
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              { name: 'Clear', color: 'bg-white border-2 border-gray-300', image: '/lipgloss-clear-1.jpg', productId: '15' },
              { name: 'Nude', color: 'bg-[#E8C4A8]', image: '/lipgloss-gold-honey-1.jpg', productId: '19' },
              { name: 'Pink', color: 'bg-[#FFB6C1]', image: '/lipgloss-blossom-1.jpg', productId: '10' },
              { name: 'Rose', color: 'bg-[#FF69B4]', image: '/lipgloss-georgia-1.jpg', productId: '27' },
              { name: 'Red', color: 'bg-[#DC143C]', image: '/lipgloss-libre-1.jpg', productId: '28' },
              { name: 'Brown', color: 'bg-[#8B4513]', image: '/lipgloss-chestnut-1.jpg', productId: '29' },
              { name: 'Coral', color: 'bg-[#FF7F50]', image: '/lipgloss-daisy-1.jpg', productId: '12' },
              { name: 'Berry', color: 'bg-[#8B008B]', image: '/lipgloss-cinnamon-1.jpg', productId: '26' },
              { name: 'Sparkle', color: 'bg-[#D18A7C]', image: '/lipgloss-cozy-dream-1.jpg', productId: '14' },
            ].map((shade, idx) => (
              <Link key={idx} href={`/products/${shade.productId}`} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${shade.color} group-hover:scale-110 transition-transform shadow-lg`}></div>
                <p className="text-xs font-light tracking-wide">{shade.name}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products?category=Lipgloss" className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full">
              VIEW ALL SHADES
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Lipgloss Options */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-light tracking-wide mb-4">Choose Your Option</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.name}</p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedType('squeez')}
                className={`w-full p-4 border-2 transition-all rounded-lg ${selectedType === 'squeez'
                  ? 'border-pink-400 bg-[#d6869d] text-white'
                  : 'border-gray-300 hover:border-pink-300'
                  }`}
              >
                <div className="text-left">
                  <p className="font-medium">Squeez</p>
                  <p className="text-sm opacity-80">
                    <span className="font-semibold">180 EGP</span>
                    <span className="line-through ml-2 opacity-70">210 EGP</span>
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSelectedType('big-brush')}
                className={`w-full p-4 border-2 transition-all rounded-lg ${selectedType === 'big-brush'
                  ? 'border-pink-400 bg-[#d6869d] text-white'
                  : 'border-gray-300 hover:border-pink-300'
                  }`}
              >
                <div className="text-left">
                  <p className="font-medium">Big Brush</p>
                  <p className="text-sm opacity-80">
                    <span className="font-semibold">250 EGP</span>
                    <span className="line-through ml-2 opacity-70">300 EGP</span>
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={confirmAddToCart}
              className="w-full bg-[#d6869d] text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
            >
              <ShoppingBag className="w-5 h-5" />
              ADD TO CART
            </button>
          </div>
        </div>
      )}

      <div className="pt-12">
        <Footer />
      </div>

      {/* Feedback Lightbox Modal */}
      <AnimatePresence>
        {selectedFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeedback(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101]"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
            >
              <Image
                src={
                  selectedFeedback.startsWith('IMG_') || selectedFeedback.startsWith('Screenshot_') || selectedFeedback.startsWith('VID-')
                    ? `/Clients moments with pearly/${selectedFeedback}`
                    : `/Pearly feedbacks/${selectedFeedback}`
                }
                alt="Customer Feedback"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
