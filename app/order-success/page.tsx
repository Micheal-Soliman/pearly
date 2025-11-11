'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setOrderData(decoded);
      } catch (error) {
        console.error('Failed to parse order data:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Icon */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Your order has been placed successfully
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-gray-50 border-2 border-black p-6 mb-8 text-center">
            <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">Order Number</p>
            <p className="text-2xl font-light tracking-wide">{orderData.orderNumber}</p>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h2 className="text-xl font-light tracking-wide mb-4 pb-2 border-b border-gray-200">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Name</p>
                <p className="font-light">{orderData.customerName}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Phone</p>
                <p className="font-light">{orderData.phone}</p>
              </div>
              {orderData.email && orderData.email !== 'N/A' && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Email</p>
                  <p className="font-light">{orderData.email}</p>
                </div>
              )}
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">City</p>
                <p className="font-light">{orderData.city}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Address</p>
                <p className="font-light">{orderData.address}</p>
              </div>
              {orderData.notes && (
                <div className="sm:col-span-2">
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Notes</p>
                  <p className="font-light">{orderData.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-xl font-light tracking-wide mb-4 pb-2 border-b border-gray-200">
              Order Items
            </h2>
            <div className="space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="font-light tracking-wide mb-1">{item.name}</p>
                    {item.type && item.type !== 'standard' && (
                      <p className="text-xs text-gray-500">
                        {item.type === 'big-brush' ? 'Big Brush' : 'Squeez'}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-light">x{item.quantity}</p>
                    <p className="text-sm text-gray-600">{item.price} EGP</p>
                  </div>
                  <div className="text-right ml-8">
                    <p className="font-light">{item.price * item.quantity} EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-gray-50 p-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-light">
                <span>Subtotal</span>
                <span>{orderData.subtotal || orderData.total} EGP</span>
              </div>
              {orderData.deliveryFee && (
                <div className="flex justify-between text-sm font-light">
                  <span>Delivery Fee</span>
                  <span>{orderData.deliveryFee} EGP</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-light pt-3 border-t border-gray-300">
                <span className="tracking-wide">Total</span>
                <span className="tracking-wide">{orderData.total} EGP</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Payment Method: Cash on Delivery</p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-light tracking-wide mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-700 font-light">
              <li>✓ We will contact you soon to confirm your order</li>
              {orderData.email && orderData.email !== 'N/A' && (
                <li>✓ Check your email for order confirmation</li>
              )}
              <li>✓ Your order will be delivered within 2-5 business days</li>
              <li>✓ Payment will be collected upon delivery (Cash on Delivery)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 font-light mb-2">
              If you have any questions, feel free to contact us:
            </p>
            <p className="text-sm font-light">
              📱 Phone: <a href="tel:+201205055118" className="hover:underline">01205055118</a>
            </p>
            {orderData.email && orderData.email !== 'N/A' && (
              <p className="text-sm font-light">
                📧 Email: <a href="mailto:ahmedmohamed010134@gmail.com" className="hover:underline">ahmedmohamed010134@gmail.com</a>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gray-800 transition-colors text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-block border-2 border-gray-300 px-12 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:border-black transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light tracking-wide">Loading...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
