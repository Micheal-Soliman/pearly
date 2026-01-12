'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'next/navigation';
import LipglossOptionModal from '@/components/LipglossOptionModal';
import PromoOfferModal from '@/components/PromoOfferModal';
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
  const squeezeOffer = products.find((p) => p.id === '30');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'big-brush' | 'squeez'>('squeez');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    const key = 'pearly-promo-30-shown';
    try {
      const shown = sessionStorage.getItem(key);
      if (!shown && squeezeOffer) {
        setShowPromoModal(true);
        sessionStorage.setItem(key, '1');
      }
    } catch { }
  }, [squeezeOffer]);

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
      const productToAdd = {
        ...selectedProduct,
        selectedType,
      };
      addToCart(productToAdd);
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

      {/* Client Moments Gallery */}
      <ClientMomentsGallery onSelect={(name) => setSelectedFeedback(name)} />

      {/* Customer Reviews - Real Feedbacks */}
      <CustomerReviews onSelect={(name) => setSelectedFeedback(name)} />


      {/* Full Width Banner */}
      <FullWidthBanner />

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



      {/* Featured Flavours Section */}
      <FlavoursGrid />

      {/* Bundle Savings Section */}
      <BundleSavings />

      {/* Color Palette Section */}
      <ShadesPalette />

      <PromoOfferModal show={showPromoModal} offer={squeezeOffer || null} onClose={() => setShowPromoModal(false)} />

      {/* Modal for Lipgloss Options */}
      <LipglossOptionModal
        show={showModal && !!selectedProduct}
        onClose={() => setShowModal(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        priceSqueez={selectedProduct ? selectedProduct.price : 180}
        priceBigBrush={250}
        onConfirm={confirmAddToCart}
      />

      <div className="pt-12">
        <Footer />
      </div>

      {/* Feedback Lightbox Modal */}
      <FeedbackLightbox selected={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
    </div>
  );
}