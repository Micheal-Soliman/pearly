'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type ToastType = 'success' | 'info' | 'error';

type ToastDetail = {
  message: string;
  type?: ToastType;
};

type ToastState = {
  message: string;
  type: ToastType;
  count: number;
  open: boolean;
  lastShownAt: number;
};

export function showToast(detail: ToastDetail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<ToastDetail>('pearly-toast', { detail }));
}

export default function ToastProvider() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);

  const closeToast = () => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setToast((prev) => (prev ? { ...prev, open: false } : prev));
    if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
    cleanupTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 240);
  };

  useEffect(() => {
    const onToast = (e: Event) => {
      const ce = e as CustomEvent<ToastDetail>;
      const nextMessage = ce.detail?.message || '';
      if (!nextMessage) return;
      const nextType: ToastType = ce.detail?.type || 'success';
      const now = Date.now();

      setToast((prev) => {
        if (prev && prev.open && prev.message === nextMessage && now - prev.lastShownAt < 1200) {
          return { ...prev, count: prev.count + 1, lastShownAt: now };
        }
        return {
          message: nextMessage,
          type: nextType,
          count: 1,
          open: true,
          lastShownAt: now,
        };
      });

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        closeToast();
      }, 6000);
    };

    window.addEventListener('pearly-toast', onToast);
    return () => {
      window.removeEventListener('pearly-toast', onToast);
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (cleanupTimerRef.current) {
        window.clearTimeout(cleanupTimerRef.current);
      }
    };
  }, []);

  if (!toast) return null;

  const bg = toast.type === 'error' ? 'bg-red-600' : toast.type === 'info' ? 'bg-gray-900' : 'bg-[#d6869d]';
  const message = `${toast.message}${toast.count > 1 ? ` (x${toast.count})` : ''}`;

  return (
    <div
      aria-live="polite"
      className="fixed z-[9999] left-1/2 -translate-x-1/2 bottom-6 md:bottom-auto md:left-auto md:translate-x-0 md:top-6 md:right-6"
    >
      <div
        className={`${bg} text-white shadow-2xl rounded-2xl px-4 py-3 max-w-[92vw] md:max-w-sm w-[92vw] md:w-[380px] transition-all duration-200 ease-out ${
          toast.open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium pr-2">{message}</p>
          <button
            type="button"
            onClick={closeToast}
            className="text-white/90 hover:text-white text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              closeToast();
              router.push('/cart');
            }}
            className="flex-1 bg-white/15 hover:bg-white/25 transition-colors rounded-full py-2 text-xs tracking-[0.2em] uppercase font-medium"
          >
            Go to Cart
          </button>
          <button
            type="button"
            onClick={closeToast}
            className="flex-1 bg-white text-[#d6869d] hover:opacity-90 transition-opacity rounded-full py-2 text-xs tracking-[0.2em] uppercase font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
