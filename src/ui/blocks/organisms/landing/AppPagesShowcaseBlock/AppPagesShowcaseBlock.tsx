// AppPagesShowcaseBlock.tsx — Visual grid showing all included app pages (error, 404, offline, success, careers, prelaunch, etc.)
// Each card is a mini browser mockup so users can see every page at a glance.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface AppPage {
  title: string;
  route: string;
  description: string;
  icon: IconName;
  /** Visual "screenshot" variant controls the mockup content */
  variant:
    | "error"
    | "not-found"
    | "offline"
    | "success"
    | "loading"
    | "coming-soon"
    | "careers"
    | "prelaunch"
    | "generic";
  /** Badge label shown on card */
  badge?: string;
  badgeColor?: "blue" | "green" | "orange" | "red" | "purple" | "gray";
  href?: string;
}

export interface AppPagesShowcaseBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  pages?: AppPage[];
  className?: string;
}

// ─── Badge color map ──────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  blue:   "bg-blue-100   text-blue-700   border-blue-200",
  green:  "bg-green-100  text-green-700  border-green-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  red:    "bg-red-100    text-red-700    border-red-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  gray:   "bg-gray-100   text-gray-600   border-gray-200",
};

// ─── Mini mockup renderers ────────────────────────────────────────────────────

function MockupError() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
        <Icon name="AlertCircle" size="sm" className="text-red-500" />
      </div>
      <div className="font-bold text-xs text-gray-700">Something went wrong</div>
      <div className="h-2 w-24 rounded bg-gray-200" />
      <div className="flex gap-1.5 mt-1">
        <div className="h-5 w-16 rounded-md bg-red-100" />
        <div className="h-5 w-14 rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

function MockupNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="text-2xl font-black text-gray-200 leading-none">404</div>
      <div className="font-bold text-xs text-gray-700">Page not found</div>
      <div className="h-2 w-28 rounded bg-gray-200" />
      <div className="h-5 w-20 rounded-md bg-blue-100 mt-1" />
    </div>
  );
}

function MockupOffline() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon name="WifiOff" size="sm" className="text-gray-400" />
      </div>
      <div className="font-bold text-xs text-gray-700">You're offline</div>
      <div className="h-2 w-24 rounded bg-gray-200" />
      <div className="h-5 w-16 rounded-md bg-gray-200 mt-1" />
    </div>
  );
}

function MockupSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <Icon name="CheckCircle" size="sm" className="text-green-500" />
      </div>
      <div className="font-bold text-xs text-gray-700">You're all set!</div>
      <div className="h-2 w-28 rounded bg-gray-200" />
      <div className="h-5 w-20 rounded-md bg-green-100 mt-1" />
    </div>
  );
}

function MockupLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
        <Icon name="Loader" size="sm" className="text-blue-400 animate-spin" />
      </div>
      <div className="font-bold text-xs text-gray-700">Loading…</div>
      <div className="flex flex-col gap-1.5 w-full mt-1">
        <div className="h-2 rounded bg-gray-200 animate-pulse" />
        <div className="h-2 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="h-2 w-1/2 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

function MockupComingSoon() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 p-3 overflow-hidden">
      {/* Blurred bg rows */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-20 blur-[3px]">
        <div className="h-3 w-20 rounded bg-gray-300" />
        <div className="h-2 w-28 rounded bg-gray-200" />
        <div className="grid grid-cols-3 gap-1 mt-1">
          {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-md bg-gray-200" />)}
        </div>
      </div>
      {/* Card on top */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 flex flex-col items-center gap-1 text-center shadow-md">
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Coming Soon</span>
        <div className="font-bold text-[11px] text-gray-700">Something exciting</div>
        <div className="h-4 w-20 rounded-md bg-blue-100" />
      </div>
    </div>
  );
}

function MockupCareers() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="h-2 w-20 rounded bg-gray-200" />
      <div className="h-3 w-28 rounded bg-gray-700" />
      <div className="flex flex-col gap-1.5 mt-1">
        {["Senior Engineer", "Dev Advocate", "Designer"].map((j, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 px-2 py-1.5">
            <div className="w-4 h-4 rounded bg-blue-100" />
            <div className="flex-1 h-2 rounded bg-gray-200" />
            <div className="text-[10px] text-gray-400">Remote</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupPrelaunch() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
        47 spots left
      </span>
      <div className="font-bold text-xs text-gray-700">Get early access</div>
      <div className="w-full flex gap-1 mt-1">
        <div className="flex-1 h-6 rounded-lg bg-gray-100" />
        <div className="w-14 h-6 rounded-lg bg-purple-200" />
      </div>
    </div>
  );
}

function MockupGeneric() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="h-3 w-24 rounded bg-gray-700" />
      <div className="h-2 w-full rounded bg-gray-200" />
      <div className="h-2 w-3/4 rounded bg-gray-200" />
      <div className="h-6 w-20 rounded-lg bg-blue-100 mt-1" />
    </div>
  );
}

const MOCKUPS: Record<AppPage["variant"], React.FC> = {
  "error":       MockupError,
  "not-found":   MockupNotFound,
  "offline":     MockupOffline,
  "success":     MockupSuccess,
  "loading":     MockupLoading,
  "coming-soon": MockupComingSoon,
  "careers":     MockupCareers,
  "prelaunch":   MockupPrelaunch,
  "generic":     MockupGeneric,
};

// ─── Default pages list ───────────────────────────────────────────────────────

const DEFAULT_PAGES: AppPage[] = [
  {
    title: "Error page",
    route: "/error",
    description: "Runtime error boundary — 'Something went wrong' with retry and home CTAs.",
    icon: "AlertCircle",
    variant: "error",
    badge: "Included",
    badgeColor: "red",
  },
  {
    title: "404 Not Found",
    route: "/404",
    description: "Custom 404 with Go Home and Contact Support buttons.",
    icon: "SearchX",
    variant: "not-found",
    badge: "Included",
    badgeColor: "orange",
  },
  {
    title: "Offline page",
    route: "/offline",
    description: "Shown when the user has no internet. Retry button included.",
    icon: "WifiOff",
    variant: "offline",
    badge: "Included",
    badgeColor: "gray",
  },
  {
    title: "Success page",
    route: "/success",
    description: "Generic success state — adapts copy for purchase, waitlist, contact, demo.",
    icon: "CheckCircle",
    variant: "success",
    badge: "Included",
    badgeColor: "green",
  },
  {
    title: "Loading / skeleton",
    route: "(any route)",
    description: "Skeleton loading state used across dashboard and landing while data fetches.",
    icon: "Loader",
    variant: "loading",
    badge: "Included",
    badgeColor: "blue",
  },
  {
    title: "Coming soon",
    route: "/coming-soon",
    description: "Blurred preview overlay with 'Coming Soon' card and waitlist form.",
    icon: "Clock",
    variant: "coming-soon",
    badge: "Included",
    badgeColor: "blue",
  },
  {
    title: "Careers & job posts",
    route: "/careers/[slug]",
    description: "Job listing detail page with inline apply form and success state.",
    icon: "Briefcase",
    variant: "careers",
    badge: "Included",
    badgeColor: "purple",
  },
  {
    title: "Pre-launch waitlist",
    route: "/prelaunch",
    description: "Standalone waitlist page with spots counter — no nav or footer.",
    icon: "Rocket",
    variant: "prelaunch",
    badge: "Included",
    badgeColor: "purple",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function AppPagesShowcaseBlock({
  badge = "Every page included",
  heading = "App pages — all built, ready to ship",
  subheading = "Every utility page your product needs — error handling, loading states, success flows, and more — pre-built and styled to match your brand.",
  pages = DEFAULT_PAGES,
  className,
}: AppPagesShowcaseBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          {badge && (
            <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              <Icon name="Layout" size="xs" />
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Page cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pages.map((page, idx) => {
            const Mockup = MOCKUPS[page.variant] ?? MockupGeneric;
            const badgeCls = BADGE_COLORS[page.badgeColor ?? "gray"] ?? BADGE_COLORS.gray;

            return (
              <div
                key={idx}
                className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Browser chrome */}
                <div className="bg-[var(--color-background)] border-b border-[var(--color-border)] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-300" />
                    <span className="w-2 h-2 rounded-full bg-yellow-300" />
                    <span className="w-2 h-2 rounded-full bg-green-300" />
                  </div>
                  <div className="flex-1 h-4 rounded-md bg-[var(--color-border)] flex items-center px-2">
                    <span className="text-[9px] text-[var(--color-text-muted)] truncate">
                      yourproduct.com{page.route}
                    </span>
                  </div>
                </div>

                {/* Mockup preview */}
                <div className="min-h-[130px] bg-white flex items-center justify-center border-b border-[var(--color-border)]">
                  <Mockup />
                </div>

                {/* Card footer */}
                <div className="flex flex-col gap-1.5 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon
                        name={page.icon}
                        size="xs"
                        className="text-[var(--color-primary)] shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-bold text-[var(--color-text)] leading-tight">
                        {page.title}
                      </span>
                    </div>
                    {page.badge && (
                      <span
                        className={cn(
                          "shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          badgeCls
                        )}
                      >
                        {page.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {page.description}
                  </p>
                  <code className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-background)] rounded px-1.5 py-0.5 self-start mt-0.5">
                    {page.route}
                  </code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
