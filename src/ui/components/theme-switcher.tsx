"use client";
// ThemeSwitcher.tsx — palette-icon button that opens a dropdown listing all themes.
// • Custom scrollbar: no track, 5px thumb only, themed grey color
// • Custom theme JSON import: opens in a centred modal (not inline)
// • Dark themes toggle .dark on <html> for Tailwind dark: variants + shadcn colors
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { THEMES, applyTheme, THEME_STORAGE_KEY, ThemeDefinition } from "@/lib/themes";
import { cn } from "@/ui/lib/utils";

const CUSTOM_THEMES_KEY = "saas-custom-themes";

function loadCustomThemes(): ThemeDefinition[] {
  try {
    const raw = localStorage.getItem(CUSTOM_THEMES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomThemes(themes: ThemeDefinition[]) {
  try { localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes)); } catch {}
}

/** Apply a custom ThemeDefinition that isn't in the built-in THEMES array */
function applyCustomTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  // Clear ALL known built-in vars first
  for (const t of THEMES) {
    for (const key of Object.keys(t.vars)) root.style.removeProperty(key);
  }
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  if (theme.dark) root.classList.add("dark");
  else root.classList.remove("dark");
  root.setAttribute("data-theme", theme.id);
  try { localStorage.setItem(THEME_STORAGE_KEY, theme.id); } catch {}
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const [open, setOpen]                 = useState(false);
  const [active, setActive]             = useState("default");
  const [customThemes, setCustomThemes] = useState<ThemeDefinition[]>([]);
  const [showImport, setShowImport]     = useState(false);
  const [jsonInput, setJsonInput]       = useState("");
  const [importError, setImportError]   = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Load persisted theme + custom themes on mount
  useEffect(() => {
    const customs = loadCustomThemes();
    setCustomThemes(customs);
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        setActive(saved);
        const custom = customs.find((t) => t.id === saved);
        if (custom) applyCustomTheme(custom);
        else applyTheme(saved);
      }
    } catch {}
  }, []);

  // Close dropdown on outside click (modal is separate)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function select(id: string, custom?: ThemeDefinition) {
    if (custom) applyCustomTheme(custom);
    else applyTheme(id);
    setActive(id);
    setOpen(false);
  }

  function handleImport() {
    setImportError("");
    if (!jsonInput.trim()) {
      setImportError("Please paste a ThemeDefinition JSON first.");
      return;
    }
    try {
      const parsed: ThemeDefinition = JSON.parse(jsonInput.trim());
      if (!parsed.id || !parsed.label || !parsed.swatch || !parsed.vars) {
        setImportError("JSON must have: id, label, swatch, vars");
        return;
      }
      if (!parsed.vars["--foreground"]) {
        parsed.vars["--foreground"] = parsed.vars["--color-text"] ?? "#000000";
      }
      if (!parsed.vars["--background"]) {
        parsed.vars["--background"] = parsed.vars["--color-background"] ?? "#ffffff";
      }
      const updated = [...customThemes.filter((t) => t.id !== parsed.id), parsed];
      saveCustomThemes(updated);
      setCustomThemes(updated);
      applyCustomTheme(parsed);
      setActive(parsed.id);
      setShowImport(false);
      setJsonInput("");
      setOpen(false);
    } catch {
      setImportError("Invalid JSON — please check your input.");
    }
  }

  function deleteCustom(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const updated = customThemes.filter((t) => t.id !== id);
    saveCustomThemes(updated);
    setCustomThemes(updated);
    if (active === id) { applyTheme("default"); setActive("default"); }
  }

  const allThemes      = [...THEMES, ...customThemes];
  const activeTheme    = allThemes.find((t) => t.id === active) ?? THEMES[0];
  const lightThemes    = THEMES.filter((t) => !t.dark);
  const darkThemes     = THEMES.filter((t) => t.dark);

  // Custom scrollbar styles — no track, 5px thumb, theme grey
  const scrollStyles: React.CSSProperties = {
    overflowY: "auto",
    scrollbarWidth: "thin",          // Firefox: thin scrollbar
    scrollbarColor: "var(--color-border-strong) transparent", // Firefox: thumb track
  };

  return (
    <>
      <div ref={ref} className={cn("relative", className)}>
        {/* Trigger button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Switch theme"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
            "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]",
            "hover:border-[var(--color-primary)] hover:text-[var(--color-text)]",
            open && "border-[var(--color-primary)]"
          )}
        >
          <span
            className="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/10"
            style={{ background: activeTheme.swatch }}
            aria-hidden="true"
          />
          <span className="hidden sm:inline">{activeTheme.label}</span>
          <svg
            viewBox="0 0 12 12"
            className={cn("w-3 h-3 transition-transform shrink-0", open && "rotate-180")}
            fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={cn(
              "absolute right-0 top-full mt-2 z-[60]",
              "w-60 rounded-2xl border border-[var(--color-border)]",
              "bg-[var(--color-surface)] shadow-xl flex flex-col",
              "max-h-[min(480px,80vh)]"
            )}
          >
            {/* Sticky header */}
            <div className="px-4 py-2.5 border-b border-[var(--color-border)] shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                Theme
              </p>
            </div>

            {/* Scrollable list — custom scrollbar via inline + global style */}
            <div
              role="listbox"
              aria-label="Select theme"
              className="flex-1 theme-scroll"
              style={scrollStyles}
            >
              {/* Light */}
              <div className="p-2">
                <p className="px-3 pt-1 pb-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)]">
                  ☀ Light
                </p>
                <ul className="flex flex-col gap-0.5">
                  {lightThemes.map((theme) => (
                    <ThemeRow key={theme.id} theme={theme} active={active} onSelect={(id) => select(id)} />
                  ))}
                </ul>
              </div>

              {/* Dark */}
              <div className="p-2 border-t border-[var(--color-border)]">
                <p className="px-3 pt-1 pb-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)]">
                  ☾ Dark
                </p>
                <ul className="flex flex-col gap-0.5">
                  {darkThemes.map((theme) => (
                    <ThemeRow key={theme.id} theme={theme} active={active} onSelect={(id) => select(id)} />
                  ))}
                </ul>
              </div>

              {/* Custom */}
              {customThemes.length > 0 && (
                <div className="p-2 border-t border-[var(--color-border)]">
                  <p className="px-3 pt-1 pb-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    ✦ Custom
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {customThemes.map((theme) => (
                      <ThemeRow
                        key={theme.id}
                        theme={theme}
                        active={active}
                        onSelect={(id) => select(id, theme)}
                        onDelete={(id, e) => deleteCustom(id, e)}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 border-t border-[var(--color-border)] px-4 py-2 flex items-center justify-between gap-2">
              <p className="text-[10px] text-[var(--color-text-subtle)]">Instant preview</p>
              <button
                onClick={() => { setOpen(false); setShowImport(true); }}
                className="text-[10px] font-semibold text-[var(--color-primary)] hover:underline shrink-0"
              >
                + Import JSON
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Import modal */}
      {showImport && (
        <ImportModal
          jsonInput={jsonInput}
          onJsonChange={setJsonInput}
          error={importError}
          onApply={handleImport}
          onClose={() => { setShowImport(false); setImportError(""); setJsonInput(""); }}
        />
      )}
    </>
  );
}

// ─── ImportModal ─────────────────────────────────────────────────────────────
// Self-contained block component. Always rendered via portal into document.body.
// Rules:
//   • Clicking INSIDE the modal box → does nothing (stopPropagation on box)
//   • Clicking the backdrop OUTSIDE → calls onClose
//   • Apply Theme: validates JSON, shows inline error on failure, calls onApply on success
//     onApply is responsible for actually applying + closing only on success
//   • Cancel / ✕ buttons → always call onClose immediately
// ─────────────────────────────────────────────────────────────────────────────
interface ImportModalProps {
  jsonInput: string;
  onJsonChange: (v: string) => void;
  error: string;
  onApply: () => void;
  onClose: () => void;
}

function ImportModal({ jsonInput, onJsonChange, error, onApply, onClose }: ImportModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}               // backdrop click → close
    >
      {/* Modal box — stop propagation so clicks inside never reach backdrop */}
      <div
        className={cn(
          "w-full max-w-lg rounded-2xl border border-[var(--color-border)]",
          "bg-[var(--color-surface)] shadow-2xl flex flex-col gap-4 p-6"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-text)]">Import Theme JSON</h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Paste a <code className="font-mono">ThemeDefinition</code> JSON object to add a custom theme.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] transition-colors text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* JSON textarea — same theme-scroll scrollbar */}
        <textarea
          autoFocus
          rows={14}
          value={jsonInput}
          onChange={(e) => onJsonChange(e.target.value)}
          spellCheck={false}
          placeholder={`{
  "id": "my-theme",
  "label": "My Theme",
  "swatch": "#ff0055",
  "dark": true,
  "vars": {
    "--color-primary":        "#ff0055",
    "--color-secondary":      "#cc0044",
    "--color-accent":         "#ff6699",
    "--color-surface":        "#0a0005",
    "--color-surface-raised": "#130009",
    "--color-surface-overlay":"#1f0010",
    "--color-background":     "#000000",
    "--color-text":           "#ffffff",
    "--color-text-muted":     "#ddaacc",
    "--color-text-subtle":    "#884466",
    "--color-text-on-primary":"#000000",
    "--color-border":         "#2a0015",
    "--color-border-strong":  "#440022"
  }
}`}
          className={cn(
            "theme-scroll",
            "w-full rounded-xl border p-3 text-[12px] font-mono leading-relaxed",
            "bg-[var(--color-surface-raised)] border-[var(--color-border)]",
            "text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]",
            "focus:outline-none focus:border-[var(--color-primary)]",
            "transition-colors"
          )}
          style={{
            resize: "none",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-border-strong) transparent",
          } as React.CSSProperties}
        />

        {/* Inline error — only shown on bad input; modal stays open */}
        {error && (
          <p className="text-xs text-red-500 -mt-2">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onApply}
            className="flex-1 rounded-xl py-2 text-sm font-semibold bg-[var(--color-primary)] text-[var(--color-text-on-primary)] hover:opacity-90 transition-opacity"
          >
            Apply Theme
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl py-2 text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── ThemeRow ─────────────────────────────────────────────────────────────────
function ThemeRow({
  theme,
  active,
  onSelect,
  onDelete,
}: {
  theme: ThemeDefinition;
  active: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string, e: React.MouseEvent) => void;
}) {
  const isActive = theme.id === active;
  return (
    <li role="option" aria-selected={isActive}>
      <button
        onClick={() => onSelect(theme.id)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors",
          isActive
            ? "bg-[var(--color-primary)]/10 text-[var(--color-text)]"
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"
        )}
      >
        <span
          className="w-4 h-4 rounded-full shrink-0 ring-1 ring-black/20 shadow-sm"
          style={{ background: theme.swatch }}
          aria-hidden="true"
        />
        <span className="flex-1 text-sm font-medium">{theme.label}</span>
        {isActive && !onDelete && (
          <svg
            viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0"
            fill="none" stroke="currentColor" strokeWidth={2.5}
            style={{ color: theme.swatch }} aria-hidden="true"
          >
            <path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {onDelete && (
          <span
            role="button"
            aria-label={`Remove ${theme.label}`}
            onClick={(e) => onDelete(theme.id, e)}
            className="w-4 h-4 shrink-0 flex items-center justify-center rounded-full text-[var(--color-text-subtle)] hover:text-red-500 hover:bg-red-500/10 transition-colors text-xs leading-none"
          >
            ✕
          </span>
        )}
      </button>
    </li>
  );
}
