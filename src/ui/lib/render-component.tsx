"use client";
/**
 * @orchque/ui — Data-driven component rendering utilities.
 *
 * renderComponent(config)   — turns a ComponentConfig into a React element
 * renderTrigger(config)     — turns a TriggerConfig into a Button element
 * renderAction(config, handlers) — turns an ActionConfig into a Button element
 * importSpecificComponent(name) — returns the registered React component class by name
 *
 * All components used in configs must be registered in componentRegistry below.
 */

import React from "react";
import type { ComponentConfig, TriggerConfig, ActionConfig, ComponentSlot, TriggerSlot } from "./types";
import { isComponentConfig, isTriggerConfig } from "./types";

// ─── Lazy imports to avoid circular dependency issues ─────────────────────────
// We import inline inside the registry factory so tree-shaking still works.

function buildRegistry() {
  // Atoms
  const { Button } = require("@/ui/components/button");
  const { Badge } = require("@/ui/components/badge");
  const { Avatar } = require("@/ui/components/avatar");
  const { Icon } = require("@/ui/components/icon");
  const { Input } = require("@/ui/components/input");
  const { Textarea } = require("@/ui/components/textarea");
  const { Label } = require("@/ui/components/label");
  const { Checkbox } = require("@/ui/components/checkbox");
  const { Select, SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValue } = require("@/ui/components/select");
  const { Separator } = require("@/ui/components/separator");
  const { Spinner } = require("@/ui/components/spinner");
  const { Skeleton } = require("@/ui/components/skeleton");
  const { Toggle } = require("@/ui/components/toggle");
  const { Tooltip, TooltipProvider } = require("@/ui/components/tooltip");
  const { Alert } = require("@/ui/components/alert");
  const { AlertDialog } = require("@/ui/components/alert-dialog");
  const { Accordion } = require("@/ui/components/accordion");
  const { Card } = require("@/ui/components/card");
  const { Dialog } = require("@/ui/components/dialog");
  const { Sheet } = require("@/ui/components/sheet");
  const { Tabs } = require("@/ui/components/tabs");
  const { Switch } = require("@/ui/components/switch");
  const { Progress } = require("@/ui/components/progress");
  const { Popover } = require("@/ui/components/popover");
  const { RadioGroup } = require("@/ui/components/radio-group");
  const { ScrollArea } = require("@/ui/components/scroll-area");
  const { Slider } = require("@/ui/components/slider");
  const { Breadcrumb } = require("@/ui/components/breadcrumb");
  const { Pagination } = require("@/ui/components/pagination");
  const { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } = require("@/ui/components/table");
  const { Chart } = require("@/ui/components/chart");
  const { Calendar } = require("@/ui/components/calendar");
  const { DatePicker } = require("@/ui/components/date-picker");
  const { InputOTP } = require("@/ui/components/input-otp");

  // Molecules
  const { CreditChip } = require("@/ui/blocks/molecules/CreditChip");
  const { DangerZone } = require("@/ui/blocks/molecules/DangerZone");
  const { FeatureItem } = require("@/ui/blocks/molecules/FeatureItem");
  const { FormField } = require("@/ui/blocks/molecules/FormField");
  const { NavItem } = require("@/ui/blocks/molecules/NavItem");
  const { PlanCard } = require("@/ui/blocks/molecules/PlanCard");
  const { PricingCard } = require("@/ui/blocks/molecules/PricingCard");
  const { SearchBar } = require("@/ui/blocks/molecules/SearchBar");
  const { StatCard } = require("@/ui/blocks/molecules/StatCard");
  const { TestimonialCard } = require("@/ui/blocks/molecules/TestimonialCard");
  const { UpgradeGate } = require("@/ui/blocks/molecules/UpgradeGate");
  const { UserMenu } = require("@/ui/blocks/molecules/UserMenu");

  // Organisms
  const { EmptyState } = require("@/ui/blocks/organisms/product/EmptyState");
  const { StatCard: StatCardOrganism } = require("@/ui/blocks/molecules/StatCard");
  const { DataTable } = require("@/ui/blocks/organisms/product/DataTable");

  return {
    // Atoms
    Button, Badge, Avatar, Icon, Input, Textarea, Label,
    Checkbox, Select, SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValue,
    Separator, Spinner, Skeleton, Toggle, Tooltip, TooltipProvider,
    Alert, AlertDialog, Accordion, Card, Dialog, Sheet,
    Tabs, Switch, Progress, Popover, RadioGroup, ScrollArea, Slider,
    Breadcrumb, Pagination, Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
    Chart, Calendar, DatePicker, InputOTP,
    // Molecules
    CreditChip, DangerZone, FeatureItem, FormField, NavItem, PlanCard,
    PricingCard, SearchBar, StatCard, TestimonialCard, UpgradeGate, UserMenu,
    // Organisms
    EmptyState, DataTable,
  } as Record<string, React.ComponentType<Record<string, unknown>>>;
}

// Lazily built so SSR / Next.js module graph is not impacted at import time
let _registry: Record<string, React.ComponentType<Record<string, unknown>>> | null = null;

function getRegistry() {
  if (!_registry) _registry = buildRegistry();
  return _registry;
}

// ─── importSpecificComponent ──────────────────────────────────────────────────
/**
 * Returns the registered React component by name.
 *
 * @example
 *   const Comp = importSpecificComponent("Button");
 *   return <Comp label="Click me" variant="primary" />;
 */
export function importSpecificComponent(
  name: string
): React.ComponentType<Record<string, unknown>> {
  const registry = getRegistry();
  const comp = registry[name];
  if (!comp) {
    throw new Error(
      `[orchque/ui] Component "${name}" is not registered. ` +
      `Add it to the componentRegistry in render-component.tsx.`
    );
  }
  return comp;
}

// ─── renderComponent ──────────────────────────────────────────────────────────
/**
 * Turns a ComponentConfig into a React element tree.
 *
 * @example
 *   renderComponent({ component: "Alert", props: { variant: "success", title: "Done!" } })
 *   renderComponent({
 *     component: "Card",
 *     props: { title: "Overview" },
 *     children: [
 *       { component: "StatCard", props: { label: "MRR", value: "$12k" } },
 *     ],
 *   })
 */
export function renderComponent(
  config: ComponentConfig,
  key?: string | number
): React.ReactElement {
  const Comp = importSpecificComponent(config.component);

  const resolvedChildren = config.children
    ? typeof config.children === "string"
      ? config.children
      : Array.isArray(config.children)
        ? config.children.map((c, i) => renderComponent(c, i))
        : renderComponent(config.children as ComponentConfig)
    : undefined;

  return React.createElement(
    Comp,
    { ...(config.props ?? {}), key } as Record<string, unknown>,
    resolvedChildren
  );
}

// ─── renderTrigger ────────────────────────────────────────────────────────────
/**
 * Renders a Button from a TriggerConfig.
 * Used by Dialog, Sheet, Popover, AlertDialog trigger props.
 */
export function renderTrigger(config: TriggerConfig): React.ReactElement {
  const { Button } = require("@/ui/components/button");
  const { Icon } = require("@/ui/components/icon");

  const iconEl = config.icon
    ? React.createElement(Icon, { name: config.icon, size: config.size === "xs" ? "xs" : "sm", "aria-hidden": true })
    : null;

  return React.createElement(
    Button,
    {
      variant: config.variant ?? "secondary",
      size: config.size ?? "md",
      className: config.className,
    },
    config.iconPosition !== "right" && iconEl,
    config.label,
    config.iconPosition === "right" && iconEl,
  );
}

// ─── renderAction ─────────────────────────────────────────────────────────────
/**
 * Renders a Button from an ActionConfig.
 * Pass a `handlers` map to resolve onClick string keys to functions.
 *
 * @example
 *   renderAction({ label: "Save", variant: "primary", onClick: "handleSave" }, { handleSave: () => save() })
 */
export function renderAction(
  config: ActionConfig,
  handlers?: Record<string, () => void>,
  key?: string | number
): React.ReactElement {
  const { Button } = require("@/ui/components/button");
  const { Icon } = require("@/ui/components/icon");

  const onClickFn = config.onClick && handlers ? handlers[config.onClick] : undefined;

  const iconEl = config.icon
    ? React.createElement(Icon, { name: config.icon, size: "sm", "aria-hidden": true })
    : null;

  if (config.href) {
    return React.createElement(
      Button,
      {
        key,
        variant: config.variant ?? "secondary",
        size: config.size ?? "sm",
        className: config.className,
        asChild: true,
      },
      React.createElement(
        "a",
        { href: config.href },
        config.iconPosition !== "right" && iconEl,
        config.label,
        config.iconPosition === "right" && iconEl,
      )
    );
  }

  return React.createElement(
    Button,
    {
      key,
      variant: config.variant ?? "secondary",
      size: config.size ?? "sm",
      className: config.className,
      onClick: onClickFn,
    },
    config.iconPosition !== "right" && iconEl,
    config.label,
    config.iconPosition === "right" && iconEl,
  );
}

// ─── renderSlot ───────────────────────────────────────────────────────────────
/**
 * Renders a ComponentSlot — either a ComponentConfig (data-driven) or a ReactNode (custom JSX).
 *
 * Priority:
 *   1. If the value is a ComponentConfig (plain object with `component: string`) → renderComponent()
 *   2. Otherwise → return as React.ReactNode directly
 *
 * @example JSON-driven:
 *   renderSlot({ component: "Alert", props: { variant: "success", title: "Done!" } })
 *
 * @example Custom JSX fallback:
 *   renderSlot(<MyCustomWidget />)
 */
export function renderSlot(
  value: ComponentSlot,
  key?: string | number
): React.ReactNode {
  if (value === null || value === undefined) return null;
  if (isComponentConfig(value)) return renderComponent(value, key);
  // ReactNode — arrays, strings, React elements, etc.
  return value as React.ReactNode;
}

/**
 * Renders an array of ComponentSlots (each may be ComponentConfig or ReactNode).
 */
export function renderSlots(
  values: ComponentSlot[],
): React.ReactNode {
  return values.map((v, i) => renderSlot(v, i));
}

// ─── renderTriggerSlot ────────────────────────────────────────────────────────
/**
 * Renders a TriggerSlot — either a TriggerConfig (data-driven) or a ReactNode (custom JSX).
 *
 * Priority:
 *   1. If the value is a TriggerConfig (plain object with `label: string`) → renderTrigger()
 *   2. Otherwise → return as React.ReactNode (wrap your custom button in a Radix Trigger asChild)
 *
 * @example JSON-driven:
 *   renderTriggerSlot({ label: "Open", variant: "primary", icon: "Plus" })
 *
 * @example Custom JSX fallback:
 *   renderTriggerSlot(<MyIconButton aria-label="open settings" />)
 */
export function renderTriggerSlot(value: TriggerSlot): React.ReactNode {
  if (value === null || value === undefined) return null;
  if (isTriggerConfig(value)) return renderTrigger(value);
  return value as React.ReactNode;
}
