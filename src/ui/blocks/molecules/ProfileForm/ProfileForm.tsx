// ProfileForm — account settings form for changing password. Calls /api/auth/update-password.
"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface ProfileFormProps {
  /** User's email address (read-only display) */
  email: string;
}

export default function ProfileForm({ email }: ProfileFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
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
      if (!res.ok) throw new Error(data.error ?? "Failed");
      toast.success("Password updated");
      setPassword("");
      setConfirm("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="oq-profile-form rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] space-y-[var(--space-6x)]">
      <div>
        <h2 className="text-[var(--text-base)] font-semibold mb-[var(--space-1x)] text-[var(--color-text)]">Account</h2>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Your account details</p>
      </div>

      <div className="space-y-[var(--space-1x)]">
        <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="flex h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text-muted)] cursor-not-allowed"
        />
      </div>

      <form onSubmit={handleChangePassword} className="space-y-[var(--space-4x)]">
        <div className="space-y-[var(--space-1x)]">
          <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="flex h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div className="space-y-[var(--space-1x)]">
          <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">Confirm new password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat password"
            className="flex h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !password}
          className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
