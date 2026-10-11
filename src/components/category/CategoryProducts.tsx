"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { toBn, toNumber } from "@/lib/format";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { SortSelect, type SortKey } from "./SortSelect";

export function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  // Compare numeric values (never strings) so Bengali-digit prices sort correctly.
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const dir = sort === "asc" ? 1 : -1;
    return [...products].sort((a, b) => (toNumber(a.today) - toNumber(b.today)) * dir);
  }, [products, sort]);

  if (!products.length) {
    return <EmptyState title="কোনো পণ্য পাওয়া যায়নি" message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।" />;
  }

  return (
    <>
      <div className="flex justify-end rounded-2xl border border-line bg-card p-4">
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <p className="my-4 text-sm text-muted">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </>
  );
}
