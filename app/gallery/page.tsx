'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const clientMoments = [
  'IMG-20251110-WA0025.jpg',
  'IMG-20251110-WA0042.jpg',
  'IMG-20251110-WA0097.jpg',
  'IMG-20251110-WA0099.jpg',
  'IMG-20251110-WA0101.jpg',
  'IMG-20251110-WA0102.jpg',
  'IMG-20251110-WA0105.jpg',
  'IMG-20251111-WA0036.jpg',
  'IMG-20251111-WA0047.jpg',
  'IMG_20251110_023455.jpg',
  'IMG_20251110_024520_232.jpg',
  'IMG_20251110_024546_374.jpg',
  'IMG_20251110_024846.jpg',
  'IMG_20251110_024909.jpg',
  'IMG_20251110_024932.jpg',
  'IMG_20251110_025014.jpg',
  'IMG_20251110_025117.jpg',
  'IMG_20251110_025146.jpg',
  'IMG_20251110_025217.jpg',
  'IMG_20251110_025323.jpg',
  'Screenshot_2025-11-10-02-31-50-33_1c337646f29875672b5a61192b9010f9.jpg',
  'Screenshot_2025-11-10-02-40-46-13_1c337646f29875672b5a61192b9010f9.jpg',
  'Screenshot_2025-11-10-02-41-58-58_1c337646f29875672b5a61192b9010f9.jpg',
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/lipgloss-clear-1.jpg"
          alt="Client Gallery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest uppercase mb-4"
          >
            Client Moments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl font-light tracking-wide"
          >
            Beautiful moments captured with Pearly
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
              Our Happy Clients
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {clientMoments.length} beautiful moments and counting
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {clientMoments.map((moment, index) => (
              <motion.div
                key={moment}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
                onClick={() => {
                  console.log('Clicked:', moment);
                  setSelectedImage(moment);
                }}
                className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square"
              >
                <Image
                  src={`/Clients moments with pearly/${moment}`}
                  alt={`Client Moment ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 font-light mb-8">
              Want to be featured? Tag us on social media!
            </p>
            <a
              href="/products"
              className="inline-block bg-black text-white px-16 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
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
                src={`/Clients moments with pearly/${selectedImage}`}
                alt="Client Moment"
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
