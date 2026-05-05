// DashboardPage.tsx — generic product dashboard page.
// Renders: DashboardTemplate > PageHeader + optional StatsRow + children
import React from "react";
import { DashboardTemplate, type DashboardTemplateProps } from "@/ui/templates/DashboardTemplate";
import { PageHeader, type PageHeaderProps } from "@/ui/blocks/organisms/product/PageHeader";
import { StatsRow, type StatsRowProps } from "@/ui/blocks/organisms/product/StatsRow";

export interface DashboardPageProps {
  layout: Omit<DashboardTemplateProps, "children">;
  header?: PageHeaderProps;
  stats?: StatsRowProps;
  children?: React.ReactNode;
}

export function DashboardPage({ layout, header, stats, children }: DashboardPageProps) {
  return (
    <DashboardTemplate {...layout}>
      {header && <PageHeader {...header} />}
      {stats && <StatsRow {...stats} className="mb-[var(--space-6x)]" />}
      {children}
    </DashboardTemplate>
  );
}
