// Slider — range input for numeric settings like volume, budget, or percentage thresholds.
"use client";

import * as Primitive from "@radix-ui/react-slider";
import { cn } from "@/ui/lib/utils";

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  label,
  showValue = false,
  className,
}: SliderProps) {
  const displayValue = value ?? defaultValue ?? [0];
  return (
    <div className={cn("oq-slider-wrapper", className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-[var(--space-2x)]">
          {label && <span className="text-[var(--text-sm)] text-[var(--color-text)]">{label}</span>}
          {showValue && <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{displayValue.join(" – ")}</span>}
        </div>
      )}
      <Primitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="oq-slider"
      >
        <Primitive.Track className="oq-slider__track">
          <Primitive.Range className="oq-slider__range" />
        </Primitive.Track>
        {displayValue.map((_, i) => (
          <Primitive.Thumb key={i} className="oq-slider__thumb" aria-label={label} />
        ))}
      </Primitive.Root>
    </div>
  );
}
