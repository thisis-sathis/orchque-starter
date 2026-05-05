// LandingPage.tsx — full landing page. Takes top-level product.config.json shape.
// Renders: LandingTemplate > NavbarBlock + HeroBlock + FeaturesBlock + PricingBlock
//           + TestimonialsBlock + FAQBlock + CTABlock + FooterBlock
import React from "react";
import { LandingTemplate, type LandingTheme } from "@/ui/templates/LandingTemplate";
import { HeroBlock } from "@/ui/blocks/organisms/landing/HeroBlock";
import { FeaturesBlock } from "@/ui/blocks/organisms/landing/FeaturesBlock";
import { PricingBlock } from "@/ui/blocks/organisms/landing/PricingBlock";
import { TestimonialsBlock } from "@/ui/blocks/organisms/landing/TestimonialsBlock";
import { FAQBlock } from "@/ui/blocks/organisms/landing/FAQBlock";
import { CTABlock } from "@/ui/blocks/organisms/landing/CTABlock";
import type { NavbarBlockProps } from "@/ui/blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "@/ui/blocks/organisms/landing/FooterBlock";
import type { HeroBlockProps } from "@/ui/blocks/organisms/landing/HeroBlock";
import type { FeaturesBlockProps } from "@/ui/blocks/organisms/landing/FeaturesBlock";
import type { PricingBlockProps } from "@/ui/blocks/organisms/landing/PricingBlock";
import type { TestimonialsBlockProps } from "@/ui/blocks/organisms/landing/TestimonialsBlock";
import type { FAQBlockProps } from "@/ui/blocks/organisms/landing/FAQBlock";
import type { CTABlockProps } from "@/ui/blocks/organisms/landing/CTABlock";

export interface LandingPageConfig {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  hero: HeroBlockProps;
  features?: FeaturesBlockProps;
  pricing?: PricingBlockProps;
  testimonials?: TestimonialsBlockProps;
  faq?: FAQBlockProps;
  cta?: CTABlockProps;
  footer: FooterBlockProps;
}

export interface LandingPageProps {
  config: LandingPageConfig;
}

export function LandingPage({ config }: LandingPageProps) {
  const { theme, navbar, hero, features, pricing, testimonials, faq, cta, footer } = config;

  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer}>
      <HeroBlock {...hero} />
      {features && <FeaturesBlock {...features} />}
      {pricing && <PricingBlock {...pricing} />}
      {testimonials && <TestimonialsBlock {...testimonials} />}
      {faq && <FAQBlock {...faq} />}
      {cta && <CTABlock {...cta} />}
    </LandingTemplate>
  );
}
