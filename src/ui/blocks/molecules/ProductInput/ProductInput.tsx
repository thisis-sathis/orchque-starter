// ProductInput — textarea form for the core product action. Posts to /api/action.
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PRODUCT } from "@/lib/config";

export interface ProductInputProps {
  /** Called with the result string on success, or "__insufficient_credits__" on 402 */
  onResult: (result: string) => void;
  /** Called after a successful action so parent can refresh credits */
  onCreditsChanged: () => void;
  /** Disables the form — use when user has no credits */
  disabled?: boolean;
}

export default function ProductInput({ onResult, onCreditsChanged, disabled }: ProductInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 402) {
          onResult("__insufficient_credits__");
          return;
        }
        throw new Error(data.error ?? "Action failed");
      }
      onResult(data.result ?? "Done!");
      onCreditsChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="oq-product-input space-y-[var(--space-3x)]">
      <div className="space-y-[var(--space-1x)]">
        <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">Your input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`What would you like ${PRODUCT.name} to do?`}
          rows={4}
          disabled={disabled || loading}
          className="flex w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] py-[var(--space-2x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !input.trim() || disabled}
        className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Running..." : "Run"}
      </button>
    </form>
  );
}
