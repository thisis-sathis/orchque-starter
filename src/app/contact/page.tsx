// contact/page.tsx — thin data wrapper. All rendering lives in ContactPage ui/page.
"use client";
import { ContactPage } from "@/ui/pages/ContactPage/ContactPage";
import { brand, landing } from "@/lib/config";

async function handleSubmit(data: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
}

export default function ContactRoute() {
  return (
    <ContactPage
      navbar={{
        logoText: brand.name,
        links: landing.nav.links as any,
        ctaText: landing.nav.cta.label,
        ctaHref: landing.nav.cta.href,
      }}
      footer={{
        logoText: brand.name,
        tagline: landing.footer.tagline,
        legalLinks: landing.footer.links,
      }}
      supportEmail={brand.supportEmail}
      onSubmit={handleSubmit}
    />
  );
}
