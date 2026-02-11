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
  bundleSteps?: { label: string }[];
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
