"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import { inputClass, primaryButtonClass } from "./AuthCard";
import { SocialButtons } from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const fail = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return fail("আপনার নাম লিখুন।");
    if (!EMAIL_RE.test(form.email)) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (form.password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (form.password !== form.confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error: err } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (err) return fail(authErrorMessage(err));

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <label className="block text-sm font-medium">
          নাম
          <input value={form.name} onChange={set("name")} autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          ইমেইল
          <input type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input type="password" value={form.password} onChange={set("password")} autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input type="password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" placeholder="আবার লিখুন" className={inputClass} />
        </label>
        {error && (
          <p role="alert" className="rounded-lg bg-rise/10 px-3 py-2 text-sm text-rise">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
