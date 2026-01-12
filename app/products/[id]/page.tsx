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
import { ShoppingBag, Heart, Minus, Plus, Check } from 'lucide-react';

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
      productToAdd = { ...product, selectedType, price: selectedType === 'big-brush' ? 250 : 180 };
    } else if (product.category === 'Bundles') {
      const required = product.id === '7' ? 2 : product.id === '8' ? 3 : product.id === '30' ? 1 : 0;
      if (required > 0 && selectedShades.length !== required) {
        return;
      }
      if (product.id === '30' && !selectedMiniShade) {
        return;
      }
      // Group duplicate shades for clearer naming, e.g., "Blossom x2"
      const counts: Record<string, number> = {};
      selectedShades.forEach((sid) => { counts[sid] = (counts[sid] || 0) + 1; });
      const shadeNames = Object.entries(counts).map(([sid, c]) => {
        const base = products.find((p) => p.id === sid)?.name?.replace('Lipgloss - ', '') || sid;
        return c > 1 ? `${base} x${c}` : base;
      });
      const miniShadeName = selectedMiniShade ? (products.find((p) => p.id === selectedMiniShade)?.name?.replace('Lipgloss - ', '') || selectedMiniShade) : null;
      const uniqueId = `${product.id}-b-${selectedShades.join('-')}${selectedMiniShade ? `-m-${selectedMiniShade}` : ''}`;
      productToAdd = {
        ...product,
        id: uniqueId,
        name: `${product.name} (${shadeNames.join(', ')}${miniShadeName ? `, Mini: ${miniShadeName}` : ''})`,
        bundleShades: selectedShades,
        bundleMiniShade: selectedMiniShade || undefined,
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
      return selectedType === 'big-brush' ? 250 : 180;
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
  const requiredBundleCount = product.category === 'Bundles' ? (product.id === '7' ? 2 : product.id === '8' ? 3 : product.id === '30' ? 1 : 0) : 0;

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
            <div className="space-y-4">
              <div className="relative h-[500px] lg:h-[700px] bg-[#ffe9f0] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#ffe9f0]">
                {images[selectedImage].toLowerCase().endsWith('.mov') || 
                 images[selectedImage].toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={images[selectedImage]}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-28 bg-[#ffe9f0] rounded-2xl overflow-hidden transition-all duration-300 ${
                        selectedImage === idx ? 'ring-4 ring-[#d6869d] shadow-lg scale-105' : 'ring-2 ring-[#ffe9f0] hover:ring-[#d6869d]'
                      }`}
                    >
                      {img.toLowerCase().endsWith('.mov') || img.toLowerCase().endsWith('.mp4') ? (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                            <span className="text-xs">Video</span>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                <p className="text-xs tracking-widest uppercase text-[#d6869d] font-medium mb-3 flex items-center gap-2">
                  {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-6 text-gray-800">
                  {product.name}
                </h1>
                <p className="text-4xl font-medium text-[#d6869d] flex items-baseline gap-3">
                  <span>{getCurrentPrice()} EGP</span>
                  {product.category === 'Lipgloss' ? (
                    <span className="text-2xl line-through text-gray-400">
                      {selectedType === 'big-brush' ? '300' : '210'} EGP
                    </span>
                  ) : product.originalPrice ? (
                    <span className="text-2xl line-through text-gray-400">
                      {product.originalPrice} EGP
                    </span>
                  ) : null}
                </p>
                {product.bestSeller && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#d6869d] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                    Best Seller
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                <h3 className="text-sm tracking-widest uppercase text-[#d6869d] font-medium mb-4">Description</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

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

              {product.category === 'Bundles' && product.id === '30' && (
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

              {product.category === 'Lipgloss' && (
                <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                  <p className="text-sm tracking-wide mb-4 text-[#d6869d] font-medium">SELECT TYPE</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedType('squeez')}
                      className={`p-4 border-2 text-left transition-all rounded-2xl ${
                        selectedType === 'squeez'
                          ? 'border-[#d6869d] bg-[#d6869d] text-white shadow-lg scale-105'
                          : 'border-[#ffe9f0] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                      }`}
                    >
                      <p className="font-medium">Squeez</p>
                      <p className="text-sm opacity-80">
                        <span className="font-semibold">180 EGP</span>
                        <span className="line-through ml-2 opacity-70">210 EGP</span>
                      </p>
                    </button>
                    <button
                      onClick={() => setSelectedType('big-brush')}
                      className={`p-4 border-2 text-left transition-all rounded-2xl ${
                        selectedType === 'big-brush'
                          ? 'border-[#d6869d] bg-[#d6869d] text-white shadow-lg scale-105'
                          : 'border-[#ffe9f0] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
                      }`}
                    >
                      <p className="font-medium">Big Brush</p>
                      <p className="text-sm opacity-80">
                        <span className="font-semibold">250 EGP</span>
                        <span className="line-through ml-2 opacity-70">300 EGP</span>
                      </p>
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-3xl p-6 border-2 border-[#ffe9f0] shadow-lg">
                <p className="text-sm tracking-wide mb-4 text-[#d6869d] font-medium">QUANTITY</p>
                <div className="flex items-center border-2 border-[#ffe9f0] rounded-full overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium text-[#d6869d]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#ffe9f0] transition-colors text-[#d6869d]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    addedToCart || (
                      product.category === 'Bundles' && (
                        (requiredBundleCount > 0 && selectedShades.length !== requiredBundleCount) ||
                        (product.id === '30' && !selectedMiniShade)
                      )
                    )
                  }
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
                      {product.category === 'Bundles'
                        ? (requiredBundleCount > 0 && selectedShades.length !== requiredBundleCount
                            ? `SELECT ${requiredBundleCount} SHADES`
                            : (product.id === '30' && !selectedMiniShade)
                              ? 'SELECT MINI'
                              : 'ADD TO CART')
                        : 'ADD TO CART'}
                    </>
                  )}
                </button>

                <button
                  onClick={toggleFavorite}
                  className="w-full border-2 border-[#d6869d] text-[#d6869d] px-8 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#ffe9f0] transition-all duration-300 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id) ? 'fill-[#d6869d] text-[#d6869d]' : ''
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
                  <span className={`font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
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
      {showShadesModal && product.category === 'Bundles' && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShadesModal(false)}
        >
          <div
            className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#d6869d]">Select {requiredBundleCount} Shades</h3>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-[#d6869d]"
                onClick={() => setShowShadesModal(false)}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-auto">
              {lipglossShades.map((shade) => {
                const count = selectedShades.filter((sid) => sid === shade.id).length;
                const isSelected = count > 0;
                return (
                  <div
                    key={shade.id}
                    className={`relative p-3 border-2 rounded-2xl text-left transition-all ${
                      isSelected ? 'border-[#d6869d] bg-[#ffe9f0] shadow-lg' : 'border-[#ffe9f0] hover:border-[#d6869d]'
                    }`}
                  >
                    {/* Add occurrence on card click */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedShades((prev) => {
                          if (requiredBundleCount && prev.length >= requiredBundleCount) return prev;
                          return [...prev, shade.id];
                        });
                      }}
                      className="block w-full"
                    >
                      <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden border-2 border-[#ffd3df]">
                        <div className="absolute inset-0" style={{ backgroundColor: (shade as any).swatchColor || shadeSwatches[shade.id] || '#ffe9f0' }} />
                        {count > 0 && (
                          <span className="absolute top-2 left-2 bg-[#d6869d] text-white text-xs rounded-full px-2 py-0.5 shadow">
                            x{count}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{shade.name.replace('Lipgloss - ', '')}</p>
                    </button>
                    {count > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShades((prev) => {
                            const idx = prev.indexOf(shade.id);
                            if (idx === -1) return prev;
                            const next = [...prev];
                            next.splice(idx, 1);
                            return next;
                          });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-[#d6869d] flex items-center justify-center shadow"
                        aria-label="Remove one"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowShadesModal(false)}
                disabled={selectedShades.length !== requiredBundleCount}
                className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md disabled:opacity-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showMiniModal && product.category === 'Bundles' && product.id === '30' && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowMiniModal(false)}
        >
          <div
            className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#d6869d]">Select 1 Mini Shade</h3>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-[#d6869d]"
                onClick={() => setShowMiniModal(false)}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-auto">
              {lipglossShades.map((shade) => {
                const isSelected = selectedMiniShade === shade.id;
                return (
                  <button
                    key={shade.id}
                    type="button"
                    onClick={() => setSelectedMiniShade(shade.id)}
                    className={`relative p-3 border-2 rounded-2xl text-left transition-all ${
                      isSelected ? 'border-[#d6869d] bg-[#ffe9f0] shadow-lg' : 'border-[#ffe9f0] hover:border-[#d6869d]'
                    }`}
                  >
                    <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden border-2 border-[#ffd3df]">
                      <div className="absolute inset-0" style={{ backgroundColor: (shade as any).swatchColor || shadeSwatches[shade.id] || '#ffe9f0' }} />
                      {isSelected && (
                        <span className="absolute top-2 left-2 bg-[#d6869d] text-white text-xs rounded-full px-2 py-0.5 shadow">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{shade.name.replace('Lipgloss - ', '')}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowMiniModal(false)}
                disabled={!selectedMiniShade}
                className="px-5 py-2 rounded-full bg-[#d6869d] text-white text-xs tracking-[0.2em] font-medium shadow-md disabled:opacity-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
