import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-rose-50 border-t border-pink-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Pearly Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                Pearly
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Your luxury destination for elegant beauty products
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-pink-500 hover:text-pink-600 transition-colors hover:scale-110 transform duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-600 transition-colors hover:scale-110 transform duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-600 transition-colors hover:scale-110 transform duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Payment & Security</h3>
            <p className="text-gray-600 text-sm mb-4">
              We accept Cash on Delivery across Egypt
            </p>
            <div className="bg-white rounded-lg p-4 border border-pink-200">
              <p className="text-pink-600 font-semibold text-sm">
                💳 Cash on Delivery
              </p>
              <p className="text-gray-500 text-xs mt-1">Safe & Secure</p>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> in
            Egypt © 2024 Pearly
          </p>
        </div>
      </div>
    </footer>
  );
}
