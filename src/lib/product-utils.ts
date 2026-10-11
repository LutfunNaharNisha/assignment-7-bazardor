import type { Product } from "./types";
import { toNumber } from "./format";

export function topMovers(products: Product[], dir: "up" | "down", limit = 6) {
  return products
    .filter((p) => p.change.dir === dir && toNumber(p.change.pct) > 0)
    .sort((a, b) => toNumber(b.change.pct) - toNumber(a.change.pct))
    .slice(0, limit);
}

export function marketStats(product: Product) {
  const markets = product.markets ?? [];
  const rows = markets
    .map((m) => ({ ...m, avg: (toNumber(m.min) + toNumber(m.max)) / 2 }))
    .sort((a, b) => a.avg - b.avg);
  const min = rows.length ? Math.min(...rows.map((r) => toNumber(r.min))) : product.today;
  const max = rows.length ? Math.max(...rows.map((r) => toNumber(r.max))) : product.today;
  return { rows, min, max, avg: product.today };
}
