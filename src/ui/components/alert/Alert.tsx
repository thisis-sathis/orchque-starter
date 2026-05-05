// Alert — status banner with icon and message. Variants: info | success | warning | error.
import React from "react";
import { cn } from "@/ui/lib/utils";
import type { ActionConfig } from "@/ui/lib/types";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  /**
   * Optional CTA link/button at the bottom of the alert.
   * Data-driven: replaces children?: ReactNode.
   */
  action?: ActionConfig;
  className?: string;
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: "oq-alert--info",
  success: "oq-alert--success",
  warning: "oq-alert--warning",
  error: "oq-alert--error",
};

export function Alert({ variant = "info", title, description, action, className }: AlertProps) {
  return (
    <div role="alert" className={cn("oq-alert", VARIANT_CLASSES[variant], className)}>
      {title && <p className="oq-alert__title">{title}</p>}
      {description && <p className="oq-alert__description">{description}</p>}
      {action && (
        action.href ? (
          <a
            href={action.href}
            className={cn("oq-alert__action", action.className)}
          >
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            className={cn("oq-alert__action", action.className)}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
