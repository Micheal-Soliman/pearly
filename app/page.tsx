'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

export default function Home() {
  const { addToCart } = useCart();
  const lipglossProducts = products.filter((p) => p.category === 'Lipgloss').slice(0, 4);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Full Screen */}
      <section className="relative w-full h-screen mt-20 sm:mt-24">
        <Image
          src="/hero.png"
          alt="Pearly"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-widest mb-6"
            >
              PEARLY
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-light tracking-widest uppercase mb-10"
            >
              Luxury beauty for your everyday life
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/products"
                className="inline-block bg-white text-black px-16 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-100 transition-all duration-300"
              >
                SHOP NOW
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Category - Lipgloss */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] lg:h-[700px]"
            >
              <Image
                src="/lipgloss-clear-1.jpg"
                alt="Lipgloss Collection"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase">
                The Lipgloss
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                because your lips deserve the perfect shine
              </p>
              <Link
                href="/products?category=Lipgloss"
                className="inline-block border-2 border-black px-12 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                SHOP LIPGLOSS
              </Link>
            </motion.div>
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
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Bundles
            </h2>
            <p className="text-lg text-gray-600 font-light">
              save more, shine brighter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.category === 'Bundles').map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-[400px] sm:h-[500px] mb-4 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-light tracking-wide mb-2">{product.name.toLowerCase()}</h3>
                  <p className="text-sm text-gray-600 font-light">{product.price} EGP</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-12 sm:py-16 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 font-light">
              discover our best picks
            </p>
          </div>

          <div className="relative">
            {/* Left Arrow - Premium Design */}
            <button
              onClick={scrollLeft}
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 group/arrow"
              aria-label="Scroll left"
            >
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-14 h-14 rounded-full border-2 border-black/20 group-hover/arrow:border-black transition-all duration-300 flex items-center justify-center">
                  {/* Inner Circle */}
                  <div className="w-12 h-12 rounded-full bg-white shadow-xl group-hover/arrow:bg-black transition-all duration-300 flex items-center justify-center">
                    <ChevronLeft className="w-6 h-6 text-black group-hover/arrow:text-white transition-colors duration-300" />
                  </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-black/5 blur-xl opacity-0 group-hover/arrow:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>

            {/* Right Arrow - Premium Design */}
            <button
              onClick={scrollRight}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 group/arrow"
              aria-label="Scroll right"
            >
              <div className="relative">
                {/* Outer Ring */}
                <div className="w-14 h-14 rounded-full border-2 border-black/20 group-hover/arrow:border-black transition-all duration-300 flex items-center justify-center">
                  {/* Inner Circle */}
                  <div className="w-12 h-12 rounded-full bg-white shadow-xl group-hover/arrow:bg-black transition-all duration-300 flex items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-black group-hover/arrow:text-white transition-colors duration-300" />
                  </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-black/5 blur-xl opacity-0 group-hover/arrow:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>

            {/* Slider with Perspective Effect */}
            <div 
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth px-4"
            >
              {products.filter(p => p.category === 'Lipgloss').slice(0, 8).map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  className="flex-none w-[280px] sm:w-[320px] snap-start group/card"
                >
                  <div className="relative">
                    {/* Card Container with 3D Effect */}
                    <div className="relative h-[380px] sm:h-[420px] mb-5 overflow-hidden bg-white shadow-xl group-hover/card:shadow-2xl transition-all duration-500 transform group-hover/card:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-sm font-light">
                          {product.price} EGP
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-5 bg-white">
                        <h3 className="text-base font-light tracking-wide mb-2 line-clamp-2 group-hover/card:text-gray-600 transition-colors">
                          {product.name.toLowerCase()}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs tracking-widest uppercase text-gray-400">
                            Lipgloss
                          </span>
                          <span className="text-xs tracking-widest uppercase text-black opacity-0 group-hover/card:opacity-100 transition-opacity">
                            View →
                          </span>
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-black opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products?category=Lipgloss"
              className="inline-block bg-black text-white px-16 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              View All Lipgloss
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lipgloss Category */}
            <Link href="/products?category=Lipgloss" className="group relative h-[500px] overflow-hidden">
              <Image
                src="/lipgloss-clear-1.jpg"
                alt="Lipgloss"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest">LIPGLOSS</h3>
              </div>
            </Link>

            {/* Eyebrow Wax Category */}
            <Link href="/products?category=Eyebrow" className="group relative h-[500px] overflow-hidden">
              <Image
                src="/eyebrow-wax-1.jpg"
                alt="Eyebrow Wax"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-4xl sm:text-5xl font-light tracking-widest">EYEBROW</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Minimalist */}
      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Loved By Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-700 font-light italic mb-4">
                "The best lipgloss I've ever used. Natural shine and divine scent."
              </p>
              <p className="text-sm text-gray-500 font-light">— Sara A.</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-700 font-light italic mb-4">
                "Amazing bundle deal! Fast delivery and beautiful packaging."
              </p>
              <p className="text-sm text-gray-500 font-light">— Nour H.</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <span className="text-yellow-400 text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-700 font-light italic mb-4">
                "Exceptional quality at an incredible price. Lasts all day!"
              </p>
              <p className="text-sm text-gray-500 font-light">— Mona A.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flavours Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Choose Your Flavour
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Delicious scents that make you smile
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'Bubble Gum', image: '/lipgloss-blossom-1.jpg', productId: '10' },
              { name: 'Coffee', image: '/lipgloss-chestnut-1.jpg', productId: '11' },
              { name: 'Vanilla', image: '/lipgloss-heaven-1.jpg', productId: '12' },
              { name: 'Coconut', image: '/lipgloss-cozydream-1.jpg', productId: '13' },
              { name: 'Mixed Berries', image: '/lipgloss-libre-1.jpg', productId: '14' },
              { name: 'Strawberry', image: '/lipgloss-georgia-1.jpg', productId: '20' },
              { name: 'Watermelon', image: '/lipgloss-daisy-1.jpg', productId: '28' },
              { name: 'Cheesecake', image: '/lipgloss-gold-honey-1.jpg', productId: '24' },
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
      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">
              Save More With Bundles
            </h2>
            <p className="text-lg text-gray-600 font-light">
              The more you buy, the more you save
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200 hover:border-black transition-colors">
              <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">SINGLE</p>
              <p className="text-4xl font-light mb-2">180 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">Per lipgloss</p>
              <Link href="/products?category=Lipgloss" className="inline-block border-2 border-gray-300 px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:border-black transition-colors">
                SHOP NOW
              </Link>
            </div>

            <div className="text-center p-8 border-2 border-black bg-gray-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs tracking-widest uppercase">
                SAVE 25 EGP
              </div>
              <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">DOUBLE</p>
              <p className="text-4xl font-light mb-2">335 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">2 lipgloss of your choice</p>
              <Link href="/products/7" className="inline-block bg-black text-white px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors">
                SHOP NOW
              </Link>
            </div>

            <div className="text-center p-8 border border-gray-200 hover:border-black transition-colors">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs tracking-widest uppercase">
                SAVE 40 EGP
              </div>
              <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">TRIPLE</p>
              <p className="text-4xl font-light mb-2">500 EGP</p>
              <p className="text-sm text-gray-600 font-light mb-6">3 lipgloss of your choice</p>
              <Link href="/products/8" className="inline-block border-2 border-gray-300 px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:border-black transition-colors">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
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
              { name: 'Nude', color: 'bg-[#E8C4A8]', image: '/lipgloss-gold-honey-1.jpg', productId: '24' },
              { name: 'Pink', color: 'bg-[#FFB6C1]', image: '/lipgloss-blossom-1.jpg', productId: '10' },
              { name: 'Rose', color: 'bg-[#FF69B4]', image: '/lipgloss-georgia-1.jpg', productId: '20' },
              { name: 'Red', color: 'bg-[#DC143C]', image: '/lipgloss-libre-1.jpg', productId: '14' },
              { name: 'Brown', color: 'bg-[#8B4513]', image: '/lipgloss-chestnut-1.jpg', productId: '11' },
              { name: 'Coral', color: 'bg-[#FF7F50]', image: '/lipgloss-daisy-1.jpg', productId: '28' },
              { name: 'Berry', color: 'bg-[#8B008B]', image: '/lipgloss-cinnamon-1.jpg', productId: '16' },
            ].map((shade, idx) => (
              <Link key={idx} href={`/products/${shade.productId}`} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${shade.color} group-hover:scale-110 transition-transform shadow-lg`}></div>
                <p className="text-xs font-light tracking-wide">{shade.name}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products?category=Lipgloss" className="inline-block bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors">
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
                className={`w-full p-4 border-2 transition-all ${
                  selectedType === 'squeez'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium">Squeez</p>
                  <p className="text-sm opacity-80">180 EGP</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedType('big-brush')}
                className={`w-full p-4 border-2 transition-all ${
                  selectedType === 'big-brush'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium">Big Brush</p>
                  <p className="text-sm opacity-80">200 EGP</p>
                </div>
              </button>
            </div>

            <button
              onClick={confirmAddToCart}
              className="w-full bg-black text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              ADD TO CART
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
