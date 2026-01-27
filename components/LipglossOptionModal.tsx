'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { getLipglossVariantPricing } from '@/lib/pricing';

type Props = {
  show: boolean;
  onClose: () => void;
  selectedType: 'big-brush' | 'squeez';
  setSelectedType: Dispatch<SetStateAction<'big-brush' | 'squeez'>>;
  onConfirm: () => void;
};

export default function LipglossOptionModal({ show, onClose, selectedType, setSelectedType, onConfirm }: Props) {
  const squeezPricing = getLipglossVariantPricing('squeez');
  const bigBrushPricing = getLipglossVariantPricing('big-brush');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">Select Option</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div
                className="flex items-center p-4 border rounded-xl hover:border-[#d6869d] transition-colors cursor-pointer"
                onClick={() => setSelectedType('squeez')}
              >
                <div className="w-4 h-4 rounded-full border-2 border-[#d6869d] flex-shrink-0 flex items-center justify-center mr-3">
                  {selectedType === 'squeez' && <div className="w-2 h-2 bg-[#d6869d] rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Squeez (No Mini)</span>
                    <span className="text-[#d6869d] font-medium">
                      <span className="font-semibold">{squeezPricing.price} EGP</span>
                      <span className="line-through ml-2 opacity-70">{squeezPricing.originalPrice} EGP</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">No mini included</p>
                </div>
              </div>

              <div
                className="flex items-center p-4 border rounded-xl hover:border-[#d6869d] transition-colors cursor-pointer"
                onClick={() => setSelectedType('big-brush')}
              >
                <div className="w-4 h-4 rounded-full border-2 border-[#d6869d] flex-shrink-0 flex items-center justify-center mr-3">
                  {selectedType === 'big-brush' && <div className="w-2 h-2 bg-[#d6869d] rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Big Brush</span>
                    <span className="text-[#d6869d] font-medium">
                      <span className="font-semibold">{bigBrushPricing.price} EGP</span>
                      <span className="line-through ml-2 opacity-70">{bigBrushPricing.originalPrice} EGP</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Larger size with precision applicator</p>
                </div>
              </div>
            </div>

            <button
              onClick={onConfirm}
              className="w-full bg-[#d6869d] hover:bg-[#c5758c] text-white font-medium py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart - {selectedType === 'big-brush' ? bigBrushPricing.price : squeezPricing.price} EGP
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
