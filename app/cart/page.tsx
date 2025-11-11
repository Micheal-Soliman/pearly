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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-light tracking-widest mb-6">YOUR CART</h1>
            <p className="text-gray-600 font-light mb-12">Your cart is currently empty</p>
            <Link
              href="/products"
              className="inline-block bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300"
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
          <h1 className="text-4xl sm:text-5xl font-light tracking-widest mb-12 text-center">YOUR CART</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedType || ''}`} className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100">
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
                          <h3 className="text-base font-light tracking-wide">{item.name}</h3>
                          {item.selectedType && (
                            <p className="text-sm text-gray-500 font-light mt-1">
                              {item.selectedType === 'squeez' ? 'Squeez' : 'Big Brush'}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 font-light">
                        {item.selectedType === 'big-brush' ? 200 : item.price} EGP
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm font-light">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-light">
                        {((item.selectedType === 'big-brush' ? 200 : item.price) * item.quantity).toFixed(2)} EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-8">
                <h2 className="text-xl font-light tracking-wide mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm font-light">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-light mb-8">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} EGP</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-black text-white text-center px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300 mb-4"
                >
                  CHECKOUT
                </Link>

                <Link
                  href="/products"
                  className="block w-full border-2 border-gray-300 text-gray-700 text-center px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:border-black transition-colors duration-300"
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
