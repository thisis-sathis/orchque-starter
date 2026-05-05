import { LegalPage } from "@/ui/pages/LegalPage/LegalPage";
import { brand, landing } from "@/lib/config";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      navbar={{ logoText: brand.name, links: landing.nav.links }}
      footer={{ logoText: brand.name, tagline: landing.footer.tagline, legalLinks: landing.footer.links }}
      title="Terms of Service"
      lastUpdated={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      sections={[
        {
          heading: "1. Acceptance",
          content: `By accessing or using ${brand.name}, you agree to be bound by these Terms. If you do not agree, do not use the service.`,
        },
        {
          heading: "2. Use of service",
          content: `You agree not to misuse ${brand.name}, attempt to circumvent usage limits, scrape the service, or use it for illegal purposes. We reserve the right to suspend accounts that violate these terms.`,
        },
        {
          heading: "3. Credits and billing",
          content: `Free plan users receive a limited number of credits each month. Credits reset monthly and do not carry over. Paid plans are billed monthly and are non-refundable except where required by law.`,
        },
        {
          heading: "4. Intellectual property",
          content: `You retain ownership of content you submit. By using ${brand.name} you grant us a limited license to process your content solely to provide the service.`,
        },
        {
          heading: "5. Disclaimer & limitation of liability",
          content: `The service is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of ${brand.name}.`,
        },
        {
          heading: "6. Contact",
          content: `Questions? Email ${brand.supportEmail}.`,
        },
      ]}
    />
  );
}
