// PricingPage.tsx — standalone pricing page. LandingTemplate + PricingBlock.
import React from "react";
import { LandingTemplate, type LandingTheme } from "@/ui/templates/LandingTemplate";
import { PricingBlock, type PricingBlockProps } from "@/ui/blocks/organisms/landing/PricingBlock";
import { CTABlock, type CTABlockProps } from "@/ui/blocks/organisms/landing/CTABlock";
import type { NavbarBlockProps } from "@/ui/blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "@/ui/blocks/organisms/landing/FooterBlock";

export interface PricingPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  pricing: PricingBlockProps;
  cta?: CTABlockProps;
}

export function PricingPage({ theme, navbar, footer, pricing, cta }: PricingPageProps) {
  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer}>
      <PricingBlock {...pricing} />
      {cta && <CTABlock {...cta} />}
    </LandingTemplate>
  );
}
