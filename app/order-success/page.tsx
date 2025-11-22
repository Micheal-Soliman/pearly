'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

type ProductType = 'standard' | 'big-brush' | 'squeez';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  type?: ProductType;
}

interface OrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total: number;
  [key: string]: any;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

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

      <div className="pt-28 pb-20 bg-gradient-to-b from-white to-[#fff9fb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#ffe9f0] to-[#ffd6e4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-14 h-14 text-[#d6869d]" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <div className="w-24 h-1 bg-[#d6869d]/30 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Thank you for your order! We've sent a confirmation to {orderData.email && orderData.email !== 'N/A' ? orderData.email : 'your email'}. 
              Your order will be on its way soon.
            </p>
          </motion.div>

          {/* Order Number */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 mb-12 text-center shadow-lg border-2 border-pink-100"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Order Number</p>
            <p className="text-2xl font-light tracking-wide text-[#d6869d] mb-2">{orderData.orderNumber}</p>
            <p className="text-sm text-gray-500">Estimated delivery: 2-4 business days</p>
          </motion.div>

          {/* Order & Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100"
            >
              <h2 className="text-xl font-light tracking-wide mb-6 pb-2 border-b border-gray-100">
                <span className="text-[#d6869d]">Customer</span> Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
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
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Address</p>
                  <p className="font-light">{orderData.address}</p>
                </div>
                {orderData.notes && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Notes</p>
                    <p className="font-light">{orderData.notes}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 h-fit"
            >
              <h2 className="text-xl font-light tracking-wide mb-6 pb-2 border-b border-gray-100">
                <span className="text-[#d6869d]">Order</span> Summary
              </h2>
              <div className="space-y-4 mb-6">
                {orderData.items.map((item: OrderItem, index: number) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b border-gray-50">
                    <div className="flex-1">
                      <p className="font-light text-gray-800">{item.name}</p>
                      {item.type && item.type !== 'standard' && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.type === 'big-brush' ? 'Big Brush' : 'Squeeze Tube'}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800">{(item.price * item.quantity).toFixed(2)} EGP</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500 mt-1">{item.price.toFixed(2)} each</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Total */}
              <div className="bg-[#fff9fb] rounded-2xl p-6 border-2 border-pink-100">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-light text-gray-600">
                    <span>Subtotal</span>
                    <span>{(orderData.subtotal || orderData.total).toFixed(2)} EGP</span>
                  </div>
                  {orderData.deliveryFee && (
                    <div className="flex justify-between text-sm font-light text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{orderData.deliveryFee.toFixed(2)} EGP</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-light pt-3 mt-3 border-t border-gray-200">
                    <span className="tracking-wide text-gray-900">Total</span>
                    <span className="tracking-wide text-[#d6869d] font-medium">{orderData.total.toFixed(2)} EGP</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  Payment Method: Cash on Delivery
                </p>
              </div>
            </motion.div>
          </div>

          {/* Order Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-xl font-light tracking-wide mb-6 pb-2 border-b border-gray-100">
              <span className="text-[#d6869d]">Order</span> Details
            </h2>
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100">
              <div className="grid grid-cols-12 bg-gray-50 p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {orderData.items.map((item: OrderItem, index: number) => (
                <div key={index} className="grid grid-cols-12 p-4 border-b border-gray-100">
                  <div className="col-span-6">
                    <p className="font-light">{item.name}</p>
                    {item.type && item.type !== 'standard' && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.type === 'big-brush' ? 'Big Brush' : 'Squeeze Tube'}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 text-center text-gray-600">{item.price.toFixed(2)} EGP</div>
                  <div className="col-span-2 text-center text-gray-600">{item.quantity}</div>
                  <div className="col-span-2 text-right font-medium">{(item.price * item.quantity).toFixed(2)} EGP</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-8"
          >
            <h3 className="text-lg font-light tracking-wide mb-4 text-gray-900">What's Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600 font-light">We will contact you soon to confirm your order</span>
              </li>
              {orderData.email && orderData.email !== 'N/A' && (
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 font-light">Check your email for order confirmation</span>
                </li>
              )}
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600 font-light">Your order will be delivered within 2-5 business days</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-[#d6869d] mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600 font-light">Payment will be collected upon delivery (Cash on Delivery)</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-600 font-light mb-2">
              If you have any questions, feel free to contact us:
            </p>
            <p className="text-sm font-light">
              📱 Phone: <a href="tel:+201288144869" className="hover:underline">01288144869</a>
            </p>
            {orderData.email && orderData.email !== 'N/A' && (
              <p className="text-sm font-light mt-1">
                📧 Email: <a href="mailto:ahmedmohamed010134@gmail.com" className="hover:underline">ahmedmohamed010134@gmail.com</a>
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#d6869d] hover:bg-[#c5758c] text-white px-8 py-3.5 text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center border-2 border-pink-100 text-gray-800 hover:border-[#d6869d] px-8 py-3.5 text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>
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