import { Instagram, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-dancing)' }}>Pearly 💕</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              ✨ Luxury beauty for your everyday life
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">🛍️ SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Lipgloss"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  Lipgloss
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Bundles"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Eyebrow Wax"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  Eyebrow Wax
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">💼 COMPANY</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 font-light hover:text-pink-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">💕 CONNECT</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-400 hover:to-rose-400 hover:text-white hover:border-pink-400 transition-all shadow-sm hover:shadow-lg"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-400 hover:to-rose-400 hover:text-white hover:border-pink-400 transition-all shadow-sm hover:shadow-lg"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@pearly.com"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-400 hover:to-rose-400 hover:text-white hover:border-pink-400 transition-all shadow-sm hover:shadow-lg"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-pink-600 font-medium">
              💳 Cash on Delivery Available
            </p>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-8">
          <p className="text-center text-xs text-gray-500 font-light tracking-wide">
            © 2024 PEARLY. ALL RIGHTS RESERVED. Made with 💕
          </p>
        </div>
      </div>
    </footer>
  );
}
