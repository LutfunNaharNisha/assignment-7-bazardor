import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/ui/ProductGrid";

export function MoversSection({ dir, products }: { dir: "up" | "down"; products: Product[] }) {
  if (!products.length) return null;
  const up = dir === "up";
  return (
    <section aria-labelledby={`movers-${dir}`}>
      <h2 id={`movers-${dir}`} className="mb-4 flex items-center gap-2 text-xl font-bold">
        <span className={up ? "text-rise" : "text-fall"} aria-hidden>
          {up ? "▲" : "▼"}
        </span>
        {up ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
