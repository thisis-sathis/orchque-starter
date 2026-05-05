// FAQBlock.tsx — accordion FAQ section organism. Uses Radix Accordion.
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlockProps {
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQBlock({ heading, subheading, items, className }: FAQBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--space-6x)] py-[var(--space-12x)]",
        "bg-[var(--landing-section-alt-bg,var(--color-surface-raised))]",
        className
      )}
      aria-labelledby={heading ? "faq-heading" : undefined}
    >
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-3x)]">
            {heading && (
              <h2 id="faq-heading" className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-[var(--space-2x)]">
          {items.map((item, i) => (
            <AccordionPrimitive.Item
              key={i}
              value={String(i)}
              className="border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden"
            >
              <AccordionPrimitive.Header asChild>
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex w-full items-center justify-between",
                    "px-[var(--space-4x)] py-[var(--space-4x)]",
                    "text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-text)]",
                    "bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)]",
                    "transition-colors duration-150 text-left",
                    "[&[data-state=open]>svg]:rotate-180"
                  )}
                >
                  {item.question}
                  <Icon
                    name="ChevronDown"
                    size="sm"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-200"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content
                className={cn(
                  "overflow-hidden bg-[var(--color-surface)]",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:slide-up data-[state=open]:slide-down"
                )}
              >
                <p className="px-[var(--space-4x)] pb-[var(--space-4x)] text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {item.answer}
                </p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
