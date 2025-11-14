'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#ffe9f0]">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-light tracking-widest mb-6">
              <span className="text-[#d6869d]"> YOUR CART </span>
            </h1>
            <p className="text-gray-600 font-light mb-12">Your cart is currently empty</p>
            <Link
              href="/products"
              className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-widest mb-12 text-center">
            <span className="text-[#d6869d]"> YOUR CART </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedType || ''}`} className="flex gap-6 p-6 bg-white rounded-3xl shadow-lg border-2 border-[#ffe9f0] hover:shadow-xl transition-all duration-300">
                  <div className="relative w-32 h-32 flex-shrink-0 bg-[#ffe9f0] rounded-2xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-medium tracking-wide text-gray-800">{item.name}</h3>
                          {item.selectedType && (
                            <p className="text-sm text-[#d6869d] font-medium mt-1">
                              {item.selectedType === 'squeez' ? 'Squeez' : 'Big Brush'}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-pink-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-pink-600 font-medium">
                        {item.selectedType === 'big-brush' ? 200 : item.price} EGP
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border-2 border-pink-200 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm font-medium text-[#d6869d]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {((item.selectedType === 'big-brush' ? 200 : item.price) * item.quantity).toFixed(2)} EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border-2 border-[#ffe9f0] p-8 shadow-xl">
                <h2 className="text-xl font-medium tracking-wide mb-6 text-[#d6869d]">ORDER SUMMARY</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-[#ffe9f0]">
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-[#d6869d] font-medium">{totalPrice.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-medium mb-8">
                  <span className="text-gray-800">Total</span>
                  <span className="text-[#d6869d]">{totalPrice.toFixed(2)} EGP</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-[#d6869d] text-white text-center px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 mb-4 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
                >
                  CHECKOUT
                </Link>

                <Link
                  href="/products"
                  className="block w-full border-2 border-[#d6869d] text-[#d6869d] text-center px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 rounded-full"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
