import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";
import { CategoryProducts } from "@/components/category/CategoryProducts";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(category.slug).catch(() => []);

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
        <span className="text-4xl" aria-hidden>
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>
      <CategoryProducts products={products} />
    </div>
  );
}
