'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  onSelect: (name: string) => void;
};

export default function ClientMomentsGallery({ onSelect }: Props) {
  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Client Moments </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">capturing beautiful moments with pearly</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'IMG-20251110-WA0025.jpg',
            'IMG-20251110-WA0042.jpg',
            'IMG-20251110-WA0097.jpg',
            'IMG-20251110-WA0099.jpg',
          ].map((name) => (
            <div
              key={name}
              onClick={() => onSelect(name)}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square rounded-2xl"
            >
              <Image
                src={`/Clients moments with pearly/${name}`}
                alt="Client Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
