"use client";
// EnterpriseBlock.tsx — Enterprise tier CTA with feature list on the left
// and an inquiry form on the right. Submits to /api/enterprise (or any endpoint).
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import type { IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface EnterpriseFeature {
  icon?: IconName;
  title: string;
  description?: string;
}

export interface EnterpriseBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  features: EnterpriseFeature[];
  formEndpoint?: string;       // POST endpoint — defaults to /api/enterprise
  className?: string;
}

const TEAM_SIZES = ["1–5", "6–20", "21–100", "101–500", "500+"];

export function EnterpriseBlock({
  badge = "Enterprise",
  heading,
  subheading,
  features,
  formEndpoint = "/api/enterprise",
  className,
}: EnterpriseBlockProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", teamSize: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) { setError("Please fill in all required fields."); return; }
    setLoading(true); setError("");
    try {
      await fetch(formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSuccess(true);
    } catch {
      setError("Something went wrong — please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-[var(--space-3x)] py-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors";

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-12x)] items-start">
        {/* Left — features / value prop */}
        <div className="flex flex-col gap-[var(--space-8x)]">
          <div className="flex flex-col gap-[var(--space-4x)]">
            {badge && (
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
                {badge}
              </span>
            )}
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>

          <ul className="flex flex-col gap-[var(--space-5x)]">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-[var(--space-4x)]">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={(f.icon ?? "CheckCircle2") as IconName} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">{f.title}</p>
                  {f.description && (
                    <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{f.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-8x)] shadow-[var(--shadow-lg)]">
          {success ? (
            <div className="flex flex-col items-center gap-[var(--space-6x)] py-[var(--space-8x)] text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                <Icon name="MailCheck" size="lg" className="text-[var(--color-success)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-[var(--space-2x)]">
                <h3 className="text-[var(--text-xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                  Check your inbox
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                  We've received your enquiry and will be in touch within one business day. Check your inbox (and spam folder) for a confirmation.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-[var(--space-4x)]">
              <h3 className="text-[var(--text-xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                Talk to our team
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                Tell us about your needs and we'll get back to you within one business day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3x)]">
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Name *</label>
                  <input className={inputCls} placeholder="Your name" value={form.name} onChange={set("name")} required />
                </div>
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Work email *</label>
                  <input type="email" className={inputCls} placeholder="you@company.com" value={form.email} onChange={set("email")} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3x)]">
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Company *</label>
                  <input className={inputCls} placeholder="Acme Inc." value={form.company} onChange={set("company")} required />
                </div>
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Team size</label>
                  <select className={inputCls} value={form.teamSize} onChange={set("teamSize")}>
                    <option value="">Select…</option>
                    {TEAM_SIZES.map((s) => <option key={s} value={s}>{s} people</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-[var(--space-1x)]">
                <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">How can we help?</label>
                <textarea
                  rows={4}
                  className={cn(inputCls, "resize-none")}
                  placeholder="Tell us about your use case, scale, or any specific requirements…"
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              {error && (
                <p className="text-[var(--text-xs)] text-[var(--color-error)]">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-[var(--space-2x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-sm)] px-[var(--space-6x)] py-[var(--space-3x)] hover:bg-[var(--color-primary)]/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Sending…" : "Send enquiry"}
                {!loading && <Icon name="ArrowRight" size="sm" aria-hidden="true" />}
              </button>

              <p className="text-center text-[var(--text-xs)] text-[var(--color-text-subtle)]">
                We respond within one business day. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
