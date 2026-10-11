/* eslint-disable @next/next/no-img-element */
export function Avatar({ name, image, size = 36 }: { name: string; image?: string | null; size?: number }) {
  const style = { width: size, height: size };
  if (image) {
    return <img src={image} alt={name} style={style} className="rounded-lg object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <span
      style={style}
      className="inline-flex items-center justify-center rounded-lg bg-brand-soft font-bold text-brand"
      aria-hidden
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
