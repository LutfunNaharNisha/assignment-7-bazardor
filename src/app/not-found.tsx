import { SiteShell } from "@/components/layout/SiteShell";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <SiteShell>
      <EmptyState code="৪০৪" title="পাতাটি খুঁজে পাওয়া যায়নি" message="আপনি যে ঠিকানাটি খুঁজছেন সেটি নেই বা সরানো হয়েছে।" />
    </SiteShell>
  );
}
