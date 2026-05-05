import { getServerUser } from "@/lib/server-user";
import { StatCard } from "@/ui/blocks/molecules/StatCard/StatCard";
import { EmptyState } from "@/ui/blocks/organisms/product/EmptyState/EmptyState";
import CreditChip from "@/ui/blocks/molecules/CreditChip/CreditChip";
import { PRODUCT } from "@/lib/config";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getServerUser();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </p>
        </div>
        <CreditChip />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Plan"
          value="Free"
          description={`${PRODUCT.pricing.free.actions} ${PRODUCT.pricing.free.actionLabel}/month`}
        />
        <StatCard label="Actions this month" value="0" />
        <StatCard label="Account" value={user?.email ?? "—"} />
      </div>

      <EmptyState
        icon="Zap"
        heading={`Ready to use ${PRODUCT.name}`}
        description={`Head over to the Product tab to get started. You have ${PRODUCT.pricing.free.actions} free ${PRODUCT.pricing.free.actionLabel} this month.`}
        action={{ label: "Go to Product", href: "/dashboard/product" }}
      />
    </div>
  );
}
