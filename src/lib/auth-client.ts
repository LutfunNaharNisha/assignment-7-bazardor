"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  USER_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট নেই।",
};

/** Map a Better Auth error to a Bengali message. */
export function authErrorMessage(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।";
  if (error.code?.startsWith("USER_ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  return error.message || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।";
}

/** Only allow same-site relative redirects. */
export function safeRedirect(path: string | null | undefined): string {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}
