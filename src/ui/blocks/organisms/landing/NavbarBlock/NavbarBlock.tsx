"use client";
// NavbarBlock.tsx — responsive marketing navbar organism.
// Data-driven from product.config.json brand + nav sections.
import React, { useState } from "react";
import { Button } from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarBlockProps {
  logoText: string;
  logoSrc?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function NavbarBlock({ logoText, logoSrc, links = [], ctaText, ctaHref, className }: NavbarBlockProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        "backdrop-blur-sm bg-opacity-90",
        className
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-[var(--space-6x)] h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-[var(--space-2x)] font-[var(--font-bold)] text-[var(--color-text)]">
          {logoSrc ? (
            <img src={logoSrc} alt={logoText} className="h-7 w-auto" />
          ) : (
            <span className="text-[var(--text-lg)] text-[var(--color-primary)]">{logoText}</span>
          )}
        </a>

        {/* Desktop links */}
        {links.length > 0 && (
          <ul className="hidden md:flex items-center gap-[var(--space-6x)]" role="list">
            {links.map((link) => (
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
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-[var(--space-3x)]">
          {ctaHref && ctaText && (
            <Button size="sm" asChild>
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-[var(--space-2x)] text-[var(--color-text)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size="md" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-6x)] pb-[var(--space-4x)]">
          <ul className="flex flex-col gap-[var(--space-2x)] pt-[var(--space-3x)]">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-[var(--text-sm)] text-[var(--color-text-muted)] py-[var(--space-2x)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {ctaHref && ctaText && (
              <li className="pt-[var(--space-2x)]">
                <Button size="sm" className="w-full" asChild>
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
