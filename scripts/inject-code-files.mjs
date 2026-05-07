import { readFileSync, writeFileSync } from "fs";

const c = JSON.parse(readFileSync("product.config.json", "utf8"));

c.landing_sections.codeViewer.files = [
  {
    filename: "product.config.json",
    language: "JSON",
    description: "One file controls your entire product — brand, copy, pricing, nav, theme",
    content: JSON.stringify(
      {
        brand: {
          name: "Your Product",
          tagline: "Ship faster. Build smarter.",
          domain: "yourproduct.com",
          supportEmail: "support@yourproduct.com",
        },
        theme: {
          landing_theme: "simple",
          tokens: {
            colors: { primary: "#4285F4", secondary: "#34A853" },
            font: { heading: "Plus Jakarta Sans" },
          },
        },
        landing_sections: {
          navbar: {
            component: "NavbarBlock",
            links: [
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/pricing" },
            ],
            ctaText: "Get started free",
            ctaHref: "/auth/signup",
          },
          hero: {
            component: "HeroBlock",
            headline: "Build and ship your SaaS in days",
            ctaText: "Get Started Free",
            ctaHref: "/auth/signup",
          },
          pricing: {
            component: "PricingBlock",
            plans: [
              { name: "Free", price: 0 },
              { name: "Pro", price: 9, featured: true },
            ],
          },
          sections: ["navbar", "hero", "features", "pricing", "faq", "cta", "footer"],
        },
      },
      null,
      2,
    ),
  },
  {
    filename: "src/app/page.tsx",
    language: "TSX",
    description: "Landing page — all blocks driven by product.config.json, zero JSX imports",
    content: [
      'import { LandingRenderer } from "@/ui/LandingRenderer";',
      'import { landingSections } from "@/lib/config";',
      "",
      "export default function HomePage() {",
      "  return <LandingRenderer config={landingSections} />;",
      "}",
    ].join("\n"),
  },
  {
    filename: "src/lib/config.ts",
    language: "TS",
    description: "Typed config exports — every block imports from here, never raw JSON",
    content: [
      'import raw from "../../product.config.json";',
      "",
      "export const brand = raw.brand;",
      "export const theme = raw.theme;",
      "export const landingSections = {",
      "  ...raw.landing_sections,",
      "  // inject brand.name since JSON cannot self-reference",
      "  navbar: { ...raw.landing_sections.navbar, logoText: raw.brand.name },",
      "  footer: { ...raw.landing_sections.footer, logoText: raw.brand.name },",
      "};",
    ].join("\n"),
  },
  {
    filename: "src/app/not-found.tsx",
    language: "TSX",
    description: "Custom 404 page — styled, with Go Home + Contact CTAs",
    content: [
      'import Link from "next/link";',
      "",
      "export default function NotFound() {",
      "  return (",
      '    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">',
      '      <div className="text-8xl font-black text-gray-100 select-none">404</div>',
      '      <h1 className="text-2xl font-bold">Hmm, that page does not exist.</h1>',
      '      <p className="text-gray-500 max-w-sm">The link might be broken, or the page may have moved.</p>',
      '      <div className="flex gap-3">',
      '        <Link href="/" className="btn-primary">Go home</Link>',
      '        <Link href="/contact" className="btn-ghost">Contact support</Link>',
      "      </div>",
      "    </main>",
      "  );",
      "}",
    ].join("\n"),
  },
  {
    filename: "src/app/error.tsx",
    language: "TSX",
    description: "Error boundary — catches runtime errors, shows Try Again + Home",
    content: [
      '"use client";',
      'import { useEffect } from "react";',
      'import Link from "next/link";',
      "",
      "export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {",
      "  useEffect(() => { console.error(error); }, [error]);",
      "  return (",
      '    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">',
      '      <h1 className="text-2xl font-bold">Something went wrong</h1>',
      '      <div className="flex gap-3">',
      '        <button onClick={reset} className="btn-primary">Try again</button>',
      '        <Link href="/" className="btn-ghost">Go home</Link>',
      "      </div>",
      "    </main>",
      "  );",
      "}",
    ].join("\n"),
  },
  {
    filename: "src/ui/tokens/spacing.css",
    language: "CSS",
    description: "CSS variable token system — all spacing is data-driven",
    content: [
      ":root {",
      "  --space-base: 4px;",
      "  --space-1x:   4px;",
      "  --space-2x:   8px;",
      "  --space-4x:   16px;",
      "  --space-6x:   24px;",
      "  --space-8x:   32px;",
      "  --space-12x:  48px;",
      "  --space-16x:  64px;",
      "  --space-20x:  80px;",
      "  --space-24x:  96px;",
      "",
      "  /* Semantic section tokens */",
      "  --landing-section-py: calc(var(--space-base) * 20);",
      "  --landing-section-px: calc(var(--space-base) * 6);",
      "}",
    ].join("\n"),
  },
];

writeFileSync("product.config.json", JSON.stringify(c, null, 2));
console.log("Done. files:", c.landing_sections.codeViewer.files.length);
