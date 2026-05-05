// UpgradeGate — shown when user has exhausted credits. Prompts to upgrade to Pro.
import { PRODUCT } from "@/lib/config";

export default function UpgradeGate() {
  return (
    <div className="oq-upgrade-gate rounded-[var(--radius-xl)] border-2 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-[var(--space-8x)] text-center">
      <div className="text-3xl mb-[var(--space-3x)]">⚡</div>
      <h3 className="text-[var(--text-base)] font-semibold mb-[var(--space-1x)] text-[var(--color-text)]">
        You've used all your credits
      </h3>
      <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[var(--space-4x)] max-w-xs mx-auto">
        Free plan includes {PRODUCT.pricing.free.actions} {PRODUCT.pricing.free.actionLabel} per month.
        Upgrade to Pro for unlimited access.
      </p>
      <button
        disabled
        title="Coming soon"
        className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium opacity-50 cursor-not-allowed"
      >
        Upgrade to Pro — ${PRODUCT.pricing.pro.price}/mo
      </button>
      <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-2x)]">
        Credits reset on the 1st of each month.
      </p>
    </div>
  );
}
