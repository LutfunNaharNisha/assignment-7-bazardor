import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { ProductSummary } from "@/components/product/ProductSummary";
import { PriceSummary } from "@/components/product/PriceSummary";
import { MarketTable } from "@/components/product/MarketTable";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`); // protected route
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">হোম</Link>
        <span aria-hidden>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-ink">{product.categoryNameBn}</Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{product.nameBn}</span>
      </nav>
      <ProductSummary product={product} />
      <PriceSummary product={product} />
      <MarketTable product={product} />
    </div>
  );
}
