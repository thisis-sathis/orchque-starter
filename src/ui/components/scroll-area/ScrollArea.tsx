// ScrollArea - custom scrollable container with styled scrollbar.
"use client";

import * as Primitive from "@radix-ui/react-scroll-area";
import { cn } from "@/ui/lib/utils";

import type { ComponentSlot } from "@/ui/lib/types";

export interface ScrollAreaProps {
  /** Body slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  height?: string;
  className?: string;
}

export function ScrollArea({ content, children, height = "300px", className }: ScrollAreaProps) {
  const { renderSlot } = require("@/ui/lib/render-component");
  const resolvedContent = renderSlot(content ?? children);
  return (
    <Primitive.Root className={cn("oq-scroll-area overflow-hidden", className)} style={{ height }}>
      <Primitive.Viewport className="h-full w-full rounded-[inherit]">
        {resolvedContent}
      </Primitive.Viewport>
      <Primitive.Scrollbar orientation="vertical" className="oq-scroll-area__scrollbar oq-scroll-area__scrollbar--vertical">
        <Primitive.Thumb className="oq-scroll-area__thumb" />
      </Primitive.Scrollbar>
      <Primitive.Scrollbar orientation="horizontal" className="oq-scroll-area__scrollbar oq-scroll-area__scrollbar--horizontal">
        <Primitive.Thumb className="oq-scroll-area__thumb" />
      </Primitive.Scrollbar>
      <Primitive.Corner />
    </Primitive.Root>
  );
}