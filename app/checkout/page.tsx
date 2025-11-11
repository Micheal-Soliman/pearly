'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    governorate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Only redirect if cart is empty AND we're not processing an order
    if (cart.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [cart.length, router, isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsProcessing(true);

    try {
      const deliveryFee = 50;
      const orderNumber = `ORD-${Date.now()}`;
      const orderData = {
        orderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email || 'N/A',
        phone: formData.phone,
        address: `${formData.address}, ${formData.governorate}`,
        city: formData.city,
        notes: formData.notes,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.selectedType === 'big-brush' ? 200 : item.price,
          type: item.selectedType || 'standard'
        })),
        subtotal: totalPrice,
        deliveryFee: deliveryFee,
        total: totalPrice + deliveryFee,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        // Redirect to success page with order data
        const encodedData = encodeURIComponent(JSON.stringify(orderData));
        router.push(`/order-success?data=${encodedData}`);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('❌ Failed to submit order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-light tracking-widest mb-12 text-center">
            CHECKOUT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-8">
                shipping information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm tracking-wide mb-2">FIRST NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wide mb-2">LAST NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm tracking-wide mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide mb-2">PHONE</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide mb-2">ADDRESS</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm tracking-wide mb-2">CITY</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wide mb-2">GOVERNORATE</label>
                    <input
                      type="text"
                      required
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm tracking-wide mb-2">ORDER NOTES (OPTIONAL)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-8">
                order summary
              </h2>

              <div className="border border-gray-200 p-8 space-y-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedType || ''}`} className="flex gap-4 pb-6 border-b border-gray-200 last:border-0">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-light tracking-wide mb-1">{item.name}</h3>
                      {item.selectedType && (
                        <p className="text-xs text-gray-500 font-light">
                          {item.selectedType === 'squeez' ? 'Squeez' : 'Big Brush'}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-600 font-light">Qty: {item.quantity}</p>
                        <p className="text-sm font-light">
                          {((item.selectedType === 'big-brush' ? 200 : item.price) * item.quantity).toFixed(2)} EGP
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="space-y-4 pt-6">
                  <div className="flex justify-between text-sm font-light">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span>Shipping</span>
                    <span>50.00 EGP</span>
                  </div>
                  <div className="flex justify-between text-lg font-light pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>{(totalPrice + 50).toFixed(2)} EGP</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 font-light">
                    Payment Method: Cash on Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
