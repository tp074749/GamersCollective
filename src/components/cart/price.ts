export function parsePrice(p?: string): number {
  if (!p) return 0;
  if (/free/i.test(p)) return 0;
  const n = Number((p.match(/[\d.]+/) ?? [0])[0]);
  return Number.isFinite(n) ? n : 0;
}

export function formatMYR(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "MYR" }).format(n);
}
