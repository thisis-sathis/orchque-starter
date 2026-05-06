"use client";
// offline/page.tsx - No internet page. Logic only: reload handler passed to StatusPage.
import { StatusPage } from "@/ui/pages/StatusPage/StatusPage";

export default function OfflinePage() {
  return (
    <StatusPage
      icon="📡"
      heading="No internet connection"
      body="It looks like you're offline. Check your connection and try again."
      actions={[{ label: "Retry", onClick: () => window.location.reload() }]}
    />
  );
}