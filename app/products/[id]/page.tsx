'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Check, Star, Truck, Users, Package } from 'lucide-react';
import ProductMediaGallery from '@/components/ProductMediaGallery';
import ProductHeaderPrice from '@/components/ProductHeaderPrice';
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

  const product = products.find((p) => p.id === params.id);

  const squeezPricing = getLipglossVariantPricing('squeez');
  const bigBrushPricing = getLipglossVariantPricing('big-brush');

  const rating = (product as any)?.rating ?? 5;
  const reviewCount = (product as any)?.reviewCount ?? 148;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-wide mb-6">Product Not Found</h1>
          <Link href="/products" className="text-sm tracking-widest uppercase hover:underline">
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

      router.push(
        `/products/${p.id}?category=${encodeURIComponent(categoryFromUrl)}&page=${encodeURIComponent(pageFromUrl)}`
      );
      return;
    }

    if (p.category === 'Bundles') {
      router.push(
        `/products/${p.id}?category=${encodeURIComponent(categoryFromUrl)}&page=${encodeURIComponent(pageFromUrl)}&openShades=1`
      );
      return;
    }

    for (let i = 0; i < qty; i++) {
      addToCart(p);
    }
  };

  const images = product.images || [product.image];
  const lipglossShades = products.filter((p) => p.category === 'Lipgloss' && p.isShade);
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
    '27': '#FF6FAE',
    '28': '#A1122A',
    '29': '#6B4F3B',
  };
  const lipglossShadesForModal = lipglossShades.map((p) => ({
    id: p.id,
    name: p.name,
    swatchColor: shadeSwatches[p.id],
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
      const next = [...prev];
      const existingIndex = next.indexOf(shadeId);
      if (existingIndex !== -1) {
        next.splice(existingIndex, 1);
        return next;
      }

      if (next.length >= quantity) return next;
      next.push(shadeId);
      return next;
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => {
              const cat = searchParams.get('category') || 'All';
              const page = searchParams.get('page') || '1';
              router.push(`/products?category=${encodeURIComponent(cat)}&page=${encodeURIComponent(page)}`);
            }}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-8 text-[#d6869d] hover:opacity-80 transition-colors font-medium"
          >
            Back to Shop
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ProductMediaGallery images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              {images.length > 1 ? (
                <div className="mt-6 flex items-center justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`h-2 rounded-full transition-all ${idx === selectedImage ? 'w-10 bg-[#d6869d]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="space-y-8">
              {product.category === 'Lipgloss' ? (
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-gray-900">
                    {product.name}{' '}
                    <span className="text-gray-600">({selectedType === 'squeez' ? 'squeeze tube' : 'big brush'})</span>
                  </h1>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-[#d6869d] text-[#d6869d]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span>({reviewCount} customer reviews)</span>
                  </div>

                  <div className="pt-2 text-2xl font-light tracking-wide text-gray-900">
                    {Number(getCurrentPrice()).toFixed(2)} EGP
                  </div>
                </div>
              ) : (
                <ProductHeaderPrice
                  category={product.category}
                  name={product.name}
                  currentPrice={getCurrentPrice()}
                  isLipgloss={product.category === 'Lipgloss'}
                  selectedType={selectedType}
                  originalPrice={product.originalPrice}
                  bestSeller={product.bestSeller}
                />
              )}

              {product.category === 'Lipgloss' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-3">TYPE</p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedType('squeez')}
                        className={`px-4 py-2 rounded-full border text-xs tracking-[0.2em] uppercase transition-colors ${
                          selectedType === 'squeez'
                            ? 'bg-[#d6869d] border-[#d6869d] text-white'
                            : 'bg-white border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
                        }`}
                      >
                        Squeez
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedType('big-brush')}
                        className={`px-4 py-2 rounded-full border text-xs tracking-[0.2em] uppercase transition-colors ${
                          selectedType === 'big-brush'
                            ? 'bg-[#d6869d] border-[#d6869d] text-white'
                            : 'bg-white border-[#ffe9f0] text-[#d6869d] hover:bg-[#ffe9f0]'
                        }`}
                      >
                        Big Brush
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-end justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs tracking-[0.25em] uppercase text-gray-500">COLOR</p>
                        <p className="mt-1 text-xs text-gray-600">{selectedLipglossShades.length}/{quantity} selected</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedLipglossShades([])}
                        className="text-xs tracking-[0.2em] uppercase text-[#d6869d] hover:opacity-80"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-7 gap-3">
                      {lipglossShadesForModal.map((s) => {
                        const count = selectedLipglossShades.filter((x) => x === String(s.id)).length;
                        const isSelected = count > 0;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handleLipglossSwatchClick(String(s.id))}
                            className={`relative h-11 w-11 sm:h-10 sm:w-10 rounded-full border transition-all ${
                              isSelected
                                ? 'border-[#d6869d] ring-4 ring-[#d6869d]/35 shadow-md'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: s.swatchColor || '#fff' }}
                            aria-label={s.name}
                          >
                            {count > 1 ? (
                              <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-[#d6869d] text-white text-[10px] leading-5 text-center">
                                {count}
                              </span>
                            ) : null}
                            {isSelected ? (
                              <>
                                <span className="absolute inset-0 rounded-full bg-black/10" />
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <span className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
                                    <Check className="w-4 h-4 text-[#d6869d]" />
                                  </span>
                                </span>
                              </>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {product.category === 'Bundles' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm tracking-wide text-[#d6869d] font-medium mb-1">Choose Bundle Options</p>
                      <p className="text-xs text-gray-600">{selectedShades.length}/{requiredBundleCount} selected</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowShadesModal(true)}
                      className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md hover:shadow-lg"
                    >
                      {selectedShades.length === requiredBundleCount ? 'Edit' : 'Select'}
                    </button>
                  </div>
                  {bundleSteps.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {bundleSteps.map((_, idx) => {
                        const sid = selectedShades[idx];
                        const shade = sid ? products.find((p) => p.id === sid) : undefined;
                        const shadeLabel = sid ? (shade?.name?.replace('Lipgloss - ', '') || sid) : undefined;
                        return (
                          <div key={idx} className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-[#ffe9f0] border border-[#ffd3df]">
                            <span className="text-xs font-medium text-[#d6869d]">{getStepLabelForIndex(bundleSteps, idx)}</span>
                            <span className={`text-xs font-medium ${shadeLabel ? 'text-gray-800' : 'text-gray-500'}`}>
                              {shadeLabel || 'Not selected'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : selectedShades.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {Object.entries(selectedShades.reduce((acc: Record<string, number>, sid) => {
                        acc[sid] = (acc[sid] || 0) + 1; return acc;
                      }, {})).map(([sid, count]) => {
                        const shade = products.find((p) => p.id === sid);
                        const label = shade?.name?.replace('Lipgloss - ', '') || sid;
                        return (
                          <span key={sid} className="px-3 py-1 rounded-full text-xs bg-[#ffe9f0] text-[#d6869d] border border-[#ffd3df]">
                            {label}{count > 1 ? ` x${count}` : ''}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#ffe9f0] rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[#d6869d] hover:bg-[#ffe9f0] transition-colors"
                  >
                    −
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center font-medium text-[#d6869d]">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[#d6869d] hover:bg-[#ffe9f0] transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="flex-1 bg-[#d6869d] text-white px-8 h-12 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 hover:opacity-90"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      ADD TO CART
                    </>
                  )}
                </button>
              </div>

                {!canAddToCart && !addedToCart && (
                  <p className="text-xs text-gray-600 text-center">
                    {product.category === 'Bundles' && !isBundleSelectionComplete
                      ? `Please select ${requiredBundleCount} shades first.`
                      : (product.category === 'Lipgloss' && !isLipglossSelectionComplete)
                        ? `Please select ${quantity} shade${quantity === 1 ? '' : 's'} first.`
                      : ''}
                  </p>
                )}

              <button
                onClick={toggleFavorite}
                className="w-full border-2 border-[#d6869d] text-[#d6869d] px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl"
              >
                <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : ''}`} />
                {isFavorite(product.id) ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
              </button>

              {product.category === 'Lipgloss' ? (
                <div className="pt-2 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#d6869d]" />
                    <span>Join over +50k happy customers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#d6869d]" />
                    <span>2-7 delivery days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#d6869d]" />
                    <span>Free shipping over 999 EGP</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#d6869d] font-medium">Category</span>
                    <span className="font-medium text-gray-800">{product.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#d6869d] font-medium">Availability</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="mt-32">
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide mb-12 text-center">
                <span className="text-[#d6869d]"> You May Also Like </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          ) : null}
        </div>
      </div>

      <Footer />
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
