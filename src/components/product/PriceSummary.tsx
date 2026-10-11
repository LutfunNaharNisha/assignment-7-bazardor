import type { Product } from "@/lib/types";
import { formatNumber, unitName } from "@/lib/format";
import { marketStats } from "@/lib/product-utils";

export function PriceSummary({ product }: { product: Product }) {
  const { min, max, avg } = marketStats(product);
  const cards = [
    { label: "সর্বনিম্ন দাম", value: min, note: "সবচেয়ে কম দামের বাজার", color: "text-fall" },
    { label: "সর্বাধিক দাম", value: max, note: "সবচেয়ে বেশি দামের বাজার", color: "text-rise" },
    { label: "গড় দাম", value: avg, note: `প্রতি ${unitName(product.unit)}-এর হিসাবে`, color: "text-fall" },
  ];
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-line p-4">
            <p className="text-xs text-muted">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>
              {formatNumber(c.value)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-muted">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
