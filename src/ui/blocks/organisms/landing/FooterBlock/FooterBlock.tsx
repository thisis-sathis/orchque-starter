// FooterBlock.tsx — landing page footer organism. Links + brand + legal.
import React from "react";
import { Separator } from "@/ui/components/separator";
import { cn } from "@/ui/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterBlockProps {
  logoText: string;
  logoSrc?: string;
  tagline?: string;
  /** Company address shown below the logo/tagline */
  address?: string;
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  copyrightText?: string;
  className?: string;
}

export function FooterBlock({
  logoText,
  logoSrc,
  tagline,
  address,
  columns = [],
  legalLinks = [],
  copyrightText,
  className,
}: FooterBlockProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        "px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {/* Top: brand (col 1) + 3 link columns — single row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-8x)]">
          {/* Brand */}
          <div className="flex flex-col gap-[var(--space-3x)]">
            <a href="/" className="font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-lg)]">
              {logoSrc ? <img src={logoSrc} alt={logoText} className="h-6 w-auto" /> : logoText}
            </a>
            {tagline && <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{tagline}</p>}
            {address && (
              <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] whitespace-pre-line">
                {address}
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-[var(--space-3x)]">
              <p className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-text-muted)]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-[var(--space-2x)]" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-[var(--space-8x)]" />

        {/* Bottom: legal + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[var(--space-3x)]">
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            {copyrightText ?? `© ${year} ${logoText}. All rights reserved.`}
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-[var(--space-4x)]" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--text-xs)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
