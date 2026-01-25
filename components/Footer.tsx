'use client';

import { usePathname } from 'next/navigation';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  const hideFloatingWhatsApp = pathname === '/cart' || pathname === '/checkout';

  return (
    <footer className="bg-[#ffe9f0] relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d6869d]/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-amsterdam text-[#d6869d] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-normal mb-6">
              Pearly
            </h3>
            <p className="text-m mt-8 text-gray-600 font-light leading-relaxed">
              Luxury beauty for your everyday life
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">SHOP</h4>
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
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">COMPANY</h4>
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
            <h4 className="text-xs tracking-widest uppercase mb-4 text-pink-600 font-medium">CONNECT</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/the_pearly_shop?igsh=MWZuNnZoNWJmdzhrOQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-[#d6869d] hover:text-white hover:border-[#d6869d] transition-all shadow-sm hover:shadow-lg"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/p/The-Pearly-Shop-61555966954784/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-[#d6869d] hover:text-white hover:border-[#d6869d] transition-all shadow-sm hover:shadow-lg"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {/* <a
                href="mailto:info@pearly.com"
                className="w-10 h-10 border-2 border-pink-200 rounded-full flex items-center justify-center hover:bg-[#d6869d] hover:text-white hover:border-[#d6869d] transition-all shadow-sm hover:shadow-lg"
              >
                <Mail className="w-4 h-4" />
              </a> */}
            </div>
            <div className="mt-2">
              <a
                href="https://wa.me/201288144869"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#d6869d] transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 text-[#d6869d]" />
                <span className="font-medium">01288144869</span>
              </a>
            </div>
            <p className="text-xs text-pink-600 font-medium">
              💳 Cash on Delivery Available
            </p>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-8">
          <p className="text-center text-xs text-gray-500 font-light tracking-wide">
            © 2025 PEARLY. ALL RIGHTS RESERVED. Made with MS Developments
          </p>
        </div>
      </div>
      {/* Floating WhatsApp Icon (site-wide) */}
      {!hideFloatingWhatsApp && (
        <a
          href="https://wa.me/201288144869"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-4 z-50 bg-[#d6869d] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-2xl active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
      )}
    </footer>
  );
}
