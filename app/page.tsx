'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import LipglossOptionModal from '@/components/LipglossOptionModal';
import MiniShadesModal from '@/components/MiniShadesModal';
import ShadesModal from '@/components/ShadesModal';
import FeedbackLightbox from '@/components/FeedbackLightbox';
import HomeHero from '@/components/HomeHero';
import CustomerReviews from '@/components/CustomerReviews';
import ClientMomentsGallery from '@/components/ClientMomentsGallery';
import CategoriesSection from '@/components/CategoriesSection';
import FullWidthBanner from '@/components/FullWidthBanner';
import BundlesSection from '@/components/BundlesSection';
import LipglossSlider from '@/components/LipglossSlider';
import FlavoursGrid from '@/components/FlavoursGrid';
import BundleSavings from '@/components/BundleSavings';
import ShadesPalette from '../components/ShadesPalette';

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedMiniShade, setSelectedMiniShade] = useState<string | null>(null);
  const [showMiniModal, setShowMiniModal] = useState(false);

  const [pendingLipglossShade, setPendingLipglossShade] = useState<any>(null);
  const [pendingQuantity, setPendingQuantity] = useState<number>(1);
  const [showSqueezMiniModal, setShowSqueezMiniModal] = useState(false);
  const [squeezSelectedMiniShades, setSqueezSelectedMiniShades] = useState<string[]>([]);

  const [showBundleShadesModal, setShowBundleShadesModal] = useState(false);
  const [bundleSelectedShades, setBundleSelectedShades] = useState<string[]>([]);
  const [pendingBundleProduct, setPendingBundleProduct] = useState<any>(null);
  const [pendingBundleRequiredCount, setPendingBundleRequiredCount] = useState<number>(0);
  const [pendingBundleQuantity, setPendingBundleQuantity] = useState<number>(1);

  const lipglossProducts = products.filter((p) => p.category === 'Lipgloss');
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
  const lipglossShadesForModal = lipglossProducts.map((p) => ({
    id: p.id,
    name: p.name,
    swatchColor: shadeSwatches[p.id],
  }));

  const handleAddToCart = (product: any) => {
    const qty = Math.max(1, Number(product?.quantity || 1));
    if (product.category === 'Lipgloss') {
      if (product.selectedType) {
        setPendingQuantity(qty);
        if (product.selectedType === 'squeez') {
          setPendingLipglossShade(product);
          setSqueezSelectedMiniShades([]);
          setShowSqueezMiniModal(true);
          return;
        }
        const uniqueId = `${product.id}-t-${product.selectedType}`;
        const item = { ...product, id: uniqueId, name: `${product.name} (Big Brush)`, selectedType: product.selectedType };
        for (let i = 0; i < qty; i++) {
          addToCart(item);
        }
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
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
    } else {
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
    }
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      if (selectedType === 'squeez') {
        setShowModal(false);
        setSelectedMiniShade(null);
        setShowMiniModal(true);
        return;
      }
      const uniqueId = `${selectedProduct.id}-t-${selectedType}`;
      addToCart({
        ...selectedProduct,
        id: uniqueId,
        name: `${selectedProduct.name} (Big Brush)`,
        selectedType,
      });
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

      {/* Hero Section - Full Screen */}
      <HomeHero />

      {/* Categories Grid */}
      <CategoriesSection />

      {/* Product Grid - Bundles */}
      <BundlesSection
        products={products as any}
        isFavorite={isFavorite as any}
        toggleFavorite={toggleFavorite as any}
        handleAddToCart={handleAddToCart as any}
      />

      {/* Featured Products Slider */}
      <LipglossSlider
        products={products as any}
        isFavorite={isFavorite as any}
        toggleFavorite={toggleFavorite as any}
        handleAddToCart={handleAddToCart as any}
      />

      {/* Full Width Banner */}
      <FullWidthBanner />

      {/* Featured Flavours Section */}
      <FlavoursGrid />

      {/* Bundle Savings Section */}
      <BundleSavings />

      {/* Color Palette Section */}
      <ShadesPalette />

      {/* Client Moments Gallery */}
      <ClientMomentsGallery onSelect={(name) => setSelectedFeedback(name)} />

      {/* Customer Reviews - Real Feedbacks */}
      <CustomerReviews onSelect={(name) => setSelectedFeedback(name)} />

      {/* Modal for Lipgloss Options */}
      <LipglossOptionModal
        show={showModal && !!selectedProduct}
        onClose={() => setShowModal(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onConfirm={confirmAddToCart}
      />

      <MiniShadesModal
        show={showMiniModal && !!selectedProduct}
        onClose={() => {
          setShowMiniModal(false);
          setSelectedMiniShade(null);
          setSelectedProduct(null);
        }}
        onDone={() => {
          if (selectedProduct && selectedMiniShade) {
            const miniShadeName = products.find((p) => p.id === selectedMiniShade)?.name?.replace('Lipgloss - ', '') || selectedMiniShade;
            const uniqueId = `${selectedProduct.id}-t-squeez-m-${selectedMiniShade}`;
            addToCart({
              ...selectedProduct,
              id: uniqueId,
              name: `${selectedProduct.name} (Squeez, Mini: ${miniShadeName})`,
              selectedType: 'squeez',
              miniShade: selectedMiniShade,
            });
          }
          setShowMiniModal(false);
          setSelectedMiniShade(null);
          setSelectedProduct(null);
        }}
        lipglossShades={products.filter((p) => p.category === 'Lipgloss') as any}
        selectedMiniShade={selectedMiniShade}
        setSelectedMiniShade={setSelectedMiniShade}
        shadeSwatches={{}}
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
            };
            addToCart(item);
          });

          setShowSqueezMiniModal(false);
          setSqueezSelectedMiniShades([]);
          setPendingLipglossShade(null);
          setPendingQuantity(1);
        }}
        lipglossShades={lipglossShadesForModal as any}
        selectedShades={squeezSelectedMiniShades}
        setSelectedShades={setSqueezSelectedMiniShades}
        requiredCount={pendingQuantity}
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

            addToCart(itemToAdd);
          }

          setShowBundleShadesModal(false);
          setBundleSelectedShades([]);
          setPendingBundleProduct(null);
          setPendingBundleRequiredCount(0);
          setPendingBundleQuantity(1);
        }}
        lipglossShades={lipglossShadesForModal as any}
        selectedShades={bundleSelectedShades}
        setSelectedShades={setBundleSelectedShades}
        requiredCount={Math.max(0, pendingBundleRequiredCount) * Math.max(1, pendingBundleQuantity)}
        shadeSwatches={shadeSwatches}
        title={`Select ${Math.max(0, pendingBundleRequiredCount) * Math.max(1, pendingBundleQuantity)} Shade${Math.max(0, pendingBundleRequiredCount) * Math.max(1, pendingBundleQuantity) === 1 ? '' : 's'}`}
      />

      <div className="pt-12">
        <Footer />
      </div>

      {/* Feedback Lightbox Modal */}
      <FeedbackLightbox selected={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
    </div>
  );
}