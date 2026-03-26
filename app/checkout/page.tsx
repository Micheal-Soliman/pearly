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
  'Cairo': 70,
  'Giza': 70,
  'Al Asher mn Ramadan': 80,
  'Alexandria': 85,
  'Qalyubia': 85,
  'Ismailia': 90,
  'Suez': 90,
  'Port Said': 90,
  'Beheira': 90,
  'Dakahlia': 90,
  'Menoufia': 90,
  'Sharqia': 90,
  'Kafr El-Sheikh': 90,
  'Damietta': 90,
  'Gharbia': 90,
  'Tanta': 90,
  'Mansoura': 90,
  'Fayoum': 95,
  'Beni Suef': 95,
  'Sohag': 95,
  'Minya': 95,
  'Assiut': 95,
  'Qena': 105,
  'Luxor': 105,
  'Aswan': 105,
  'Matrouh': 125,
  'New Valley': 125,
  'North Coast': 125,
  'Red Sea': 130,
  'Sinai': 155,
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
  const [deliveryFee, setDeliveryFee] = useState(75);

  useEffect(() => {
    // Only redirect if cart is empty AND we're not processing an order
    if (cart.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cart.length, router, isProcessing]);

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    setDeliveryFee(deliveryFees[city] || 75);
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
