// CreditChip — shows user's remaining credit balance as a colored badge. Fetches from /api/credits/balance.
"use client";

import { useEffect, useState } from "react";

export default function CreditChip() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/credits/balance")
      .then((r) => r.json())
      .then((data) => setBalance(data.balance ?? 0))
      .catch(() => setBalance(null));
  }, []);

  if (balance === null) return null;

  const colorClass =
    balance === 0
      ? "bg-[var(--color-failure)]/10 text-[var(--color-failure)]"
      : balance <= 1
      ? "bg-[var(--color-warning-surface)] text-[var(--color-warning)]"
      : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]";

  return (
    <span className={`inline-flex items-center rounded-full px-[var(--space-2x)] py-0.5 text-[var(--text-xs)] font-medium ${colorClass}`}>
      {balance} credit{balance !== 1 ? "s" : ""}
    </span>
  );
}
