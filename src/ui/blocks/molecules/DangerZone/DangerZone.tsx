// DangerZone — account deletion card with two-step confirmation. Calls /api/account/delete.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete account");
      }
      toast.success("Account deleted");
      router.push("/");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="oq-danger-zone rounded-[var(--radius-lg)] border border-[var(--color-failure)]/40 bg-[var(--color-surface)] p-[var(--space-6x)] space-y-[var(--space-4x)]">
      <div>
        <h2 className="text-[var(--text-base)] font-semibold text-[var(--color-failure)] mb-[var(--space-1x)]">Danger zone</h2>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
          Permanently delete your account and all data. This cannot be undone.
        </p>
      </div>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] border border-[var(--color-failure)] text-[var(--color-failure)] text-[var(--text-sm)] font-medium hover:bg-[var(--color-failure)]/10 transition-colors"
        >
          Delete account
        </button>
      ) : (
        <div className="space-y-[var(--space-3x)]">
          <p className="text-[var(--text-sm)] font-medium text-[var(--color-failure)]">
            Are you absolutely sure? All your data will be deleted immediately.
          </p>
          <div className="flex gap-[var(--space-2x)]">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-failure)] text-white text-[var(--text-sm)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, delete my account"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--text-sm)] font-medium hover:bg-[var(--color-surface-raised)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
