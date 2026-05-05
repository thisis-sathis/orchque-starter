// LegalPage.tsx — generic legal content page. Terms, Privacy, Refund Policy, Licenses etc.
// Content is markdown/HTML string — render with your app's MDX or dangerouslySetInnerHTML.
import React from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";
import { cn } from "../../lib/utils";

export interface LegalSection {
  heading: string;
  content: string | React.ReactNode;
}

export interface LegalPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  /** Page title, e.g. "Terms of Service" */
  title: string;
  /** e.g. "Last updated: January 1, 2026" */
  lastUpdated?: string;
  /** Short description below title */
  description?: string;
  sections: LegalSection[];
  className?: string;
}

export function LegalPage({
  theme,
  navbar,
  footer,
  title,
  lastUpdated,
  description,
  sections,
  className,
}: LegalPageProps) {
  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer} className={className}>
      <main className="w-full px-[var(--space-6x)] py-[var(--space-12x)]">
        <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
          {/* Header */}
          <header className="flex flex-col gap-[var(--space-3x)]">
            <h1 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{lastUpdated}</p>
            )}
            {description && (
              <p className="text-[var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                {description}
              </p>
            )}
          </header>

          {/* Sections */}
          <div className="flex flex-col gap-[var(--space-8x)]">
            {sections.map((section, i) => (
              <section key={i} className="flex flex-col gap-[var(--space-3x)]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {section.heading}
                </h2>
                {typeof section.content === "string" ? (
                  <div
                    className="text-[var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] whitespace-pre-line"
                  >
                    {section.content}
                  </div>
                ) : (
                  <div className="text-[var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                    {section.content}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </LandingTemplate>
  );
}
