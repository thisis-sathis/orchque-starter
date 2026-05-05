// HelpPage.tsx — help center / documentation index page.
// Article grid with search + categories. Used for /help, /docs, /support.
import React from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import { Icon, type IconName } from "../../components/icon";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";
import { cn } from "../../lib/utils";

export interface HelpCategory {
  icon?: IconName;
  title: string;
  description?: string;
  articleCount?: number;
  href: string;
}

export interface HelpArticle {
  title: string;
  excerpt?: string;
  href: string;
  category?: string;
}

export interface HelpPageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  heading?: string;
  subheading?: string;
  categories?: HelpCategory[];
  popularArticles?: HelpArticle[];
  className?: string;
}

export function HelpPage({
  theme,
  navbar,
  footer,
  heading = "How can we help?",
  subheading,
  categories = [],
  popularArticles = [],
  className,
}: HelpPageProps) {
  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer} className={className}>
      <main className="w-full">
        {/* Hero banner */}
        <section className="w-full bg-[var(--landing-hero-bg,var(--color-surface-raised))] px-[var(--space-6x)] py-[var(--space-12x)]">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-[var(--space-4x)]">
            <h1 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h1>
            {subheading && (
              <p className="text-[var(--text-lg)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="w-full px-[var(--space-6x)] py-[var(--space-10x)]">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-[var(--text-2xl)] font-[var(--font-semibold)] text-[var(--color-text)] mb-[var(--space-6x)]">
                Browse by category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-4x)]">
                {categories.map((cat, i) => (
                  <a
                    key={i}
                    href={cat.href}
                    className={cn(
                      "flex flex-col gap-[var(--space-3x)] p-[var(--space-5x)]",
                      "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
                      "bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)]",
                      "transition-colors duration-150 no-underline"
                    )}
                  >
                    {cat.icon && (
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)]">
                        <Icon name={cat.icon} size="md" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-[var(--text-base)] font-[var(--font-semibold)] text-[var(--color-text)]">
                        {cat.title}
                      </h3>
                      {cat.description && (
                        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-1x)]">
                          {cat.description}
                        </p>
                      )}
                      {cat.articleCount !== undefined && (
                        <p className="text-[var(--text-xs)] text-[var(--color-text-subtle)] mt-[var(--space-1x)]">
                          {cat.articleCount} articles
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular articles */}
        {popularArticles.length > 0 && (
          <section className="w-full px-[var(--space-6x)] py-[var(--space-10x)] bg-[var(--color-surface-raised)]">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-[var(--text-2xl)] font-[var(--font-semibold)] text-[var(--color-text)] mb-[var(--space-6x)]">
                Popular articles
              </h2>
              <div className="flex flex-col divide-y divide-[var(--color-border)]">
                {popularArticles.map((article, i) => (
                  <a
                    key={i}
                    href={article.href}
                    className={cn(
                      "flex flex-col gap-[var(--space-1x)] py-[var(--space-4x)]",
                      "text-[var(--color-text)] hover:text-[var(--color-primary)]",
                      "transition-colors duration-150 no-underline"
                    )}
                  >
                    <span className="text-[var(--text-base)] font-[var(--font-medium)]">{article.title}</span>
                    {article.excerpt && (
                      <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{article.excerpt}</span>
                    )}
                    {article.category && (
                      <span className="text-[var(--text-xs)] text-[var(--color-text-subtle)]">{article.category}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </LandingTemplate>
  );
}
