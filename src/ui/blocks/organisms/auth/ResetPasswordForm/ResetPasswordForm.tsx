// ResetPasswordForm.tsx — new password entry form. POSTs to /api/auth/update-password.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";

export interface ResetPasswordFormProps {
  productName: string;
  redirectTo?: string;
  className?: string;
}

export function ResetPasswordForm({
  productName,
  redirectTo = "/dashboard",
  className,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update password.");
        return;
      }
      toast.success("Password updated! Redirecting…");
      setTimeout(() => router.push(redirectTo), 1500);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center",
        "bg-[var(--color-surface)] px-[var(--space-4x)]",
        className
      )}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-[var(--space-8x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold,700)] text-[var(--color-text)]">
            {productName}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-[var(--space-1x)] text-[var(--text-sm)]">
            Choose a new password
          </p>
        </div>

        <div
          className={cn(
            "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
            "bg-[var(--color-surface-raised)] p-[var(--space-6x)]",
            "shadow-[var(--shadow-sm)]"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>
            <div className="flex flex-col gap-[var(--space-1x)]">
              <label htmlFor="reset-password" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                New password
              </label>
              <input
                id="reset-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className="oq-auth-input"
              />
            </div>

            <div className="flex flex-col gap-[var(--space-1x)]">
              <label htmlFor="reset-confirm" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                Confirm password
              </label>
              <input
                id="reset-confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your new password"
                required
                autoComplete="new-password"
                className="oq-auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="oq-auth-btn-primary"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
