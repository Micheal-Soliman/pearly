import type { CartItem, Product } from '@/types';

export const PRICE_BUMP = 0;

export const LIPGLOSS_VARIANTS = {
  squeez: { price: 220, originalPrice: 260 },
  'big-brush': { price: 299, originalPrice: 350 },
} as const;

export type LipglossVariantType = keyof typeof LIPGLOSS_VARIANTS;

export function getLipglossVariantType(selectedType?: string): LipglossVariantType {
  return selectedType === 'big-brush' ? 'big-brush' : 'squeez';
}

export function getLipglossVariantPricing(selectedType?: string) {
  const type = getLipglossVariantType(selectedType);
  const base = LIPGLOSS_VARIANTS[type];
  return {
    type,
    price: base.price + PRICE_BUMP,
    originalPrice: base.originalPrice + PRICE_BUMP,
  };
}

export function getUnitPrice(item: Pick<CartItem, 'category' | 'price' | 'selectedType'>): number {
  if (item.category === 'Lipgloss') {
    return getLipglossVariantPricing(item.selectedType).price;
  }
  return item.price;
}

export function getOriginalPrice(item: Pick<Product, 'category' | 'originalPrice'> & { selectedType?: string }): number | undefined {
  if (item.category === 'Lipgloss') {
    return getLipglossVariantPricing(item.selectedType).originalPrice;
  }
  return item.originalPrice;
}
