import Link from "next/link";
import { requireSession } from "@/lib/session";
import { Avatar } from "@/components/ui/Avatar";
import { SignOutButton } from "@/components/profile/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-5 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} size={72} />
          <div className="min-w-0">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="truncate text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>
      <Link
        href="/profile/update"
        className="mt-4 block rounded-lg bg-brand py-2.5 text-center font-semibold text-white shadow-md hover:bg-brand-dark"
      >
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
