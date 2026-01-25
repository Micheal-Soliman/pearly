'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'next/navigation';
import LipglossOptionModal from '@/components/LipglossOptionModal';
import MiniShadesModal from '@/components/MiniShadesModal';
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
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [selectedMiniShade, setSelectedMiniShade] = useState<string | null>(null);
  const [showMiniModal, setShowMiniModal] = useState(false);

  const handleAddToCart = (product: any) => {
    if (product.category === 'Lipgloss') {
      setSelectedProduct(product);
      setSelectedType('squeez');
      setShowModal(true);
    } else if (product.category === 'Bundles') {
      router.push(`/products/${product.id}?category=Bundles&page=1`);
    } else {
      addToCart(product);
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

      <div className="pt-12">
        <Footer />
      </div>

      {/* Feedback Lightbox Modal */}
      <FeedbackLightbox selected={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
    </div>
  );
}