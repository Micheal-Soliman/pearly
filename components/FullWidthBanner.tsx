'use client';

import Image from 'next/image';

export default function FullWidthBanner() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
      <Image src="/all products2.png" alt="Pearly Collection" fill className="object-cover" />
    </section>
  );
}
