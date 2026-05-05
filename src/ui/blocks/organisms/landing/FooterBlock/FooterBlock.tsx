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
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  copyrightText?: string;
  className?: string;
}

export function FooterBlock({
  logoText,
  logoSrc,
  tagline,
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
        "px-[var(--space-6x)] py-[var(--space-12x)]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {/* Top: brand + columns */}
        <div
          className={cn(
            "grid grid-cols-1 gap-[var(--space-8x)]",
            columns.length > 0 && "sm:grid-cols-2 md:grid-cols-[1fr_repeat(auto-fit,minmax(120px,1fr))]"
          )}
        >
          {/* Brand */}
          <div className="flex flex-col gap-[var(--space-3x)]">
            <a href="/" className="font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-lg)]">
              {logoSrc ? <img src={logoSrc} alt={logoText} className="h-6 w-auto" /> : logoText}
            </a>
            {tagline && <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{tagline}</p>}
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
