import { NavbarBlock } from "@/ui/blocks/organisms/landing/NavbarBlock/NavbarBlock";
import { PricingBlock } from "@/ui/blocks/organisms/landing/PricingBlock/PricingBlock";
import { FooterBlock } from "@/ui/blocks/organisms/landing/FooterBlock/FooterBlock";
import { PRODUCT } from "@/lib/config";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <NavbarBlock logoText={PRODUCT.name} links={[...PRODUCT.nav.links]} />
      <main className="flex-1">
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
        legalLinks={[...PRODUCT.nav.links]}
      />
    </>
  );
}
