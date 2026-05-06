// not-found.tsx - 404 page. Logic only: data passed to StatusPage.
import { StatusPage } from "@/ui/pages/StatusPage/StatusPage";
import { brand } from "@/lib/config";
import Link from "next/link";

export default function NotFound() {
  return (
    <StatusPage
      icon="404"
      iconIsNumeral
      heading="Page not found"
      body="The page you're looking for doesn't exist or has been moved."
      actions={[
        { label: "Go home", href: "/" },
        { label: "Contact support", href: "/contact", variant: "secondary" },
      ]}
      footnote={
        <>
          Error 404 &mdash; if you think this is a mistake,{" "}
          <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
            let us know
          </Link>
          .
        </>
      }
    />
  );
}