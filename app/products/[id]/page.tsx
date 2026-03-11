'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Check, Star, Truck, Users, Package, ArrowLeft, ChevronRight, Shield, Sparkles, ZoomIn, Minus, Plus, Info } from 'lucide-react';
import ShadesModal from '@/components/ShadesModal';
import ProductCard from '@/components/ProductCard';
import { getLipglossVariantPricing, getUnitPrice } from '@/lib/pricing';
import { formatBundleSelectionNames, getBundleSteps, getStepLabelForIndex } from '@/lib/bundles';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const categoryFromUrl = searchParams.get('category') || 'All';
  const pageFromUrl = searchParams.get('page') || '1';

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('big-brush');
  const [selectedShades, setSelectedShades] = useState<string[]>([]);
  const [showShadesModal, setShowShadesModal] = useState(false);
  const [showLipglossShadesModal, setShowLipglossShadesModal] = useState(false);
  const [selectedLipglossShades, setSelectedLipglossShades] = useState<string[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  const product = products.find((p) => p.id === params.id);
  const squeezPricing = getLipglossVariantPricing('squeez');
  const bigBrushPricing = getLipglossVariantPricing('big-brush');
  const rating = (product as any)?.rating ?? 5;
  const reviewCount = (product as any)?.reviewCount ?? 148;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] to-[#f5f0ec] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#d6869d]/10 flex items-center justify-center">
            <Package className="w-12 h-12 text-[#d6869d]" />
          </div>
          <h1 className="text-4xl font-light tracking-wide text-gray-900">Product Not Found</h1>
          <p className="text-gray-500">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d6869d] text-white rounded-full text-sm tracking-widest uppercase hover:bg-[#c5758e] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (product.category !== 'Lipgloss') return;
    if (!product.isShade) return;
    const cat = searchParams.get('category') || 'Lipgloss';
    const page = searchParams.get('page') || '1';
    router.replace(`/products/lipgloss?category=${encodeURIComponent(cat)}&page=${encodeURIComponent(page)}`);
  }, [product.category, product.isShade, router, searchParams]);

  const handleAddToCart = () => {
    let productToAdd: any = product;

    if (product.category === 'Lipgloss') {
      if (selectedLipglossShades.length !== quantity) {
        setShowLipglossShadesModal(true);
        return;
      }
      const typeLabel = selectedType === 'squeez' ? 'Squeez' : 'Big Brush';
      selectedLipglossShades.forEach((shadeId) => {
        const shadeName = products.find((p) => p.id === shadeId)?.name?.replace('Lipgloss - ', '') || shadeId;
        const uniqueId = `${product.id}-t-${selectedType}-s-${shadeId}`;
        const itemToAdd: any = {
          ...product,
          id: uniqueId,
          name: `${product.name} (${typeLabel}, Shade: ${shadeName})`,
          selectedType,
          shadeId,
        };
        addToCart(itemToAdd);
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
      return;
    } else if (product.category === 'Bundles') {
      const required = getBundleSteps(product).length;
      if (required > 0 && selectedShades.length !== required) {
        setShowShadesModal(true);
        return;
      }
      const shadeNames = formatBundleSelectionNames(getBundleSteps(product), selectedShades, products);
      const uniqueId = `${product.id}-b-${selectedShades.join('-')}`;
      productToAdd = {
        ...product,
        id: uniqueId,
        name: `${product.name} (${shadeNames.join(', ')})`,
        bundleShades: selectedShades,
      };
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getCurrentPrice = () => {
    if (product.category === 'Lipgloss') {
      return getUnitPrice({ category: 'Lipgloss', price: product.price, selectedType });
    }
    return product.price;
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const toggleFavoriteProduct = (p: any) => {
    if (isFavorite(p.id)) {
      removeFromFavorites(p.id);
    } else {
      addToFavorites(p);
    }
  };

  const handleAddToCartFromCard = (p: any) => {
    const qty = Math.max(1, Number(p?.quantity || 1));
    if (p.category === 'Lipgloss') {
      if (p.selectedType === 'big-brush') {
        const uniqueId = `${p.id}-t-big-brush`;
        const item = { ...p, id: uniqueId, name: `${p.name} (Big Brush)`, selectedType: 'big-brush' };
        for (let i = 0; i < qty; i++) {
          addToCart(item);
        }
        return;
      }
      router.push(`/products/${p.id}?category=${encodeURIComponent(categoryFromUrl)}&page=${encodeURIComponent(pageFromUrl)}`);
      return;
    }
    if (p.category === 'Bundles') {
      router.push(`/products/${p.id}?category=${encodeURIComponent(categoryFromUrl)}&page=${encodeURIComponent(pageFromUrl)}&openShades=1`);
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart(p);
    }
  };

  const selectedShadeId = selectedLipglossShades.length === 1 ? selectedLipglossShades[0] : null;
  const selectedShadeProduct = selectedShadeId ? products.find((p) => p.category === 'Lipgloss' && p.isShade && p.id === selectedShadeId) : null;
  const images = selectedShadeProduct?.images || product.images || [product.image];
  const lipglossShades = products.filter((p) => p.category === 'Lipgloss' && p.isShade);

  const shadeSwatches: Record<string, string> = {
    '10': '#F8BBD0', '11': '#8B5E3C', '12': '#C1693C', '13': '#FFFFFF', '14': '#C28AA5',
    '15': '#FFB3AB', '16': '#FF7FA8', '17': '#E8C4A8', '18': '#FFC0CB', '19': '#C63A3A',
    '20': '#FF6F7D', '21': '#F3E5F5', '22': '#A9745B', '23': '#B56576', '24': '#C2A283',
    '25': '#9C6B45', '26': '#7E2A76', '27': '#FF6FAE', '28': '#A1122A', '29': '#6B4F3B',
  };

  const lipglossShadesForModal = lipglossShades.map((p) => ({
    id: p.id,
    name: p.name,
    swatchColor: shadeSwatches[p.id],
    image: p.image,
  }));

  const bundleSteps = product.category === 'Bundles' ? getBundleSteps(product) : [];
  const requiredBundleCount = bundleSteps.length;
  const bundleStepLabels = requiredBundleCount > 0 ? bundleSteps.map((_, idx) => getStepLabelForIndex(bundleSteps, idx)) : undefined;
  const bundleModalTitle = product.category !== 'Bundles' || requiredBundleCount === 0
    ? undefined
    : `Select ${getStepLabelForIndex(bundleSteps, Math.min(requiredBundleCount - 1, selectedShades.length))} Shade`;
  const isBundleSelectionComplete = product.category !== 'Bundles' || requiredBundleCount === 0 || selectedShades.length === requiredBundleCount;
  const isLipglossSelectionComplete = product.category !== 'Lipgloss' || selectedLipglossShades.length === quantity;
  const canAddToCart = !addedToCart && isBundleSelectionComplete && isLipglossSelectionComplete;

  const relatedProducts = (() => {
    const base = products.filter((p) => !(p.category === 'Lipgloss' && p.isShade) && p.id !== product.id);
    if (product.category === 'Lipgloss') {
      const featured = base.filter((p) => p.featured || p.bestSeller);
      return (featured.length ? featured : base).slice(0, 4);
    }
    return base.filter((p) => p.category === product.category).slice(0, 4);
  })();

  const handleLipglossSwatchClick = (shadeId: string) => {
    if (product.category !== 'Lipgloss') return;
    setSelectedLipglossShades((prev) => {
      if (prev.includes(shadeId)) return prev;
      if (prev.length >= quantity) return [...prev.slice(1), shadeId];
      return [...prev, shadeId];
    });
  };

  useEffect(() => {
    if (product.category !== 'Bundles') return;
    if (searchParams.get('openShades') !== '1') return;
    setShowShadesModal(true);
  }, [product.category, searchParams]);

  useEffect(() => {
    if (product.category !== 'Lipgloss') return;
    if (searchParams.get('openShades') !== '1') return;
    const q = parseInt(searchParams.get('qty') || '1', 10);
    const t = searchParams.get('type');
    if (!Number.isNaN(q) && q > 0) setQuantity(q);
    if (t === 'squeez' || t === 'big-brush') setSelectedType(t);
    setShowLipglossShadesModal(true);
  }, [product.category, searchParams]);

  useEffect(() => {
    if (product.category !== 'Lipgloss') return;
    if (product.isShade) return;
    const shade = searchParams.get('shade');
    if (!shade) return;
    setQuantity(1);
    setSelectedLipglossShades([shade]);
  }, [product.category, product.isShade, searchParams]);

  useEffect(() => {
    if (product.category !== 'Lipgloss') return;
    setSelectedLipglossShades((prev) => {
      if (prev.length > quantity) return prev.slice(0, quantity);
      return prev;
    });
  }, [quantity, product.category]);

  const currentPrice = getCurrentPrice();
  const hasDiscount = product.originalPrice && product.originalPrice > currentPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-white to-[#fdf9f7]">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => {
              const cat = searchParams.get('category') || 'All';
              const page = searchParams.get('page') || '1';
              router.push(`/products?category=${encodeURIComponent(cat)}&page=${encodeURIComponent(page)}`);
            }}
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
                    src={images[selectedImage]}
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

                {/* Floating Badges - More Elegant */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {product.bestSeller && (
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 text-xs font-semibold rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      Best Seller
                    </span>
                  )}
                  {product.featured && !product.bestSeller && (
                    <span className="px-4 py-2 bg-gradient-to-r from-[#d6869d] to-[#e89ab0] text-white text-xs font-semibold rounded-full shadow-xl backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold rounded-full shadow-xl backdrop-blur-sm">
                      −{Math.round((1 - currentPrice / product.originalPrice!) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery - More Chic */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-500 ${
                        idx === selectedImage
                          ? 'ring-2 ring-[#d6869d] ring-offset-3 shadow-xl scale-105'
                          : 'ring-1 ring-gray-200 hover:ring-[#d6869d]/40 hover:scale-105 shadow-md'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Info - More Chic */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header - Elegant Typography */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#d6869d]/10 to-[#e89ab0]/10 text-[#d6869d] text-xs font-semibold rounded-full uppercase tracking-widest border border-[#d6869d]/20">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-rose-600 font-medium bg-rose-50 px-3 py-1.5 rounded-full">Out of Stock</span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-[1.1] tracking-tight">
                  {product.name}
                </h1>

                {/* Rating - More Elegant */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{reviewCount} verified reviews</span>
                </div>

                {/* Price - More Luxurious */}
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-light text-gray-900 tracking-tight">
                    {Number(currentPrice).toFixed(0)} <span className="text-2xl text-gray-500">EGP</span>
                  </span>
                  {hasDiscount && (
                    <div className="flex flex-col">
                      <span className="text-xl text-gray-400 line-through font-light">
                        {Number(product.originalPrice).toFixed(0)} EGP
                      </span>
                      <span className="text-sm text-emerald-600 font-medium">You save {Math.round(product.originalPrice! - currentPrice)} EGP</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent" />

              {/* Product Type Selection - More Chic Cards */}
              {product.category === 'Lipgloss' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 mb-4 block uppercase tracking-wider">
                      Choose Your Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedType('squeez')}
                        className={`relative p-5 rounded-3xl border-2 transition-all duration-500 text-left group overflow-hidden ${
                          selectedType === 'squeez'
                            ? 'border-[#d6869d] bg-gradient-to-br from-[#d6869d]/5 to-[#e89ab0]/10 shadow-lg'
                            : 'border-gray-100 bg-white hover:border-[#d6869d]/30 hover:shadow-md'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 text-lg">Squeeze Tube</div>
                        <div className="text-sm text-gray-500 mt-2 flex items-baseline gap-1">
                          <span className="font-medium text-gray-900">{squeezPricing.price} EGP</span>
                          <span className="text-xs">/each</span>
                        </div>
                        {selectedType === 'squeez' && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#d6869d] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedType('big-brush')}
                        className={`relative p-5 rounded-3xl border-2 transition-all duration-500 text-left group overflow-hidden ${
                          selectedType === 'big-brush'
                            ? 'border-[#d6869d] bg-gradient-to-br from-[#d6869d]/5 to-[#e89ab0]/10 shadow-lg'
                            : 'border-gray-100 bg-white hover:border-[#d6869d]/30 hover:shadow-md'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 text-lg">Big Brush</div>
                        <div className="text-sm text-gray-500 mt-2 flex items-baseline gap-1">
                          <span className="font-medium text-gray-900">{bigBrushPricing.price} EGP</span>
                          <span className="text-xs">/each</span>
                        </div>
                        {selectedType === 'big-brush' && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#d6869d] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Shade Selection - More Elegant */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Select Shades
                      </label>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {selectedLipglossShades.length}/{quantity} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      {lipglossShadesForModal.slice(0, 14).map((s) => {
                        const count = selectedLipglossShades.filter((x) => x === String(s.id)).length;
                        const isSelected = count > 0;
                        return (
                          <button
                            key={s.id}
                            onClick={() => handleLipglossSwatchClick(String(s.id))}
                            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                              isSelected
                                ? 'ring-2 ring-[#d6869d] ring-offset-2 scale-110 z-10 shadow-lg'
                                : 'hover:scale-105 ring-1 ring-gray-100'
                            }`}
                            title={s.name}
                          >
                            <Image
                              src={s.image}
                              alt={s.name}
                              fill
                              className="object-cover"
                              sizes="60px"
                            />
                            {count > 1 && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d6869d] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                                {count}
                              </span>
                            )}
                            {isSelected && (
                              <div className="absolute inset-0 bg-gradient-to-t from-[#d6869d]/40 to-transparent flex items-end justify-center pb-1">
                                <Check className="w-3 h-3 text-white drop-shadow-md" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedLipglossShades.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedLipglossShades.map((shadeId, idx) => {
                          const shade = lipglossShadesForModal.find((s) => String(s.id) === shadeId);
                          return shade ? (
                            <span
                              key={`${shadeId}-${idx}`}
                              className="px-4 py-2 bg-gradient-to-r from-[#d6869d]/10 to-[#e89ab0]/10 text-[#d6869d] text-sm font-semibold rounded-full border border-[#d6869d]/20"
                            >
                              {shade.name.replace('Lipgloss - ', '')}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bundle Selection */}
              {product.category === 'Bundles' && requiredBundleCount > 0 && (
                <div className="p-6 bg-gradient-to-br from-[#fff5f7] to-white rounded-2xl border border-[#ffd3df]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Bundle Options</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedShades.length}/{requiredBundleCount} selected
                      </p>
                    </div>
                    <button
                      onClick={() => setShowShadesModal(true)}
                      className="px-6 py-2.5 bg-[#d6869d] text-white text-sm font-medium rounded-full hover:bg-[#c5758e] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {selectedShades.length === requiredBundleCount ? 'Edit' : 'Select'}
                    </button>
                  </div>
                  {bundleSteps.length > 0 && (
                    <div className="space-y-2">
                      {bundleSteps.map((_, idx) => {
                        const sid = selectedShades[idx];
                        const shade = sid ? products.find((p) => p.id === sid) : undefined;
                        const shadeLabel = sid ? (shade?.name?.replace('Lipgloss - ', '') || sid) : undefined;
                        return (
                          <div
                            key={idx}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                              shadeLabel ? 'bg-white shadow-sm' : 'bg-gray-50'
                            }`}
                          >
                            <span className="text-sm font-medium text-[#d6869d]">
                              {getStepLabelForIndex(bundleSteps, idx)}
                            </span>
                            <span className={`text-sm ${shadeLabel ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                              {shadeLabel || 'Not selected'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Quantity & Add to Cart - More Luxurious */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  {/* Quantity Selector - Elegant */}
                  <div className="flex items-center bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-14 h-14 flex items-center justify-center text-gray-500 hover:text-[#d6869d] hover:bg-[#d6869d]/5 transition-all rounded-l-2xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 h-14 flex items-center justify-center font-semibold text-lg text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-14 h-14 flex items-center justify-center text-gray-500 hover:text-[#d6869d] hover:bg-[#d6869d]/5 transition-all rounded-r-2xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button - Premium */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={`flex-1 h-14 rounded-2xl font-semibold text-sm tracking-wide uppercase transition-all duration-500 flex items-center justify-center gap-3 shadow-lg ${
                      addedToCart
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : 'bg-gradient-to-r from-[#d6869d] to-[#c5758e] text-white hover:shadow-xl hover:-translate-y-0.5'
                    } ${!canAddToCart && !addedToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  {/* Favorite Button - Elegant */}
                  <button
                    onClick={toggleFavorite}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isFavorite(product.id)
                        ? 'bg-[#d6869d] text-white shadow-[#d6869d]/30'
                        : 'bg-white border border-gray-200 text-gray-400 hover:text-[#d6869d] hover:border-[#d6869d]/50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {!canAddToCart && !addedToCart && (
                  <p className="text-sm text-amber-600 text-center">
                    {product.category === 'Bundles' && !isBundleSelectionComplete
                      ? `Please select ${requiredBundleCount} shades first.`
                      : product.category === 'Lipgloss' && !isLipglossSelectionComplete
                      ? `Please select ${quantity} shade${quantity === 1 ? '' : 's'} first.`
                      : ''}
                  </p>
                )}
              </div>

              {/* Trust Badges - More Elegant */}
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
            </div>
          </div>

          {/* Product Details Tabs - Chic Section */}
          <div className="mt-20">
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
              {(['description', 'details', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-all relative ${
                    activeTab === tab
                      ? 'text-[#d6869d]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d6869d] rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="max-w-3xl">
              {activeTab === 'description' && product.description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                </div>
              )}
              {activeTab === 'description' && !product.description && (
                <p className="text-gray-500 italic">No description available for this product.</p>
              )}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Category</span>
                      <p className="font-semibold text-gray-900 mt-1">{product.category}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Availability</span>
                      <p className={`font-semibold mt-1 ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
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

          {/* Related Products - Chic Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-light text-gray-900">
                    You May Also <span className="text-[#d6869d] font-normal">Like</span>
                  </h2>
                  <p className="text-gray-500 mt-2">Handpicked favorites just for you</p>
                </div>
                <Link
                  href="/products"
                  className="group flex items-center gap-2 text-sm font-semibold text-[#d6869d] hover:text-[#c5758e] transition-colors"
                >
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
                    onToggleFavorite={(p) => toggleFavoriteProduct(p)}
                    onAddToCart={(productToAdd) => handleAddToCartFromCard(productToAdd)}
                    hrefQuery={{ category: categoryFromUrl, page: pageFromUrl }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <ShadesModal
        show={showShadesModal}
        onClose={() => setShowShadesModal(false)}
        lipglossShades={lipglossShadesForModal}
        selectedShades={selectedShades}
        setSelectedShades={setSelectedShades}
        requiredCount={requiredBundleCount}
        shadeSwatches={shadeSwatches}
        title={bundleModalTitle}
        stepLabels={bundleStepLabels}
      />

      <ShadesModal
        show={showLipglossShadesModal && product.category === 'Lipgloss'}
        onClose={() => setShowLipglossShadesModal(false)}
        onDone={() => {
          if (selectedLipglossShades.length !== quantity) return;
          setShowLipglossShadesModal(false);
        }}
        title={`Select ${quantity} Shade${quantity === 1 ? '' : 's'}`}
        lipglossShades={lipglossShadesForModal}
        selectedShades={selectedLipglossShades}
        setSelectedShades={setSelectedLipglossShades}
        requiredCount={quantity}
        shadeSwatches={shadeSwatches}
      />
    </div>
  );
}
