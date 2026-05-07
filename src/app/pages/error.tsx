"use client";
// error.tsx - App-level error boundary. Logic only: passes error digest + reset handler to StatusPage.
import { StatusPage } from "@/ui/pages/StatusPage/StatusPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <StatusPage
      icon="⚠️"
      heading="Something went wrong"
      body="An unexpected error occurred. We've been notified and are looking into it."
      detail={error.digest ? `Error ID: ${error.digest}` : undefined}
      actions={[
        { label: "Try again", onClick: reset },
        { label: "Go home", href: "/", variant: "secondary" },
      ]}
    />
  );
}