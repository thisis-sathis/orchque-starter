// RadioGroup — single-choice option set for forms and settings.
"use client";

import * as Primitive from "@radix-ui/react-radio-group";
import { cn } from "@/ui/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({ options, value, defaultValue, onValueChange, name, className, orientation = "vertical" }: RadioGroupProps) {
  return (
    <Primitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      className={cn("oq-radio-group", orientation === "horizontal" && "oq-radio-group--horizontal", className)}
    >
      {options.map((opt) => (
        <div key={opt.value} className="oq-radio-group__item">
          <Primitive.Item
            id={`radio-${opt.value}`}
            value={opt.value}
            disabled={opt.disabled}
            className="oq-radio"
          >
            <Primitive.Indicator className="oq-radio__indicator" />
          </Primitive.Item>
          <label htmlFor={`radio-${opt.value}`} className="oq-radio-group__label">
            <span className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">{opt.label}</span>
            {opt.description && (
              <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{opt.description}</span>
            )}
          </label>
        </div>
      ))}
    </Primitive.Root>
  );
}
