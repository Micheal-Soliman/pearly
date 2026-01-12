'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type Props = {
  selected: string | null;
  onClose: () => void;
};

export default function FeedbackLightbox({ selected, onClose }: Props) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101]">
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
          >
            <Image
              src={selected.startsWith('IMG_') || selected.startsWith('Screenshot_') || selected.startsWith('VID-')
                ? `/Clients moments with pearly/${selected}`
                : `/Pearly feedbacks/${selected}`}
              alt="Customer Feedback"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
