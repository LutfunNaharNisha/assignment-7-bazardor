import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatNumber, unitLine } from "@/lib/format";
import { ChangeBadge } from "./ChangeBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-line bg-card p-4 transition-shadow hover:shadow-md focus-visible:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-black/5 text-2xl" aria-hidden>
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-sm text-muted">{unitLine(product.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatNumber(product.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
