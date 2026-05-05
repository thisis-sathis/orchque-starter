// FAQPage.tsx — standalone FAQ page. LandingTemplate + full-width FAQBlock + optional CTA.
import React from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import { FAQBlock, type FAQBlockProps } from "../../blocks/organisms/landing/FAQBlock";
import { CTABlock, type CTABlockProps } from "../../blocks/organisms/landing/CTABlock";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";

export interface FAQPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  faq: FAQBlockProps;
  cta?: CTABlockProps;
  className?: string;
}

export function FAQPage({ theme, navbar, footer, faq, cta, className }: FAQPageProps) {
  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer} className={className}>
      <FAQBlock {...faq} />
      {cta && <CTABlock {...cta} />}
    </LandingTemplate>
  );
}
