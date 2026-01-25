'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
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
import MiniShadesModal from '@/components/MiniShadesModal';
import { getLipglossVariantPricing, getUnitPrice } from '@/lib/pricing';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [selectedShades, setSelectedShades] = useState<string[]>([]);
  const [showShadesModal, setShowShadesModal] = useState(false);
  const [selectedMiniShade, setSelectedMiniShade] = useState<string | null>(null);
  const [showMiniModal, setShowMiniModal] = useState(false);

  const product = products.find((p) => p.id === params.id);

  const squeezPricing = getLipglossVariantPricing('squeez');
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
      if (selectedType === 'squeez' && !selectedMiniShade) {
        setShowMiniModal(true);
        return;
      }

      const miniShadeName = selectedMiniShade
        ? (products.find((p) => p.id === selectedMiniShade)?.name?.replace('Lipgloss - ', '') || selectedMiniShade)
        : null;

      const uniqueId = `${product.id}-t-${selectedType}${selectedType === 'squeez' && selectedMiniShade ? `-m-${selectedMiniShade}` : ''}`;
      productToAdd = {
        ...product,
        id: uniqueId,
        name: `${product.name} (${selectedType === 'squeez' ? 'Squeez' : 'Big Brush'}${miniShadeName ? `, Mini: ${miniShadeName}` : ''})`,
        selectedType,
        miniShade: selectedMiniShade || undefined,
      };
    } else if (product.category === 'Bundles') {
      const required = product.id === '7' ? 2 : product.id === '8' ? 3 : 0;
      if (required > 0 && selectedShades.length !== required) {
        setShowShadesModal(true);
        return;
      }
      // Group duplicate shades for clearer naming, e.g., "Blossom x2"
      const counts: Record<string, number> = {};
      selectedShades.forEach((sid) => { counts[sid] = (counts[sid] || 0) + 1; });
      const shadeNames = Object.entries(counts).map(([sid, c]) => {
        const base = products.find((p) => p.id === sid)?.name?.replace('Lipgloss - ', '') || sid;
        return c > 1 ? `${base} x${c}` : base;
      });
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
  const requiredBundleCount = product.category === 'Bundles' ? (product.id === '7' ? 2 : product.id === '8' ? 3 : 0) : 0;
  const isBundleSelectionComplete = product.category !== 'Bundles' || requiredBundleCount === 0 || selectedShades.length === requiredBundleCount;
  const isSqueezMiniComplete = product.category !== 'Lipgloss' || selectedType !== 'squeez' || !!selectedMiniShade;
  const canAddToCart = !addedToCart && isBundleSelectionComplete && isSqueezMiniComplete;

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

              {product.category === 'Bundles' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm tracking-wide text-[#d6869d] font-medium mb-1">Choose Shades</p>
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
                  {selectedShades.length > 0 && (
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
                  )}
                </div>
              )}

              {product.category === 'Lipgloss' && selectedType === 'squeez' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm tracking-wide text-[#d6869d] font-medium mb-1">Choose Mini Shade</p>
                      <p className="text-xs text-gray-600">{selectedMiniShade ? '1/1 selected' : '0/1 selected'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowMiniModal(true)}
                      className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md hover:shadow-lg"
                    >
                      {selectedMiniShade ? 'Edit' : 'Select'}
                    </button>
                  </div>
                  {selectedMiniShade && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(() => {
                        const shade = products.find((p) => p.id === selectedMiniShade!);
                        const label = shade?.name?.replace('Lipgloss - ', '') || selectedMiniShade!;
                        return (
                          <span className="px-3 py-1 rounded-full text-xs bg-[#ffe9f0] text-[#d6869d] border border-[#ffd3df]">
                            Mini: {label}
                          </span>
                        );
                      })()}
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
                      : (product.category === 'Lipgloss' && selectedType === 'squeez' && !isSqueezMiniComplete)
                        ? 'Please select a mini shade first.'
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <div className="group">
                      <div className="relative h-[300px] sm:h-[400px] mb-4 overflow-hidden bg-[#ffe9f0] rounded-3xl border-2 border-[#ffe9f0] shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-[#d6869d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      </div>
                      <h3 className="text-base font-medium tracking-wide mb-2 text-gray-800 group-hover:text-[#d6869d] transition-colors">
                        {relatedProduct.name.toLowerCase()}
                      </h3>
                      <p className="text-sm text-[#d6869d] font-medium">
                        {relatedProduct.price} EGP
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ShadesModal
        show={showShadesModal && product.category === 'Bundles'}
        onClose={() => setShowShadesModal(false)}
        lipglossShades={lipglossShades as any}
        selectedShades={selectedShades}
        setSelectedShades={setSelectedShades}
        requiredCount={requiredBundleCount}
        shadeSwatches={shadeSwatches}
      />

      <MiniShadesModal
        show={showMiniModal && product.category === 'Lipgloss' && selectedType === 'squeez'}
        onClose={() => setShowMiniModal(false)}
        onDone={() => {
          setShowMiniModal(false);
        }}
        lipglossShades={lipglossShades as any}
        selectedMiniShade={selectedMiniShade}
        setSelectedMiniShade={setSelectedMiniShade}
        shadeSwatches={shadeSwatches}
      />
    </div>
  );
}
