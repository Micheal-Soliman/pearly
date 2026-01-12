'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  images: string[];
  selectedImage: number;
  setSelectedImage: Dispatch<SetStateAction<number>>;
};

export default function ProductMediaGallery({ images, selectedImage, setSelectedImage }: Props) {
  return (
    <div className="space-y-4">
      <div className="relative h-[500px] lg:h-[700px] bg-[#ffe9f0] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ffe9f0]">
        {images[selectedImage].toLowerCase().endsWith('.mov') || images[selectedImage].toLowerCase().endsWith('.mp4') ? (
          <video
            src={images[selectedImage]}
            controls
            autoPlay
            loop
            muted
            className="w-full h-full object-contain"
          />
        ) : (
          <Image src={images[selectedImage]} alt={String(selectedImage)} fill className="object-cover" />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative h-28 bg-[#ffe9f0] rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedImage === idx ? 'ring-4 ring-[#d6869d] shadow-lg scale-105' : 'ring-2 ring-[#ffe9f0] hover:ring-[#d6869d]'
              }`}
            >
              {img.toLowerCase().endsWith('.mov') || img.toLowerCase().endsWith('.mp4') ? (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <span className="text-xs">Video</span>
                  </div>
                </div>
              ) : (
                <Image src={img} alt={String(idx)} fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
