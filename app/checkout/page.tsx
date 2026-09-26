'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CheckoutSummary from '@/components/CheckoutSummary';
import CheckoutForm from '@/components/CheckoutForm';
import { DEFAULT_DELIVERY_FEE, DELIVERY_FEES } from '@/lib/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(DEFAULT_DELIVERY_FEE);

  useEffect(() => {
    // Only redirect if cart is empty AND we're not processing an order
    if (cart.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cart.length, router, isProcessing]);

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    setDeliveryFee(DELIVERY_FEES[city] || DEFAULT_DELIVERY_FEE);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-widest mb-12 text-center">
            <span className="text-[#d6869d]"> CHECKOUT </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <CheckoutForm
              cart={cart}
              deliveryFees={DELIVERY_FEES}
              onCitySelected={handleCityChange}
              setIsProcessing={setIsProcessing}
            />

            {/* Order Summary */}
            <CheckoutSummary cart={cart} subtotal={totalPrice} deliveryFee={deliveryFee} city={formData.city} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
