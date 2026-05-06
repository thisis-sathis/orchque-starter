// WhatIsThisBlock.tsx — "What is this?" explainer with Q&A, tags, highlights, and bold keywords.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

interface HighlightedText {
  text: string;
  /** Color key: "primary" | "success" | "accent" | "highlight" | "error" or any CSS color */
  color?: "primary" | "success" | "accent" | "highlight" | "error";
  bold?: boolean;
}

interface QAItem {
  question: string;
  /** Answer as plain string or array of segments for rich formatting */
  answer: string | HighlightedText[];
  icon?: IconName;
  tags?: string[];
}

export interface WhatIsThisBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  items: QAItem[];
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  primary:   "text-[var(--color-primary)]   bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
  success:   "text-[var(--color-success)]   bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]",
  accent:    "text-[var(--color-accent)]    bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]",
  highlight: "text-[var(--color-highlight)] bg-[color-mix(in_srgb,var(--color-highlight)_15%,transparent)]",
  error:     "text-[var(--color-error)]     bg-[color-mix(in_srgb,var(--color-error)_10%,transparent)]",
};

const TAG_COLOR_MAP: Record<string, string> = {
  primary:   "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] text-[var(--color-primary)]   bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]",
  success:   "border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] text-[var(--color-success)]   bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)]",
  accent:    "border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)]  text-[var(--color-accent)]    bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]",
};

function RichAnswer({ answer }: { answer: string | HighlightedText[] }) {
  if (typeof answer === "string") {
    return (
      <p className="text-[var(--text-md)] text-[var(--color-text-muted)] leading-relaxed">
        {answer}
      </p>
    );
  }

  return (
    <p className="text-[var(--text-md)] text-[var(--color-text-muted)] leading-relaxed">
      {answer.map((seg, idx) => {
        if (seg.color) {
          const cls = COLOR_MAP[seg.color] ?? "";
          return (
            <mark
              key={idx}
              className={cn(
                "rounded px-1 py-0.5 not-italic",
                cls,
                seg.bold && "font-bold"
              )}
            >
              {seg.text}
            </mark>
          );
        }
        return (
          <span key={idx} className={cn(seg.bold && "font-bold text-[var(--color-text)]")}>
            {seg.text}
          </span>
        );
      })}
    </p>
  );
}

export function WhatIsThisBlock({
  badge,
  heading = "What is this?",
  subheading,
  items,
  className,
}: WhatIsThisBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          {badge && (
            <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              <Icon name="HelpCircle" size="xs" />
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Q&A Items */}
        <div className="flex flex-col gap-[var(--space-6x)]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-4"
            >
              {/* Question row */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon
                    name={(item.icon ?? "HelpCircle") as IconName}
                    size="sm"
                    className="text-[var(--color-primary)]"
                  />
                </div>
                <h3 className="font-bold text-[var(--color-text)] text-lg leading-snug">
                  {item.question}
                </h3>
              </div>

              {/* Answer */}
              <div className="pl-11">
                <RichAnswer answer={item.answer} />
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="pl-11 flex flex-wrap gap-2">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-background)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
