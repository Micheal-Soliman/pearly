'use client';

import Image from 'next/image';
import { getUnitPrice } from '@/lib/pricing';
import { products } from '@/data/products';

type CartItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  selectedType?: 'big-brush' | 'squeez';
  bundleShades?: string[];
  bundleSteps?: { label: string; labelAr?: string }[];
};

type Props = {
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  city?: string;
};

export default function CheckoutSummary({ cart, subtotal, deliveryFee, city }: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#ffe9f0]">
      <h2 className="text-xl sm:text-2xl font-medium tracking-wide mb-8">
        <span className="text-[#d6869d]"> order summary</span>
      </h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedType || ''}`} className="flex gap-4 pb-6 border-b border-[#ffe9f0] last:border-0">
            <div className="relative w-20 h-20 flex-shrink-0 bg-[#ffe9f0] rounded-2xl overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium tracking-wide mb-1 text-gray-800">
                {item.category === 'Bundles' ? item.name.split(' (')[0] : item.name}
              </h3>
              {item.selectedType && (
                <p className="text-xs text-[#d6869d] font-medium">{item.selectedType === 'squeez' ? 'Squeez' : 'Big Brush'}</p>
              )}
              {item.category === 'Bundles' && Array.isArray(item.bundleSteps) && item.bundleSteps.length > 0 && (
                <div className="mt-2 space-y-1">
                  {(() => {
                    const steps = item.bundleSteps || [];
                    const bundleShades = Array.isArray(item.bundleShades) ? item.bundleShades : [];
                    const stepLabelForIndex = (idx: number) => {
                      const raw = steps[idx]?.label || 'Shade';
                      const totalSame = steps.filter((s: any) => (s.label || 'Shade') === raw).length;
                      if (totalSame <= 1) return raw;
                      const nth = steps.slice(0, idx + 1).filter((s: any) => (s.label || 'Shade') === raw).length;
                      return `${raw} ${nth}`;
                    };

                    return steps.map((_, idx) => {
                      const sid = bundleShades[idx];
                      const shadeName = sid ? (products.find((p) => p.id === sid)?.name?.replace('Lipgloss - ', '') || sid) : undefined;
                      return (
                        <div key={idx} className="flex items-center justify-between gap-3">
                          <span className="text-xs text-[#d6869d] font-medium">{stepLabelForIndex(idx)}</span>
                          <span className={`text-xs font-medium ${shadeName ? 'text-gray-800' : 'text-gray-500'}`}>
                            {shadeName || 'Not selected'}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600 font-light">Qty: {item.quantity}</p>
                <p className="text-sm font-light">
                  {(getUnitPrice(item) * item.quantity).toFixed(2)} EGP
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-4 pt-6">
          <div className="flex justify-between text-sm font-light">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-[#d6869d] font-medium">{subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-sm font-light">
            <span className="text-gray-600">Shipping {city && `(${city})`}</span>
            <span className="text-[#d6869d] font-medium">{deliveryFee.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-lg font-medium pt-4 border-t border-[#ffe9f0]">
            <span className="text-gray-800">Total</span>
            <span id="checkout-order-total" data-meta="order-total" className="text-[#d6869d]">{(subtotal + deliveryFee).toFixed(2)} EGP</span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#ffe9f0] bg-[#ffe9f0] rounded-2xl p-4">
          <p className="text-sm text-[#d6869d] font-medium text-center">Payment Method: Cash on Delivery</p>
        </div>
      </div>
    </div>
  );
}
