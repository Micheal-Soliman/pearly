import { products } from '@/data/products';
import { getUnitPrice } from '@/lib/pricing';

export const DEFAULT_DELIVERY_FEE = 75;

export const DELIVERY_FEES: Record<string, number> = {
  Cairo: 70,
  Giza: 70,
  'Al Asher mn Ramadan': 80,
  Alexandria: 85,
  Qalyubia: 85,
  Ismailia: 90,
  Suez: 90,
  'Port Said': 90,
  Beheira: 90,
  Dakahlia: 90,
  Menoufia: 90,
  Sharqia: 90,
  'Kafr El-Sheikh': 90,
  Damietta: 90,
  Gharbia: 90,
  Tanta: 90,
  Mansoura: 90,
  Fayoum: 95,
  'Beni Suef': 95,
  Sohag: 95,
  Minya: 95,
  Assiut: 95,
  Qena: 105,
  Luxor: 105,
  Aswan: 105,
  Matrouh: 125,
  'New Valley': 125,
  'North Coast': 125,
  'Red Sea': 130,
  Sinai: 155,
};

type SubmittedOrderItem = {
  id?: unknown;
  name?: unknown;
  category?: unknown;
  quantity?: unknown;
  selectedType?: unknown;
  type?: unknown;
};

type SubmittedOrder = {
  customerName?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  notes?: unknown;
  items?: unknown;
};

export type ValidatedOrderItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  type: 'standard' | 'big-brush' | 'squeez';
};

export type ValidatedOrder = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  items: ValidatedOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

function requiredText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} is required`);
  }

  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new Error(`${field} is too long`);
  }
  return normalized;
}

function optionalText(value: unknown, maxLength: number): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string') throw new Error('Invalid notes');
  return value.trim().slice(0, maxLength);
}

function findCatalogProduct(item: SubmittedOrderItem) {
  const id = requiredText(item.id, 'Product id', 160);
  const category = requiredText(item.category, 'Product category', 60);

  if (category === 'Big Brush') return products.find((product) => product.id === 'big-brush');
  if (category === 'Squeeze') return products.find((product) => product.id === 'squeez');
  if (category === 'Lipgloss') {
    return products.find((product) => product.category === 'Lipgloss' && product.isShade);
  }
  if (category === 'Bundles') {
    return products.find(
      (product) => product.category === 'Bundles' && (id === product.id || id.startsWith(`${product.id}-b-`)),
    );
  }

  return products.find((product) => product.id === id);
}

function validateItem(rawItem: unknown): ValidatedOrderItem {
  if (!rawItem || typeof rawItem !== 'object') throw new Error('Invalid order item');
  const item = rawItem as SubmittedOrderItem;
  const product = findCatalogProduct(item);
  if (!product) throw new Error('Unknown product in order');

  const id = requiredText(item.id, 'Product id', 160);
  const name = requiredText(item.name, 'Product name', 240);
  const category = requiredText(item.category, 'Product category', 60);
  const quantity = Number(item.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    throw new Error('Invalid product quantity');
  }

  const selectedType = item.selectedType === 'squeez' || item.type === 'squeez' ? 'squeez' : 'big-brush';
  const price = getUnitPrice({
    category: product.category,
    price: product.price,
    selectedType,
  });

  return {
    id,
    name,
    category,
    quantity,
    price,
    type: category === 'Lipgloss' || category === 'Big Brush'
      ? selectedType
      : category === 'Squeeze'
        ? 'squeez'
        : 'standard',
  };
}

export function validateAndPriceOrder(rawOrder: unknown): ValidatedOrder {
  if (!rawOrder || typeof rawOrder !== 'object') throw new Error('Invalid order payload');
  const order = rawOrder as SubmittedOrder;

  const customerName = requiredText(order.customerName, 'Customer name', 120);
  const email = requiredText(order.email, 'Email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email address');
  const phone = requiredText(order.phone, 'Phone', 30);
  const address = requiredText(order.address, 'Address', 300);
  const city = requiredText(order.city, 'City', 80);
  if (!(city in DELIVERY_FEES)) throw new Error('Unsupported delivery city');

  if (!Array.isArray(order.items) || order.items.length === 0 || order.items.length > 50) {
    throw new Error('Order must contain valid items');
  }

  const items = order.items.map(validateItem);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = DELIVERY_FEES[city];

  return {
    orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    customerName,
    email,
    phone,
    address,
    city,
    notes: optionalText(order.notes, 1000),
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}
