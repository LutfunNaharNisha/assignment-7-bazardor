"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Bar } from "@/components/ui/Skeletons";
import { authClient } from "@/lib/auth-client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export function UserMenu() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		};
		const onKey = (e: KeyboardEvent) =>
			e.key === "Escape" && setOpen(false);
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	if (isPending) return <Bar className="h-9 w-28" />;

	if (!session) {
		return (
			<div className="flex items-center gap-2">
				<Link
					href="/signin"
					className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:bg-black/5 sm:px-4 sm:py-2"
				>
					সাইন ইন
				</Link>
				<Link
					href="/signup"
					className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark sm:px-4 sm:py-2"
				>
					সাইন আপ
				</Link>
			</div>
		);
	}

	const { user } = session;
	const signOut = () =>
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					setOpen(false);
					toast.success("সফলভাবে সাইন আউট হয়েছে");
					router.push("/");
					router.refresh();
				},
				onError: () => {
					toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
				},
			},
		});

	return (
		<div
			ref={ref}
			className="relative"
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
				className="flex items-center gap-2 rounded-lg p-1 hover:bg-black/5"
			>
				<Avatar
					name={user.name}
					image={user.image}
				/>
				<span className="hidden text-sm font-medium sm:inline">
					{user.name.split(" ")[0]}
				</span>
				<span
					aria-hidden
					className="text-[10px] text-muted"
				>
					▼
				</span>
			</button>
			{open && (
				<div
					role="menu"
					className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-line bg-card p-4 shadow-xl"
				>
					<p className="font-semibold">{user.name}</p>
					<p className="truncate text-sm text-muted">{user.email}</p>
					<Link
						href="/profile"
						role="menuitem"
						onClick={() => setOpen(false)}
						className="mt-4 flex items-center gap-2 text-sm hover:text-brand"
					>
						<User size={16} /> আমার প্রোফাইল
					</Link>
					<button
						type="button"
						role="menuitem"
						onClick={signOut}
						className="mt-3 flex items-center gap-2 text-sm text-rise hover:underline"
					>
						<LogOut size={16} /> সাইন আউট
					</button>
				</div>
			)}
		</div>
	);
}
