// PrelaunchPage.tsx — full-page pre-launch waitlist. No nav/footer, pure conversion.
// All copy, trust items, launch date, and submit handler are data-driven from props.
"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface PrelaunchPageProps {
  /** Product/brand name shown as the logo link */
  brandName: string;
  /** Number of early spots remaining — shown as badge */
  spotsLeft?: number;
  /** Main headline */
  heading?: string;
  /** Supporting paragraph */
  subheading?: string;
  /** ISO date string for expected launch — e.g. "2026-08-01T00:00:00Z" */
  launchDate?: string;
  /** Trust items listed below the form */
  trustItems?: string[];
  /** Async handler for form submit — resolves on success, throws on error */
  onSubmit: (email: string) => Promise<void>;
  /** Label on the submit button */
  submitLabel?: string;
  /** Content shown after successful submit */
  successHeading?: string;
  successBody?: string;
}

export function PrelaunchPage({
  brandName,
  spotsLeft,
  heading = "Launching soon",
  subheading,
  launchDate,
  trustItems = [],
  onSubmit,
  submitLabel = "Get early access",
  successHeading = "Check your inbox",
  successBody = "You're on the list! We'll email you the moment we launch.",
}: PrelaunchPageProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setError("");
    setLoading(true);
    try {
      await onSubmit(email);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const launchLabel = launchDate
    ? new Date(launchDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[var(--space-6x)] bg-[var(--color-surface)] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-[25rem] bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[28rem] flex flex-col items-center gap-[var(--space-8x)] text-center">
        {/* Logo */}
        <a
          href="/"
          className="text-[var(--color-primary)] font-[var(--font-bold)] text-[var(--text-xl)]"
        >
          {brandName}
        </a>

        {/* Spots badge */}
        {spotsLeft !== undefined && (
          <span className="inline-block px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
            {spotsLeft} spots remaining
          </span>
        )}

        {/* Heading */}
        <div className="flex flex-col gap-[var(--space-3x)]">
          <h1 className="text-[var(--text-4xl)] sm:text-[var(--text-5xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h1>
          {subheading && (
            <p className="text-[var(--text-lg)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
              {subheading}
            </p>
          )}
        </div>

        {/* Form / success state */}
        {submitted ? (
          <div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-[var(--space-6x)] flex flex-col items-center gap-[var(--space-3x)]">
            <span className="text-[4rem] leading-none" role="img" aria-hidden="true">✉️</span>
            <h2 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
              {successHeading}
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[var(--space-3x)]" noValidate>
            <div className="flex gap-[var(--space-2x)]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourco.com"
                aria-label="Your email address"
                className={cn(
                  "flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                  "bg-[var(--color-surface-raised)] px-[var(--space-4x)] py-[var(--space-3x)]",
                  "text-[var(--text-sm)] text-[var(--color-text)]",
                  "placeholder:text-[var(--color-text-subtle)]",
                  "focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "px-[var(--space-5x)] py-[var(--space-3x)] rounded-[var(--radius-lg)]",
                  "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
                  "font-[var(--font-semibold)] text-[var(--text-sm)]",
                  "hover:bg-[var(--color-primary)]/90 transition-colors whitespace-nowrap",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? "…" : submitLabel}
              </button>
            </div>
            {error && (
              <p className="text-[var(--text-xs)] text-[var(--color-error)] text-left">{error}</p>
            )}
            <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}

        {/* Trust items */}
        {trustItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-[var(--space-4x)]">
            {trustItems.map((t) => (
              <span
                key={t}
                className="flex items-center gap-[var(--space-1x)] text-[var(--text-xs)] text-[var(--color-text-muted)]"
              >
                <span className="text-[var(--color-success)]" aria-hidden="true">✓</span>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Launch date */}
        {launchLabel && (
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            Expected launch:{" "}
            <span className="text-[var(--color-text)] font-[var(--font-medium)]">{launchLabel}</span>
          </p>
        )}
      </div>
    </div>
  );
}
