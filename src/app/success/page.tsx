// success/page.tsx - Success confirmation page. Logic only: resolves config from ?from= param.
import { StatusPage } from "@/ui/pages/StatusPage/StatusPage";

interface SearchParams { from?: string; message?: string }

const CONFIGS: Record<string, { icon: string; heading: string; body: string; cta: string; ctaHref: string }> = {
  purchase:  { icon: "🎉", heading: "You're in!",             body: "Your payment was successful. Check your inbox for a receipt and onboarding details.", cta: "Go to dashboard", ctaHref: "/dashboard" },
  waitlist:  { icon: "✉️",  heading: "You're on the list",    body: "We'll email you as soon as a spot opens. Keep an eye on your inbox.",               cta: "Back to home",    ctaHref: "/" },
  contact:   { icon: "📬", heading: "Message received",       body: "Thanks for reaching out! We'll get back to you within 24 hours.",                   cta: "Back to home",    ctaHref: "/" },
  demo:      { icon: "📅", heading: "Demo request received",  body: "Check your inbox — we'll send a calendar invite within a few hours.",               cta: "Back to home",    ctaHref: "/" },
};

export default function SuccessPage({ searchParams }: { searchParams: SearchParams }) {
  const from = searchParams.from ?? "default";
  const c = CONFIGS[from] ?? {
    icon: "✅",
    heading: "Done!",
    body: searchParams.message ?? "Your action was completed successfully.",
    cta: "Continue",
    ctaHref: "/",
  };

  return (
    <StatusPage
      icon={c.icon}
      heading={c.heading}
      body={c.body}
      actions={[{ label: c.cta, href: c.ctaHref }]}
    />
  );
}