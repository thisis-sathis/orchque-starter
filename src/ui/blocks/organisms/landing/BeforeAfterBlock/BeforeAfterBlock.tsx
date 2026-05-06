"use client";
// BeforeAfterBlock.tsx — Interactive drag slider showing before vs after state.
// Centre button slides left/right to reveal the two sides.
import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/ui/lib/utils";

export interface BeforeAfterSide {
  label: string;
  /** list of bullet items OR an image src */
  items?: string[];
  imageSrc?: string;
}

export interface BeforeAfterBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  before: BeforeAfterSide;
  after: BeforeAfterSide;
  className?: string;
}

export function BeforeAfterBlock({
  badge,
  heading,
  subheading,
  before,
  after,
  className,
}: BeforeAfterBlockProps) {
  const [split, setSplit] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.min(95, Math.max(5, ((clientX - left) / width) * 100));
    setSplit(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) move(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => move(e.touches[0].clientX);

  const SideContent = ({ side, flip }: { side: BeforeAfterSide; flip?: boolean }) => (
    <div className={cn("flex flex-col gap-[var(--space-4x)]", flip && "items-end text-right")}>
      {side.imageSrc ? (
        <img src={side.imageSrc} alt={side.label} className="w-full rounded-[var(--radius-lg)] object-cover" />
      ) : (
        <ul className="flex flex-col gap-[var(--space-2x)]">
          {(side.items ?? []).map((item, i) => (
            <li key={i} className={cn("flex items-start gap-[var(--space-2x)] text-[var(--text-sm)]", flip && "flex-row-reverse")}>
              <span className={cn("mt-0.5 text-[var(--text-lg)] leading-none", flip ? "text-[var(--color-success)]" : "text-[var(--color-error)]")}>
                {flip ? "✓" : "✕"}
              </span>
              <span className="text-[var(--color-text)]">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
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
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)] max-w-xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        {/* Slider comparison */}
        <div
          ref={containerRef}
          className="relative select-none rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden cursor-col-resize"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
        >
          {/* Two panels */}
          <div className="grid grid-cols-2 min-h-[320px]">
            {/* Before */}
            <div className="bg-[var(--color-surface-raised)] p-[var(--space-8x)] border-r border-[var(--color-border)]">
              <p className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-error)] mb-[var(--space-4x)]">
                {before.label}
              </p>
              <SideContent side={before} />
            </div>
            {/* After */}
            <div className="bg-[var(--color-surface)] p-[var(--space-8x)]">
              <p className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-success)] mb-[var(--space-4x)]">
                {after.label}
              </p>
              <SideContent side={after} flip />
            </div>
          </div>

          {/* Drag handle / shutter */}
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
            style={{ left: `${split}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-y-0 w-0.5 bg-[var(--color-primary)]" />
            <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-text-on-primary)] flex items-center justify-center shadow-lg pointer-events-auto cursor-col-resize">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-center text-[var(--text-xs)] text-[var(--color-text-muted)]">
          ← Drag the handle to compare →
        </p>
      </div>
    </section>
  );
}
