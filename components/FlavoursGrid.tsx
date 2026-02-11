'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FlavoursGrid() {
  const flavours = [
    { name: 'Bubble Gum', image: '/lipgloss-blossom-1.jpg', productId: '10' },
    { name: 'Coffee', image: '/lipgloss-chestnut-1.jpg', productId: '11' },
    { name: 'Vanilla', image: '/lipgloss-gold-honey-1.jpg', productId: '17' },
    { name: 'Coconut', image: '/lipgloss-clear-1.jpg', productId: '13' },
    { name: 'Mixed Berries', image: '/lipgloss-cozy-dream-1.jpg', productId: '14' },
    { name: 'Strawberry', image: '/lipgloss-lover-1.jpg', productId: '20' },
    { name: 'Watermelon', image: '/lipgloss-velvet-cherry-1.jpg', productId: '28' },
    { name: 'Cheesecake', image: '/lipgloss-sandstone-1.jpg', productId: '24' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#ffe9f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase mb-4">
            <span className="text-[#d6869d]"> Choose Your Flavour </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">Delicious scents that make you smile</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {flavours.map((flavour, idx) => (
            <Link key={idx} href={`/products/lipgloss?shade=${encodeURIComponent(flavour.productId)}`} className="group text-center">
              <div className="relative w-full aspect-square mb-4 bg-white rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-black transition-colors">
                <Image src={flavour.image} alt={flavour.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-sm font-light tracking-wide">{flavour.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
