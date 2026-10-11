import { ChevronDown } from "lucide-react";

export type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      সাজান
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="cursor-pointer appearance-none rounded-lg border border-line bg-card py-1.5 pr-8 pl-3 text-ink"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2" aria-hidden />
      </span>
    </label>
  );
}
