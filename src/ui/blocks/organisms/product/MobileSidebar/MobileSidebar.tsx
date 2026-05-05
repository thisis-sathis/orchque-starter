// MobileSidebar.tsx — slide-in drawer nav for mobile screens. Hidden on md+.
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface MobileSidebarNavItem {
  /** Display label */
  label: string;
  /** Route href */
  href: string;
  /** Lucide icon name */
  icon?: IconName;
}

export interface MobileSidebarProps {
  /** Brand name shown in header */
  logoText: string;
  /** Nav items to render */
  items: MobileSidebarNavItem[];
  className?: string;
}

export function MobileSidebar({ logoText, items, className }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sticky header bar */}
      <div
        className={cn(
          "md:hidden flex items-center justify-between",
          "h-[var(--space-14x,56px)] px-[var(--space-4x)] sticky top-0 z-40",
          "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
          className
        )}
      >
        <Link
          href="/dashboard"
          className="font-[var(--font-bold,700)] text-[var(--text-md)] text-[var(--color-text)]"
        >
          {logoText}
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className="p-[var(--space-1x)] rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Overlay + Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <aside
            role="navigation"
            aria-label="Mobile navigation"
            className={cn(
              "absolute left-0 top-0 h-full w-[var(--sidebar-mobile-width,256px)]",
              "flex flex-col",
              "bg-[var(--color-surface)] border-r border-[var(--color-border)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div
              className={cn(
                "flex items-center justify-between",
                "h-[var(--space-14x,56px)] px-[var(--space-4x)]",
                "border-b border-[var(--color-border)]"
              )}
            >
              <span className="font-[var(--font-bold,700)] text-[var(--text-md)] text-[var(--color-text)]">
                {logoText}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="p-[var(--space-1x)] rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-[var(--space-2x)] py-[var(--space-4x)] space-y-[var(--space-1x)]">
              {items.map(({ label, href, icon }) => {
                const active =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-[var(--space-3x)] rounded-[var(--radius-md)]",
                      "px-[var(--space-3x)] py-[var(--space-2x)]",
                      "text-[var(--text-sm)] font-medium transition-colors",
                      active
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"
                    )}
                  >
                    {icon && <Icon name={icon} size="sm" aria-hidden="true" />}
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
