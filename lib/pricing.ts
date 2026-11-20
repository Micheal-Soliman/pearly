import type { CartItem, Product } from '@/types';

export const PRICE_BUMP = 0;

export const LIPGLOSS_VARIANTS = {
  squeez: { price: 220, originalPrice: 260 },
  'big-brush': { price: 250, originalPrice: 350 },
} as const;

export type LipglossVariantType = keyof typeof LIPGLOSS_VARIANTS;

type CataloguePrice = Pick<Product, 'id' | 'category' | 'price' | 'originalPrice'>;

export function getLipglossVariantType(selectedType?: string): LipglossVariantType {
  if (selectedType === 'big-brush') return 'big-brush';
  if (selectedType === 'squeez') return 'squeez';
  if (selectedType === 'squeez-mini') return 'squeez';
  return 'big-brush';
}

export function getLipglossVariantPricing(selectedType?: string, catalogue: CataloguePrice[] = []) {
  const type = getLipglossVariantType(selectedType);
  const base = LIPGLOSS_VARIANTS[type];
  const product = catalogue.find((item) => item.id === (type === 'squeez' ? 'squeez' : 'big-brush'))
    || catalogue.find((item) => item.category === (type === 'squeez' ? 'Squeeze' : 'Big Brush'));
  return {
    type,
    price: product ? Number(product.price) : base.price + PRICE_BUMP,
    originalPrice: product
      ? (product.originalPrice !== undefined ? Number(product.originalPrice) : undefined)
      : base.originalPrice + PRICE_BUMP,
  };
}

export function getUnitPrice(item: Pick<CartItem, 'category' | 'price'> & { id?: string; selectedType?: string }, catalogue: CataloguePrice[] = []): number {
  if (item.category === 'Lipgloss') {
    return getLipglossVariantPricing(item.selectedType, catalogue).price;
  }
  const liveProduct = item.id
    ? catalogue.find((product) => product.id === item.id)
      || catalogue.find((product) => item.id!.startsWith(`${product.id}-`))
    : undefined;
  if (liveProduct) return Number(liveProduct.price);
  if (item.category === 'Big Brush') return getLipglossVariantPricing('big-brush', catalogue).price;
  if (item.category === 'Squeeze') return getLipglossVariantPricing('squeez', catalogue).price;
  return Number(item.price);
}

export function getOriginalPrice(item: Pick<Product, 'category' | 'originalPrice'> & { selectedType?: string }, catalogue: CataloguePrice[] = []): number | undefined {
  if (item.category === 'Lipgloss') {
    return getLipglossVariantPricing(item.selectedType, catalogue).originalPrice;
  }
  return item.originalPrice;
}
