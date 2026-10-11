import { Bar } from "@/components/ui/Skeletons";

export default function ProductLoading() {
  return (
    <div className="space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <Bar className="h-5 w-56" />
      <Bar className="h-44 w-full rounded-2xl" />
      <Bar className="h-40 w-full rounded-2xl" />
      <Bar className="h-96 w-full rounded-2xl" />
    </div>
  );
}
