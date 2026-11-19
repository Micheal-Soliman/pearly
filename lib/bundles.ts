import type { BundleStep, Product } from '@/types';

export type { BundleStep } from '@/types';

type ProductLike = { id: string; name: string; category?: string; inStock?: boolean; isShade?: boolean };

type BundleProductLike = {
  category?: string;
  bundleSteps?: BundleStep[];
};

export function getBundleSteps(product: BundleProductLike | null | undefined): BundleStep[] {
  if (!product) return [];
  const steps = product.bundleSteps;
  return Array.isArray(steps) ? steps : [];
}

export function getStepLabelForIndex(steps: BundleStep[], idx: number): string {
  const step = steps[idx];
  const raw = step?.label || 'Shade';

  const totalSame = steps.filter((s) => {
    return (s.label || 'Shade') === raw;
  }).length;
  if (totalSame <= 1) return raw;

  const nth = steps
    .slice(0, idx + 1)
    .filter((s) => {
      return (s.label || 'Shade') === raw;
    }).length;

  return `${raw} ${nth}`;
}

export function buildBundleStepLabels(
  steps: BundleStep[],
  opts?: { quantity?: number }
): string[] {
  const qty = Math.max(1, Number(opts?.quantity || 1));
  const perBundleRequired = steps.length;
  if (perBundleRequired <= 0) return [];

  const labels: string[] = [];
  for (let b = 1; b <= qty; b++) {
    for (let i = 0; i < perBundleRequired; i++) {
      const step = getStepLabelForIndex(steps, i);
      labels.push(qty > 1 ? `Bundle ${b}: ${step}` : step);
    }
  }
  return labels;
}

export function getShadeDisplayName(allProducts: ProductLike[], shadeId: string): string {
  const p = allProducts.find((x) => x.id === shadeId);
  if (!p) return shadeId;
  const prefix = p.category ? `${p.category} - ` : '';
  return prefix && p.name.startsWith(prefix) ? p.name.slice(prefix.length) : p.name;
}

export function getBundleStepOptions(step: BundleStep, allProducts: Product[]): Product[] {
  const available = allProducts.filter((product) => product.inStock && product.category !== 'Bundles');

  if (step.productId) {
    const product = available.find((item) => item.id === step.productId);
    return product ? [product] : [];
  }

  const category = step.category?.trim();
  if (category) {
    const matches = available.filter((product) => product.category === category);
    const variants = matches.filter((product) => product.isShade);
    return variants.length ? variants : matches;
  }

  // Legacy bundles only stored a label. Keep them working as lipgloss shade choices.
  const legacyLipgloss = available.filter((product) => product.category === 'Lipgloss' && product.isShade);
  return legacyLipgloss.length ? legacyLipgloss : available.filter((product) => product.category === 'Lipgloss');
}

export function buildBundleStepOptions(steps: BundleStep[], allProducts: Product[], quantity = 1): Product[][] {
  const groups = steps.map((step) => getBundleStepOptions(step, allProducts));
  return Array.from({ length: Math.max(1, quantity) }, () => groups).flat();
}

export function formatBundleSelectionNames(
  steps: BundleStep[],
  selectedShadeIds: string[],
  allProducts: ProductLike[]
): string[] {
  if (steps.length > 0 && steps.length === selectedShadeIds.length) {
    return selectedShadeIds.map((sid, idx) => {
      const shade = getShadeDisplayName(allProducts, sid);
      const label = getStepLabelForIndex(steps, idx);
      return `${label}: ${shade}`;
    });
  }

  const counts: Record<string, number> = {};
  selectedShadeIds.forEach((sid) => {
    counts[sid] = (counts[sid] || 0) + 1;
  });
  return Object.entries(counts).map(([sid, c]) => {
    const base = getShadeDisplayName(allProducts, sid);
    return c > 1 ? `${base} x${c}` : base;
  });
}
