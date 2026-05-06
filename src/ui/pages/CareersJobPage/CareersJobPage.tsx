// CareersJobPage.tsx — job posting detail page with inline apply form. Client component.
// All copy data-driven from props. Submit handler passed in — app route owns the API call.
"use client";
import React, { useState } from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";
import { cn } from "../../lib/utils";

export interface JobSection {
  heading: string;
  /** Bullet items — each rendered with a leading marker */
  items: string[];
  /** Optional custom marker character — defaults differ per heading context */
  marker?: string;
}

export interface CareersJobPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  /** Link shown as "← Back" — defaults to /careers */
  backHref?: string;
  backLabel?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  salary?: string;
  summary?: string;
  sections?: JobSection[];
  applyHeading?: string;
  /** Async handler called with applicant data. Throws on error. */
  onApply: (data: { name: string; email: string; linkedin: string; message: string }) => Promise<void>;
  successHeading?: string;
  successBody?: string;
}

export function CareersJobPage({
  theme,
  navbar,
  footer,
  backHref = "/careers",
  backLabel = "← Back to all roles",
  title,
  department,
  location,
  type,
  salary,
  summary,
  sections = [],
  applyHeading = "Apply for this role",
  onApply,
  successHeading = "Application received",
  successBody = "We'll review your application and get back to you within 5 business days.",
}: CareersJobPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", linkedin: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setError("");
    setLoading(true);
    try {
      await onApply(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = cn(
    "w-full rounded-[var(--radius-lg)] border border-[var(--color-border)]",
    "bg-[var(--color-surface-raised)] px-[var(--space-3x)] py-[var(--space-2x)]",
    "text-[var(--text-sm)] text-[var(--color-text)]",
    "focus:outline-none focus:border-[var(--color-primary)] transition-colors"
  );

  const tags = [department, location, type].filter(Boolean) as string[];

  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer}>
      <main className="max-w-[56rem] mx-auto px-[var(--space-6x)] py-[var(--space-12x)] flex flex-col gap-[var(--space-10x)]">

        {/* Back link */}
        <a href={backHref} className="text-[var(--color-primary)] text-[var(--text-sm)] hover:underline w-fit">
          {backLabel}
        </a>

        {/* Header */}
        <div className="flex flex-col gap-[var(--space-4x)]">
          {(tags.length > 0 || salary) && (
            <div className="flex flex-wrap gap-[var(--space-2x)]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-[var(--text-xs)] px-[var(--space-3x)] py-[var(--space-1x)]",
                    "rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)]",
                    "text-[var(--color-text-muted)] font-[var(--font-medium)]"
                  )}
                >
                  {tag}
                </span>
              ))}
              {salary && (
                <span className={cn(
                  "text-[var(--text-xs)] px-[var(--space-3x)] py-[var(--space-1x)]",
                  "rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-[var(--font-semibold)]"
                )}>
                  {salary}
                </span>
              )}
            </div>
          )}
          <h1 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {title}
          </h1>
          {summary && (
            <p className="text-[var(--text-lg)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">{summary}</p>
          )}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_23.75rem] gap-[var(--space-10x)] items-start">

          {/* Left: job sections */}
          <div className="flex flex-col gap-[var(--space-8x)]">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-[var(--space-3x)]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-[var(--space-2x)]">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-primary)] mt-[var(--space-halfx)] flex-shrink-0" aria-hidden="true">
                        {section.marker ?? "→"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: apply form */}
          <div className={cn(
            "sticky top-[var(--space-6x)]",
            "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
            "bg-[var(--color-surface)] p-[var(--space-6x)]",
            "flex flex-col gap-[var(--space-5x)] shadow-[var(--shadow-md)]"
          )}>
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-[var(--space-4x)] py-[var(--space-6x)]">
                <span className="text-[5rem] leading-none" role="img" aria-hidden="true">📬</span>
                <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {successHeading}
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{successBody}</p>
              </div>
            ) : (
              <>
                <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {applyHeading}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>
                  {[
                    { key: "name",     label: "Full name",          type: "text",  placeholder: "Jane Smith",               required: true },
                    { key: "email",    label: "Email",              type: "email", placeholder: "jane@yourco.com",           required: true },
                    { key: "linkedin", label: "LinkedIn / portfolio", type: "url", placeholder: "https://linkedin.com/in/…", required: false },
                  ].map(({ key, label, type, placeholder, required }) => (
                    <div key={key} className="flex flex-col gap-[var(--space-1x)]">
                      <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text-muted)] uppercase tracking-[var(--tracking-wide)]">
                        {label}{required && " *"}
                      </label>
                      <input
                        type={type}
                        required={required}
                        value={form[key as keyof typeof form]}
                        onChange={set(key as keyof typeof form)}
                        className={fieldClass}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-[var(--space-1x)]">
                    <label className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text-muted)] uppercase tracking-[var(--tracking-wide)]">
                      Why this role?
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      className={cn(fieldClass, "resize-none")}
                      placeholder="Tell us a bit about yourself and why you're excited about this role…"
                    />
                  </div>
                  {error && <p className="text-[var(--text-xs)] text-[var(--color-error)]">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email}
                    className={cn(
                      "w-full py-[var(--space-3x)] rounded-[var(--radius-lg)]",
                      "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
                      "font-[var(--font-semibold)] text-[var(--text-sm)]",
                      "hover:bg-[var(--color-primary)]/90 disabled:opacity-40 transition-colors"
                    )}
                  >
                    {loading ? "Sending…" : "Send application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </LandingTemplate>
  );
}
