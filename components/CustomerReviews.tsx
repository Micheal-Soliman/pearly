'use client';

import Image from 'next/image';

type Props = {
  onSelect: (imageName: string) => void;
};

export default function CustomerReviews({ onSelect }: Props) {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> What Our Customers Say </span>
          </h2>
          <p className="text-lg text-pink-400 font-medium mb-2">real reviews from real customers</p>
          <p className="text-sm text-gray-600 font-light md:hidden">Swipe to see more reviews</p>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-8 flex md:flex-none overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {[
            'IMG-20251110-WA0029.jpg',
            'IMG-20251110-WA0030.jpg',
            'IMG-20251110-WA0027.jpg',
          ].map((name) => (
            <div
              key={name}
              onClick={() => onSelect(name)}
              className="relative group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl flex-none w-[85vw] md:w-auto snap-center"
            >
              <div className="relative h-[400px]">
                <Image src={`/Pearly feedbacks/${name}`} alt="Customer Feedback" fill className="object-contain pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/testimonials"
            className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full"
          >
            View All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
