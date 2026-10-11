import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import { topMovers } from "@/lib/product-utils";
import { Hero } from "@/components/home/Hero";
import { MoversSection } from "@/components/home/MoversSection";
import { ProductGrid } from "@/components/ui/ProductGrid";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <div className="space-y-12">
      <Hero />
      <MoversSection dir="up" products={topMovers(products, "up")} />
      <MoversSection dir="down" products={topMovers(products, "down")} />
      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
