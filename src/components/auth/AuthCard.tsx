import Link from "next/link";

export function AuthCard({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto flex w-full max-w-md flex-col py-6">
			<h1 className="text-center text-3xl font-bold">{title}</h1>
			<p className="mt-2 mb-6 text-center text-muted">{subtitle}</p>
			<div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
				{children}
			</div>
			<Link
				href="/"
				className="mt-6 text-center text-sm text-muted hover:text-ink"
			>
				← হোম পেজে ফিরে যান
			</Link>
		</div>
	);
}

export const inputClass =
	"mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60";
export const primaryButtonClass =
	"w-full rounded-lg bg-brand py-2.5 font-semibold text-white shadow-md hover:bg-brand-dark disabled:opacity-60";
