import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage() {
  if (await getSession()) redirect("/");
  return (
    <AuthCard title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-black/5" />}>
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
}
