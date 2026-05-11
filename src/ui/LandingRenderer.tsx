"use client";

/**
 * LandingRenderer — JSON-to-component renderer for the landing page.
 *
 * Pass an ordered `sections` array where each item has a `component` key
 * (matching a registry entry) plus whatever props that block expects.
 * The renderer dynamically imports and renders each block in order.
 *
 * Usage in page.tsx:
 *   import { LandingRenderer } from "@/ui/LandingRenderer";
 *   <LandingRenderer navbar={...} footer={...} sections={[
 *     { component: "HeroBlock", headline: "...", ... },
 *     { component: "FeaturesBlock", features: [...] },
 *   ]} />
 */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// ─── Registry ────────────────────────────────────────────────────────────────
// Each entry is a next/dynamic import so every block is code-split.
// Adding a new block = add one line here and reference "ComponentName" in your sections array.

const registry: Record<string, ComponentType<any>> = {
  // ── Structural ──────────────────────────────────────────────────────────
  AnnouncementBarBlock: dynamic(() =>
    import("./blocks/organisms/landing/AnnouncementBarBlock/AnnouncementBarBlock").then(
      (m) => ({ default: m.AnnouncementBarBlock }),
    ),
  ),
  NavbarBlock: dynamic(() =>
    import("./blocks/organisms/landing/NavbarBlock/NavbarBlock").then(
      (m) => ({ default: m.NavbarBlock }),
    ),
  ),
  FooterBlock: dynamic(() =>
    import("./blocks/organisms/landing/FooterBlock/FooterBlock").then(
      (m) => ({ default: m.FooterBlock }),
    ),
  ),

  // ── Hero & above-fold ───────────────────────────────────────────────────
  HeroBlock: dynamic(() =>
    import("./blocks/organisms/landing/HeroBlock/HeroBlock").then(
      (m) => ({ default: m.HeroBlock }),
    ),
  ),
  WhatIsThisBlock: dynamic(() =>
    import("./blocks/organisms/landing/WhatIsThisBlock/WhatIsThisBlock").then(
      (m) => ({ default: m.WhatIsThisBlock }),
    ),
  ),
  CompanyLogosBlock: dynamic(() =>
    import("./blocks/organisms/landing/CompanyLogosBlock/CompanyLogosBlock").then(
      (m) => ({ default: m.CompanyLogosBlock }),
    ),
  ),
  FeaturedOnBlock: dynamic(() =>
    import("./blocks/organisms/landing/FeaturedOnBlock/FeaturedOnBlock").then(
      (m) => ({ default: m.FeaturedOnBlock }),
    ),
  ),

  // ── Problem / solution ──────────────────────────────────────────────────
  BeforeAfterBlock: dynamic(() =>
    import("./blocks/organisms/landing/BeforeAfterBlock/BeforeAfterBlock").then(
      (m) => ({ default: m.BeforeAfterBlock }),
    ),
  ),
  ProblemSolutionBlock: dynamic(() =>
    import("./blocks/organisms/landing/ProblemSolutionBlock/ProblemSolutionBlock").then(
      (m) => ({ default: m.ProblemSolutionBlock }),
    ),
  ),
  HowItWorksBlock: dynamic(() =>
    import("./blocks/organisms/landing/HowItWorksBlock/HowItWorksBlock").then(
      (m) => ({ default: m.HowItWorksBlock }),
    ),
  ),

  // ── Product / features ──────────────────────────────────────────────────
  FeaturesBlock: dynamic(() =>
    import("./blocks/organisms/landing/FeaturesBlock/FeaturesBlock").then(
      (m) => ({ default: m.FeaturesBlock }),
    ),
  ),
  WhatsIncludedBlock: dynamic(() =>
    import("./blocks/organisms/landing/WhatsIncludedBlock/WhatsIncludedBlock").then(
      (m) => ({ default: m.WhatsIncludedBlock }),
    ),
  ),
  AppPagesShowcaseBlock: dynamic(() =>
    import("./blocks/organisms/landing/AppPagesShowcaseBlock/AppPagesShowcaseBlock").then(
      (m) => ({ default: m.AppPagesShowcaseBlock }),
    ),
  ),
  InstallBlock: dynamic(() =>
    import("./blocks/organisms/landing/InstallBlock/InstallBlock").then(
      (m) => ({ default: m.InstallBlock }),
    ),
  ),
  CodeViewerBlock: dynamic(() =>
    import("./blocks/organisms/landing/CodeViewerBlock/CodeViewerBlock").then(
      (m) => ({ default: m.CodeViewerBlock }),
    ),
  ),

  // ── Demo (app-level component) ──────────────────────────────────────────
  DemoSection: dynamic(() =>
    import("@/app/_components/DemoSection").then(
      (m) => ({ default: m.DemoSection }),
    ),
  ),

  // ── Conversion / persuasion ─────────────────────────────────────────────
  TryWithoutSignupBlock: dynamic(() =>
    import("./blocks/organisms/landing/TryWithoutSignupBlock/TryWithoutSignupBlock").then(
      (m) => ({ default: m.TryWithoutSignupBlock }),
    ),
  ),
  WhyBetterBlock: dynamic(() =>
    import("./blocks/organisms/landing/WhyBetterBlock/WhyBetterBlock").then(
      (m) => ({ default: m.WhyBetterBlock }),
    ),
  ),
  ComparisonBlock: dynamic(() =>
    import("./blocks/organisms/landing/ComparisonBlock/ComparisonBlock").then(
      (m) => ({ default: m.ComparisonBlock }),
    ),
  ),
  UseCasesBlock: dynamic(() =>
    import("./blocks/organisms/landing/UseCasesBlock/UseCasesBlock").then(
      (m) => ({ default: m.UseCasesBlock }),
    ),
  ),
  PickYourPathBlock: dynamic(() =>
    import("./blocks/organisms/landing/PickYourPathBlock/PickYourPathBlock").then(
      (m) => ({ default: m.PickYourPathBlock }),
    ),
  ),

  // ── Social proof ────────────────────────────────────────────────────────
  CustomerStoriesBlock: dynamic(() =>
    import("./blocks/organisms/landing/CustomerStoriesBlock/CustomerStoriesBlock").then(
      (m) => ({ default: m.CustomerStoriesBlock }),
    ),
  ),
  FirstUserBlock: dynamic(() =>
    import("./blocks/organisms/landing/FirstUserBlock/FirstUserBlock").then(
      (m) => ({ default: m.FirstUserBlock }),
    ),
  ),
  WallOfLoveBlock: dynamic(() =>
    import("./blocks/organisms/landing/WallOfLoveBlock/WallOfLoveBlock").then(
      (m) => ({ default: m.WallOfLoveBlock }),
    ),
  ),
  SocialCardsBlock: dynamic(() =>
    import("./blocks/organisms/landing/SocialCardsBlock/SocialCardsBlock").then(
      (m) => ({ default: m.SocialCardsBlock }),
    ),
  ),
  ReelsBlock: dynamic(() =>
    import("./blocks/organisms/landing/ReelsBlock/ReelsBlock").then(
      (m) => ({ default: m.ReelsBlock }),
    ),
  ),
  LeaderboardBlock: dynamic(() =>
    import("./blocks/organisms/landing/LeaderboardBlock/LeaderboardBlock").then(
      (m) => ({ default: m.LeaderboardBlock }),
    ),
  ),
  AwardsBlock: dynamic(() =>
    import("./blocks/organisms/landing/AwardsBlock/AwardsBlock").then(
      (m) => ({ default: m.AwardsBlock }),
    ),
  ),
  MetricsBlock: dynamic(() =>
    import("./blocks/organisms/landing/MetricsBlock/MetricsBlock").then(
      (m) => ({ default: m.MetricsBlock }),
    ),
  ),
  VideoBlock: dynamic(() =>
    import("./blocks/organisms/landing/VideoBlock/VideoBlock").then(
      (m) => ({ default: m.VideoBlock }),
    ),
  ),
  TestimonialsBlock: dynamic(() =>
    import("./blocks/organisms/landing/TestimonialsBlock/TestimonialsBlock").then(
      (m) => ({ default: m.TestimonialsBlock }),
    ),
  ),

  // ── Pricing ─────────────────────────────────────────────────────────────
  PricingBlock: dynamic(() =>
    import("./blocks/organisms/landing/PricingBlock/PricingBlock").then(
      (m) => ({ default: m.PricingBlock }),
    ),
  ),
  // CountdownBlock key → routes to the client-side timer component
  CountdownBlock: dynamic(() =>
    import("./blocks/organisms/landing/CountdownBlock/CountdownBlockClient").then(
      (m) => ({ default: m.CountdownBlockClient }),
    ),
  ),
  PricingBundleBlock: dynamic(() =>
    import("./blocks/organisms/landing/PricingBundleBlock/PricingBundleBlock").then(
      (m) => ({ default: m.PricingBundleBlock }),
    ),
  ),
  FounderPricingBlock: dynamic(() =>
    import("./blocks/organisms/landing/FounderPricingBlock/FounderPricingBlock").then(
      (m) => ({ default: m.FounderPricingBlock }),
    ),
  ),
  BonusOfferBlock: dynamic(() =>
    import("./blocks/organisms/landing/BonusOfferBlock/BonusOfferBlock").then(
      (m) => ({ default: m.BonusOfferBlock }),
    ),
  ),

  // ── FAQ / content ───────────────────────────────────────────────────────
  FAQBlock: dynamic(() =>
    import("./blocks/organisms/landing/FAQBlock/FAQBlock").then(
      (m) => ({ default: m.FAQBlock }),
    ),
  ),
  CommonMistakesBlock: dynamic(() =>
    import("./blocks/organisms/landing/CommonMistakesBlock/CommonMistakesBlock").then(
      (m) => ({ default: m.CommonMistakesBlock }),
    ),
  ),
  ResourcesBlock: dynamic(() =>
    import("./blocks/organisms/landing/ResourcesBlock/ResourcesBlock").then(
      (m) => ({ default: m.ResourcesBlock }),
    ),
  ),

  // ── Community / ecosystem ───────────────────────────────────────────────
  CommunityBlock: dynamic(() =>
    import("./blocks/organisms/landing/CommunityBlock/CommunityBlock").then(
      (m) => ({ default: m.CommunityBlock }),
    ),
  ),
  RoadmapBlock: dynamic(() =>
    import("./blocks/organisms/landing/RoadmapBlock/RoadmapBlock").then(
      (m) => ({ default: m.RoadmapBlock }),
    ),
  ),
  CareersBlock: dynamic(() =>
    import("./blocks/organisms/landing/CareersBlock/CareersBlock").then(
      (m) => ({ default: m.CareersBlock }),
    ),
  ),
  BlogPreviewBlock: dynamic(() =>
    import("./blocks/organisms/landing/BlogPreviewBlock/BlogPreviewBlock").then(
      (m) => ({ default: m.BlogPreviewBlock }),
    ),
  ),
  AffiliatesBlock: dynamic(() =>
    import("./blocks/organisms/landing/AffiliatesBlock/AffiliatesBlock").then(
      (m) => ({ default: m.AffiliatesBlock }),
    ),
  ),
  DocsPreviewBlock: dynamic(() =>
    import("./blocks/organisms/landing/DocsPreviewBlock/DocsPreviewBlock").then(
      (m) => ({ default: m.DocsPreviewBlock }),
    ),
  ),
  WaitlistBlock: dynamic(() =>
    import("./blocks/organisms/landing/WaitlistBlock/WaitlistBlock").then(
      (m) => ({ default: m.WaitlistBlock }),
    ),
  ),

  // ── About / trust ───────────────────────────────────────────────────────
  WhyWeBuildBlock: dynamic(() =>
    import("./blocks/organisms/landing/WhyWeBuildBlock/WhyWeBuildBlock").then(
      (m) => ({ default: m.WhyWeBuildBlock }),
    ),
  ),
  Next24HoursBlock: dynamic(() =>
    import("./blocks/organisms/landing/Next24HoursBlock/Next24HoursBlock").then(
      (m) => ({ default: m.Next24HoursBlock }),
    ),
  ),
  ComingSoonBlock: dynamic(() =>
    import("./blocks/organisms/landing/ComingSoonBlock/ComingSoonBlock").then(
      (m) => ({ default: m.ComingSoonBlock }),
    ),
  ),
  ScheduleMeetingBlock: dynamic(() =>
    import("./blocks/organisms/landing/ScheduleMeetingBlock/ScheduleMeetingBlock").then(
      (m) => ({ default: m.ScheduleMeetingBlock }),
    ),
  ),
  BookDemoBlock: dynamic(() =>
    import("./blocks/organisms/landing/BookDemoBlock/BookDemoBlock").then(
      (m) => ({ default: m.BookDemoBlock }),
    ),
  ),
  EnterpriseBlock: dynamic(() =>
    import("./blocks/organisms/landing/EnterpriseBlock/EnterpriseBlock").then(
      (m) => ({ default: m.EnterpriseBlock }),
    ),
  ),
  AboutCreatorBlock: dynamic(() =>
    import("./blocks/organisms/landing/AboutCreatorBlock/AboutCreatorBlock").then(
      (m) => ({ default: m.AboutCreatorBlock }),
    ),
  ),

  // ── CTA / close ─────────────────────────────────────────────────────────
  CTABlock: dynamic(() =>
    import("./blocks/organisms/landing/CTABlock/CTABlock").then(
      (m) => ({ default: m.CTABlock }),
    ),
  ),
  ImageBannerBlock: dynamic(() =>
    import("./blocks/organisms/landing/ImageBannerBlock/ImageBannerBlock").then(
      (m) => ({ default: m.ImageBannerBlock }),
    ),
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single landing section: component name + any props that block needs. */
export type LandingSection = { component: string } & Record<string, unknown>;

/**
 * Shape expected by LandingRenderer.
 * Pass the full `landingSections` export from config — it includes navbar,
 * footer, announcement, a `sections` string[] (ordered keys), and all block data.
 */
export interface LandingConfig {
  navbar:        Record<string, unknown>;
  footer:        Record<string, unknown>;
  announcement?: Record<string, unknown>;
  settings?:     { showComponentNameTag?: boolean };
  /** Ordered list of section keys (e.g. ["hero", "features", "pricing"]) */
  sections:      string[];
  [key: string]: unknown;
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

export function LandingRenderer({ config }: { config: LandingConfig }) {
  const Announcement = registry["AnnouncementBarBlock"];
  const Navbar       = registry["NavbarBlock"];
  const Footer       = registry["FooterBlock"];

  // Check if component name tags should be shown
  const showComponentNameTag =
    process.env.LANDINGPAGE_SHOW_COMPONENT_NAME_TAG === "true" ||
    config.settings?.showComponentNameTag === true;

  return (
    <>
      {config.announcement && <Announcement {...(config.announcement as Record<string, unknown>)} />}

      <Navbar {...config.navbar} />

      <main className="flex-1">
        {config.sections.map((key, i) => {
          const section = config[key] as LandingSection | undefined;
          if (!section) return null;
          const { component, ...props } = section;
          const Component = registry[component];

          if (!Component) {
            if (process.env.NODE_ENV === "development") {
              console.warn(`[LandingRenderer] No registry entry for "${component}" (key: "${key}")`);
            }
            return null;
          }

          return (
            <div key={`${component}-${i}`} className="relative">
              {/* Component Name Tag */}
              {showComponentNameTag && (
                <div className="absolute top-4 right-4 z-50 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono pointer-events-none">
                  {component}
                </div>
              )}
              <Component {...props} />
            </div>
          );
        })}
      </main>

      <Footer {...config.footer} />
    </>
  );
}
