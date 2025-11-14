'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] mt-20 sm:mt-24">
        <Image
          src="/contact.png"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d6869d]/20 via-transparent to-[#d6869d]/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-widest mb-4">
              <span> GET IN TOUCH </span>
            </h1>
            <p className="text-lg font-light">We'd love to hear from you</p>
          </div>
        </div>
      </section>

      <div className="py-20 bg-[#ffe9f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-xl sm:text-2xl font-light tracking-wide mb-8">
                  <span className="text-[#d6869d]"> contact information</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-lg border-2 border-[#ffe9f0] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#d6869d] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm tracking-wide mb-1 text-[#d6869d] font-medium">EMAIL</p>
                      <a href="mailto:info@pearly.com" className="text-gray-600 font-light hover:text-[#d6869d] transition-colors">
                        info@pearly.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-lg border-2 border-[#ffe9f0] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#d6869d] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm tracking-wide mb-1 text-[#d6869d] font-medium">PHONE</p>
                      <a href="tel:+201234567890" className="text-gray-600 font-light hover:text-[#d6869d] transition-colors">
                        +20 123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-lg border-2 border-[#ffe9f0] hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#d6869d] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm tracking-wide mb-1 text-[#d6869d] font-medium">ADDRESS</p>
                      <p className="text-gray-600 font-light">
                        Cairo, Egypt
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-[#ffe9f0]">
                <h3 className="text-lg font-medium tracking-wide mb-4 text-[#d6869d]">business hours</h3>
                <div className="space-y-2 text-gray-600 font-light">
                  <p>Saturday - Thursday: 10:00 AM - 8:00 PM</p>
                  <p>Friday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#ffe9f0]">
              <h2 className="text-xl sm:text-2xl font-light tracking-wide mb-8">
                <span className="text-[#d6869d]"> send us a message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm tracking-wide mb-2 text-[#d6869d] font-medium">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-[#ffe9f0] rounded-2xl focus:outline-none focus:border-[#d6869d] transition-colors font-light resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-[#d6869d] text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 disabled:opacity-50 rounded-full shadow-lg hover:shadow-xl hover:opacity-90"
                >
                  {submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
