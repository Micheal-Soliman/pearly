export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
  bestSeller?: boolean;
  selectedType?: 'big-brush' | 'squeez';
  isShade?: boolean;
  shadeId?: string;
  shadeImages?: string[];
  bundleSteps?: BundleStep[];
}

export interface BundleStep {
  label: string;
  category?: string;
  productId?: string;
}

export interface Category {
  id: string;
  name: string;
  homepageVisible?: boolean;
  homepageOrder?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedType?: 'big-brush' | 'squeez';
  bundleShades?: string[];
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}
