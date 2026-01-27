export type BundleStep = { label: string; labelAr?: string };

type ProductLike = { id: string; name: string };

type BundleProductLike = {
  category?: string;
  bundleSteps?: BundleStep[];
};

export function getBundleSteps(product: BundleProductLike | null | undefined): BundleStep[] {
  if (!product) return [];
  const steps = product.bundleSteps;
  return Array.isArray(steps) ? steps : [];
}

export function getStepLabelForIndex(steps: BundleStep[], idx: number, opts?: { useArabic?: boolean }): string {
  const useArabic = !!opts?.useArabic;
  const step = steps[idx];
  const base = useArabic ? (step?.labelAr || step?.label) : (step?.label || step?.labelAr);
  const raw = base || 'Shade';

  const totalSame = steps.filter((s) => {
    const v = useArabic ? (s.labelAr || s.label) : (s.label || s.labelAr);
    return (v || 'Shade') === raw;
  }).length;
  if (totalSame <= 1) return raw;

  const nth = steps
    .slice(0, idx + 1)
    .filter((s) => {
      const v = useArabic ? (s.labelAr || s.label) : (s.label || s.labelAr);
      return (v || 'Shade') === raw;
    }).length;

  return `${raw} ${nth}`;
}

export function buildBundleStepLabels(
  steps: BundleStep[],
  opts?: { quantity?: number; useArabic?: boolean }
): string[] {
  const qty = Math.max(1, Number(opts?.quantity || 1));
  const perBundleRequired = steps.length;
  if (perBundleRequired <= 0) return [];

  const labels: string[] = [];
  for (let b = 1; b <= qty; b++) {
    for (let i = 0; i < perBundleRequired; i++) {
      const step = getStepLabelForIndex(steps, i, { useArabic: opts?.useArabic });
      labels.push(qty > 1 ? `Bundle ${b}: ${step}` : step);
    }
  }
  return labels;
}

export function getShadeDisplayName(allProducts: ProductLike[], shadeId: string): string {
  const p = allProducts.find((x) => x.id === shadeId);
  return p?.name?.replace('Lipgloss - ', '') || shadeId;
}

export function formatBundleSelectionNames(
  steps: BundleStep[],
  selectedShadeIds: string[],
  allProducts: ProductLike[],
  opts?: { useArabic?: boolean }
): string[] {
  if (steps.length > 0 && steps.length === selectedShadeIds.length) {
    return selectedShadeIds.map((sid, idx) => {
      const shade = getShadeDisplayName(allProducts, sid);
      const label = getStepLabelForIndex(steps, idx, { useArabic: opts?.useArabic });
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
