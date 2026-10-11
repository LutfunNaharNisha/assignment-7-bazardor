const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert latin digits in a string/number to Bengali digits. */
export function toBn(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Convert a value that may contain Bengali digits to a real number (for sorting/math). */
export function toNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const latin = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "");
  const n = Number(latin);
  return Number.isFinite(n) ? n : 0;
}

/** 1850 -> ১,৮৫০ ; 63.5 -> ৬৩.৫০ */
export function formatNumber(n: number): string {
  const v = toNumber(n);
  const text = Number.isInteger(v)
    ? v.toLocaleString("en-US")
    : v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return toBn(text);
}

export function formatPct(pct: number): string {
  return toBn(toNumber(pct).toFixed(1)) + "%";
}

const UNITS: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  piece: "পিস",
  pc: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

export function unitName(unit: string): string {
  return UNITS[unit.trim().toLowerCase()] ?? unit;
}

export function unitLine(unit: string): string {
  return `প্রতি ${unitName(unit)}`;
}

export function banglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
