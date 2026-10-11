import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Server-side guard: redirects to /signin (with a toast reason) when logged out. */
export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?reason=protected&redirect=${encodeURIComponent(returnTo)}`);
  }
  return session;
}
