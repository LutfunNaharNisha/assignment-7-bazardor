export function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-black/10 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-card p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <Bar className="size-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Bar className="h-4 w-2/3" />
          <Bar className="h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <Bar className="h-3 w-16" />
          <Bar className="h-6 w-24" />
        </div>
        <Bar className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
