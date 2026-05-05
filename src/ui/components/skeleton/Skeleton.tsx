// Skeleton.tsx — animated loading placeholder atom. Prefer over spinners (Rule 12).
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width as CSS value. Default: 100% */
  width?: string;
  /** Height as CSS value. Default: 1em */
  height?: string;
  /** Use for circular shapes (avatar placeholders) */
  circle?: boolean;
}

export function Skeleton({ className, width, height, circle, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-surface-overlay)]",
        circle ? "rounded-[var(--radius-full)]" : "rounded-[var(--radius-md)]",
        className
      )}
      style={{ width: width ?? "100%", height: height ?? "1em", ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}
