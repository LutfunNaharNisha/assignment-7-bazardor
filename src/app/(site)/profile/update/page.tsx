import { requireSession } from "@/lib/session";
import { UpdateNameForm } from "@/components/profile/UpdateNameForm";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-5 text-sm text-muted">আপনার নাম পরিবর্তন করুন।</p>
      <div className="rounded-2xl border border-line bg-card p-5">
        <UpdateNameForm currentName={user.name} />
      </div>
    </div>
  );
}
