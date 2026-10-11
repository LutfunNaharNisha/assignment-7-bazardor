import { Bar, ProductGridSkeleton } from "@/components/ui/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="space-y-4">
      <Bar className="h-24 w-full rounded-2xl" />
      <Bar className="h-16 w-full rounded-2xl" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}
