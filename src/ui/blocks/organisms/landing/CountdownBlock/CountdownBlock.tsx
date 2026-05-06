"use client";
// CountdownBlock.tsx — Live countdown timer to a launch deadline.
import React, { useEffect, useState } from "react";
import { cn } from "@/ui/lib/utils";

export interface CountdownBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  deadline: string; // ISO date string
  ctaText?: string;
  ctaHref?: string;
  expiredMessage?: string;
  className?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { d, h, m, s };
}

export function CountdownBlock({
  badge,
  heading = "Offer closes in",
  subheading,
  deadline,
  ctaText = "Claim now",
  ctaHref = "/auth/signup",
  expiredMessage = "This offer has expired.",
  className,
}: CountdownBlockProps) {
  // ssr: false in page.tsx guarantees this only runs on the client,
  // so Date.now() is safe here — no hydration mismatch possible.
  const [time, setTime] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const units = time
    ? [
        { label: "Days",    value: pad(time.d) },
        { label: "Hours",   value: pad(time.h) },
        { label: "Minutes", value: pad(time.m) },
        { label: "Seconds", value: pad(time.s) },
      ]
    : [];

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-[var(--space-8x)] text-center">
        {badge && (
          <span className="inline-block px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
            {badge}
          </span>
        )}

        {heading && (
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
        )}

        {time ? (
          <div className="flex gap-[var(--space-4x)] sm:gap-[var(--space-8x)]">
            {units.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-[var(--space-1x)]">
                <div className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-md)] flex items-center justify-center">
                  <span className="text-[var(--text-2xl)] sm:text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] tabular-nums">
                    {value}
                  </span>
                </div>
                <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] uppercase tracking-[var(--tracking-wide)]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--text-lg)] text-[var(--color-text-muted)]">{expiredMessage}</p>
        )}

        {subheading && (
          <p className="text-[var(--text-md)] text-[var(--color-text-muted)] max-w-md">{subheading}</p>
        )}

        {ctaText && ctaHref && time && (
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center px-[var(--space-6x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
