'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Star, Check, Shield, Truck, RefreshCw, Gift } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[60vh] mt-20 sm:mt-24">
        <Image
          src="/about-us.jpg"
          alt="About Pearly"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-widest text-white">
            <span> ABOUT US </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image on left - shown first on mobile, then left on desktop */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 h-96 lg:h-[500px] relative rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/about-us.jpg"
                alt="Our Story"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text content on right */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-center lg:text-left">
                <span className="text-[#d6869d]"> our story </span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  At Pearly, we believe beauty begins with self-love. Our mission is to empower every woman 
                  to shine confidently through high-quality, affordable beauty products that reflect her unique style.
                </p>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  Founded with passion and dedication, we carefully curate each product to ensure it meets 
                  our standards of luxury and excellence. From our signature lipgloss collection to our 
                  premium beauty bundles, every item is designed to make you feel special.
                </p>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  We're committed to providing an exceptional beauty experience that celebrates individuality 
                  and helps you express your true self with confidence and joy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6">
                <span className="text-[#d6869d] relative">
                  our core values
                  <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#d6869d]/30"></span>
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Guiding principles that shape everything we do at Pearly Beauty
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Quality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-50 overflow-hidden"
            >
              <div className="absolute top-6 right-6 w-24 h-24 bg-[#fde8ef] rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#d6869d] rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
                <Award className="w-9 h-9 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Uncompromising Quality</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Every product in our collection undergoes rigorous testing to meet our high standards. We source only the finest ingredients and materials, ensuring each item delivers exceptional performance and longevity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Rigorous quality control at every stage</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Premium, skin-loving ingredients</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Dermatologist-tested formulas</span>
                </li>
              </ul>
            </motion.div>

            {/* Self-Love */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-50 overflow-hidden"
            >
              <div className="absolute top-6 right-6 w-24 h-24 bg-[#fde8ef] rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#d6869d] rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
                <Heart className="w-9 h-9 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Celebrating Self-Love</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                We believe beauty begins with self-acceptance. Our products are designed to enhance your natural beauty and help you feel confident in your own skin, because true radiance comes from within.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Products that enhance natural beauty</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Inclusive shade ranges for all skin tones</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Mindful beauty rituals for self-care</span>
                </li>
              </ul>
            </motion.div>

            {/* Accessibility */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-50 overflow-hidden"
            >
              <div className="absolute top-6 right-6 w-24 h-24 bg-[#fde8ef] rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#d6869d] rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
                <Sparkles className="w-9 h-9 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Luxury for All</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                We're committed to making premium beauty accessible without compromise. By cutting out middlemen and focusing on direct-to-consumer, we deliver exceptional quality at honest prices.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Affordable luxury without markups</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Flexible payment options available</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Worldwide shipping with local pricing</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-[#fff9fb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900">
              Experience the <span className="text-[#d6869d]">Pearly</span> Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of satisfied customers who have discovered their perfect beauty match with our thoughtfully curated collection.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#d6869d] hover:bg-[#c5758c] text-white px-10 py-4 text-sm tracking-wider uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Discover Your Perfect Shade
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
