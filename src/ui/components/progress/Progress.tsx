// Progress — animated progress bar for uploads, onboarding steps, and loading states.
import { cn } from "@/ui/lib/utils";
import * as Primitive from "@radix-ui/react-progress";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "h-[var(--space-1x)]",
  md: "h-[var(--space-2x)]",
  lg: "h-[var(--space-3x)]",
};

export function Progress({ value = 0, max = 100, label, showValue = false, size = "md", className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("oq-progress-wrapper w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-[var(--space-1x)]">
          {label && <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{label}</span>}
          {showValue && <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{Math.round(pct)}%</span>}
        </div>
      )}
      <Primitive.Root value={value} max={max} className={cn("oq-progress", SIZE_CLASSES[size])}>
        <Primitive.Indicator
          className="oq-progress__indicator"
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </Primitive.Root>
    </div>
  );
}
