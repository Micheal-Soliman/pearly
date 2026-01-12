'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  originalPrice?: number;
};

type Props = {
  show: boolean;
  offer: Product | null;
  onClose: () => void;
};

export default function PromoOfferModal({ show, offer, onClose }: Props) {
  if (!show || !offer) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[120] p-4 transition-all duration-500">
      <div className="bg-white w-full max-w-2xl rounded-[1.5rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-all">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full text-gray-400 hover:text-black transition-all shadow-md group">
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-[450px] overflow-hidden">
            <Image src={offer.image} alt={offer.name} fill className="object-cover hover:scale-110 transition-transform duration-[2000ms]" />
            <div className="absolute top-4 left-4 bg-black text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] font-bold">
              Exclusive Deal
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gray-50/50">
            <span className="text-[#d6869d] text-xs font-bold uppercase tracking-[0.3em] mb-2 block">Limited Time Offer</span>
            <h2 className="text-3xl font-serif text-gray-900 mb-3 leading-tight italic">{offer.name}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{offer.description}</p>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-3xl font-light text-gray-900">
                {offer.price} <span className="text-sm font-medium">EGP</span>
              </span>
              {offer.originalPrice && (
                <span className="text-gray-400 line-through text-lg decoration-[#d6869d]/50">{offer.originalPrice} EGP</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Link href={`/products/${offer.id}`} className="w-full bg-[#d6869d] text-white py-4 text-[11px] tracking-[0.25em] uppercase font-bold text-center rounded-lg shadow-lg shadow-[#d6869d]/20 hover:shadow-[#d6869d]/40 hover:-translate-y-0.5 transition-all duration-300" onClick={onClose}>
                Claim This Offer
              </Link>
              <button onClick={onClose} className="w-full text-gray-400 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold hover:text-gray-800 transition-colors">
                No thanks, I'll pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
