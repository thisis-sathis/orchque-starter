import { NavbarBlock }           from "@/ui/blocks/organisms/landing/NavbarBlock/NavbarBlock";
import { AnnouncementBarBlock }  from "@/ui/blocks/organisms/landing/AnnouncementBarBlock/AnnouncementBarBlock";
import { HeroBlock }             from "@/ui/blocks/organisms/landing/HeroBlock/HeroBlock";
import { CompanyLogosBlock }     from "@/ui/blocks/organisms/landing/CompanyLogosBlock/CompanyLogosBlock";
import { FeaturedOnBlock }       from "@/ui/blocks/organisms/landing/FeaturedOnBlock/FeaturedOnBlock";
import { ProblemSolutionBlock }  from "@/ui/blocks/organisms/landing/ProblemSolutionBlock/ProblemSolutionBlock";
import { BeforeAfterBlock }      from "@/ui/blocks/organisms/landing/BeforeAfterBlock/BeforeAfterBlock";
import { HowItWorksBlock }       from "@/ui/blocks/organisms/landing/HowItWorksBlock/HowItWorksBlock";
import { FeaturesBlock }         from "@/ui/blocks/organisms/landing/FeaturesBlock/FeaturesBlock";
import { WhatsIncludedBlock }    from "@/ui/blocks/organisms/landing/WhatsIncludedBlock/WhatsIncludedBlock";
import { DemoSection }           from "./_components/DemoSection";
import { WhyBetterBlock }        from "@/ui/blocks/organisms/landing/WhyBetterBlock/WhyBetterBlock";
import { TryWithoutSignupBlock } from "@/ui/blocks/organisms/landing/TryWithoutSignupBlock/TryWithoutSignupBlock";
import { ComparisonBlock }       from "@/ui/blocks/organisms/landing/ComparisonBlock/ComparisonBlock";
import { UseCasesBlock }         from "@/ui/blocks/organisms/landing/UseCasesBlock/UseCasesBlock";
import { PickYourPathBlock }     from "@/ui/blocks/organisms/landing/PickYourPathBlock/PickYourPathBlock";
import { CustomerStoriesBlock }  from "@/ui/blocks/organisms/landing/CustomerStoriesBlock/CustomerStoriesBlock";
import { FirstUserBlock }        from "@/ui/blocks/organisms/landing/FirstUserBlock/FirstUserBlock";
import { WallOfLoveBlock }       from "@/ui/blocks/organisms/landing/WallOfLoveBlock/WallOfLoveBlock";
import { SocialCardsBlock }      from "@/ui/blocks/organisms/landing/SocialCardsBlock/SocialCardsBlock";
import { ReelsBlock }            from "@/ui/blocks/organisms/landing/ReelsBlock/ReelsBlock";
import { AwardsBlock }           from "@/ui/blocks/organisms/landing/AwardsBlock/AwardsBlock";
import { MetricsBlock }          from "@/ui/blocks/organisms/landing/MetricsBlock/MetricsBlock";
import { VideoBlock }            from "@/ui/blocks/organisms/landing/VideoBlock/VideoBlock";
import { PricingBlock }          from "@/ui/blocks/organisms/landing/PricingBlock/PricingBlock";
import { CountdownBlockClient as CountdownBlock } from "@/ui/blocks/organisms/landing/CountdownBlock/CountdownBlockClient";
import { FounderPricingBlock }   from "@/ui/blocks/organisms/landing/FounderPricingBlock/FounderPricingBlock";
import { BonusOfferBlock }       from "@/ui/blocks/organisms/landing/BonusOfferBlock/BonusOfferBlock";
import { FAQBlock }              from "@/ui/blocks/organisms/landing/FAQBlock/FAQBlock";
import { CommonMistakesBlock }   from "@/ui/blocks/organisms/landing/CommonMistakesBlock/CommonMistakesBlock";
import { ResourcesBlock }        from "@/ui/blocks/organisms/landing/ResourcesBlock/ResourcesBlock";
import { CommunityBlock }        from "@/ui/blocks/organisms/landing/CommunityBlock/CommunityBlock";
import { CareersBlock }          from "@/ui/blocks/organisms/landing/CareersBlock/CareersBlock";
import { RoadmapBlock }          from "@/ui/blocks/organisms/landing/RoadmapBlock/RoadmapBlock";
import { Next24HoursBlock }      from "@/ui/blocks/organisms/landing/Next24HoursBlock/Next24HoursBlock";
import { WhyWeBuildBlock }       from "@/ui/blocks/organisms/landing/WhyWeBuildBlock/WhyWeBuildBlock";
import { ScheduleMeetingBlock }  from "@/ui/blocks/organisms/landing/ScheduleMeetingBlock/ScheduleMeetingBlock";
import { BookDemoBlock }         from "@/ui/blocks/organisms/landing/BookDemoBlock/BookDemoBlock";
import { EnterpriseBlock }       from "@/ui/blocks/organisms/landing/EnterpriseBlock/EnterpriseBlock";
import { AboutCreatorBlock }     from "@/ui/blocks/organisms/landing/AboutCreatorBlock/AboutCreatorBlock";
import { BlogPreviewBlock }      from "@/ui/blocks/organisms/landing/BlogPreviewBlock/BlogPreviewBlock";
import { AffiliatesBlock }       from "@/ui/blocks/organisms/landing/AffiliatesBlock/AffiliatesBlock";
import { DocsPreviewBlock }      from "@/ui/blocks/organisms/landing/DocsPreviewBlock/DocsPreviewBlock";
import { WaitlistBlock }         from "@/ui/blocks/organisms/landing/WaitlistBlock/WaitlistBlock";
import { CTABlock }              from "@/ui/blocks/organisms/landing/CTABlock/CTABlock";
import { FooterBlock }           from "@/ui/blocks/organisms/landing/FooterBlock/FooterBlock";
import { LeaderboardBlock }     from "@/ui/blocks/organisms/landing/LeaderboardBlock/LeaderboardBlock";
import { PricingBundleBlock }   from "@/ui/blocks/organisms/landing/PricingBundleBlock/PricingBundleBlock";
import { ComingSoonBlock }      from "@/ui/blocks/organisms/landing/ComingSoonBlock/ComingSoonBlock";
import { WhatIsThisBlock }      from "@/ui/blocks/organisms/landing/WhatIsThisBlock/WhatIsThisBlock";
import { InstallBlock }         from "@/ui/blocks/organisms/landing/InstallBlock/InstallBlock";
import { ImageBannerBlock }     from "@/ui/blocks/organisms/landing/ImageBannerBlock/ImageBannerBlock";
import { TestimonialsBlock }    from "@/ui/blocks/organisms/landing/TestimonialsBlock/TestimonialsBlock";
import { CodeViewerBlock }       from "@/ui/blocks/organisms/landing/CodeViewerBlock/CodeViewerBlock";
import { AppPagesShowcaseBlock } from "@/ui/blocks/organisms/landing/AppPagesShowcaseBlock/AppPagesShowcaseBlock";
import type { IconName }         from "@/ui/components/icon";
import { PRODUCT, landing, landingSections } from "@/lib/config";

const S = landingSections;

export default function HomePage() {
  return (
    <>
      {/* ── Announcement bar ───────────────────────────────────────── */}
      <AnnouncementBarBlock
        message={S.announcement.message}
        linkText={S.announcement.linkText}
        linkHref={S.announcement.linkHref}
        variant={S.announcement.variant as "info" | "success" | "warning"}
        dismissible={S.announcement.dismissible}
      />

      {/* ── Navigation ─────────────────────────────────────────────── */}
      <NavbarBlock
        logoText={PRODUCT.name}
        links={landing.nav.links as any}
        ctaText={landing.nav.cta.label}
        ctaHref={landing.nav.cta.href}
        secondaryCtaText="Sign in"
        secondaryCtaHref="/auth/signin"
        showThemeSwitcher
      />

      <main className="flex-1">
        {/* 1. Hero — first screen, 5-second clarity */}
        <HeroBlock
          headline={PRODUCT.hero.headline}
          subheadline={PRODUCT.hero.subhead}
          ctaText={PRODUCT.hero.cta}
          ctaHref={PRODUCT.hero.ctaHref}
          secondaryCtaText={PRODUCT.hero.secondaryCta}
          secondaryCtaHref={PRODUCT.hero.secondaryCtaHref}
          badge="Free — no credit card required"
        />

        {/* 1b. What is this? — instant clarity explainer */}
        <WhatIsThisBlock
          badge={S.whatIsThis.badge}
          heading={S.whatIsThis.heading}
          subheading={S.whatIsThis.subheading}
          items={S.whatIsThis.items.map((item) => ({
            ...item,
            icon: item.icon as IconName | undefined,
            answer: Array.isArray(item.answer) ? (item.answer as any) : item.answer,
          }))}
        />

        {/* 2. Company logos — social proof above the fold */}
        <CompanyLogosBlock
          heading={S.companyLogos.heading}
          logos={S.companyLogos.logos}
        />

        {/* 3. Featured on — press mentions */}
        <FeaturedOnBlock
          heading={S.featuredOn.heading}
          mentions={S.featuredOn.mentions}
        />

        {/* 3b. Before ↔ After — interactive drag comparison */}
        <BeforeAfterBlock
          badge={S.beforeAfter.badge}
          heading={S.beforeAfter.heading}
          subheading={S.beforeAfter.subheading}
          before={S.beforeAfter.before}
          after={S.beforeAfter.after}
        />

        {/* 3c. Problem → Solution */}
        <ProblemSolutionBlock
          badge={S.problemSolution.badge}
          heading={S.problemSolution.heading}
          subheading={S.problemSolution.subheading}
          problemHeading={S.problemSolution.problemHeading}
          problemItems={[...S.problemSolution.problemItems]}
          solutionHeading={S.problemSolution.solutionHeading}
          solutionItems={[...S.problemSolution.solutionItems]}
        />

        {/* 4. How it works — reduce confusion */}
        <HowItWorksBlock
          badge={S.howItWorks.badge}
          heading={S.howItWorks.heading}
          subheading={S.howItWorks.subheading}
          steps={S.howItWorks.steps.map((s) => ({
            ...s,
            icon: s.icon as IconName | undefined,
          }))}
          ctaText={S.howItWorks.ctaText}
          ctaHref={S.howItWorks.ctaHref}
        />

        {/* 5. Features — outcome-focused */}
        <FeaturesBlock
          heading={landing.features.heading}
          subheading={landing.features.subheading}
          features={PRODUCT.features.map((f) => ({
            ...f,
            icon: f.icon as IconName | undefined,
          }))}
        />

        {/* 6. What's included — makes price feel like a deal */}
        <WhatsIncludedBlock
          badge={S.whatsIncluded.badge}
          heading={S.whatsIncluded.heading}
          subheading={S.whatsIncluded.subheading}
          categories={S.whatsIncluded.categories.map((c) => ({
            ...c,
            icon: c.icon as IconName | undefined,
          }))}
          ctaText={S.whatsIncluded.ctaText}
          ctaHref={S.whatsIncluded.ctaHref}
        />

        {/* 6c. App pages showcase — visual grid of all included pages */}
        <AppPagesShowcaseBlock
          badge={S.appPagesShowcase.badge}
          heading={S.appPagesShowcase.heading}
          subheading={S.appPagesShowcase.subheading}
        />

        {/* 6d. Install block — get started in 2 minutes */}
        <InstallBlock
          badge={S.install.badge}
          heading={S.install.heading}
          subheading={S.install.subheading}
          commands={[...S.install.commands]}
          note={S.install.note}
        />

        {/* 7. Interactive demo — show, don't tell */}
        <DemoSection
          heading={S.demo.heading}
          subheading={S.demo.subheading}
          placeholder={S.demo.placeholder}
          suggestedPrompts={[...S.demo.suggestedPrompts]}
        />

        {/* 7b. Code viewer — multi-file browseable code with copy + ZIP download */}
        <CodeViewerBlock
          badge={S.codeViewer.badge}
          heading={S.codeViewer.heading}
          subheading={S.codeViewer.subheading}
          zipFilename={S.codeViewer.zipFilename}
          files={[
            {
              filename: "product.config.json",
              language: "JSON",
              description: "One file controls your entire product — brand, copy, pricing, nav, theme",
              content: `{
  "brand": {
    "name": "Your Product",
    "tagline": "Ship faster. Build smarter.",
    "domain": "yourproduct.com",
    "supportEmail": "support@yourproduct.com"
  },
  "theme": {
    "landing_theme": "simple",
    "tokens": {
      "colors": {
        "primary": "#4285F4",
        "secondary": "#34A853"
      },
      "font": { "heading": "Plus Jakarta Sans" }
    }
  },
  "landing": {
    "hero": {
      "headline": "Build and ship your SaaS in days",
      "cta": "Get Started Free",
      "ctaHref": "/auth/signup"
    },
    "pricing": {
      "plans": {
        "free":  { "name": "Free",  "price": 0  },
        "pro":   { "name": "Pro",   "price": 9  }
      }
    }
  }
}`,
            },
            {
              filename: "src/app/page.tsx",
              language: "TSX",
              description: "Landing page — all 40+ blocks driven by product.config.json",
              content: `import { HeroBlock }    from "@/ui/blocks/organisms/landing/HeroBlock/HeroBlock";
import { PricingBlock } from "@/ui/blocks/organisms/landing/PricingBlock/PricingBlock";
import { FAQBlock }     from "@/ui/blocks/organisms/landing/FAQBlock/FAQBlock";
import { PRODUCT, landing, landingSections } from "@/lib/config";

const S = landingSections;

export default function HomePage() {
  return (
    <>
      <HeroBlock
        headline={PRODUCT.hero.headline}
        ctaText={PRODUCT.hero.cta}
        ctaHref={PRODUCT.hero.ctaHref}
      />
      <PricingBlock
        heading={landing.pricing.heading}
        plans={[ /* plans from config */ ]}
      />
      <FAQBlock
        heading={landing.faq.heading}
        items={landing.faq.items}
      />
    </>
  );
}`,
            },
            {
              filename: "src/lib/config.ts",
              language: "TS",
              description: "Typed config exports — every block imports from here",
              content: `import raw from "../../product.config.json";

// Re-export typed slices so blocks never import raw JSON directly
export const brand         = raw.brand;
export const theme         = raw.theme;
export const landing       = raw.landing;
export const landingSections = raw.landing_sections;

// Legacy alias used by older blocks
export const PRODUCT = {
  name:    raw.brand.name,
  tagline: raw.brand.tagline,
  hero:    raw.landing.hero,
  features: raw.landing.features.items,
  pricing: {
    free: raw.landing.pricing.plans.free,
    pro:  raw.landing.pricing.plans.pro,
  },
} as const;`,
            },
            {
              filename: "src/app/not-found.tsx",
              language: "TSX",
              description: "Custom 404 page — styled, with Go Home + Contact CTAs",
              content: `import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="text-8xl font-black text-gray-100 select-none">404</div>
      <h1 className="text-2xl font-bold text-gray-800">
        Hmm, that page doesn't exist.
      </h1>
      <p className="text-gray-500 max-w-sm">
        The link might be broken, or the page may have moved.
        Let's get you back on track.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/contact" className="btn-ghost">Contact support</Link>
      </div>
    </main>
  );
}`,
            },
            {
              filename: "src/app/error.tsx",
              language: "TSX",
              description: "Error boundary — catches runtime errors, shows Try Again + Home",
              content: `"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
      <p className="text-gray-500 max-w-sm">
        An unexpected error occurred. Our team has been notified.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-ghost">Go home</Link>
      </div>
    </main>
  );
}`,
            },
            {
              filename: "src/ui/tokens/spacing.css",
              language: "CSS",
              description: "CSS variable token system — all spacing is data-driven",
              content: `/* Spacing scale — 4px base */
:root {
  --space-base: 4px;
  --space-1x:   4px;
  --space-2x:   8px;
  --space-3x:   12px;
  --space-4x:   16px;
  --space-5x:   20px;
  --space-6x:   24px;
  --space-8x:   32px;
  --space-10x:  40px;
  --space-12x:  48px;
  --space-16x:  64px;
  --space-20x:  80px;
  --space-24x:  96px;

  /* Semantic section tokens */
  --landing-section-py: calc(var(--space-base) * 20); /* 80px */
  --landing-section-px: calc(var(--space-base) * 6);  /* 24px */
}`,
            },
          ]}
        />

        {/* 7c. Try without signup — low friction conversion */}
        <TryWithoutSignupBlock
          badge={S.tryWithoutSignup.badge}
          heading={S.tryWithoutSignup.heading}
          subheading={S.tryWithoutSignup.subheading}
          ctaText={S.tryWithoutSignup.ctaText}
          ctaHref={S.tryWithoutSignup.ctaHref}
          secondaryCtaText={S.tryWithoutSignup.secondaryCtaText}
          secondaryCtaHref={S.tryWithoutSignup.secondaryCtaHref}
          trust={[...S.tryWithoutSignup.trust]}
        />

        {/* 8. Why we're better — a11y, SEO, security pillar */}
        <WhyBetterBlock
          badge={S.whyBetter.badge}
          heading={S.whyBetter.heading}
          subheading={S.whyBetter.subheading}
          points={S.whyBetter.points.map((p) => ({ ...p, icon: p.icon as IconName | undefined }))}
          ctaText={S.whyBetter.ctaText}
          ctaHref={S.whyBetter.ctaHref}
        />

        {/* 9. Comparison — "why not just ChatGPT?" */}
        <ComparisonBlock
          heading={S.comparison.heading}
          ourLabel={S.comparison.ourLabel}
          theirLabel={S.comparison.theirLabel}
          rows={S.comparison.rows.map((r) => ({
            feature: r.feature,
            ours:    r.ours as boolean | string,
            theirs:  r.theirs as boolean | string,
          }))}
        />

        {/* 10. Use cases — who it's for, self-identification */}
        <UseCasesBlock
          badge={S.useCases.badge}
          heading={S.useCases.heading}
          subheading={S.useCases.subheading}
          cases={S.useCases.cases.map((c) => ({
            ...c,
            icon: c.icon as IconName | undefined,
          }))}
        />

        {/* 10b. Pick your path — self-selection cards */}
        <PickYourPathBlock
          badge={S.pickYourPath.badge}
          heading={S.pickYourPath.heading}
          subheading={S.pickYourPath.subheading}
          paths={S.pickYourPath.paths.map((p) => ({ ...p, icon: p.icon as IconName | undefined }))}
        />

        {/* 11. Customer stories / case studies */}
        <CustomerStoriesBlock
          badge={S.customerStories.badge}
          heading={S.customerStories.heading}
          subheading={S.customerStories.subheading}
          stories={[...S.customerStories.stories]}
        />

        {/* 11b. First user spotlight */}
        <FirstUserBlock
          badge={S.firstUser.badge}
          heading={S.firstUser.heading}
          quote={S.firstUser.quote}
          authorName={S.firstUser.authorName}
          authorRole={S.firstUser.authorRole}
          company={S.firstUser.company}
          metric={S.firstUser.metric}
          metricLabel={S.firstUser.metricLabel}
          caseStudyHref={S.firstUser.caseStudyHref}
        />

        {/* 12. Social proof — wall of love */}
        <WallOfLoveBlock
          heading={S.wallOfLove.heading}
          subheading={S.wallOfLove.subheading}
          items={S.wallOfLove.items.map((i) => ({
            ...i,
            source: i.source as "twitter" | "linkedin" | "producthunt" | "email",
          }))}
        />

        {/* 12b. Social cards — platform previews */}
        <SocialCardsBlock
          badge={S.socialCards.badge}
          heading={S.socialCards.heading}
          subheading={S.socialCards.subheading}
          cards={S.socialCards.cards.map((c) => ({ ...c, platform: c.platform as any }))}
        />

        {/* 12c. Reels collection */}
        <ReelsBlock
          badge={S.reels.badge}
          heading={S.reels.heading}
          subheading={S.reels.subheading}
          reels={[...S.reels.items]}
        />

        {/* 12d. Leaderboard — community ranking */}
        <LeaderboardBlock
          badge={S.leaderboard.badge}
          heading={S.leaderboard.heading}
          subheading={S.leaderboard.subheading}
          entries={[...S.leaderboard.entries]}
          pointsLabel={S.leaderboard.pointsLabel}
          ctaText={S.leaderboard.ctaText}
          ctaHref={S.leaderboard.ctaHref}
        />

        {/* 13. Awards + recognition */}
        <AwardsBlock
          badge={S.awards.badge}
          heading={S.awards.heading}
          subheading={S.awards.subheading}
          awards={S.awards.awards.map((a) => ({ ...a, icon: a.icon as IconName | undefined }))}
        />

        {/* 14. Metrics + reliability */}
        <MetricsBlock
          heading={S.metrics.heading}
          subheading={S.metrics.subheading}
          stats={[...S.metrics.stats]}
        />

        {/* 15. Demo video */}
        <VideoBlock
          heading={S.video.heading}
          subheading={S.video.subheading}
          duration={S.video.duration}
        />

        {/* 16. Pricing — clear + simple */}
        <PricingBlock
          heading={landing.pricing.heading}
          subheading={landing.pricing.subheading}
          plans={[
            {
              name:     PRODUCT.pricing.free.name,
              price:    PRODUCT.pricing.free.price,
              interval: "month",
              features: [...PRODUCT.pricing.free.features],
              ctaText:  "Get started free",
              ctaHref:  "/auth/signup",
            },
            {
              name:     PRODUCT.pricing.pro.name,
              price:    PRODUCT.pricing.pro.price,
              interval: "month",
              features: [...PRODUCT.pricing.pro.features],
              ctaText:  "Upgrade to Pro",
              ctaHref:  "/auth/signup",
              featured: true,
            },
          ]}
        />

        {/* 16b. Countdown — founder pricing closes */}
        <CountdownBlock
          badge={S.countdown.badge}
          heading={S.countdown.heading}
          subheading={S.countdown.subheading}
          deadline={S.countdown.deadline}
          ctaText={S.countdown.ctaText}
          ctaHref={S.countdown.ctaHref}
        />

        {/* 16c. Pricing bundle — value stack */}
        <PricingBundleBlock
          badge={S.pricingBundle.badge}
          heading={S.pricingBundle.heading}
          subheading={S.pricingBundle.subheading}
          items={S.pricingBundle.items.map((i) => ({ ...i, icon: i.icon as IconName | undefined }))}
          totalValue={S.pricingBundle.totalValue}
          bundlePrice={S.pricingBundle.bundlePrice}
          currency={S.pricingBundle.currency}
          savings={S.pricingBundle.savings}
          guarantee={S.pricingBundle.guarantee}
          note={S.pricingBundle.note}
          ctaText={S.pricingBundle.ctaText}
          ctaHref={S.pricingBundle.ctaHref}
        />

        {/* 17. FAQ */}
        <FAQBlock
          heading={landing.faq.heading}
          items={[...landing.faq.items]}
        />

        {/* 17b. Common mistakes */}
        <CommonMistakesBlock
          badge={S.commonMistakes.badge}
          heading={S.commonMistakes.heading}
          subheading={S.commonMistakes.subheading}
          mistakes={[...S.commonMistakes.mistakes]}
          ctaText={S.commonMistakes.ctaText}
          ctaHref={S.commonMistakes.ctaHref}
        />

        {/* 18. Resources hub */}
        <ResourcesBlock
          badge={S.resources.badge}
          heading={S.resources.heading}
          subheading={S.resources.subheading}
          resources={S.resources.items.map((r) => ({ ...r, type: r.type as any, icon: r.icon as IconName | undefined }))}
        />

        {/* 19. Community */}
        <CommunityBlock
          badge={S.community.badge}
          heading={S.community.heading}
          subheading={S.community.subheading}
          stats={[...S.community.stats]}
          channels={S.community.channels.map((c) => ({ ...c, icon: c.icon as IconName }))}
        />

        {/* 19b. Roadmap */}
        <RoadmapBlock
          badge={S.roadmap.badge}
          heading={S.roadmap.heading}
          subheading={S.roadmap.subheading}
          phases={S.roadmap.phases.map((p) => ({ ...p, status: p.status as any, icon: p.icon as IconName | undefined }))}
        />

        {/* 19c. Why we built this */}
        <WhyWeBuildBlock
          badge={S.whyWeBuilt.badge}
          heading={S.whyWeBuilt.heading}
          story={S.whyWeBuilt.story}
          highlights={[...S.whyWeBuilt.highlights]}
          ctaText={S.whyWeBuilt.ctaText}
          ctaHref={S.whyWeBuilt.ctaHref}
        />

        {/* 19d. Your first 24 hours */}
        <Next24HoursBlock
          badge={S.next24Hours.badge}
          heading={S.next24Hours.heading}
          subheading={S.next24Hours.subheading}
          steps={S.next24Hours.steps.map((s) => ({ ...s, icon: s.icon as IconName | undefined }))}
          ctaText={S.next24Hours.ctaText}
          ctaHref={S.next24Hours.ctaHref}
        />

        {/* 19e. Coming soon — upcoming feature teaser */}
        <ComingSoonBlock
          badge={S.comingSoon.badge}
          heading={S.comingSoon.heading}
          subheading={S.comingSoon.subheading}
          launchDate={S.comingSoon.launchDate}
          waitlistCtaText={S.comingSoon.waitlistCtaText}
          waitlistPlaceholder={S.comingSoon.waitlistPlaceholder}
          successMessage={S.comingSoon.successMessage}
          previewHint={S.comingSoon.previewHint}
        />

        {/* 20. Schedule a meeting / book demo */}
        <ScheduleMeetingBlock
          badge={S.scheduleMeeting.badge}
          heading={S.scheduleMeeting.heading}
          subheading={S.scheduleMeeting.subheading}
          perks={[...S.scheduleMeeting.perks]}
          ctaText={S.scheduleMeeting.ctaText}
          calendarHref={S.scheduleMeeting.calendarHref}
          hostName={S.scheduleMeeting.hostName}
          hostRole={S.scheduleMeeting.hostRole}
          availabilityNote={S.scheduleMeeting.availabilityNote}
        />

        {/* 21. About creator — trust + human connection */}
        <AboutCreatorBlock
          heading={S.aboutCreator.heading}
          name={S.aboutCreator.name}
          role={S.aboutCreator.role}
          bio={S.aboutCreator.bio}
          highlights={[...S.aboutCreator.highlights]}
          socialLinks={S.aboutCreator.socialLinks.map((s) => ({
            ...s,
            platform: s.platform as "twitter" | "linkedin" | "github" | "website",
          }))}
        />

        {/* 22. Careers */}
        <CareersBlock
          badge={S.careers.badge}
          heading={S.careers.heading}
          subheading={S.careers.subheading}
          perks={S.careers.perks.map((p) => ({ ...p }))}
          jobs={S.careers.jobs.map((j) => ({ ...j, type: j.type as any }))}
          ctaText={S.careers.ctaText}
          ctaHref={S.careers.ctaHref}
        />

        {/* 23. Blog preview */}
        <BlogPreviewBlock
          heading={S.blog.heading}
          posts={[...S.blog.posts]}
        />

        {/* 24. Affiliates */}
        <AffiliatesBlock
          heading={S.affiliates.heading}
          subheading={S.affiliates.subheading}
          commission={S.affiliates.commission}
          ctaText={S.affiliates.ctaText}
          ctaHref={S.affiliates.ctaHref}
          perks={[...S.affiliates.perks]}
        />

        {/* 25. Docs quick-links */}
        <DocsPreviewBlock
          heading={S.docs.heading}
          subheading={S.docs.subheading}
          links={S.docs.links.map((l) => ({ ...l, icon: l.icon as IconName }))}
        />

        {/* 26. Waitlist */}
        <WaitlistBlock
          heading={S.waitlist.heading}
          subheading={S.waitlist.subheading}
          badge={S.waitlist.badge}
          buttonText={S.waitlist.buttonText}
          successMessage={S.waitlist.successMessage}
        />

        {/* 26b. Testimonials grid */}
        {landing.testimonials.items.length > 0 && (
          <TestimonialsBlock
            heading={landing.testimonials.heading}
            testimonials={landing.testimonials.items}
          />
        )}

        {/* 27. Final CTA — conversion close */}
        <CTABlock
          heading={landing.cta.heading}
          subheading={landing.cta.subheading}
          ctaText={landing.cta.ctaText}
          ctaHref="/auth/signup"
        />

        {/* 28. Founder pricing + Black Friday sale */}
        <FounderPricingBlock
          badge={S.founderPricing.badge}
          saleBadge={S.founderPricing.saleBadge}
          heading={S.founderPricing.heading}
          subheading={S.founderPricing.subheading}
          originalPrice={S.founderPricing.originalPrice}
          salePrice={S.founderPricing.salePrice}
          interval={S.founderPricing.interval as any}
          currency={S.founderPricing.currency}
          spotsTotal={S.founderPricing.spotsTotal}
          spotsTaken={S.founderPricing.spotsTaken}
          deadline={S.founderPricing.deadline}
          features={[...S.founderPricing.features]}
          ctaText={S.founderPricing.ctaText}
          ctaHref={S.founderPricing.ctaHref}
          guarantee={S.founderPricing.guarantee}
        />

        {/* 29. Bonus offer — value stacking */}
        <BonusOfferBlock
          badge={S.bonusOffer.badge}
          heading={S.bonusOffer.heading}
          subheading={S.bonusOffer.subheading}
          bonuses={S.bonusOffer.bonuses.map((b) => ({ ...b, icon: b.icon as any }))}
          totalValue={S.bonusOffer.totalValue}
          offerPrice={S.bonusOffer.offerPrice}
          ctaText={S.bonusOffer.ctaText}
          ctaHref={S.bonusOffer.ctaHref}
          urgencyNote={S.bonusOffer.urgencyNote}
        />

        {/* 30. Book a demo + Check your inbox */}
        <BookDemoBlock
          badge={S.bookDemo.badge}
          heading={S.bookDemo.heading}
          subheading={S.bookDemo.subheading}
          perks={[...S.bookDemo.perks]}
          successHeading={S.bookDemo.successHeading}
          successMessage={S.bookDemo.successMessage}
          ctaText={S.bookDemo.ctaText}
        />

        {/* 31. Enterprise reach-out */}
        <EnterpriseBlock
          badge={S.enterprise.badge}
          heading={S.enterprise.heading}
          subheading={S.enterprise.subheading}
          features={S.enterprise.features.map((f) => ({ ...f, icon: f.icon as any }))}
        />
        {/* 31b. Full-width image banner — final high-impact CTA */}
        <ImageBannerBlock
          badge={S.imageBanner.badge}
          heading={S.imageBanner.heading}
          subheading={S.imageBanner.subheading}
          ctaText={S.imageBanner.ctaText}
          ctaHref={S.imageBanner.ctaHref}
          secondaryCtaText={S.imageBanner.secondaryCtaText}
          secondaryCtaHref={S.imageBanner.secondaryCtaHref}
          overlayOpacity={S.imageBanner.overlayOpacity}
          minHeight={S.imageBanner.minHeight}
        />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <FooterBlock
        logoText={PRODUCT.name}
        tagline={PRODUCT.tagline}
        address={landing.footer.address}
        columns={landing.footer.columns ?? []}
        legalLinks={landing.footer.links ?? [
          { label: "Privacy",    href: "/legal/privacy" },
          { label: "Terms",      href: "/legal/terms" },
          { label: "Contact",    href: "/contact" },
          { label: "Docs",       href: "/docs" },
          { label: "Blog",       href: "/blog" },
          { label: "Affiliates", href: "/affiliates" },
          { label: "Careers",    href: "/careers" },
        ]}
      />
    </>
  );
}

