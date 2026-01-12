'use client';

import Image from 'next/image';

type Props = {
  image: string;
  title: string;
};

export default function BannerHero({ image, title }: Props) {
  return (
    <section className="relative w-full h-[60vh] mt-20 sm:mt-24">
      <Image src={image} alt={title} fill className="object-cover object-[50%_center] md:object-[70%_center]" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-widest text-white">
          <span> {title} </span>
        </h1>
      </div>
    </section>
  );
}
