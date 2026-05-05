// TestimonialCard.tsx — avatar + name + role + quote molecule.
import React from "react";
import { Avatar } from "@/ui/components/avatar";
import { cn } from "@/ui/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  className?: string;
}

export function TestimonialCard({ quote, name, role, company, avatarSrc, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex flex-col gap-[var(--space-4x)] p-[var(--space-6x)]",
        "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <blockquote className="text-[var(--text-sm)] text-[var(--color-text)] leading-[var(--leading-relaxed)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-[var(--space-3x)]">
        <Avatar src={avatarSrc} name={name} size="md" />
        <div>
          <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">{name}</p>
          {(role || company) && (
            <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {[role, company].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
