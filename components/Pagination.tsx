'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const goPrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const goNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="p-2 rounded-full border-2 border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
            currentPage === page
              ? 'bg-[#d6869d] text-white shadow-lg'
              : 'border-2 border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border-2 border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
