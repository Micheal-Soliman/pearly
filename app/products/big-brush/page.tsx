'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Check, Star, Truck, Users, Package, ArrowLeft, ChevronRight, Shield, Sparkles, ZoomIn, Minus, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const shadeSwatches: Record<string, string> = {
  '10': '#F8BBD0', '11': '#8B5E3C', '12': '#C1693C', '13': '#FFFFFF', '14': '#C28AA5',
  '15': '#FFB3AB', '16': '#FF7FA8', '17': '#E8C4A8', '18': '#FFC0CB', '19': '#C63A3A',
  '20': '#FF6F7D', '21': '#F3E5F5', '22': '#A9745B', '23': '#B56576', '24': '#C2A283',
  '25': '#9C6B45', '26': '#7E2A76', '27': '#FF6FAE', '28': '#A1122A', '29': '#6B4F3B',
};

export default function BigBrushPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const categoryFromUrl = searchParams.get('category') || 'All';
  const pageFromUrl = searchParams.get('page') || '1';

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  const product = products.find((p) => p.id === 'big-brush');
  const lipglossShades = products.filter((p) => p.category === 'Lipgloss' && p.isShade);

  const shadesList = lipglossShades.map((p) => {
    return {
      id: p.id,
      name: p.name,
      swatchColor: shadeSwatches[p.id],
      image: p.image,
      shadeImages: {
        swatch: p.shadeImages?.[0] || p.image,
        lipsFar: p.images?.[0] || p.image,
        box: p.images?.[1] || '/3.jpg',
        bag: p.images?.[2] || '/4.jpg',
      },
    };
  });

  const currentShade = selectedShade ? shadesList.find((s) => s.id === selectedShade) : null;
  const displayImages = currentShade
    ? [
        currentShade.shadeImages.swatch,
        currentShade.shadeImages.lipsFar,
        currentShade.shadeImages.box,
        currentShade.shadeImages.bag,
      ]
    : product?.images || ['/4.2.jpg'];

  const currentPrice = 299;
  const originalPrice = 350;
  const hasDiscount = originalPrice > currentPrice;
  const rating = 5;
  const reviewCount = 148;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] to-[#f5f0ec] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#d6869d]/10 flex items-center justify-center">
            <Package className="w-12 h-12 text-[#d6869d]" />
          </div>
          <h1 className="text-4xl font-light tracking-wide text-gray-900">Product Not Found</h1>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-[#d6869d] text-white rounded-full text-sm tracking-widest uppercase hover:bg-[#c5758e] transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedShade) {
      return;
    }
    const shade = shadesList.find((s) => s.id === selectedShade);
    const shadeName = shade?.name?.replace('Lipgloss - ', '') || selectedShade;
    const uniqueId = `big-brush-s-${selectedShade}`;
    const itemToAdd = {
      ...product,
      id: uniqueId,
      name: `Big Brush Lipgloss (Shade: ${shadeName})`,
      selectedType: 'big-brush' as const,
      shadeId: selectedShade,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(itemToAdd);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== 'big-brush' && p.id !== 'squeez' && !p.isShade)
    .slice(0, 4);

  const canAddToCart = !!selectedShade && !addedToCart;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-white to-[#fdf9f7]">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => router.push(`/products?category=${encodeURIComponent(categoryFromUrl)}&page=${encodeURIComponent(pageFromUrl)}`)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#d6869d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Image - Elegant with Zoom */}
              <div
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 group cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-out ${isZoomed ? 'scale-125' : 'scale-100'}`}>
                  <Image
                    src={displayImages[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-gray-600" />
                </div>

                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 text-xs font-semibold rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Best Seller
                  </span>
                  {hasDiscount && (
                    <span className="px-4 py-1.5 bg-[#d6869d] text-white text-sm font-bold rounded-full shadow-xl backdrop-blur-sm">
                      Save {originalPrice - currentPrice} EGP
                    </span>
                  )}
                </div>

                {/* Size Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full shadow-lg">
                    8ml
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery - 5 Images */}
              {displayImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-500 ${
                        idx === selectedImage
                          ? 'ring-2 ring-[#d6869d] ring-offset-3 shadow-xl scale-105'
                          : 'ring-1 ring-gray-200 hover:ring-[#d6869d]/40 hover:scale-105 shadow-md'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} - ${idx + 1}`} fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#d6869d]/10 to-[#e89ab0]/10 text-[#d6869d] text-xs font-semibold rounded-full uppercase tracking-widest border border-[#d6869d]/20">
                    Big Brush
                  </span>
                  <span className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-[1.1] tracking-tight">
                  Big Brush Lipgloss
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{reviewCount} verified reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-light text-gray-900 tracking-tight">
                    {currentPrice} <span className="text-2xl text-gray-500">EGP</span>
                  </span>
                  {hasDiscount && (
                    <div className="flex flex-col">
                      <span className="text-xl text-gray-400 line-through font-light">{originalPrice} EGP</span>
                      <span className="text-sm text-emerald-600 font-medium">You save {originalPrice - currentPrice} EGP</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent" />

              {/* Shade Selection */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Select Shade
                  </label>
                  {selectedShade && (
                    <span className="text-sm text-[#d6869d] font-medium">
                      {shadesList.find((s) => s.id === selectedShade)?.name.replace('Lipgloss - ', '')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  {shadesList.map((shade) => (
                    <button
                      key={shade.id}
                      onClick={() => {
                        setSelectedShade(shade.id);
                        setSelectedImage(0);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedShade === shade.id
                          ? 'ring-2 ring-[#d6869d] ring-offset-2 scale-110 z-10 shadow-lg'
                          : 'hover:scale-105 ring-1 ring-gray-100'
                      }`}
                      title={shade.name}
                    >
                      <Image src={shade.image} alt={shade.name} fill className="object-cover" sizes="60px" />
                      {selectedShade === shade.id && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/40 to-transparent flex items-end justify-center pb-1">
                          <Check className="w-3 h-3 text-white drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Image Order Guide */}
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                  <p className="font-medium mb-1">Shade images shown in order:</p>
                  <p>1. Swatch • 2. On lips (far) • 3. On lips (close) • 4. Box • 5. Bag</p>
                </div>
              </div>

              {/* Quantity & Add to Cart - Minimal Chic */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* Quantity Selector - Minimal */}
                  <div className="flex items-center bg-white rounded-full border border-gray-200 h-12">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#d6869d] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#d6869d] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button - Chic */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={`flex-1 h-12 rounded-full font-medium text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                      addedToCart
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-[#d6869d] to-[#e8a4b8] text-white hover:shadow-lg'
                    } ${!canAddToCart && !addedToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  {/* Favorite Button - Minimal */}
                  <button
                    onClick={toggleFavorite}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                      isFavorite(product.id)
                        ? 'bg-[#d6869d] border-[#d6869d] text-white'
                        : 'bg-white border-gray-200 text-gray-400 hover:text-[#d6869d] hover:border-[#d6869d]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {!selectedShade && (
                  <p className="text-sm text-amber-600 text-center">Please select a shade first.</p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, label: 'Fast Delivery', sub: '3-10 Days' },
                  { icon: Shield, label: 'Secure Payment', sub: '100% Safe' },
                  { icon: Users, label: 'Happy Customers', sub: '+5000' },
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d6869d]/10 to-[#e89ab0]/10 flex items-center justify-center">
                      <badge.icon className="w-5 h-5 text-[#d6869d]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-900 block">{badge.label}</span>
                      <span className="text-[10px] text-gray-500">{badge.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Features */}
              <div className="p-5 bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl border border-[#ffd3df]">
                <h3 className="font-semibold text-gray-900 mb-3">Big Brush Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d6869d]" />
                    Large applicator for smooth, even coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d6869d]" />
                    8ml generous size
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d6869d]" />
                    Non-sticky, long-lasting formula
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d6869d]" />
                    Perfect for daily use
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-20">
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
              {(['description', 'details', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-all relative ${
                    activeTab === tab ? 'text-[#d6869d]' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d6869d] rounded-full" />}
                </button>
              ))}
            </div>

            <div className="max-w-3xl">
              {activeTab === 'description' && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                </div>
              )}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Size</span>
                      <p className="font-semibold text-gray-900 mt-1">8ml</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Category</span>
                      <p className="font-semibold text-gray-900 mt-1">Big Brush</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Price</span>
                      <p className="font-semibold text-[#d6869d] mt-1">{currentPrice} EGP</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Availability</span>
                      <p className="font-semibold text-emerald-600 mt-1">In Stock</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                    <Truck className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900">Free Delivery</p>
                      <p className="text-sm text-emerald-700">On orders over 999 EGP</p>
                    </div>
                  </div>
                  <p>All orders are processed within 1-2 business days. Delivery typically takes 2-7 days depending on your location.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-light text-gray-900">
                    You May Also <span className="text-[#d6869d] font-normal">Like</span>
                  </h2>
                  <p className="text-gray-500 mt-2">Handpicked favorites just for you</p>
                </div>
                <Link href="/products" className="group flex items-center gap-2 text-sm font-semibold text-[#d6869d] hover:text-[#c5758e] transition-colors">
                  View All Products
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    isFavorite={isFavorite}
                    onToggleFavorite={(p) => {
                      if (isFavorite(p.id)) removeFromFavorites(p.id);
                      else addToFavorites(p);
                    }}
                    onAddToCart={(p) => {
                      for (let i = 0; i < (p.quantity || 1); i++) addToCart(p);
                    }}
                    hrefQuery={{ category: categoryFromUrl, page: pageFromUrl }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
