// SettingsTemplate.tsx - settings page layout with left nav + content area.
import React from "react";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot } from "@/ui/lib/types";

export interface SettingsNavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SettingsTemplateProps {
  title?: string;
  navItems: SettingsNavItem[];
  /** Content slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
}

export function SettingsTemplate({ title, navItems, content, children, className }: SettingsTemplateProps) {
  const { renderSlot } = require("@/ui/lib/render-component");
  return (
    <div className={cn("flex flex-col gap-[var(--space-6x)]", className)}>
      {title && (
        <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">{title}</h1>
      )}

      <div className="flex flex-col md:flex-row gap-[var(--space-8x)]">
        <nav aria-label="Settings navigation" className="md:w-48 shrink-0">
          <ul className="flex md:flex-col gap-[var(--space-1x)]" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "block px-[var(--space-3x)] py-[var(--space-2x)] rounded-[var(--radius-md)]",
                    "text-[var(--text-sm)] transition-colors",
                    item.active
                      ? "bg-[var(--color-surface-overlay)] font-[var(--font-medium)] text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">
          {renderSlot(content ?? children)}
        </div>
      </div>
    </div>
  );
}