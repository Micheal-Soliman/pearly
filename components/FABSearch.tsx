'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FABSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFiltersOpen = searchParams.get('openFilters') === '1';
  const hideFab = pathname === '/cart' || pathname === '/checkout';

  const openFilters = () => {
    if (pathname.startsWith('/products')) {
      const sp = new URLSearchParams(searchParams.toString());
      sp.set('openFilters', '1');
      router.push(`/products?${sp.toString()}`, { scroll: false });
    } else {
      router.push('/products?openFilters=1', { scroll: false });
    }
  };

  if (isFiltersOpen || hideFab) return null;

  return (
    <div className="fixed bottom-20 md:bottom-18 right-4 z-[10000]">
      <button
        onClick={openFilters}
        className="w-12 h-12 rounded-full bg-[#d6869d] text-white flex items-center justify-center shadow-lg hover:shadow-2xl active:scale-95 transition-all"
        aria-label="Search and Filter Products"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
}
