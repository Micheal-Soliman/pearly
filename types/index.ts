export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryAr: string;
  inStock: boolean;
  featured: boolean;
  bestSeller?: boolean;
  selectedType?: 'big-brush' | 'squeez';
  bundleSteps?: { label: string; labelAr?: string }[];
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
