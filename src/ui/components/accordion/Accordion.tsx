// Accordion — expandable sections for FAQs, settings groups, and nested content.
"use client";

import * as Primitive from "@radix-ui/react-accordion";
import { cn } from "@/ui/lib/utils";

export interface AccordionItem {
  value: string;
  trigger: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}

export function Accordion({ items, type = "single", defaultValue, className }: AccordionProps) {
  return (
    <Primitive.Root
      type={type as "single"}
      defaultValue={defaultValue}
      collapsible={type === "single" ? true : undefined}
      className={cn("oq-accordion", className)}
    >
      {items.map((item) => (
        <Primitive.Item key={item.value} value={item.value} className="oq-accordion__item">
          <Primitive.Header>
            <Primitive.Trigger className="oq-accordion__trigger">
              <span>{item.trigger}</span>
              <span className="oq-accordion__chevron" aria-hidden>▾</span>
            </Primitive.Trigger>
          </Primitive.Header>
          <Primitive.Content className="oq-accordion__content">
            <div className="oq-accordion__body">{item.content}</div>
          </Primitive.Content>
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
