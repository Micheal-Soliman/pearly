'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import ProductMediaGallery from '@/components/ProductMediaGallery';
import ProductHeaderPrice from '@/components/ProductHeaderPrice';
import QuantitySelector from '@/components/QuantitySelector';
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
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez' | 'squeez-mini'>('big-brush');
  const [selectedShades, setSelectedShades] = useState<string[]>([]);
  const [showShadesModal, setShowShadesModal] = useState(false);
  const [showSqueezMiniModal, setShowSqueezMiniModal] = useState(false);
  const [squeezSelectedMiniShades, setSqueezSelectedMiniShades] = useState<string[]>([]);

  const product = products.find((p) => p.id === params.id);

  const squeezPricing = getLipglossVariantPricing('squeez');
  const squeezMiniPricing = getLipglossVariantPricing('squeez-mini');
  const bigBrushPricing = getLipglossVariantPricing('big-brush');

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

  const handleAddToCart = () => {
    let productToAdd: any = product;
    if (product.category === 'Lipgloss') {
      if (selectedType === 'squeez-mini' && squeezSelectedMiniShades.length !== quantity) {
        setShowSqueezMiniModal(true);
        return;
      }

      if (selectedType === 'squeez-mini') {
        squeezSelectedMiniShades.forEach((miniId) => {
          const miniShadeName =
            products.find((p) => p.id === miniId)?.name?.replace('Lipgloss - ', '') || miniId;
          const uniqueId = `${product.id}-t-squeez-mini-m-${miniId}`;
          const itemToAdd: any = {
            ...product,
            id: uniqueId,
            name: `${product.name} (Squeez, Mini: ${miniShadeName})`,
            selectedType: 'squeez-mini',
            miniShade: miniId,
          };
          addToCart(itemToAdd);
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
        return;
      }

      const uniqueId = `${product.id}-t-${selectedType}`;
      const typeLabel = selectedType === 'squeez' ? 'Squeez' : 'Big Brush';
      productToAdd = {
        ...product,
        id: uniqueId,
        name: `${product.name} (${typeLabel})`,
        selectedType,
      };
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
  const lipglossShades = products.filter((p) => p.category === 'Lipgloss');
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
  const isSqueezMiniComplete = product.category !== 'Lipgloss' || selectedType !== 'squeez-mini' || squeezSelectedMiniShades.length === quantity;
  const canAddToCart = !addedToCart && isBundleSelectionComplete && isSqueezMiniComplete;

  useEffect(() => {
    if (product.category !== 'Lipgloss') return;
    if (selectedType !== 'squeez-mini') return;
    setSqueezSelectedMiniShades((prev) => {
      if (prev.length <= quantity) return prev;
      return prev.slice(0, quantity);
    });
  }, [product.category, selectedType, quantity]);

  useEffect(() => {
    if (product.category !== 'Bundles') return;
    if (searchParams.get('openShades') !== '1') return;
    setShowShadesModal(true);
  }, [product.category, searchParams]);

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
            <ProductMediaGallery images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

            <div className="space-y-8">
              <ProductHeaderPrice
                category={product.category}
                name={product.name}
                currentPrice={getCurrentPrice()}
                isLipgloss={product.category === 'Lipgloss'}
                selectedType={selectedType}
                originalPrice={product.originalPrice}
                bestSeller={product.bestSeller}
              />

              {product.category === 'Lipgloss' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <p className="text-sm tracking-wide text-[#d6869d] font-medium mb-4">Choose Your Option</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType('squeez');
                        setSqueezSelectedMiniShades([]);
                        setShowSqueezMiniModal(false);
                      }}
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
                        <p className="text-xs opacity-80 mt-1">No mini</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType('squeez-mini');
                      }}
                      className={`w-full p-4 border-2 transition-all rounded-2xl ${
                        selectedType === 'squeez-mini'
                          ? 'border-[#d6869d] bg-[#d6869d] text-white shadow-lg'
                          : 'border-[#ffe9f0] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium">Squeez + Mini</p>
                        <p className="text-sm opacity-80">
                          <span className="font-semibold">{squeezMiniPricing.price} EGP</span>
                          <span className="line-through ml-2 opacity-70">{squeezMiniPricing.originalPrice} EGP</span>
                        </p>
                        <p className="text-xs opacity-80 mt-1">Includes a mini</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType('big-brush');
                        setSqueezSelectedMiniShades([]);
                        setShowSqueezMiniModal(false);
                      }}
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
                        <p className="text-xs opacity-80 mt-1">No mini</p>
                      </div>
                    </button>
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

              {product.category === 'Lipgloss' && selectedType === 'squeez-mini' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm tracking-wide text-[#d6869d] font-medium mb-1">Choose Mini Shade</p>
                      <p className="text-xs text-gray-600">{squeezSelectedMiniShades.length}/{quantity} selected</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSqueezMiniModal(true)}
                      className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md hover:shadow-lg"
                    >
                      {squeezSelectedMiniShades.length === quantity ? 'Edit' : 'Select'}
                    </button>
                  </div>
                  {squeezSelectedMiniShades.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {Object.entries(squeezSelectedMiniShades.reduce((acc: Record<string, number>, sid) => {
                        acc[sid] = (acc[sid] || 0) + 1; return acc;
                      }, {})).map(([sid, count]) => {
                        const shade = products.find((p) => p.id === sid);
                        const label = shade?.name?.replace('Lipgloss - ', '') || sid;
                        return (
                          <span key={sid} className="px-3 py-1 rounded-full text-xs bg-[#ffe9f0] text-[#d6869d] border border-[#ffd3df]">
                            Mini: {label}{count > 1 ? ` x${count}` : ''}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="w-full bg-[#d6869d] text-white px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:opacity-90"
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

                {!canAddToCart && !addedToCart && (
                  <p className="text-xs text-gray-600 text-center">
                    {product.category === 'Bundles' && !isBundleSelectionComplete
                      ? `Please select ${requiredBundleCount} shades first.`
                      : (product.category === 'Lipgloss' && selectedType === 'squeez-mini' && !isSqueezMiniComplete)
                        ? `Please select ${quantity} mini shade${quantity === 1 ? '' : 's'} first.`
                        : ''}
                  </p>
                )}

                <button
                  onClick={toggleFavorite}
                  className="w-full border-2 border-[#d6869d] text-[#d6869d] px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : ''
                      }`}
                  />
                  {isFavorite(product.id) ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
                </button>
              </div>

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
            </div>
          </div>

          <div className="mt-32">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide mb-12 text-center">
              <span className="text-[#d6869d]"> You May Also Like </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
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
        </div>
      </div>

      <Footer />
      <ShadesModal
        show={showShadesModal && product.category === 'Bundles'}
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
        show={showSqueezMiniModal && product.category === 'Lipgloss' && selectedType === 'squeez-mini'}
        onClose={() => setShowSqueezMiniModal(false)}
        onDone={() => {
          if (squeezSelectedMiniShades.length !== quantity) return;
          setShowSqueezMiniModal(false);
        }}
        title={`Select ${quantity} Mini Shade${quantity === 1 ? '' : 's'}`}
        lipglossShades={lipglossShadesForModal}
        selectedShades={squeezSelectedMiniShades}
        setSelectedShades={setSqueezSelectedMiniShades}
        requiredCount={quantity}
        shadeSwatches={shadeSwatches}
      />
    </div>
  );
}
