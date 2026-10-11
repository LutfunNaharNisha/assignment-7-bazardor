import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// const font = Hind_Siliguri({
//   subsets: ["bengali", "latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-bn",
//   display: "swap",
// });

const font = Noto_Sans_Bengali({
	subsets: ["bengali", "latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-bn",
	display: "swap",
});

export const metadata: Metadata = {
	title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
	description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="bn"
			className={font.variable}
		>
			<body className="min-h-screen font-sans">
				{children}
				<Toaster
					position="top-center"
					toastOptions={{ duration: 3500 }}
				/>
			</body>
		</html>
	);
}
