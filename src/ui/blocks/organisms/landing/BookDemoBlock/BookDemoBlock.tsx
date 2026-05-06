"use client";
// BookDemoBlock.tsx — Inline "book a demo" form with email + name.
// After submit: shows "Check your inbox" confirmation state.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface BookDemoBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  perks?: string[];
  formEndpoint?: string;       // POST endpoint — defaults to /api/book-demo
  successHeading?: string;
  successMessage?: string;
  ctaText?: string;
  className?: string;
}

export function BookDemoBlock({
  badge = "Live demo",
  heading,
  subheading,
  perks = [],
  formEndpoint = "/api/book-demo",
  successHeading = "Check your inbox",
  successMessage = "We've received your request and will send a calendar invite within a few hours. Check your inbox (and spam folder) for the confirmation.",
  ctaText = "Book my free demo",
  className,
}: BookDemoBlockProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Please enter your name and email."); return; }
    setLoading(true); setError("");
    try {
      await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-[var(--space-3x)] py-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors";

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-12x)] items-center">
        {/* Left — why join the demo */}
        <div className="flex flex-col gap-[var(--space-6x)]">
          {badge && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              <Icon name="Video" size="xs" aria-hidden="true" /> {badge}
            </span>
          )}
          <div className="flex flex-col gap-[var(--space-3x)]">
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>

          {perks.length > 0 && (
            <ul className="flex flex-col gap-[var(--space-3x)]">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-[var(--space-3x)]">
                  <Icon name="CheckCircle2" size="sm" className="text-[var(--color-success)] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[var(--text-sm)] text-[var(--color-text)]">{p}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
            <Icon name="Clock" size="sm" aria-hidden="true" />
            <span>30 minutes · No sales pressure</span>
          </div>
        </div>

        {/* Right — form or success state */}
        <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-8x)] shadow-[var(--shadow-lg)]">
          {success ? (
            /* ── Success / check inbox state ────────────────────────── */
            <div className="flex flex-col items-center gap-[var(--space-6x)] text-center py-[var(--space-4x)]">
              <div className="w-20 h-20 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                <Icon name="MailCheck" size="xl" className="text-[var(--color-success)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-[var(--space-2x)]">
                <h3 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                  {successHeading}
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {successMessage}
                </p>
              </div>
              <div className="flex items-center gap-[var(--space-2x)] text-[var(--text-xs)] text-[var(--color-text-subtle)]">
                <Icon name="Mail" size="xs" aria-hidden="true" />
                <span>Confirmation sent to {form.email}</span>
              </div>
            </div>
          ) : (
            /* ── Booking form ────────────────────────────────────────── */
            <form onSubmit={submit} className="flex flex-col gap-[var(--space-4x)]">
              <div className="flex flex-col gap-[var(--space-1x)]">
                <h3 className="text-[var(--text-xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                  Book your spot
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                  We'll send a calendar invite within a few hours.
                </p>
              </div>

              <div className="flex flex-col gap-[var(--space-1x)]">
                <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Full name *</label>
                <input className={inputCls} placeholder="Your name" value={form.name} onChange={set("name")} required />
              </div>

              <div className="flex flex-col gap-[var(--space-1x)]">
                <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Work email *</label>
                <input type="email" className={inputCls} placeholder="you@company.com" value={form.email} onChange={set("email")} required />
              </div>

              <div className="flex flex-col gap-[var(--space-1x)]">
                <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Company</label>
                <input className={inputCls} placeholder="Your company (optional)" value={form.company} onChange={set("company")} />
              </div>

              {error && (
                <p className="text-[var(--text-xs)] text-[var(--color-error)]">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-[var(--space-2x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-sm)] px-[var(--space-6x)] py-[var(--space-3x)] hover:bg-[var(--color-primary)]/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Booking…" : ctaText}
                {!loading && <Icon name="CalendarCheck" size="sm" aria-hidden="true" />}
              </button>

              <p className="text-center text-[var(--text-xs)] text-[var(--color-text-subtle)]">
                No credit card. No commitment. Cancel anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
