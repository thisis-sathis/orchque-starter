"use client";
// NavbarBlock.tsx — responsive marketing navbar with optional dropdown menus.
// Data-driven from product.config.json brand + nav sections.
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";
import { ThemeSwitcher } from "@/ui/components/theme-switcher";

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Optional dropdown items — renders a mega-dropdown instead of a plain link */
  dropdown?: NavDropdownItem[];
}

export interface NavbarBlockProps {
  logoText: string;
  logoSrc?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  /** Secondary ghost CTA (e.g. "Sign in") */
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** Show the theme-switcher palette button next to the CTAs */
  showThemeSwitcher?: boolean;
  className?: string;
}

function DropdownMenu({ items, onClose }: { items: NavDropdownItem[]; onClose: () => void }) {
  return (
    <ul
      role="menu"
      className="absolute top-full left-0 mt-[var(--space-2x)] min-w-[var(--navbar-dropdown-min-w,13.75rem)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] py-[var(--space-2x)] z-50"
    >
      {items.map((item) => (
        <li key={item.href} role="menuitem">
          <a
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-[var(--space-3x)] px-[var(--space-4x)] py-[var(--space-3x)] hover:bg-[var(--color-surface-raised)] transition-colors rounded-[var(--radius-lg)] mx-[var(--space-1x)]"
          >
            {item.icon && (
              <div className="w-[var(--space-7x)] h-[var(--space-7x)] rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-[var(--space-halfx)]">
                <Icon name={item.icon as any} size="xs" className="text-[var(--color-primary)]" aria-hidden="true" />
              </div>
            )}
            <div>
              <p className="text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-text)]">
                {item.label}
              </p>
              {item.description && (
                <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] leading-[var(--leading-snug)]">
                  {item.description}
                </p>
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function NavbarBlock({
  logoText,
  logoSrc,
  links = [],
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  showThemeSwitcher = false,
  className,
}: NavbarBlockProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm",
        className
      )}
    >
      <nav
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between px-[var(--space-6x)] h-[var(--navbar-height,4rem)]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-[var(--space-2x)] font-[var(--font-bold)] text-[var(--color-text)] flex-shrink-0">
          {logoSrc ? (
            <img src={logoSrc} alt={logoText} className="h-[var(--space-7x)] w-auto" />
          ) : (
            <span className="text-[var(--text-lg)] text-[var(--color-primary)]">{logoText}</span>
          )}
        </a>

        {/* Desktop links */}
        {links.length > 0 && (
          <ul className="hidden md:flex items-center gap-[var(--space-5x)]" role="list">
            {links.map((link) => (
              <li key={link.label} className="relative">
                {link.dropdown ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className="flex items-center gap-[var(--space-1x)] text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <Icon
                      name="ChevronDown"
                      size="xs"
                      aria-hidden="true"
                      className={cn("transition-transform", openDropdown === link.label && "rotate-180")}
                    />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {link.label}
                  </a>
                )}
                {link.dropdown && openDropdown === link.label && (
                  <DropdownMenu items={link.dropdown} onClose={() => setOpenDropdown(null)} />
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-[var(--space-3x)]">
          {showThemeSwitcher && <ThemeSwitcher />}
          {secondaryCtaHref && secondaryCtaText && (
            <Button size="sm" variant="ghost" asChild>
              <a href={secondaryCtaHref}>{secondaryCtaText}</a>
            </Button>
          )}
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
          <ul className="flex flex-col gap-[var(--space-1x)] pt-[var(--space-3x)]">
            {links.map((link) => (
              <li key={link.label}>
                {link.dropdown ? (
                  <div>
                    <p className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-text-muted)] py-[var(--space-2x)] mt-[var(--space-2x)]">
                      {link.label}
                    </p>
                    <ul className="flex flex-col gap-[var(--space-1x)] pl-[var(--space-3x)]">
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="block text-[var(--text-sm)] text-[var(--color-text-muted)] py-[var(--space-1x)] hover:text-[var(--color-text)] transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block text-[var(--text-sm)] text-[var(--color-text-muted)] py-[var(--space-2x)] hover:text-[var(--color-text)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            {ctaHref && ctaText && (
              <li className="pt-[var(--space-3x)]">
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
