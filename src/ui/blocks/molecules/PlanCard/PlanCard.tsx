// PlanCard — displays user's current plan, credits remaining, and upgrade CTA.
import { PRODUCT } from "@/lib/config";
import { CreditChip } from "@/ui/blocks/molecules/CreditChip";

export interface PlanCardProps {
  /** Current user plan */
  plan: "free" | "pro";
}

export default function PlanCard({ plan }: PlanCardProps) {
  const planConfig = PRODUCT.pricing[plan];

  return (
    <div className="oq-plan-card rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] space-y-[var(--space-4x)]">
      <div>
        <h2 className="text-[var(--text-base)] font-semibold mb-[var(--space-1x)] text-[var(--color-text)]">Your plan</h2>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Current plan and usage</p>
      </div>

      <div className="flex items-center gap-[var(--space-3x)]">
        <span className="text-[var(--text-xl)] font-bold text-[var(--color-text)]">{planConfig.name}</span>
        <span className="rounded-full border border-[var(--color-border)] px-[var(--space-2x)] py-0.5 text-[var(--text-xs)] font-medium text-[var(--color-text-muted)]">
          {plan === "free" ? "Free" : `$${planConfig.price}/mo`}
        </span>
      </div>

      <div className="flex items-center gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
        Credits remaining: <CreditChip />
      </div>

      {plan === "free" && (
        <div>
          <button
            disabled
            title="Coming soon"
            className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium opacity-50 cursor-not-allowed"
          >
            Upgrade to Pro — ${PRODUCT.pricing.pro.price}/mo
          </button>
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-2x)]">Payments coming soon.</p>
        </div>
      )}
    </div>
  );
}
