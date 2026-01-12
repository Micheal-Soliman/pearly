'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';

export default function FavoritesEmptyState() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 bg-gradient-to-b from-white to-[#fff9fb]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-6 text-gray-900">
            Your Favorites
          </h1>
          <div className="w-24 h-1 bg-[#d6869d]/30 mx-auto mb-8"></div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-50 max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#fff5f8] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-[#d6869d]" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-light text-gray-800 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 font-light mb-8">
              Looks like you haven't added any products to your favorites yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#d6869d] hover:bg-[#c5758c] text-white px-8 py-3.5 text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-300 group"
            >
              <span>Discover Our Collection</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
