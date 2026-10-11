"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage, safeRedirect } from "@/lib/auth-client";
import { inputClass, primaryButtonClass } from "./AuthCard";
import { SocialButtons } from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toasted = useRef(false);

  // Toast shown when a protected route bounced the visitor here.
  useEffect(() => {
    if (params.get("reason") === "protected" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন।");
    }
  }, [params]);

  const fail = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email)) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");

    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (err) return fail(authErrorMessage(err));

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(safeRedirect(redirect));
    router.refresh();
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <label className="block text-sm font-medium">
          ইমেইল
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
        </label>
        {error && (
          <p role="alert" className="rounded-lg bg-rise/10 px-3 py-2 text-sm text-rise">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className={primaryButtonClass}>
          {loading ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
        </button>
      </form>
      <SocialButtons redirectTo={redirect} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
