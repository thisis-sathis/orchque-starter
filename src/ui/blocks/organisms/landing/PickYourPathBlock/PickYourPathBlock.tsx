"use client";
// PickYourPathBlock.tsx — 3 selectable cards. User picks one → shows tailored CTA.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import type { IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface Path {
  icon?: IconName;
  title: string;
  description: string;
  bullets?: string[];
  ctaText: string;
  ctaHref: string;
}

export interface PickYourPathBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  paths: Path[];
  className?: string;
}

export function PickYourPathBlock({ badge, heading, subheading, paths, className }: PickYourPathBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const active = selected !== null ? paths[selected] : null;

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        {/* Path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-4x)]">
          {paths.map((path, i) => (
            <button
              key={i}
              onClick={() => setSelected(i === selected ? null : i)}
              className={cn(
                "text-left rounded-[var(--radius-xl)] border-2 p-[var(--space-6x)] flex flex-col gap-[var(--space-3x)] transition-all",
                "hover:border-[var(--color-primary)]/60 hover:shadow-[var(--shadow-md)]",
                selected === i
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-[var(--shadow-md)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              )}
              aria-pressed={selected === i}
            >
              {path.icon && (
                <div className={cn(
                  "w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center",
                  selected === i ? "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]" : "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]"
                )}>
                  <Icon name={path.icon} size="sm" aria-hidden="true" />
                </div>
              )}
              <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
                {path.title}
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                {path.description}
              </p>
              {path.bullets && path.bullets.length > 0 && (
                <ul className="flex flex-col gap-[var(--space-1x)] mt-[var(--space-2x)]">
                  {path.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {/* Selection indicator */}
              <div className={cn(
                "mt-auto pt-[var(--space-3x)] flex items-center gap-[var(--space-2x)] text-[var(--text-sm)] font-[var(--font-medium)] transition-colors",
                selected === i ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"
              )}>
                <span className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selected === i ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-border)]"
                )}>
                  {selected === i && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                {selected === i ? "Selected" : "Choose this path"}
              </div>
            </button>
          ))}
        </div>

        {/* Tailored CTA */}
        {active && (
          <div className="text-center animate-in fade-in duration-200">
            <a
              href={active.ctaHref}
              className="inline-flex items-center justify-center px-[var(--space-8x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              {active.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
