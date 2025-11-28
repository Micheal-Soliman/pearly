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
}

export interface CartItem extends Product {
  quantity: number;
  selectedType?: string;
  bundleShades?: string[];
  bundleMiniShade?: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}
