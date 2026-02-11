'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { getLipglossVariantPricing, getUnitPrice } from '@/lib/pricing';
import { products } from '@/data/products';
import { getShadeDisplayName, getStepLabelForIndex } from '@/lib/bundles';

type CartItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  selectedType?: string;
  quantity: number;
  price: number;
  bundleShades?: string[];
  bundleSteps?: { label: string }[];
};

type Props = {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
};

export default function CartItemRow({ item, onRemove, onUpdateQty }: Props) {
  const unitPrice = getUnitPrice(item);
  const total = (unitPrice * item.quantity).toFixed(2);
  const lipglossPricing = item.category === 'Lipgloss' ? getLipglossVariantPricing(item.selectedType) : null;
  const isBundle = item.category === 'Bundles' && Array.isArray(item.bundleSteps) && item.bundleSteps.length > 0;
  const bundleSteps = isBundle ? (item.bundleSteps || []) : [];
  const bundleShades = Array.isArray(item.bundleShades) ? item.bundleShades : [];
  const baseName = item.category === 'Bundles' ? item.name.split(' (')[0] : item.name;

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-stretch gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-3xl shadow-lg border-2 border-[#ffe9f0] hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-40 sm:w-32 sm:h-32 flex-shrink-0 bg-[#ffe9f0] rounded-2xl overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="relative flex items-start mb-2">
            <div>
              <h3 className="text-base font-medium tracking-wide text-gray-800">{baseName}</h3>
              {item.selectedType && (
                <p className="text-sm text-[#d6869d] font-medium mt-1">
                  {item.selectedType === 'squeez' || item.selectedType === 'squeez-mini' ? 'Squeez' : 'Big Brush'}
                </p>
              )}
              {isBundle && (
                <div className="mt-2 space-y-1">
                  {bundleSteps.map((_, idx) => {
                    const sid = bundleShades[idx];
                    const shadeName = sid ? getShadeDisplayName(products, sid) : undefined;
                    return (
                      <div key={idx} className="flex items-center justify-between gap-3">
                        <span className="text-xs text-[#d6869d] font-medium">{getStepLabelForIndex(bundleSteps, idx)}</span>
                        <span className={`text-xs font-medium ${shadeName ? 'text-gray-800' : 'text-gray-500'}`}>
                          {shadeName || 'Not selected'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button onClick={() => onRemove(item.id)} className="absolute top-0 right-0 text-gray-400 hover:text-pink-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          {item.category === 'Lipgloss' ? (
            <div className="text-sm font-medium">
              <span className="text-pink-600">{unitPrice} EGP</span>
              {lipglossPricing && (
                <span className="line-through text-gray-400 ml-2">{lipglossPricing.originalPrice} EGP</span>
              )}
            </div>
          ) : (
            <p className="text-sm text-pink-600 font-medium">{item.price} EGP</p>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 sm:mt-2 justify-between sm:justify-start w-full">
          <div className="flex items-center border-2 border-pink-200 rounded-full overflow-hidden">
            <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-medium text-[#d6869d]">{item.quantity}</span>
            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 ml-auto sm:ml-0">{total} EGP</p>
        </div>
      </div>
    </div>
  );
}
