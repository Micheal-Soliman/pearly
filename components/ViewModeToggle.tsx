'use client';

import { Grid, LayoutGrid } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  count: number;
  viewMode: 'single' | 'double';
  setViewMode: Dispatch<SetStateAction<'single' | 'double'>>;
};

export default function ViewModeToggle({ count, viewMode, setViewMode }: Props) {
  return (
    <div className="flex justify-between items-center mb-8 sm:hidden">
      <p className="text-sm text-gray-600 font-light">{count} Products</p>
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('single')}
          className={`p-2 rounded-lg transition-all duration-300 ${
            viewMode === 'single' ? 'bg-[#d6869d] text-white' : 'border-2 border-[#ffe9f0] text-[#d6869d]'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('double')}
          className={`p-2 rounded-lg transition-all duration-300 ${
            viewMode === 'double' ? 'bg-[#d6869d] text-white' : 'border-2 border-[#ffe9f0] text-[#d6869d]'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
