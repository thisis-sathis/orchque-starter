"use client";
// WaitlistBlock.tsx — Email waitlist / interest form with CTA.
import React, { useState } from "react";
import { cn } from "@/ui/lib/utils";

export interface WaitlistBlockProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  badge?: string;
  className?: string;
}

export function WaitlistBlock({
  heading = "Join the waitlist",
  subheading = "Be the first to know when we launch. No spam, ever.",
  placeholder = "Enter your email address",
  buttonText = "Join waitlist",
  successMessage = "You're on the list! We'll reach out soon.",
  badge,
  className,
}: WaitlistBlockProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // replace with real API call
    setLoading(false);
    setDone(true);
  };

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-xl flex flex-col items-center gap-[var(--space-6x)] text-center">
        {badge && (
          <span className="px-[var(--space-3x)] py-[var(--space-1x)] rounded-full border border-[var(--color-border)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)] bg-[var(--color-surface)]">
            {badge}
          </span>
        )}
        {heading && (
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
        )}

        {done ? (
          <div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-success)] bg-[var(--color-success-surface)] px-[var(--space-5x)] py-[var(--space-4x)] text-[var(--text-sm)] text-[var(--color-success)] font-[var(--font-semibold)]">
            {successMessage}
          </div>
        ) : (
          <form onSubmit={submit} className="w-full flex flex-col sm:flex-row gap-[var(--space-2x)]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4x)] py-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-[var(--space-5x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-[var(--font-semibold)] hover:bg-[var(--color-primary)]/90 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? "Joining…" : buttonText}
            </button>
          </form>
        )}
        {error && <p className="text-[var(--text-xs)] text-[var(--color-failure)]">{error}</p>}
      </div>
    </section>
  );
}
