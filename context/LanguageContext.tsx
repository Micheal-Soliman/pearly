'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    
    // Homepage
    newCollection: 'New Collection 2024',
    heroTitle: 'Unmatched Elegance',
    heroSubtitle: 'Discover a world of luxury and beauty with our exclusive collection',
    shopNow: 'Shop Now',
    learnMore: 'Learn More',
    
    // Features
    fastShipping: 'Fast Shipping',
    fastShippingDesc: 'Delivery to all governorates in 2-3 business days',
    securePayment: 'Secure Payment',
    securePaymentDesc: 'Cash on Delivery - 100% safe and secure',
    luxuryQuality: 'Luxury Quality',
    luxuryQualityDesc: 'Carefully selected products to ensure the highest quality',
    
    // Products
    featuredProducts: 'Featured Products',
    featuredProductsDesc: 'Discover our latest luxury additions',
    viewAllProducts: 'View All Products',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    notAvailable: 'Not Available',
    featured: 'Featured',
    egp: 'EGP',
    
    // Categories
    all: 'All',
    jewelry: 'Jewelry',
    accessories: 'Accessories',
    bags: 'Bags',
    fragrance: 'Fragrance',
    
    // Cart
    cart: 'Shopping Cart',
    cartEmpty: 'Cart is Empty',
    cartEmptyDesc: "You haven't added any products yet",
    reviewCart: 'Review your purchases before checkout',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    
    // Checkout
    checkoutTitle: 'Checkout',
    checkoutDesc: 'Fill in your details to complete the purchase',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    enterName: 'Enter your full name',
    phone: 'Phone Number',
    shippingAddress: 'Shipping Address',
    city: 'City',
    cityPlaceholder: 'Cairo, Alexandria, etc.',
    addressDetail: 'Detailed Address',
    addressPlaceholder: 'Street, area, building number, etc.',
    notes: 'Additional Notes (Optional)',
    notesPlaceholder: 'Any special notes for the order',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    cashOnDeliveryDesc: 'Pay when you receive your order - safe and secure',
    confirmOrder: 'Confirm Order',
    
    // Order Success
    orderSuccess: 'Order Received Successfully! 🎉',
    orderSuccessDesc: 'Thank you for trusting Pearly. We will contact you soon to confirm the order',
    orderDetails: 'Order Details',
    name: 'Name',
    address: 'Address',
    backHome: 'Back to Home',
    
    // Footer
    tagline: 'Your luxury destination for elegant beauty products',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    shippingDelivery: 'Shipping & Delivery',
    returnPolicy: 'Return Policy',
    faq: 'FAQ',
    paymentSecurity: 'Payment & Security',
    codAccepted: 'We accept Cash on Delivery across Egypt',
    safeSecure: 'Safe & Secure',
    madeWith: 'Made with',
    inEgypt: 'in Egypt',
    
    // Products Page
    allProducts: 'All Products',
    allProductsDesc: 'Discover our complete collection of luxury products',
    filters: 'Filters',
    categories: 'Categories',
    showing: 'Showing',
    product: 'product',
    noProducts: 'No products in this category',
    
    // Contact
    contactUs: 'Contact Us',
    contactDesc: "We're here to answer all your questions",
    contactInfo: 'Contact Information',
    phoneLabel: 'Phone',
    available: 'Available from 9 AM - 9 PM',
    email: 'Email',
    replyTime: 'We reply within 24 hours',
    addressLabel: 'Address',
    cairoEgypt: 'Cairo, Egypt',
    deliverAll: 'We deliver to all governorates',
    followUs: 'Follow Us',
    sendMessage: 'Send us a Message',
    emailLabel: 'Email',
    message: 'Message',
    messagePlaceholder: 'How can we help you?',
    sendButton: 'Send Message',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    products: 'المنتجات',
    about: 'من نحن',
    contact: 'تواصل معنا',
    
    // Homepage
    newCollection: 'مجموعة جديدة 2024',
    heroTitle: 'أناقة لا تُضاهى',
    heroSubtitle: 'اكتشفي عالم من الفخامة والجمال مع مجموعتنا الحصرية',
    shopNow: 'تسوقي الآن',
    learnMore: 'اعرفي المزيد',
    
    // Features
    fastShipping: 'توصيل سريع',
    fastShippingDesc: 'توصيل لجميع المحافظات في 2-3 أيام عمل',
    securePayment: 'دفع آمن',
    securePaymentDesc: 'الدفع عند الاستلام - آمن ومضمون 100%',
    luxuryQuality: 'جودة فاخرة',
    luxuryQualityDesc: 'منتجات مختارة بعناية لضمان أعلى جودة',
    
    // Products
    featuredProducts: 'المنتجات المميزة',
    featuredProductsDesc: 'اكتشفي أحدث إضافاتنا الفاخرة',
    viewAllProducts: 'عرض جميع المنتجات',
    addToCart: 'أضف للسلة',
    outOfStock: 'نفذت الكمية',
    notAvailable: 'غير متوفر',
    featured: 'مميز',
    egp: 'جنيه',
    
    // Categories
    all: 'الكل',
    jewelry: 'مجوهرات',
    accessories: 'إكسسوارات',
    bags: 'حقائب',
    fragrance: 'عطور',
    
    // Cart
    cart: 'سلة التسوق',
    cartEmpty: 'السلة فارغة',
    cartEmptyDesc: 'لم تقومي بإضافة أي منتجات بعد',
    reviewCart: 'راجعي مشترياتك قبل إتمام الطلب',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    continueShopping: 'متابعة التسوق',
    
    // Checkout
    checkoutTitle: 'إتمام الطلب',
    checkoutDesc: 'املئي بياناتك لإتمام عملية الشراء',
    personalInfo: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل',
    enterName: 'أدخلي اسمك الكامل',
    phone: 'رقم الهاتف',
    shippingAddress: 'عنوان التوصيل',
    city: 'المدينة',
    cityPlaceholder: 'القاهرة، الإسكندرية، إلخ',
    addressDetail: 'العنوان بالتفصيل',
    addressPlaceholder: 'الشارع، المنطقة، رقم المبنى، إلخ',
    notes: 'ملاحظات إضافية (اختياري)',
    notesPlaceholder: 'أي ملاحظات خاصة بالطلب',
    paymentMethod: 'طريقة الدفع',
    cashOnDelivery: 'الدفع عند الاستلام',
    cashOnDeliveryDesc: 'ادفعي عند استلام طلبك - آمن ومضمون',
    confirmOrder: 'تأكيد الطلب',
    
    // Order Success
    orderSuccess: 'تم استلام طلبك بنجاح! 🎉',
    orderSuccessDesc: 'شكراً لثقتك في Pearly. سنتواصل معك قريباً لتأكيد الطلب',
    orderDetails: 'تفاصيل الطلب',
    name: 'الاسم',
    address: 'العنوان',
    backHome: 'العودة للرئيسية',
    
    // Footer
    tagline: 'متجرك الفاخر للمنتجات النسائية الراقية',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    shippingDelivery: 'الشحن والتوصيل',
    returnPolicy: 'سياسة الإرجاع',
    faq: 'الأسئلة الشائعة',
    paymentSecurity: 'الدفع والأمان',
    codAccepted: 'نقبل الدفع عند الاستلام في جميع أنحاء مصر',
    safeSecure: 'آمن وموثوق',
    madeWith: 'صنع بكل',
    inEgypt: 'في مصر',
    
    // Products Page
    allProducts: 'جميع المنتجات',
    allProductsDesc: 'اكتشفي مجموعتنا الكاملة من المنتجات الفاخرة',
    filters: 'الفلاتر',
    categories: 'التصنيفات',
    showing: 'عرض',
    product: 'منتج',
    noProducts: 'لا توجد منتجات في هذا التصنيف',
    
    // Contact
    contactUs: 'تواصل معنا',
    contactDesc: 'نحن هنا للإجابة على جميع استفساراتك',
    contactInfo: 'معلومات التواصل',
    phoneLabel: 'الهاتف',
    available: 'متاحون من 9 صباحاً - 9 مساءً',
    email: 'البريد الإلكتروني',
    replyTime: 'نرد خلال 24 ساعة',
    addressLabel: 'العنوان',
    cairoEgypt: 'القاهرة، مصر',
    deliverAll: 'نوصل لجميع المحافظات',
    followUs: 'تابعينا على',
    sendMessage: 'أرسلي لنا رسالة',
    emailLabel: 'البريد الإلكتروني',
    message: 'الرسالة',
    messagePlaceholder: 'كيف يمكننا مساعدتك؟',
    sendButton: 'إرسال الرسالة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('pearly-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('pearly-language', newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
