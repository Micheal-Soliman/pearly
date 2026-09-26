'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/types';

type Props = {
  cart: CartItem[];
  deliveryFees: { [key: string]: number };
  onCitySelected: (city: string) => void;
  setIsProcessing: (processing: boolean) => void;
};

export default function CheckoutForm({ cart, deliveryFees, onCitySelected, setIsProcessing }: Props) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const cityList = Object.keys(deliveryFees);

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    onCitySelected(city);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let orderSubmitted = false;
    setSubmitError('');
    setIsSubmitting(true);
    setIsProcessing(true);

    try {
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          selectedType: item.selectedType,
          type: item.selectedType || 'standard',
          shadeId: item.shadeId || null,
          bundleSteps: item.bundleSteps || [],
          bundleShades: item.bundleShades || [],
        })),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success && result?.order) {
        orderSubmitted = true;
        sessionStorage.setItem(
          'pearly-last-order',
          JSON.stringify({
            ...result.order,
            customerEmailSent: Boolean(result.deliveryStatus?.customerEmail),
          }),
        );
        clearCart();
        router.push(`/order-success?order=${encodeURIComponent(result.order.orderNumber)}`);
      } else {
        throw new Error(result?.message || 'Failed to submit order');
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit order. Please try again or contact us directly.',
      );
    } finally {
      setIsSubmitting(false);
      // Keep the checkout redirect guard active until the success page mounts.
      if (!orderSubmitted) {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#ffe9f0]">
      <h2 className="text-xl sm:text-2xl font-medium tracking-wide mb-8">
        <span className="text-[#d6869d]"> shipping information</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">FIRST NAME</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
            />
          </div>
          <div>
            <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">LAST NAME</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">EMAIL</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">PHONE</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">ADDRESS</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">CITY / GOVERNORATE</label>
          <select
            required
            value={formData.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light bg-white"
          >
            <option value="">Select your city</option>
            {cityList.map((c) => (
              <option key={c} value={c}>
                {c} ({deliveryFees[c] || 65} EGP)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">ORDER NOTES (OPTIONAL)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#d6869d] text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </button>
        {submitError ? (
          <p role="alert" className="text-sm text-red-600 text-center leading-relaxed">
            {submitError}
          </p>
        ) : null}
      </form>
    </div>
  );
}
