// themes.ts — All landing page colour themes.
// Each theme maps CSS variable names → values.
// The ThemeSwitcher component applies these to :root via style properties.
//
// IMPORTANT: Each theme must set BOTH:
//   --color-* (Orchque token system, used by text-[var(--color-text)] etc.)
//   --foreground / --background (shadcn system, used by body { text-foreground bg-background })
// Dark themes also set `dark: true` so applyTheme() toggles the .dark class on <html>.

export interface ThemeDefinition {
  id: string;
  label: string;
  /** Hex used to render the swatch circle in the picker */
  swatch: string;
  /** If true, applyTheme() adds .dark to <html> so Tailwind dark: variants activate */
  dark?: boolean;
  /** CSS variable overrides written to document.documentElement.style */
  vars: Record<string, string>;
}

export const THEMES: ThemeDefinition[] = [
  // ─── Light themes ──────────────────────────────────────────────────────────
  {
    id: "default",
    label: "Default",
    swatch: "#4285F4",
    vars: {
      // Orchque tokens
      "--color-primary":           "#4285F4",
      "--color-secondary":         "#34A853",
      "--color-accent":            "#7C4DFF",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#f8f9fa",
      "--color-surface-overlay":   "#f1f3f4",
      "--color-background":        "#f8f9fa",
      "--color-text":              "#202124",
      "--color-text-muted":        "#5f6368",
      "--color-text-subtle":       "#80868b",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#e8eaed",
      "--color-border-strong":     "#dadce0",
      // shadcn/Tailwind base vars (body text-foreground bg-background)
      "--background":              "#f8f9fa",
      "--foreground":              "#202124",
    },
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "#10b981",
    vars: {
      "--color-primary":           "#10b981",
      "--color-secondary":         "#059669",
      "--color-accent":            "#3b82f6",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#f0fdf4",
      "--color-surface-overlay":   "#dcfce7",
      "--color-background":        "#f0fdf4",
      "--color-text":              "#064e3b",
      "--color-text-muted":        "#047857",
      "--color-text-subtle":       "#6ee7b7",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#a7f3d0",
      "--color-border-strong":     "#6ee7b7",
      "--background":              "#f0fdf4",
      "--foreground":              "#064e3b",
    },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "#f43f5e",
    vars: {
      "--color-primary":           "#f43f5e",
      "--color-secondary":         "#e11d48",
      "--color-accent":            "#f97316",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#fff1f2",
      "--color-surface-overlay":   "#ffe4e6",
      "--color-background":        "#fff1f2",
      "--color-text":              "#881337",
      "--color-text-muted":        "#be123c",
      "--color-text-subtle":       "#fda4af",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#fecdd3",
      "--color-border-strong":     "#fda4af",
      "--background":              "#fff1f2",
      "--foreground":              "#881337",
    },
  },
  {
    id: "amber",
    label: "Amber",
    swatch: "#f59e0b",
    vars: {
      "--color-primary":           "#f59e0b",
      "--color-secondary":         "#d97706",
      "--color-accent":            "#ef4444",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#fffbeb",
      "--color-surface-overlay":   "#fef3c7",
      "--color-background":        "#fffbeb",
      "--color-text":              "#78350f",
      "--color-text-muted":        "#b45309",
      "--color-text-subtle":       "#fcd34d",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#fde68a",
      "--color-border-strong":     "#fcd34d",
      "--background":              "#fffbeb",
      "--foreground":              "#78350f",
    },
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "#7c3aed",
    vars: {
      "--color-primary":           "#7c3aed",
      "--color-secondary":         "#6d28d9",
      "--color-accent":            "#ec4899",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#f5f3ff",
      "--color-surface-overlay":   "#ede9fe",
      "--color-background":        "#f5f3ff",
      "--color-text":              "#2e1065",
      "--color-text-muted":        "#5b21b6",
      "--color-text-subtle":       "#c4b5fd",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#ddd6fe",
      "--color-border-strong":     "#c4b5fd",
      "--background":              "#f5f3ff",
      "--foreground":              "#2e1065",
    },
  },
  {
    id: "ocean",
    label: "Ocean",
    swatch: "#0ea5e9",
    vars: {
      "--color-primary":           "#0ea5e9",
      "--color-secondary":         "#0284c7",
      "--color-accent":            "#6366f1",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#f0f9ff",
      "--color-surface-overlay":   "#e0f2fe",
      "--color-background":        "#f0f9ff",
      "--color-text":              "#0c4a6e",
      "--color-text-muted":        "#0369a1",
      "--color-text-subtle":       "#7dd3fc",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#bae6fd",
      "--color-border-strong":     "#7dd3fc",
      "--background":              "#f0f9ff",
      "--foreground":              "#0c4a6e",
    },
  },
  {
    id: "slate",
    label: "Slate",
    swatch: "#475569",
    vars: {
      "--color-primary":           "#475569",
      "--color-secondary":         "#334155",
      "--color-accent":            "#64748b",
      "--color-surface":           "#ffffff",
      "--color-surface-raised":    "#f8fafc",
      "--color-surface-overlay":   "#f1f5f9",
      "--color-background":        "#f8fafc",
      "--color-text":              "#0f172a",
      "--color-text-muted":        "#475569",
      "--color-text-subtle":       "#94a3b8",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#e2e8f0",
      "--color-border-strong":     "#cbd5e1",
      "--background":              "#f8fafc",
      "--foreground":              "#0f172a",
    },
  },
  // ─── Dark themes ───────────────────────────────────────────────────────────
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#818cf8",
    dark: true,
    vars: {
      "--color-primary":           "#818cf8",
      "--color-secondary":         "#a78bfa",
      "--color-accent":            "#22d3ee",
      "--color-surface":           "#0f172a",
      "--color-surface-raised":    "#1e293b",
      "--color-surface-overlay":   "#334155",
      "--color-background":        "#020617",
      "--color-text":              "#f1f5f9",
      "--color-text-muted":        "#94a3b8",
      "--color-text-subtle":       "#64748b",
      "--color-text-on-primary":   "#ffffff",
      "--color-border":            "#1e293b",
      "--color-border-strong":     "#334155",
      "--background":              "#020617",
      "--foreground":              "#f1f5f9",
    },
  },
  {
    id: "noir",
    label: "Noir",
    swatch: "#e2e8f0",
    dark: true,
    vars: {
      "--color-primary":           "#e2e8f0",
      "--color-secondary":         "#cbd5e1",
      "--color-accent":            "#f43f5e",
      "--color-surface":           "#09090b",
      "--color-surface-raised":    "#18181b",
      "--color-surface-overlay":   "#27272a",
      "--color-background":        "#000000",
      "--color-text":              "#fafafa",
      "--color-text-muted":        "#a1a1aa",
      "--color-text-subtle":       "#52525b",
      "--color-text-on-primary":   "#000000",
      "--color-border":            "#27272a",
      "--color-border-strong":     "#3f3f46",
      "--background":              "#000000",
      "--foreground":              "#fafafa",
    },
  },
  {
    id: "pure-black",
    label: "Pure Black",
    swatch: "#ffffff",
    dark: true,
    vars: {
      "--color-primary":           "#ffffff",
      "--color-secondary":         "#d4d4d4",
      "--color-accent":            "#a3a3a3",
      "--color-surface":           "#000000",
      "--color-surface-raised":    "#0a0a0a",
      "--color-surface-overlay":   "#141414",
      "--color-background":        "#000000",
      "--color-text":              "#ffffff",
      "--color-text-muted":        "#d4d4d4",
      "--color-text-subtle":       "#737373",
      "--color-text-on-primary":   "#000000",
      "--color-border":            "#1f1f1f",
      "--color-border-strong":     "#2e2e2e",
      "--background":              "#000000",
      "--foreground":              "#ffffff",
    },
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    swatch: "#f0ff00",
    dark: true,
    vars: {
      "--color-primary":           "#f0ff00",
      "--color-secondary":         "#00ffcc",
      "--color-accent":            "#ff00aa",
      "--color-surface":           "#0a0a1a",
      "--color-surface-raised":    "#0f0f2a",
      "--color-surface-overlay":   "#1a1a3a",
      "--color-background":        "#050510",
      "--color-text":              "#e8e8ff",
      "--color-text-muted":        "#9898cc",
      "--color-text-subtle":       "#5555aa",
      "--color-text-on-primary":   "#050510",
      "--color-border":            "#2a2a5a",
      "--color-border-strong":     "#4444aa",
      "--background":              "#050510",
      "--foreground":              "#e8e8ff",
    },
  },
  {
    id: "forest",
    label: "Forest",
    swatch: "#4ade80",
    dark: true,
    vars: {
      "--color-primary":           "#4ade80",
      "--color-secondary":         "#22c55e",
      "--color-accent":            "#facc15",
      "--color-surface":           "#0a1a0f",
      "--color-surface-raised":    "#0f2a18",
      "--color-surface-overlay":   "#1a3a25",
      "--color-background":        "#050d08",
      "--color-text":              "#e8fdf0",
      "--color-text-muted":        "#86efac",
      "--color-text-subtle":       "#4ade80",
      "--color-text-on-primary":   "#050d08",
      "--color-border":            "#1a3a25",
      "--color-border-strong":     "#2d6a3f",
      "--background":              "#050d08",
      "--foreground":              "#e8fdf0",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    swatch: "#c084fc",
    dark: true,
    vars: {
      "--color-primary":           "#c084fc",
      "--color-secondary":         "#818cf8",
      "--color-accent":            "#34d399",
      "--color-surface":           "#0e0e1f",
      "--color-surface-raised":    "#161630",
      "--color-surface-overlay":   "#1e1e40",
      "--color-background":        "#07071a",
      "--color-text":              "#f0eeff",
      "--color-text-muted":        "#a78bfa",
      "--color-text-subtle":       "#6d5acd",
      "--color-text-on-primary":   "#07071a",
      "--color-border":            "#2a2a5a",
      "--color-border-strong":     "#4a3a7a",
      "--background":              "#07071a",
      "--foreground":              "#f0eeff",
    },
  },
  {
    id: "dusk",
    label: "Dusk",
    swatch: "#fb923c",
    dark: true,
    vars: {
      "--color-primary":           "#fb923c",
      "--color-secondary":         "#f97316",
      "--color-accent":            "#fbbf24",
      "--color-surface":           "#1c0f07",
      "--color-surface-raised":    "#2d1a0a",
      "--color-surface-overlay":   "#3d2510",
      "--color-background":        "#0e0804",
      "--color-text":              "#fff7ed",
      "--color-text-muted":        "#fdba74",
      "--color-text-subtle":       "#c2410c",
      "--color-text-on-primary":   "#0e0804",
      "--color-border":            "#3d2510",
      "--color-border-strong":     "#7c3a10",
      "--background":              "#0e0804",
      "--foreground":              "#fff7ed",
    },
  },
];

export const THEME_STORAGE_KEY = "saas-theme";

export function getTheme(id: string): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** Apply a theme by writing CSS vars to :root inline styles */
export function applyTheme(id: string) {
  const theme = getTheme(id);
  const root = document.documentElement;

  // Clear previously set vars from ALL themes (prevents stale overrides)
  for (const t of THEMES) {
    for (const key of Object.keys(t.vars)) {
      root.style.removeProperty(key);
    }
  }

  // Apply new theme vars (includes --background, --foreground, and all --color-*)
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }

  // Toggle .dark class so Tailwind dark: variants and shadcn .dark styles activate
  if (theme.dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  root.setAttribute("data-theme", id);
  try { localStorage.setItem(THEME_STORAGE_KEY, id); } catch {}
}
