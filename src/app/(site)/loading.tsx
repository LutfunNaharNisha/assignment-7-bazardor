import { Bar, ProductGridSkeleton } from "@/components/ui/Skeletons";

export default function HomeLoading() {
  return (
    <div className="space-y-12">
      <Bar className="h-64 w-full rounded-3xl" />
      <section className="space-y-4">
        <Bar className="h-7 w-48" />
        <ProductGridSkeleton />
      </section>
      <section className="space-y-4">
        <Bar className="h-7 w-48" />
        <ProductGridSkeleton />
      </section>
    </div>
  );
}
