"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto mt-24 max-w-md rounded-2xl border border-line bg-card p-8 text-center">
      <h1 className="text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="mt-2 text-muted">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="mt-6 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
