import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatNumber, toNumber, unitName } from "@/lib/format";
import { ChangeBadge } from "@/components/ui/ChangeBadge";

export function ProductSummary({ product }: { product: Product }) {
  const diff = toNumber(product.today) - toNumber(product.yesterday);
  const verb = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত আছে";
  const history = [
    ["আজ", product.today],
    ["গতকাল", product.yesterday],
    ["গত সপ্তাহ", product.lastWeek],
    ["গত মাস", product.lastMonth],
  ] as const;

  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-4xl" aria-hidden>
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-muted">
              প্রতি {unitName(product.unit)}
              <span className="mx-1">·</span>
              <Link href={`/category/${product.category}`} className="rounded-full bg-brand-soft px-2 py-0.5 text-brand hover:underline">
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </p>
            <p className="mt-1 text-sm">
              গতকালের তুলনায় আজ দাম <strong>{verb}</strong>
              {diff !== 0 && <> · {formatNumber(Math.abs(diff))} টাকা</>}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-black/5 px-6 py-4 text-center">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatNumber(product.today)}</p>
          <p className="text-sm text-muted">টাকা / {unitName(product.unit)}</p>
          <ChangeBadge change={product.change} className="mt-1" />
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4">
        {history.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="font-semibold">{formatNumber(value)} টাকা</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
