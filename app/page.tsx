'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import LipglossOptionModal from '@/components/LipglossOptionModal';
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
import { buildBundleStepLabels, formatBundleSelectionNames, getBundleSteps, getStepLabelForIndex } from '@/lib/bundles';

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('big-brush');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const [showBundleShadesModal, setShowBundleShadesModal] = useState(false);
  const [bundleSelectedShades, setBundleSelectedShades] = useState<string[]>([]);
  const [pendingBundleProduct, setPendingBundleProduct] = useState<any>(null);
  const [pendingBundleRequiredCount, setPendingBundleRequiredCount] = useState<number>(0);

  const [pendingBundleQuantity, setPendingBundleQuantity] = useState<number>(1);

  const lipglossProducts = products.filter((p) => p.category === 'Lipgloss' && p.isShade);
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
  const lipglossShadesForModal = lipglossProducts.map((p) => ({ id: p.id, name: p.name, swatchColor: shadeSwatches[p.id] }));

  const handleAddToCart = (product: any) => {
    const qty = Math.max(1, Number(product?.quantity || 1));

    if (product.category === 'Lipgloss') {
      const st = product.selectedType || 'big-brush';
      window.location.href = `/products/${product.id}?category=${encodeURIComponent('Lipgloss')}&page=1&openShades=1&qty=${encodeURIComponent(String(qty))}&type=${encodeURIComponent(String(st))}`;
      return;
    } else if (product.category === 'Bundles') {
      const steps = getBundleSteps(product);
      const required = steps.length;

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
      const uniqueId = `${selectedProduct.id}-t-${selectedType}`;
      const typeLabel = selectedType === 'squeez' ? 'Squeez' : 'Big Brush';
      if (selectedProduct.category === 'Lipgloss') {
        const qty = Math.max(1, Number(selectedProduct?.quantity || 1));
        window.location.href = `/products/${selectedProduct.id}?category=${encodeURIComponent('Lipgloss')}&page=1&openShades=1&qty=${encodeURIComponent(String(qty))}&type=${encodeURIComponent(String(selectedType))}`;
        setShowModal(false);
        setSelectedProduct(null);
        return;
      }
      addToCart({
        ...selectedProduct,
        id: uniqueId,
        name: `${selectedProduct.name} (${typeLabel})`,
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
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleAddToCart={handleAddToCart}
      />

      {/* Featured Products Slider */}
      <LipglossSlider
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleAddToCart={handleAddToCart}
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

            const steps = getBundleSteps(pendingBundleProduct);
            const shadeNames = formatBundleSelectionNames(steps, group, lipglossProducts);

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
        lipglossShades={lipglossShadesForModal}
        selectedShades={bundleSelectedShades}
        setSelectedShades={setBundleSelectedShades}
        requiredCount={Math.max(0, pendingBundleRequiredCount) * Math.max(1, pendingBundleQuantity)}
        shadeSwatches={shadeSwatches}
        title={(() => {
          const steps = getBundleSteps(pendingBundleProduct);

          const perBundleRequired = Math.max(0, pendingBundleRequiredCount);
          const totalRequired = perBundleRequired * Math.max(1, pendingBundleQuantity);
          if (!pendingBundleProduct || totalRequired <= 0 || perBundleRequired <= 0) return undefined;

          const stepIndex = bundleSelectedShades.length % perBundleRequired;
          const label = getStepLabelForIndex(steps, stepIndex);

          const bundleNumber = Math.min(Math.max(1, pendingBundleQuantity), Math.floor(bundleSelectedShades.length / perBundleRequired) + 1);
          return pendingBundleQuantity > 1
            ? `Select ${label} Shade (Bundle ${bundleNumber}/${Math.max(1, pendingBundleQuantity)})`
            : `Select ${label} Shade`;
        })()}
        stepLabels={(() => {
          const steps = getBundleSteps(pendingBundleProduct);
          const perBundleRequired = Math.max(0, pendingBundleRequiredCount);
          const qty = Math.max(1, pendingBundleQuantity);
          if (!pendingBundleProduct || perBundleRequired <= 0 || steps.length !== perBundleRequired) return undefined;

          return buildBundleStepLabels(steps, { quantity: qty });
        })()}
      />

      <div className="pt-12">
        <Footer />
      </div>

      {/* Feedback Lightbox Modal */}
      <FeedbackLightbox selected={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
    </div>
  );
}