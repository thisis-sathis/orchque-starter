/**
 * @orchque/ui — Core data-driven type system.
 *
 * Why: Every ReactNode prop becomes a typed config object that is:
 *   - JSON-serializable (storable in DB / config files)
 *   - AI-generatable (no JSX knowledge required)
 *   - Page-builder friendly (drag-drop editors, visual configurators)
 *
 * Usage: pass these configs to any component that previously accepted ReactNode.
 * The renderComponent() utility in render-component.tsx resolves configs to elements.
 */

// ─── Button variant / size mirrors Button.tsx cva ────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "link"
  | "outline";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

// ─── TriggerConfig ────────────────────────────────────────────────────────────
/**
 * Describes the button that opens a Dialog / Sheet / Popover / AlertDialog.
 * Replaces: trigger?: ReactNode
 */
export interface TriggerConfig {
  /** Button label text */
  label: string;
  /** Visual style. Default: "secondary" */
  variant?: ButtonVariant;
  /** Button size. Default: "md" */
  size?: ButtonSize;
  /** Lucide icon name to show alongside label */
  icon?: string;
  /** Which side the icon appears. Default: "left" */
  iconPosition?: "left" | "right";
  /** Extra Tailwind classes forwarded to the button */
  className?: string;
}

// ─── ActionConfig ─────────────────────────────────────────────────────────────
/**
 * A single CTA / footer button config.
 * Used by: Card.footer, Alert.action
 */
export interface ActionConfig {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Navigates to href (renders <a> inside button via asChild) */
  href?: string;
  /** Handler key — resolved at runtime from a handlers map you provide to the page */
  onClick?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  className?: string;
}

// ─── ComponentConfig ──────────────────────────────────────────────────────────
/**
 * JSON-serializable descriptor of any registered @orchque/ui component.
 * Replaces: children?: ReactNode / content?: ReactNode in containers.
 *
 * Example:
 *   { component: "Button", props: { label: "Get started", variant: "primary" } }
 *   { component: "Alert", props: { variant: "success", title: "Saved!" } }
 *   { component: "StatCard", props: { label: "MRR", value: "$12k" } }
 */
export interface ComponentConfig {
  /** Registered component name (key in componentRegistry) */
  component: string;
  /** Props forwarded directly to the component */
  props?: Record<string, unknown>;
  /**
   * Child slot — may be:
   *  - a string (text node)
   *  - a single ComponentConfig
   *  - an array of ComponentConfig (multiple children)
   */
  children?: ComponentConfig | ComponentConfig[] | string;
}

// ─── CellRendererType ─────────────────────────────────────────────────────────
/**
 * Built-in cell renderers for DataTable columns.
 * Replaces: render?: (row: T) => ReactNode
 */
export type CellRendererType =
  | "text"       // plain string value (default)
  | "badge"      // Badge with auto-variant from value
  | "date"       // Formats ISO date string
  | "link"       // Clickable href from row[key]
  | "avatar"     // Avatar with initials / src
  | "truncate"   // Ellipsis truncated text
  | "actions";   // ActionConfig[] rendered as button row

export interface CellRendererConfig {
  type: CellRendererType;
  /** For "badge": maps cell value → BadgeVariant */
  variantMap?: Record<string, string>;
  /** For "date": date-fns format string. Default: "MMM d, yyyy" */
  dateFormat?: string;
  /** For "link": prop name on the row object containing the href */
  hrefKey?: string;
  /** For "actions": list of action configs (onClick resolved at runtime) */
  actions?: ActionConfig[];
}

// ─── LegalSection ─────────────────────────────────────────────────────────────
/** One section of a legal page. content is plain text or HTML string. */
export interface LegalSection {
  heading: string;
  /** Plain text or HTML string (no ReactNode). Use dangerouslySetInnerHTML if HTML. */
  content: string;
}

// ─── OnboardingStepConfig ─────────────────────────────────────────────────────
/** One step in the onboarding wizard. */
export interface OnboardingStepConfig {
  id: string;
  title: string;
  description?: string;
  /** The form/UI for this step, described as a data-driven component config */
  content: ComponentConfig;
}

// ─── Hybrid slot types ────────────────────────────────────────────────────────
/**
 * A content slot that accepts EITHER:
 *   - a ComponentConfig JSON object  →  rendered via renderSlot() using the component registry
 *   - a React.ReactNode (custom JSX)  →  rendered directly as-is
 *
 * Priority: if the value is a ComponentConfig (plain object with `component: string`),
 * it is treated as data-driven; otherwise it is rendered as a ReactNode.
 *
 * @example JSON-driven:
 *   content={{ component: "StatCard", props: { label: "MRR", value: "$12k" } }}
 *
 * @example Custom JSX fallback:
 *   content={<MyCustomWidget />}
 */
export type ComponentSlot = ComponentConfig | React.ReactNode;

/**
 * A trigger slot that accepts EITHER:
 *   - a TriggerConfig JSON object  →  rendered as a Button via renderTriggerSlot()
 *   - a React.ReactNode (custom JSX)  →  used directly as the trigger element
 *
 * @example JSON-driven:
 *   trigger={{ label: "Open", variant: "secondary", icon: "Settings" }}
 *
 * @example Custom JSX fallback:
 *   trigger={<MyIconButton />}
 */
export type TriggerSlot = TriggerConfig | React.ReactNode;

// ─── Type guards ──────────────────────────────────────────────────────────────

/** Returns true if v is a plain ComponentConfig JSON object (has `component: string`). */
export function isComponentConfig(v: unknown): v is ComponentConfig {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    typeof (v as Record<string, unknown>).component === "string"
  );
}

/** Returns true if v is a plain TriggerConfig JSON object (has `label: string`, no $$typeof). */
export function isTriggerConfig(v: unknown): v is TriggerConfig {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    typeof (v as Record<string, unknown>).label === "string" &&
    !(v as Record<string, unknown>).$$typeof // exclude React elements
  );
}
