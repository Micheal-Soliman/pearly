'use client';

import { Minus } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type Shade = { id: string; name: string; swatchColor?: string };

type Props = {
  show: boolean;
  onClose: () => void;
  onDone?: () => void;
  title?: string;
  lipglossShades: Shade[];
  selectedShades: string[];
  setSelectedShades: Dispatch<SetStateAction<string[]>>;
  requiredCount: number;
  shadeSwatches: Record<string, string>;
};

export default function ShadesModal({ show, onClose, onDone, title, lipglossShades, selectedShades, setSelectedShades, requiredCount, shadeSwatches }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#d6869d]">{title || `Select ${requiredCount} Shades`}</h3>
          <button type="button" className="text-sm text-gray-500 hover:text-[#d6869d]" onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-auto">
          {lipglossShades.map((shade) => {
            const count = selectedShades.filter((sid) => sid === shade.id).length;
            const isSelected = count > 0;
            return (
              <div key={shade.id} className={`relative p-3 border-2 rounded-2xl text-left transition-all ${isSelected ? 'border-[#d6869d] bg-[#ffe9f0] shadow-lg' : 'border-[#ffe9f0] hover:border-[#d6869d]'}`}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedShades((prev) => {
                      if (requiredCount === 1) return [shade.id];
                      if (requiredCount && prev.length >= requiredCount) return prev;
                      return [...prev, shade.id];
                    });
                  }}
                  className="block w-full"
                >
                  <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden border-2 border-[#ffd3df]">
                    <div className="absolute inset-0" style={{ backgroundColor: shade.swatchColor || shadeSwatches[shade.id] || '#ffe9f0' }} />
                    {count > 0 && (
                      <span className="absolute top-2 left-2 bg-[#d6869d] text-white text-xs rounded-full px-2 py-0.5 shadow">x{count}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{shade.name.replace('Lipgloss - ', '')}</p>
                </button>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedShades((prev) => {
                        const idx = prev.indexOf(shade.id);
                        if (idx === -1) return prev;
                        const next = [...prev];
                        next.splice(idx, 1);
                        return next;
                      });
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-[#d6869d] flex items-center justify-center shadow"
                    aria-label="Remove one"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onDone || onClose}
            disabled={selectedShades.length !== requiredCount}
            className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
