'use client';

import Link from 'next/link';

export default function ShadesPalette() {
  const shades = [
    { name: 'Clear', color: 'bg-white border-2 border-gray-300', productId: '15' },
    { name: 'Nude', color: 'bg-[#E8C4A8]', productId: '19' },
    { name: 'Pink', color: 'bg-[#FFB6C1]', productId: '10' },
    { name: 'Rose', color: 'bg-[#FF69B4]', productId: '27' },
    { name: 'Red', color: 'bg-[#DC143C]', productId: '28' },
    { name: 'Brown', color: 'bg-[#8B4513]', productId: '29' },
    { name: 'Coral', color: 'bg-[#FF7F50]', productId: '12' },
    { name: 'Berry', color: 'bg-[#8B008B]', productId: '26' },
    { name: 'Sparkle', color: 'bg-[#D18A7C]', productId: '14' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase mb-4">Find Your Shade</h2>
          <p className="text-lg text-gray-600 font-light">From subtle nudes to bold statements</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {shades.map((shade, idx) => (
            <Link key={idx} href={`/products/${shade.productId}`} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${shade.color} group-hover:scale-110 transition-transform shadow-lg`}></div>
              <p className="text-xs font-light tracking-wide">{shade.name}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products?category=Lipgloss" className="inline-block bg-[#d6869d] text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 rounded-full">
            VIEW ALL SHADES
          </Link>
        </div>
      </div>
    </section>
  );
}
