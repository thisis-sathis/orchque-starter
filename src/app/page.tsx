import { NavbarBlock } from "@/ui/blocks/organisms/landing/NavbarBlock/NavbarBlock";
import { HeroBlock } from "@/ui/blocks/organisms/landing/HeroBlock/HeroBlock";
import { FeaturesBlock } from "@/ui/blocks/organisms/landing/FeaturesBlock/FeaturesBlock";
import { PricingBlock } from "@/ui/blocks/organisms/landing/PricingBlock/PricingBlock";
import { FooterBlock } from "@/ui/blocks/organisms/landing/FooterBlock/FooterBlock";
import type { IconName } from "@/ui/components/icon";
import { PRODUCT } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      <NavbarBlock
        logoText={PRODUCT.name}
        links={[...PRODUCT.nav.links]}
        ctaText="Get started"
        ctaHref="/auth/signup"
      />
      <main className="flex-1">
        <HeroBlock
          headline={PRODUCT.hero.headline}
          subheadline={PRODUCT.hero.subhead}
          ctaText={PRODUCT.hero.cta}
          ctaHref={PRODUCT.hero.ctaHref}
          secondaryCtaText={PRODUCT.hero.secondaryCta}
          secondaryCtaHref={PRODUCT.hero.secondaryCtaHref}
          badge="Free — no credit card required"
        />
        <FeaturesBlock
          heading="Everything you need"
          subheading="Built with the tools and workflows you already know, so you can focus on what matters."
          features={PRODUCT.features.map((f) => ({ ...f, icon: f.icon as IconName | undefined }))}
        />
        <PricingBlock
          heading="Simple, transparent pricing"
          subheading="Start free. Upgrade when you need more."
          plans={[
            {
              name: PRODUCT.pricing.free.name,
              price: PRODUCT.pricing.free.price,
              interval: "month",
              features: [...PRODUCT.pricing.free.features],
              ctaText: "Get started free",
              ctaHref: "/auth/signup",
            },
            {
              name: PRODUCT.pricing.pro.name,
              price: PRODUCT.pricing.pro.price,
              interval: "month",
              features: [...PRODUCT.pricing.pro.features],
              ctaText: "Upgrade to Pro",
              ctaHref: "/auth/signup",
              featured: true,
            },
          ]}
        />
      </main>
      <FooterBlock
        logoText={PRODUCT.name}
        tagline={PRODUCT.tagline}
        legalLinks={[
          ...PRODUCT.nav.links,
          { label: "Privacy", href: "/legal/privacy" },
          { label: "Terms", href: "/legal/terms" },
          { label: "Support", href: "/dashboard/support" },
        ]}
      />
    </>
  );
}
