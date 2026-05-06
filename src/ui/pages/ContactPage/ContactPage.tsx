// ContactPage.tsx — full-page contact form with navbar and footer. Client component.
// All copy data-driven from props. Submit handler passed in — app route owns the API call.
"use client";
import React, { useState } from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";
import { cn } from "../../lib/utils";

export interface ContactSubject {
  value: string;
  label: string;
}

export interface ContactPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  heading?: string;
  subheading?: string;
  /** Email shown as a direct contact fallback */
  supportEmail?: string;
  subjects?: ContactSubject[];
  /** Async handler — called with form values. Throws on error. */
  onSubmit: (data: { name: string; email: string; subject: string; message: string }) => Promise<void>;
  submitLabel?: string;
  successMessage?: string;
}

const DEFAULT_SUBJECTS: ContactSubject[] = [
  { value: "billing",  label: "Billing question" },
  { value: "bug",      label: "Report a bug" },
  { value: "feature",  label: "Feature request" },
  { value: "other",    label: "Other" },
];

export function ContactPage({
  theme,
  navbar,
  footer,
  heading = "Contact us",
  subheading = "Have a question or need help? We'll get back to you within 24 hours.",
  supportEmail,
  subjects = DEFAULT_SUBJECTS,
  onSubmit,
  submitLabel = "Send message",
  successMessage,
}: ContactPageProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill in all required fields."); return; }
    if (!form.email.includes("@")) { setError("Enter a valid email."); return; }
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = cn(
    "w-full rounded-[var(--radius-lg)] border border-[var(--color-border)]",
    "bg-[var(--color-surface)] px-[var(--space-4x)] py-[var(--space-3x)]",
    "text-[var(--text-sm)] text-[var(--color-text)]",
    "placeholder:text-[var(--color-text-subtle)]",
    "focus:outline-none focus:border-[var(--color-primary)] transition-colors"
  );

  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer}>
      <main className="flex-1 px-[var(--space-6x)] py-[var(--space-16x)]">
        <div className="mx-auto max-w-[34rem] flex flex-col gap-[var(--space-8x)]">

          {/* Header */}
          <div className="flex flex-col gap-[var(--space-2x)]">
            <h1 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h1>
            <p className="text-[var(--text-base)] text-[var(--color-text-muted)]">{subheading}</p>
            {supportEmail && (
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                Or email us at{" "}
                <a href={`mailto:${supportEmail}`} className="text-[var(--color-primary)] hover:underline">
                  {supportEmail}
                </a>
              </p>
            )}
          </div>

          {/* Success state */}
          {sent ? (
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-success)] bg-[var(--color-success)]/5 px-[var(--space-5x)] py-[var(--space-5x)] flex flex-col gap-[var(--space-2x)]">
              <p className="text-[var(--text-base)] font-[var(--font-bold)] text-[var(--color-success)]">
                Message sent!
              </p>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
                {successMessage ?? `We've received your message and will reply to ${form.email} as soon as possible.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4x)]">
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    Name <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                  </label>
                  <input type="text" value={form.name} onChange={set("name")} placeholder="Your name" className={inputClass} required />
                </div>
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    Email <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                  </label>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputClass} required />
                </div>
              </div>

              {/* Subject */}
              {subjects.length > 0 && (
                <div className="flex flex-col gap-[var(--space-1x)]">
                  <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">Subject</label>
                  <select value={form.subject} onChange={set("subject")} className={inputClass}>
                    <option value="">Select a topic</option>
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div className="flex flex-col gap-[var(--space-1x)]">
                <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  Message <span className="text-[var(--color-error)]" aria-hidden="true">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={5}
                  placeholder="Describe your question or issue…"
                  className={cn(inputClass, "resize-none")}
                  required
                />
              </div>

              {error && <p className="text-[var(--text-xs)] text-[var(--color-error)]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "px-[var(--space-5x)] py-[var(--space-3x)] rounded-[var(--radius-lg)]",
                  "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
                  "text-[var(--text-sm)] font-[var(--font-semibold)]",
                  "hover:bg-[var(--color-primary)]/90 transition-colors disabled:opacity-60"
                )}
              >
                {loading ? "Sending…" : submitLabel}
              </button>
            </form>
          )}
        </div>
      </main>
    </LandingTemplate>
  );
}
