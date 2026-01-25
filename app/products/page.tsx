'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FiltersModal from '@/components/FiltersModal';
import ActiveFiltersBar from '@/components/ActiveFiltersBar';
import ViewModeToggle from '@/components/ViewModeToggle';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import BannerHero from '@/components/BannerHero';
import CategoryPills from '@/components/CategoryPills';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import ShadesModal from '@/components/ShadesModal';
import type { Product } from '@/types';
import { X, ShoppingBag } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getLipglossVariantPricing } from '@/lib/pricing';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryFromUrl = searchParams.get('category');
  
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [showLipglossShadesModal, setShowLipglossShadesModal] = useState(false);
  const [lipglossSelectedShades, setLipglossSelectedShades] = useState<string[]>([]);
  const [pendingLipglossType, setPendingLipglossType] = useState<'big-brush' | 'squeez'>('squeez');
  const [pendingLipglossShade, setPendingLipglossShade] = useState<any>(null);
  const [pendingQuantity, setPendingQuantity] = useState<number>(1);
  const [showBundleShadesModal, setShowBundleShadesModal] = useState(false);
  const [bundleSelectedShades, setBundleSelectedShades] = useState<string[]>([]);
  const [pendingBundleProduct, setPendingBundleProduct] = useState<any>(null);
  const [pendingBundleRequiredCount, setPendingBundleRequiredCount] = useState<number>(0);
  const [pendingBundleQuantity, setPendingBundleQuantity] = useState<number>(1);
  const [showSqueezMiniModal, setShowSqueezMiniModal] = useState(false);
  const [squeezSelectedMiniShades, setSqueezSelectedMiniShades] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('single'); // Mobile view mode (default: single)
  const [isMobile, setIsMobile] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchText, setSearchText] = useState<string>(searchParams.get('q') || '');
  const allPrices = useMemo(() => products.map(p => p.price), []);
  const minP = useMemo(() => Math.min(...allPrices), [allPrices]);
  const maxP = useMemo(() => Math.max(...allPrices), [allPrices]);
  const [minPrice, setMinPrice] = useState<number>(parseInt(searchParams.get('min') || String(minP), 10));
  const [maxPrice, setMaxPrice] = useState<number>(parseInt(searchParams.get('max') || String(maxP), 10));
  const [inStockOnly, setInStockOnly] = useState<boolean>((searchParams.get('instock') || '') === '1');
  const [bestSellerOnly, setBestSellerOnly] = useState<boolean>((searchParams.get('bestseller') || '') === '1');
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>((searchParams.get('sale') || '') === '1');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>((searchParams.get('featured') || '') === '1');
  const shadeOptions = useMemo(() =>
    Array.from(new Set(products.filter(p => p.category === 'Lipgloss').map(p => p.name.replace('Lipgloss - ', '')))), []);

  const squeezPricing = useMemo(() => getLipglossVariantPricing('squeez'), []);
  const bigBrushPricing = useMemo(() => getLipglossVariantPricing('big-brush'), []);
  const [selectedShades, setSelectedShades] = useState<string[]>(
    (searchParams.get('shades') || '').split(',').filter(Boolean)
  );
  const prevCategoryRef = useRef(selectedCategory);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to update query string (preserve others)
  const updateQuery = (patch: Record<string, string | null>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null) sp.delete(key);
      else sp.set(key, value);
    });
    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  // Initialize/sync current page from URL (?page=)
  useEffect(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);
    if (!Number.isNaN(p) && p !== currentPage) {
      setCurrentPage(p);
    }
  }, [searchParams]);

  useEffect(() => {
    const open = searchParams.get('openFilters');
    if (open === '1' && !showFilterModal) {
      setShowFilterModal(true);
    }
  }, [searchParams]);

  const productsPerPage = isMobile ? 6 : 9;

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  let filteredProducts = selectedCategory === 'All' ? products : products.filter((p) => p.category === selectedCategory);
  if (searchText.trim()) {
    const q = searchText.trim().toLowerCase();
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  const lipglossProducts = useMemo(() => products.filter((p) => p.category === 'Lipgloss'), []);

  const shadeSwatches: Record<string, string> = {
    '10': '#F8BBD0',
    '11': '#8B5E3C',
    '12': '#C1693C',
    '13': '#FFFFFF',
    '14': '#C28AA5',
    '15': '#FFB3AB',
    '16': '#FF7FA8',
    '17': '#E8C4A8',
    '18': '#FFC0CB',
    '19': '#C63A3A',
    '20': '#FF6F7D',
    '21': '#F3E5F5',
    '22': '#A9745B',
    '23': '#B56576',
    '24': '#C2A283',
    '25': '#9C6B45',
    '26': '#7E2A76',
    '27': '#D4AF37',
    '28': '#FF9A8B',
    '29': '#F1C27D',
  };

  const lipglossShadesForModal = useMemo(
    () => lipglossProducts.map((p) => ({ id: p.id, name: p.name, swatchColor: shadeSwatches[p.id] })),
    [lipglossProducts]
  );

  filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
  if (inStockOnly) filteredProducts = filteredProducts.filter(p => p.inStock);
  if (bestSellerOnly) filteredProducts = filteredProducts.filter(p => p.bestSeller);
  if (onSaleOnly) filteredProducts = filteredProducts.filter(p => !!p.originalPrice);
  if (featuredOnly) filteredProducts = filteredProducts.filter(p => p.featured);
  if (selectedShades.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      p.category !== 'Lipgloss' ? false : selectedShades.includes(p.name.replace('Lipgloss - ', ''))
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // If category actually changes (user action), reset to page 1 and push to URL.
  // Do NOT run on initial mount to preserve ?page when returning via Back.
  useEffect(() => {
    if (prevCategoryRef.current !== selectedCategory) {
      setCurrentPage(1);
      updateQuery({ category: selectedCategory, page: '1' });
    }
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  const handleAddToCart = (product: any) => {
    const qty = Math.max(1, Number(product?.quantity || 1));
    if (product.category === 'Lipgloss') {
      if (product.selectedType) {
        setPendingLipglossType(product.selectedType);
        setPendingQuantity(qty);
        if (product.selectedType === 'squeez') {
          setPendingLipglossShade(product);
          setSqueezSelectedMiniShades([]);
          setShowSqueezMiniModal(true);
          return;
        }
        setLipglossSelectedShades([product.id]);
        setShowLipglossShadesModal(true);
        return;
      }
      setSelectedProduct(product);
      setSelectedType('squeez');
      setShowModal(true);
    } else if (product.category === 'Bundles') {
      const required = product.id === '7' ? 2 : product.id === '8' ? 3 : 0;
      if (required > 0) {
        setPendingBundleProduct(product);
        setPendingBundleRequiredCount(required);
        setPendingBundleQuantity(qty);
        setBundleSelectedShades([]);
        setShowBundleShadesModal(true);
        return;
      }
      router.push(`/products/${product.id}?category=${encodeURIComponent(selectedCategory)}&page=${encodeURIComponent(String(currentPage))}`);
    } else {
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
      router.push('/cart');
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      const qty = Math.max(1, Number(selectedProduct?.quantity || 1));
      const productToAdd = {
        ...selectedProduct,
        selectedType,
      };
      setPendingLipglossType(selectedType);
      setPendingQuantity(qty);
      if (selectedType === 'squeez') {
        setPendingLipglossShade(selectedProduct);
        setSqueezSelectedMiniShades([]);
        setShowSqueezMiniModal(true);
      } else {
        setLipglossSelectedShades([selectedProduct.id]);
        setShowLipglossShadesModal(true);
      }
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const toggleFavoriteProduct = (product: any) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const applyFiltersToUrl = () => {
    const patch: Record<string, string | null> = {
      q: searchText || null,
      category: selectedCategory,
      min: String(minPrice),
      max: String(maxPrice),
      instock: inStockOnly ? '1' : null,
      bestseller: bestSellerOnly ? '1' : null,
      sale: onSaleOnly ? '1' : null,
      featured: featuredOnly ? '1' : null,
      shades: selectedShades.length ? selectedShades.join(',') : null,
      page: '1',
      openFilters: null,
    };
    updateQuery(patch);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setSearchText('');
    setMinPrice(minP);
    setMaxPrice(maxP);
    setInStockOnly(false);
    setBestSellerOnly(false);
    setOnSaleOnly(false);
    setFeaturedOnly(false);
    setSelectedShades([]);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
    updateQuery({ openFilters: null });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <BannerHero image="/Hero Upp.jpg" title="SHOP" />

      <FiltersModal
        show={showFilterModal}
        onClose={closeFilterModal}
        categories={categories}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minP={minP}
        maxP={maxP}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        bestSellerOnly={bestSellerOnly}
        setBestSellerOnly={setBestSellerOnly}
        onSaleOnly={onSaleOnly}
        setOnSaleOnly={setOnSaleOnly}
        featuredOnly={featuredOnly}
        setFeaturedOnly={setFeaturedOnly}
        shadeOptions={shadeOptions}
        selectedShades={selectedShades}
        setSelectedShades={setSelectedShades}
        onApply={applyFiltersToUrl}
        onReset={resetFilters}
      />

      

      <section className="py-12 border-b border-[#ffe9f0] bg-[#ffe9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl font-light tracking-widest uppercase mb-2">
              <span className="text-[#d6869d]"> Filter By Category</span>
            </h2>
            <p className="text-sm text-gray-600 font-light">
              Choose a category to find your perfect products
            </p>
          </div>
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={(name: string) => {
              setSelectedCategory(name);
              updateQuery({ category: name, page: '1' });
            }}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Mode Toggle - Mobile Only */}
          <ViewModeToggle count={filteredProducts.length} viewMode={viewMode} setViewMode={setViewMode} />

          <ActiveFiltersBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchText={searchText}
            setSearchText={setSearchText}
            minP={minP}
            maxP={maxP}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            bestSellerOnly={bestSellerOnly}
            setBestSellerOnly={setBestSellerOnly}
            onSaleOnly={onSaleOnly}
            setOnSaleOnly={setOnSaleOnly}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
            selectedShades={selectedShades}
            setSelectedShades={setSelectedShades}
            updateQuery={updateQuery}
          />

          <div className={`grid gap-6 ${
            viewMode === 'single' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                onToggleFavorite={(p) => toggleFavoriteProduct(p)}
                onAddToCart={(productToAdd) => handleAddToCart(productToAdd)}
                hrefQuery={{ category: selectedCategory, page: String(currentPage) }}
              />
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-light text-lg">No products found in this category</p>
            </div>
          )}

      <ShadesModal
        show={showLipglossShadesModal}
        onClose={() => {
          setShowLipglossShadesModal(false);
          setLipglossSelectedShades([]);
          setPendingQuantity(1);
        }}
        onDone={() => {
          const shadeId = lipglossSelectedShades[0];
          const shade = lipglossProducts.find((p) => p.id === shadeId);
          if (shade) {
            if (pendingLipglossType === 'squeez') {
              setPendingLipglossShade(shade);
              setSqueezSelectedMiniShades([]);
              setShowSqueezMiniModal(true);
            } else {
              const uniqueId = `${shade.id}-t-${pendingLipglossType}`;
              const item = { ...shade, id: uniqueId, name: `${shade.name} (Big Brush)`, selectedType: pendingLipglossType } as Product;
              for (let i = 0; i < pendingQuantity; i++) {
                addToCart(item);
              }
              router.push('/cart');
            }
          }
          setShowLipglossShadesModal(false);
          setLipglossSelectedShades([]);
          setPendingQuantity(1);
        }}
        lipglossShades={lipglossShadesForModal}
        selectedShades={lipglossSelectedShades}
        setSelectedShades={setLipglossSelectedShades}
        requiredCount={1}
        shadeSwatches={shadeSwatches}
      />

      <ShadesModal
        show={showBundleShadesModal}
        onClose={() => {
          setShowBundleShadesModal(false);
          setBundleSelectedShades([]);
          setPendingBundleProduct(null);
          setPendingBundleRequiredCount(0);
          setPendingBundleQuantity(1);
        }}
        onDone={() => {
          if (!pendingBundleProduct) return;
          const perBundleRequired = Math.max(0, pendingBundleRequiredCount);
          const totalRequired = perBundleRequired * Math.max(1, pendingBundleQuantity);
          if (totalRequired > 0 && bundleSelectedShades.length !== totalRequired) return;

          for (let i = 0; i < Math.max(1, pendingBundleQuantity); i++) {
            const group = perBundleRequired
              ? bundleSelectedShades.slice(i * perBundleRequired, (i + 1) * perBundleRequired)
              : bundleSelectedShades;

            const counts: Record<string, number> = {};
            group.forEach((sid) => {
              counts[sid] = (counts[sid] || 0) + 1;
            });
            const shadeNames = Object.entries(counts).map(([sid, c]) => {
              const base = lipglossProducts.find((p) => p.id === sid)?.name?.replace('Lipgloss - ', '') || sid;
              return c > 1 ? `${base} x${c}` : base;
            });

            const uniqueId = `${pendingBundleProduct.id}-b-${group.join('-')}`;
            const itemToAdd = {
              ...pendingBundleProduct,
              id: uniqueId,
              name: `${pendingBundleProduct.name} (${shadeNames.join(', ')})`,
              bundleShades: group,
            };

            addToCart(itemToAdd as Product);
          }

          setShowBundleShadesModal(false);
          setBundleSelectedShades([]);
          setPendingBundleProduct(null);
          setPendingBundleRequiredCount(0);
          setPendingBundleQuantity(1);
        }}
        lipglossShades={lipglossShadesForModal}
        selectedShades={bundleSelectedShades}
        setSelectedShades={setBundleSelectedShades}
        requiredCount={Math.max(0, pendingBundleRequiredCount) * Math.max(1, pendingBundleQuantity)}
        shadeSwatches={shadeSwatches}
      />

      <ShadesModal
        show={showSqueezMiniModal}
        onClose={() => {
          setShowSqueezMiniModal(false);
          setSqueezSelectedMiniShades([]);
          setPendingLipglossShade(null);
          setPendingQuantity(1);
        }}
        title={`Select ${pendingQuantity} Mini Shade${pendingQuantity === 1 ? '' : 's'}`}
        onDone={() => {
          if (!pendingLipglossShade) return;
          if (pendingQuantity > 0 && squeezSelectedMiniShades.length !== pendingQuantity) return;

          squeezSelectedMiniShades.forEach((miniId) => {
            const miniShadeName = lipglossProducts.find((p) => p.id === miniId)?.name?.replace('Lipgloss - ', '') || miniId;
            const uniqueId = `${pendingLipglossShade.id}-t-squeez-m-${miniId}`;
            const item = {
              ...pendingLipglossShade,
              id: uniqueId,
              name: `${pendingLipglossShade.name} (Squeez, Mini: ${miniShadeName})`,
              selectedType: 'squeez',
              miniShade: miniId,
            } as Product;
            addToCart(item);
          });

          setShowSqueezMiniModal(false);
          setSqueezSelectedMiniShades([]);
          setPendingLipglossShade(null);
          setPendingQuantity(1);
        }}
        lipglossShades={lipglossShadesForModal}
        selectedShades={squeezSelectedMiniShades}
        setSelectedShades={setSqueezSelectedMiniShades}
        requiredCount={pendingQuantity}
        shadeSwatches={shadeSwatches}
      />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              updateQuery({ page: String(page) });
            }}
          />
        </div>
      </section>

      {/* Modal for Lipgloss Options */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 relative rounded-3xl shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-light tracking-wide mb-2 text-[#d6869d]">Choose Your Option</h2>
            <p className="text-pink-600 font-medium mb-6">{selectedProduct.name}</p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedType('squeez')}
                className={`w-full p-4 border-2 transition-all rounded-2xl ${
                  selectedType === 'squeez'
                    ? 'border-[#d6869d] bg-[#d6869d] text-white shadow-lg'
                    : 'border-[#ffe9f0] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium">Squeez</p>
                  <p className="text-sm opacity-80">
                    <span className="font-semibold">{squeezPricing.price} EGP</span>
                    <span className="line-through ml-2 opacity-70">{squeezPricing.originalPrice} EGP</span>
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSelectedType('big-brush')}
                className={`w-full p-4 border-2 transition-all rounded-2xl ${
                  selectedType === 'big-brush'
                    ? 'border-[#d6869d] bg-[#d6869d] text-white shadow-lg'
                    : 'border-[#ffe9f0] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium">Big Brush</p>
                  <p className="text-sm opacity-80">
                    <span className="font-semibold">{bigBrushPricing.price} EGP</span>
                    <span className="line-through ml-2 opacity-70">{bigBrushPricing.originalPrice} EGP</span>
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={confirmAddToCart}
              className="w-full bg-[#d6869d] text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
            >
              <ShoppingBag className="w-5 h-5" />
              ADD TO CART
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light tracking-wide">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
