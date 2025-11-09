'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Filter, Heart, ShoppingBag, X } from 'lucide-react';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under-200' | '200-300' | 'over-300'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('categories');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');

  let filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Price filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter((p) => {
      if (priceRange === 'under-200') return p.price < 200;
      if (priceRange === '200-300') return p.price >= 200 && p.price <= 300;
      if (priceRange === 'over-300') return p.price > 300;
      return true;
    });
  }

  // Stock filter
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  }

  // Featured filter
  if (featuredOnly) {
    filteredProducts = filteredProducts.filter((p) => p.featured);
  }

  // Sorting
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
        price: selectedType === 'big-brush' ? 250 : 180
      };
      addToCart(productToAdd);
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 py-16 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-fadeIn gradient-text-animate">
            All Products
          </h1>
          <p className="text-gray-700 text-lg animate-fadeInUp">
            Discover our complete collection of luxury products
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-full font-semibold mb-4"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            <div
              className={`${
                showFilters ? 'block' : 'hidden'
              } lg:block bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-3xl p-6 shadow-2xl sticky top-24 border-2 border-pink-100 max-h-[calc(100vh-120px)] overflow-y-auto`}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-pink-200">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Filters
                </h2>
              </div>

              {/* Categories Accordion */}
              <div className="mb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
                  className="w-full flex items-center justify-between text-lg font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors"
                >
                  <span>Categories</span>
                  <svg className={`w-5 h-5 transition-transform ${expandedSection === 'categories' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSection === 'categories' ? 'max-h-96' : 'max-h-0'}`}>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-pink-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                </div>
              </div>

              {/* Price Range Accordion */}
              <div className="mb-4">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'price' ? null : 'price')}
                  className="w-full flex items-center justify-between text-lg font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors"
                >
                  <span>Price Range</span>
                  <svg className={`w-5 h-5 transition-transform ${expandedSection === 'price' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSection === 'price' ? 'max-h-96' : 'max-h-0'}`}>
                <button
                  onClick={() => setPriceRange('all')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    priceRange === 'all'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  All Prices
                </button>
                <button
                  onClick={() => setPriceRange('under-200')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    priceRange === 'under-200'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Under 200 EGP
                </button>
                <button
                  onClick={() => setPriceRange('200-300')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    priceRange === '200-300'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  200 - 300 EGP
                </button>
                <button
                  onClick={() => setPriceRange('over-300')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    priceRange === 'over-300'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Over 300 EGP
                </button>
                </div>
              </div>

              {/* Sort By Accordion */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('sort')}
                  className="w-full flex items-center justify-between text-lg font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors"
                >
                  <span>Sort By</span>
                  <svg className={`w-5 h-5 transition-transform ${expandedSection === 'sort' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSection === 'sort' ? 'max-h-96' : 'max-h-0'}`}>
                <button
                  onClick={() => setSortBy('default')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    sortBy === 'default'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => setSortBy('price-low')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    sortBy === 'price-low'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => setSortBy('price-high')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    sortBy === 'price-high'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    sortBy === 'name'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Name: A to Z
                </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-4 pt-4 border-t-2 border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                  Quick Filters
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        inStockOnly ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          inStockOnly ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}></div>
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                      In Stock Only
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={(e) => setFeaturedOnly(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        featuredOnly ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          featuredOnly ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}></div>
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                      Featured Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Clear All Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange('all');
                  setSortBy('default');
                  setInStockOnly(false);
                  setFeaturedOnly(false);
                }}
                className="w-full mt-6 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.nameAr}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isFavorite(product.id)) {
                            removeFromFavorites(product.id);
                          } else {
                            addToFavorites({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                            });
                          }
                        }}
                        className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                          isFavorite(product.id)
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
                      </button>
                    </div>
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs text-pink-500 font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="space-y-3 mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-pink-600">
                          {product.category === 'Lipgloss' ? 'From ' : ''}{product.price} EGP
                        </span>
                        {product.category === 'Lipgloss' && (
                          <span className="text-xs text-gray-500">Multiple options</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1 px-4 py-2 bg-white border-2 border-pink-500 text-pink-600 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No products in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Lipgloss Options */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Option</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.name}</p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedType('squeez')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedType === 'squeez'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Squeez</p>
                    <p className="text-sm text-gray-600">8 ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">180 EGP</p>
                    <p className="text-xs text-gray-400 line-through">205 EGP</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedType('big-brush')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedType === 'big-brush'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Big Brush</p>
                    <p className="text-sm text-gray-600">6 ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">250 EGP</p>
                    <p className="text-xs text-gray-400 line-through">280 EGP</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={confirmAddToCart}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
