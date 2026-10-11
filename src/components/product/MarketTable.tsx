import type { Product } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { marketStats } from "@/lib/product-utils";

export function MarketTable({ product }: { product: Product }) {
  const { rows } = marketStats(product);
  if (!rows.length) return null;
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">বাজার</th>
              <th className="px-4 py-3 font-medium">বিভাগ</th>
              <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
              <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
              <th className="px-4 py-3 text-right font-medium">গড়</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.market}-${r.division}`} className="border-t border-line even:bg-black/[0.03]">
                <td className="px-4 py-3">{r.market}</td>
                <td className="px-4 py-3">{r.division}</td>
                <td className="px-4 py-3 text-right">{formatNumber(r.min)} টাকা</td>
                <td className="px-4 py-3 text-right">{formatNumber(r.max)} টাকা</td>
                <td className="px-4 py-3 text-right font-bold">{formatNumber(r.avg)} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
