// Tabs — horizontally tabbed content sections for dashboards and settings.
"use client";

import * as Primitive from "@radix-ui/react-tabs";
import { cn } from "@/ui/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultValue, value, onValueChange, className }: TabsProps) {
  const defaultTab = defaultValue ?? tabs[0]?.value;
  return (
    <Primitive.Root
      defaultValue={defaultTab}
      value={value}
      onValueChange={onValueChange}
      className={cn("oq-tabs", className)}
    >
      <Primitive.List className="oq-tabs__list">
        {tabs.map((tab) => (
          <Primitive.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="oq-tabs__trigger"
          >
            {tab.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      {tabs.map((tab) => (
        <Primitive.Content key={tab.value} value={tab.value} className="oq-tabs__content">
          {tab.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
}
