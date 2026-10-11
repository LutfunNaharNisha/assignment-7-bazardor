import { formatPct, toNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

const STYLES = {
  up: "bg-rise/10 text-rise",
  down: "bg-fall/10 text-fall",
  flat: "bg-black/5 text-muted",
} as const;
const SYMBOL = { up: "▲", down: "▼", flat: "—" } as const;
const LABEL = { up: "দাম বেড়েছে", down: "দাম কমেছে", flat: "দাম অপরিবর্তিত" } as const;

export function ChangeBadge({ change, className = "" }: { change: Product["change"]; className?: string }) {
  const pct = toNumber(change.pct);
  const dir = pct === 0 || (change.dir !== "up" && change.dir !== "down") ? "flat" : change.dir;
  return (
    <span
      title={LABEL[dir]}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[dir]} ${className}`}
    >
      <span aria-hidden>{SYMBOL[dir]}</span>
      <span className="sr-only">{LABEL[dir]}</span>
      {formatPct(pct)}
    </span>
  );
}
