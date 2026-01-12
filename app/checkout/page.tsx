'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CheckoutSummary from '@/components/CheckoutSummary';
import CheckoutForm from '@/components/CheckoutForm';

// Delivery fees by city
const deliveryFees: { [key: string]: number } = {
  'Cairo': 65,
  'Giza': 65,
  'Al Asher mn Ramadan': 75,
  'Alexandria': 75,
  'Qalyubia': 75,
  'Ismailia': 80,
  'Suez': 80,
  'Port Said': 80,
  'Beheira': 80,
  'Dakahlia': 80,
  'Menoufia': 80,
  'Sharqia': 80,
  'Kafr El-Sheikh': 80,
  'Damietta': 80,
  'Gharbia': 80,
  'Tanta': 80,
  'Mansoura': 80,
  'Fayoum': 85,
  'Beni Suef': 85,
  'Sohag': 85,
  'Minya': 85,
  'Assiut': 85,
  'Qena': 100,
  'Luxor': 100,
  'Aswan': 100,
  'Matrouh': 110,
  'New Valley': 120,
  'North Coast': 120,
  'Red Sea': 130,
};

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
  const [deliveryFee, setDeliveryFee] = useState(65);

  useEffect(() => {
    // Only redirect if cart is empty AND we're not processing an order
    if (cart.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cart.length, router, isProcessing]);

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    setDeliveryFee(deliveryFees[city] || 65);
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
              cart={cart as any}
              subtotal={totalPrice}
              deliveryFee={deliveryFee}
              deliveryFees={deliveryFees}
              onCitySelected={handleCityChange}
              setIsProcessing={setIsProcessing}
            />

            {/* Order Summary */}
            <CheckoutSummary cart={cart as any} subtotal={totalPrice} deliveryFee={deliveryFee} city={formData.city} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
