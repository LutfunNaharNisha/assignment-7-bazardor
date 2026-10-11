"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("সফলভাবে সাইন আউট হয়েছে");
              router.push("/");
              router.refresh();
            },
          },
        })
      }
      className="flex items-center gap-2 rounded-lg border border-rise px-4 py-2 text-sm font-medium text-rise hover:bg-rise/5"
    >
      <LogOut size={16} /> সাইন আউট
    </button>
  );
}
