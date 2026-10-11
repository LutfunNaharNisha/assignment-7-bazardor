import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import NavIcon from "../../assets/logo-icon.png";
import { CategoryNav } from "./CategoryNav";
import { UserMenu } from "./UserMenu";

export async function Header() {
	const categories = await getCategories().catch(() => []);
	return (
		<header className="border-b border-line bg-card">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
				<Link
					href="/"
					className="flex items-center gap-3"
				>
					<span
						className="flex size-10 items-center justify-center rounded-xl bg-brand text-white"
						aria-hidden
					>
						<Image
							src={NavIcon}
							alt="Nav Icon"
						/>
					</span>
					<span className="leading-tight">
						<span className="block text-lg font-bold">
							বাজার দর
						</span>
						<span className="block text-xs text-muted">
							{banglaDate()}
						</span>
					</span>
				</Link>
				<UserMenu />
			</div>
			<CategoryNav categories={categories} />
		</header>
	);
}
