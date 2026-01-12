'use client';

type Props = {
  category: string;
  name: string;
  currentPrice: number;
  isLipgloss: boolean;
  selectedType: 'big-brush' | 'squeez';
  originalPrice?: number;
  bestSeller?: boolean;
};

export default function ProductHeaderPrice({ category, name, currentPrice, isLipgloss, selectedType, originalPrice, bestSeller }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
      <p className="text-xs tracking-widest uppercase text-[#d6869d] font-medium mb-3 flex items-center gap-2">
        {category}
      </p>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-6 text-gray-800">
        {name}
      </h1>
      <p className="text-4xl font-medium text-[#d6869d] flex items-baseline gap-3">
        <span>{currentPrice} EGP</span>
        {isLipgloss ? (
          <span className="text-2xl line-through text-gray-400">
            {selectedType === 'big-brush' ? '300' : '210'} EGP
          </span>
        ) : originalPrice ? (
          <span className="text-2xl line-through text-gray-400">{originalPrice} EGP</span>
        ) : null}
      </p>
      {bestSeller && (
        <div className="mt-4 inline-flex items-center gap-2 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
          Best Seller
        </div>
      )}
    </div>
  );
}
