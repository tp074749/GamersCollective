// src/components/features/cart/parsePriceFromText.ts

export function formatMYR(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "MYR" }).format(n);
}
