"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, authErrorMessage } from "@/lib/auth-client";
import { inputClass, primaryButtonClass } from "@/components/auth/AuthCard";

export function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(authErrorMessage(error));
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium">
        নাম
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="name" />
      </label>
      <button type="submit" disabled={loading} className={primaryButtonClass}>
        {loading ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
