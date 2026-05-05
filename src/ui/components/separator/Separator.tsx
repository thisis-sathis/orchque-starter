// Separator.tsx — horizontal or vertical divider atom. Uses --color-border token.
import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/ui/lib/utils";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "bg-[var(--color-border)] shrink-0",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    {...props}
  />
));

Separator.displayName = "Separator";
