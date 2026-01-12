'use client';

import Link from 'next/link';

type Props = {
  subtotal: number;
};

export default function OrderSummary({ subtotal }: Props) {
  return (
    <div className="bg-white rounded-3xl border-2 border-[#ffe9f0] p-6 sm:p-8 shadow-xl lg:sticky lg:top-28">
      <h2 className="text-xl font-medium tracking-wide mb-6 text-[#d6869d]">ORDER SUMMARY</h2>
      <div className="space-y-4 mb-6 pb-6 border-b border-[#ffe9f0]">
        <div className="flex justify-between text-sm font-light">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-[#d6869d] font-medium">{subtotal.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between text-sm font-light">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-600">Calculated at checkout</span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-medium mb-8">
        <span className="text-gray-800">Total</span>
        <span className="text-[#d6869d]">{subtotal.toFixed(2)} EGP</span>
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
  );
}
