"use client";
// ComingSoonBlock.tsx — "Coming soon" overlay section that sits on top of blurred preview content.
// Renders a frosted-glass "Coming Soon" card centered over a blurred background preview.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

interface ComingSoonBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  launchDate?: string;
  waitlistCtaText?: string;
  waitlistPlaceholder?: string;
  successMessage?: string;
  /** Optional preview content rendered behind the blur overlay */
  previewHint?: string;
  className?: string;
}

export function ComingSoonBlock({
  badge = "Coming Soon",
  heading = "Something exciting is coming",
  subheading = "We're working on something new. Be the first to know when it's ready.",
  launchDate,
  waitlistCtaText = "Notify me",
  waitlistPlaceholder = "your@email.com",
  successMessage = "You're on the list! We'll notify you on launch day.",
  previewHint,
  className,
}: ComingSoonBlockProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      className={cn(
        "relative w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] overflow-hidden",
        className
      )}
    >
      {/* Blurred preview background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Decorative dots / grid */}
        <div className="absolute inset-0 bg-[var(--color-background)] opacity-60" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Fake blurred content rows */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 blur-[6px] opacity-30">
          {previewHint ? (
            <p className="text-2xl font-bold text-[var(--color-text)] max-w-md text-center">
              {previewHint}
            </p>
          ) : (
            <>
              <div className="h-6 w-64 rounded-full bg-[var(--color-border)]" />
              <div className="h-4 w-96 rounded-full bg-[var(--color-border)]" />
              <div className="h-4 w-80 rounded-full bg-[var(--color-border)]" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-28 w-36 rounded-xl bg-[var(--color-border)]" />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Radial vignette to deepen blur at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)] opacity-80" />
      </div>

      {/* Coming soon card — centered on top of blur */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md shadow-xl p-8 flex flex-col items-center gap-6 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            {badge}
          </span>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[var(--color-text)] leading-snug">
              {heading}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">{subheading}</p>
          </div>

          {/* Launch date */}
          {launchDate && (
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]">
              <Icon name="Calendar" size="xs" />
              Launching {launchDate}
            </div>
          )}

          {/* Waitlist form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={waitlistPlaceholder}
                required
                className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-on-primary)] hover:opacity-90 transition-opacity"
              >
                {waitlistCtaText}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-success)]">
              <Icon name="CheckCircle" size="sm" />
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
