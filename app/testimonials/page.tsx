'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const feedbacks = [
  'IMG-20251110-WA0018.jpg',
  'IMG-20251110-WA0021.jpg',
  'IMG-20251110-WA0027.jpg',
  'IMG-20251110-WA0028.jpg',
  'IMG-20251110-WA0029.jpg',
  'IMG-20251110-WA0030.jpg',
  'IMG-20251110-WA0032.jpg',
  'IMG-20251110-WA0034.jpg',
  'IMG-20251110-WA0036.jpg',
  'IMG-20251110-WA0038.jpg',
  'IMG-20251110-WA0043.jpg',
  'IMG-20251110-WA0044.jpg',
  'IMG-20251110-WA0045.jpg',
  'IMG-20251110-WA0046.jpg',
  'IMG-20251110-WA0047.jpg',
  'IMG-20251110-WA0049.jpg',
  'IMG-20251110-WA0052.jpg',
  'IMG-20251110-WA0053.jpg',
  'IMG-20251110-WA0055.jpg',
  'IMG-20251110-WA0056.jpg',
  'IMG-20251110-WA0057.jpg',
  'IMG-20251110-WA0058.jpg',
  'IMG-20251110-WA0059.jpg',
  'IMG-20251110-WA0060.jpg',
  'IMG-20251110-WA0062.jpg',
  'IMG-20251110-WA0063.jpg',
  'IMG-20251110-WA0064.jpg',
  'IMG-20251110-WA0065.jpg',
  'IMG-20251110-WA0067.jpg',
  'IMG-20251110-WA0068.jpg',
  'IMG-20251110-WA0070.jpg',
  'IMG-20251110-WA0071.jpg',
  'IMG-20251110-WA0072.jpg',
  'IMG-20251110-WA0073.jpg',
  'IMG-20251110-WA0074.jpg',
  'IMG-20251110-WA0075.jpg',
  'IMG-20251110-WA0076.jpg',
  'IMG-20251110-WA0077.jpg',
  'IMG-20251110-WA0080.jpg',
  'IMG-20251110-WA0083.jpg',
  'IMG-20251110-WA0085.jpg',
  'IMG-20251110-WA0086.jpg',
  'IMG-20251110-WA0088.jpg',
  'IMG-20251110-WA0089.jpg',
  'IMG-20251110-WA0092.jpg',
  'IMG-20251110-WA0094.jpg',
  'IMG_20251110_022228.jpg',
];

export default function TestimonialsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/lipgloss-clear-1.jpg"
          alt="Customer Reviews"
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
            Customer Reviews
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl font-light tracking-wide"
          >
            See what our customers are saying
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
              Real Feedback From Real Customers
            </h2>
            <p className="text-lg text-gray-600 font-light">
              {feedbacks.length}+ happy customers and counting
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => {
                  console.log('Clicked:', feedback);
                  setSelectedImage(feedback);
                }}
                className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl"
              >
                <div className="relative h-[400px]">
                  <Image
                    src={`/Pearly feedbacks/${feedback}`}
                    alt={`Customer Feedback ${index + 1}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 font-light mb-8">
              Join thousands of satisfied customers
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
                src={`/Pearly feedbacks/${selectedImage}`}
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
