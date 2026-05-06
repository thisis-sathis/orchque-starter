"use client";
// FounderPricingBlock.tsx — Special founder/member pricing with sale badge,
// crossed-out price, countdown timer, and limited-spots urgency.
import React, { useEffect, useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface FounderPricingFeature {
  label: string;
}

export interface FounderPricingBlockProps {
  badge?: string;
  saleBadge?: string;          // e.g. "Black Friday — 60% off"
  heading: string;
  subheading?: string;
  originalPrice: number;
  salePrice: number;
  interval?: string;           // "lifetime" | "month" | "year"
  currency?: string;
  spotsTotal?: number;
  spotsTaken?: number;
  /** ISO deadline string for countdown e.g. "2026-12-01T00:00:00Z" */
  deadline?: string;
  features: FounderPricingFeature[];
  ctaText: string;
  ctaHref: string;
  guarantee?: string;          // e.g. "30-day money-back guarantee"
  className?: string;
}

function useCountdown(deadline?: string) {
  const calc = () => {
    if (!deadline) return null;
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
  // Start as null so server and client render identical HTML (no Date.now() on SSR)
  const [time, setTime] = useState<ReturnType<typeof calc>>(null);
  useEffect(() => {
    if (!deadline) return;
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return time;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export function FounderPricingBlock({
  badge = "Founder pricing",
  saleBadge,
  heading,
  subheading,
  originalPrice,
  salePrice,
  interval = "lifetime",
  currency = "$",
  spotsTotal,
  spotsTaken,
  deadline,
  features,
  ctaText,
  ctaHref,
  guarantee,
  className,
}: FounderPricingBlockProps) {
  const countdown = useCountdown(deadline);
  const spotsLeft = spotsTotal != null && spotsTaken != null ? spotsTotal - spotsTaken : null;
  const discountPct = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      <div className="mx-auto max-w-2xl flex flex-col items-center gap-[var(--space-8x)]">
        {/* Badges */}
        <div className="flex flex-wrap gap-[var(--space-2x)] justify-center">
          {badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              <Icon name="Star" size="xs" aria-hidden="true" /> {badge}
            </span>
          )}
          {saleBadge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-error)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-error)]">
              <Icon name="Tag" size="xs" aria-hidden="true" /> {saleBadge}
            </span>
          )}
        </div>

        {/* Heading */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          <h2 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[var(--text-lg)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Pricing card */}
        <div className="w-full rounded-[var(--radius-2xl)] border-2 border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)] overflow-hidden">
          {/* Sale strip */}
          {saleBadge && (
            <div className="bg-[var(--color-error)] text-white text-center text-[var(--text-sm)] font-[var(--font-semibold)] py-[var(--space-2x)] px-[var(--space-4x)]">
              🔥 {saleBadge} — {discountPct}% off the regular price
            </div>
          )}

          <div className="p-[var(--space-8x)] flex flex-col gap-[var(--space-6x)]">
            {/* Price */}
            <div className="flex flex-col items-center gap-[var(--space-1x)]">
              <div className="flex items-baseline gap-[var(--space-2x)]">
                <span className="text-[var(--text-xl)] text-[var(--color-text-muted)] line-through">
                  {currency}{originalPrice}
                </span>
                <span className="text-[var(--text-5xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                  {currency}{salePrice}
                </span>
              </div>
              <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                {interval === "lifetime" ? "one-time payment" : `per ${interval}`}
              </span>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="flex flex-col items-center gap-[var(--space-2x)]">
                <p className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text-muted)] uppercase tracking-widest">
                  Offer ends in
                </p>
                <div className="flex gap-[var(--space-3x)]">
                  {[
                    { label: "hrs",  val: countdown.h },
                    { label: "min",  val: countdown.m },
                    { label: "sec",  val: countdown.s },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)] tabular-nums">
                        {pad(val)}
                      </span>
                      <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-1">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Limited spots bar */}
            {spotsLeft !== null && spotsTotal != null && (
              <div className="flex flex-col gap-[var(--space-2x)]">
                <div className="flex justify-between text-[var(--text-xs)] text-[var(--color-text-muted)]">
                  <span className="font-[var(--font-semibold)] text-[var(--color-error)]">
                    Only {spotsLeft} founder spots remaining
                  </span>
                  <span>{spotsTaken} / {spotsTotal} taken</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-surface-overlay)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-error)] transition-all"
                    style={{ width: `${(spotsTaken! / spotsTotal) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Features */}
            <ul className="flex flex-col gap-[var(--space-3x)]">
              {features.map((f) => (
                <li key={f.label} className="flex items-start gap-[var(--space-3x)]">
                  <Icon name="CheckCircle2" size="sm" className="text-[var(--color-success)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[var(--text-sm)] text-[var(--color-text)]">{f.label}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={ctaHref}
              className="w-full inline-flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] px-[var(--space-6x)] py-[var(--space-4x)] hover:bg-[var(--color-primary)]/90 transition-colors gap-[var(--space-2x)]"
            >
              {ctaText}
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </a>

            {/* Guarantee */}
            {guarantee && (
              <p className="text-center text-[var(--text-xs)] text-[var(--color-text-muted)] flex items-center justify-center gap-1">
                <Icon name="ShieldCheck" size="xs" className="text-[var(--color-success)]" aria-hidden="true" />
                {guarantee}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
