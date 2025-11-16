'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, ShoppingBag, X, Grid, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('double'); // Mobile view mode
  const [isMobile, setIsMobile] = useState(false);
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

  const productsPerPage = isMobile ? 5 : 8;

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  let filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

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
    if (product.category === 'Lipgloss') {
      setSelectedProduct(product);
      setSelectedType('squeez');
      setShowModal(true);
    } else {
      addToCart(product);
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        selectedType,
      };
      addToCart(productToAdd);
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section className="relative w-full h-[60vh] mt-20 sm:mt-24">
        <Image
          src="/hero.png"
          alt="All Products"
          fill
          className="object-cover object-[40%_center] md:object-[50%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-widest text-white">
            <span> SHOP </span>
          </h1>
        </div>
      </section>

      {/* Category Filter */}
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
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  updateQuery({ category: cat.name, page: '1' });
                }}
                className={`px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full ${
                  selectedCategory === cat.name
                    ? 'bg-[#d6869d] text-white shadow-lg'
                    : 'border-2 border-[#ffe9f0] text-[#d6869d] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Mode Toggle - Mobile Only */}
          <div className="flex justify-between items-center mb-8 sm:hidden">
            <p className="text-sm text-gray-600 font-light">
              {filteredProducts.length} Products
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('single')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'single'
                    ? 'bg-[#d6869d] text-white'
                    : 'border-2 border-[#ffe9f0] text-[#d6869d]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('double')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'double'
                    ? 'bg-[#d6869d] text-white'
                    : 'border-2 border-[#ffe9f0] text-[#d6869d]'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'single' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {currentProducts.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={{ pathname: `/products/${product.id}`, query: { category: selectedCategory, page: String(currentPage) } }}>
                  <div className="relative h-[350px] sm:h-[450px] mb-4 overflow-hidden rounded-3xl bg-[#ffe9f0] border-2 border-[#ffe9f0] shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Decorative Element */}
                    <div className="absolute top-2 right-2 text-pink-200 text-xl animate-sparkle z-10"></div>
                    
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                    />
                    
                    {/* Pink Overlay within palette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, product)}
                      className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ffe9f0] z-10 shadow-lg"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite(product.id)
                          ? 'fill-[#d6869d] text-[#d6869d]'
                          : 'text-gray-700'
                        }`}
                      />
                    </button>

                    {/* Best Seller Badge */}
                    {product.bestSeller && (
                      <div className="absolute top-4 right-4 bg-[#d6869d] text-white px-3 py-1 text-xs font-medium tracking-widest uppercase shadow-lg rounded-full z-10">Best</div>
                    )}
                  </div>
                </Link>

                <div className="space-y-2 text-center">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-light tracking-wide hover:text-[#d6869d] transition-colors">
                      {product.name.toLowerCase()}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#d6869d] font-medium flex items-center gap-2">
                      {product.category === 'Lipgloss' && (
                        <span className="line-through text-gray-400">from 205 EGP</span>
                      )}
                      <span>{product.category === 'Lipgloss' ? 'from ' : ''}{product.price} EGP</span>
                    </p>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-9 h-9 border-2 border-[#d6869d] text-[#d6869d] rounded-full flex items-center justify-center hover:bg-[#d6869d] hover:text-white hover:border-[#d6869d] transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-light text-lg">No products found in this category</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => {
                  const newPage = Math.max(currentPage - 1, 1);
                  setCurrentPage(newPage);
                  updateQuery({ page: String(newPage) });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-full border-2 border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    updateQuery({ page: String(page) });
                  }}
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
                onClick={() => {
                  const newPage = Math.min(currentPage + 1, totalPages);
                  setCurrentPage(newPage);
                  updateQuery({ page: String(newPage) });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border-2 border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
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
                    <span className="line-through mr-2 opacity-70">205 EGP</span>
                    <span className="font-semibold">180 EGP</span>
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
                    <span className="line-through mr-2 opacity-70">280 EGP</span>
                    <span className="font-semibold">250 EGP</span>
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
