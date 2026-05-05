import { getServerUser } from "@/lib/server-user";
import { EmptyState } from "@/ui/blocks/organisms/product/EmptyState/EmptyState";
import CreditChip from "@/ui/blocks/molecules/CreditChip/CreditChip";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader/PageHeader";
import { StatsRow } from "@/ui/blocks/organisms/product/StatsRow/StatsRow";
import type { IconName } from "@/ui/components/icon";
import { brand, product } from "@/lib/config";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getServerUser();

  const stats = [
    { label: "Plan", value: "Free", description: `${product.billing.plans.free.actions} ${product.billing.plans.free.actionLabel}/month` },
    { label: "Actions this month", value: "0" },
    { label: "Account", value: user?.email ?? "—" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title={product.dashboard.heading}
          description={`${product.dashboard.subheading}${user?.email ? `, ${user.email.split("@")[0]}` : ""}`}
        />
        <CreditChip />
      </div>

      <StatsRow stats={stats} className="mb-8" />

      <EmptyState
        icon={product.dashboard.emptyState.icon as IconName}
        heading={`Ready to use ${brand.name}`}
        description={product.dashboard.emptyState.description}
        action={product.dashboard.emptyState.action}
      />
    </div>
  );
}
