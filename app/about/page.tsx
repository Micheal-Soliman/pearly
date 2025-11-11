'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

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
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-widest text-white">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
              our story
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              At Pearly, we believe beauty begins with self-love. Our mission is to empower every woman 
              to shine confidently through high-quality, affordable beauty products that reflect her unique style.
            </p>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Founded with passion and dedication, we carefully curate each product to ensure it meets 
              our standards of luxury and excellence. From our signature lipgloss collection to our 
              premium beauty bundles, every item is designed to make you feel special.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
              our values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 border-2 border-black rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Quality</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We never compromise on quality. Every product is carefully selected and tested.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 border-2 border-black rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">💕</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Self-Love</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We believe beauty starts from within. Our products help you express your inner glow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 border-2 border-black rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-light tracking-wide">Accessibility</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Luxury beauty should be accessible to everyone. We offer premium products at fair prices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-8">
            ready to shine?
          </h2>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-16 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
