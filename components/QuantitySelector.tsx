'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Minus, Plus } from 'lucide-react';

type Props = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export default function QuantitySelector({ quantity, setQuantity }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
      <p className="text-sm tracking-wide mb-4 text-[#d6869d] font-medium">QUANTITY</p>
      <div className="flex items-center border-2 border-[#ffe9f0] rounded-full overflow-hidden w-fit">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-12 h-12 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-16 text-center font-medium text-[#d6869d]">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-12 h-12 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
