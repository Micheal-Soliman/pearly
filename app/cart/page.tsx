'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CartItemRow from '@/components/CartItemRow';
import OrderSummary from '@/components/OrderSummary';

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
      
      <div className="pt-32 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-widest mb-12 text-center">
            <span className="text-[#d6869d]"> YOUR CART </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <CartItemRow
                  key={`${item.id}-${item.selectedType || ''}`}
                  item={item as any}
                  onRemove={removeFromCart}
                  onUpdateQty={updateQuantity}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <OrderSummary subtotal={totalPrice} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#ffe9f0]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">Total</p>
            <p className="text-lg font-semibold text-[#d6869d]">{totalPrice.toFixed(2)} EGP</p>
          </div>
          <Link
            href="/checkout"
            className="flex-1 text-center bg-[#d6869d] text-white px-5 py-3 rounded-full text-xs tracking-[0.3em] uppercase font-medium shadow-lg hover:shadow-xl hover:opacity-90"
          >
            Checkout
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
