import { getProducts } from "@/lib/api";
import { formatNumber, formatPct, toNumber, unitName } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItem({ p }: { p: Product }) {
  const pct = toNumber(p.change.pct);
  const dir = pct === 0 ? "flat" : p.change.dir;
  const color = dir === "up" ? "text-rise" : dir === "down" ? "text-fall" : "text-muted";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <li className="flex shrink-0 items-center gap-2 border-r border-line px-4 py-2 text-sm whitespace-nowrap">
      <span aria-hidden>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-muted">
        {formatNumber(p.today)} টাকা/{unitName(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {symbol} {formatPct(pct)}
      </span>
    </li>
  );
}

export async function Ticker() {
  const products = await getProducts().catch(() => [] as Product[]);
  if (!products.length) return null;
  return (
    <div className="marquee overflow-hidden border-b border-line bg-card" role="region" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {products.map((p) => (
              <TickerItem key={`${copy}-${p.id}`} p={p} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
