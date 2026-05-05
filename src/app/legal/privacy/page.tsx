import { LegalPage } from "@/ui/pages/LegalPage/LegalPage";
import { brand, landing } from "@/lib/config";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      navbar={{ logoText: brand.name, links: landing.nav.links }}
      footer={{ logoText: brand.name, tagline: landing.footer.tagline, legalLinks: landing.footer.links }}
      title="Privacy Policy"
      lastUpdated={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      sections={[
        {
          heading: "1. Information we collect",
          content: `We collect information you provide directly: your email address when you create an account, and content you submit while using ${brand.name}. We also collect standard server logs (IP addresses, browser type, pages visited) for security and performance monitoring.`,
        },
        {
          heading: "2. How we use your information",
          content: `We use your information to provide and improve ${brand.name}, send transactional emails (verification, password reset, support replies), and monitor for abuse. We do not sell your personal data.`,
        },
        {
          heading: "3. Data storage",
          content: `Your data is stored securely via Supabase (PostgreSQL). All connections are encrypted in transit (TLS). We retain your data for as long as your account is active.`,
        },
        {
          heading: "4. Your rights",
          content: `You may request deletion of your account and data at any time by contacting us at ${brand.supportEmail}. We will respond within 30 days.`,
        },
        {
          heading: "5. Contact",
          content: `Questions about this policy? Email us at ${brand.supportEmail}.`,
        },
      ]}
    />
  );
}
