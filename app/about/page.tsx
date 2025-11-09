import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Heart, Sparkles, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-gray-700 text-xl">
            Discover the Pearly Story
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Content with Image */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="/about-us.jpg"
                alt="The Pearly Shop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent"></div>
            </div>

            {/* Text Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full mb-4">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  <span className="text-sm font-semibold text-pink-600">Our Story</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to The Pearly Shop
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At The Pearly Shop, we believe <strong className="text-pink-600">beauty begins with self-love</strong>. Our mission is to empower every woman to shine confidently through high-quality, affordable beauty products that reflect her unique style.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We promise products made with care, so you always look and feel your best.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-gray-600 text-lg">
            What makes us special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Luxury Quality
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every product is carefully selected to ensure the highest standards of quality and elegance
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Trust & Safety
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cash on delivery for your peace of mind and security
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Made with Love
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We're here to support you every step of your beauty journey
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-3xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
              "Beauty begins with self-love"
            </blockquote>
            <p className="text-lg text-gray-700">
              - The Pearly Shop Promise
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
