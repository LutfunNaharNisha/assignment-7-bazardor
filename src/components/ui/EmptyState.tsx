import Link from "next/link";

export function EmptyState({ title, message, code }: { title: string; message: string; code?: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-line bg-card px-6 py-14 text-center">
      {code && <p className="text-6xl font-bold text-brand">{code}</p>}
      <h1 className="mt-3 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted">{message}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
