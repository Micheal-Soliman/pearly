'use client';

import type { Dispatch, SetStateAction } from 'react';

type Shade = { id: string; name: string; swatchColor?: string };

type Props = {
  show: boolean;
  onClose: () => void;
  lipglossShades: Shade[];
  selectedMiniShade: string | null;
  setSelectedMiniShade: Dispatch<SetStateAction<string | null>>;
  shadeSwatches: Record<string, string>;
};

export default function MiniShadesModal({ show, onClose, lipglossShades, selectedMiniShade, setSelectedMiniShade, shadeSwatches }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#d6869d]">Select 1 Mini Shade</h3>
          <button type="button" className="text-sm text-gray-500 hover:text-[#d6869d]" onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-auto">
          {lipglossShades.map((shade) => {
            const isSelected = selectedMiniShade === shade.id;
            return (
              <button
                key={shade.id}
                type="button"
                onClick={() => setSelectedMiniShade(shade.id)}
                className={`relative p-3 border-2 rounded-2xl text-left transition-all ${isSelected ? 'border-[#d6869d] bg-[#ffe9f0] shadow-lg' : 'border-[#ffe9f0] hover:border-[#d6869d]'}`}
              >
                <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden border-2 border-[#ffd3df]">
                  <div className="absolute inset-0" style={{ backgroundColor: shade.swatchColor || shadeSwatches[shade.id] || '#ffe9f0' }} />
                  {isSelected && (
                    <span className="absolute top-2 left-2 bg-[#d6869d] text-white text-xs rounded-full px-2 py-0.5 shadow">Selected</span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">{shade.name.replace('Lipgloss - ', '')}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={!selectedMiniShade}
            className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
