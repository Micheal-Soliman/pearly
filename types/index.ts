export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  categoryAr: string;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedType?: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}
