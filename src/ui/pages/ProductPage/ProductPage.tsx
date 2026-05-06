// ProductPage.tsx — core product feature page. DashboardTemplate > PageHeader + CreditChip + feature form/result.
// Data-driven: all strings from props. This is the main "do the thing" page for AI/tool products.
"use client";
import React, { useState, useCallback } from "react";
import { DashboardTemplate, type DashboardTemplateProps } from "@/ui/templates/DashboardTemplate";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader";
import { Card } from "@/ui/components/card/Card";
import CreditChip from "@/ui/blocks/molecules/CreditChip/CreditChip";
import ProductInput from "@/ui/blocks/molecules/ProductInput/ProductInput";
import ProductResult from "@/ui/blocks/molecules/ProductResult/ProductResult";
import UpgradeGate from "@/ui/blocks/molecules/UpgradeGate/UpgradeGate";

export interface ProductPageProps {
  /** DashboardTemplate layout config — sidebar, nav, user */
  layout: Omit<DashboardTemplateProps, "children">;
  /** Page heading — e.g. "Generate Copy" */
  heading?: string;
  /** Page subheading — e.g. "Describe what you need" */
  subheading?: string;
}

export function ProductPage({
  layout,
  heading = "Get started",
  subheading = "Describe what you need and we'll take care of the rest.",
}: ProductPageProps) {
  const [result, setResult] = useState<string | null>(null);
  const [outOfCredits, setOutOfCredits] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResult = useCallback((res: string) => {
    if (res === "__insufficient_credits__") {
      setOutOfCredits(true);
    } else {
      setResult(res);
    }
  }, []);

  const handleCreditsChanged = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <DashboardTemplate {...layout}>
      <div className="max-w-[42rem] space-y-[var(--space-6x)]">
        <div className="flex items-center justify-between gap-[var(--space-4x)]">
          <PageHeader title={heading} description={subheading} />
          <CreditChip key={refreshKey} />
        </div>

        {outOfCredits ? (
          <UpgradeGate />
        ) : (
          <Card className="p-[var(--space-6x)] space-y-[var(--space-5x)]">
            <ProductInput onResult={handleResult} onCreditsChanged={handleCreditsChanged} />
            {result && <ProductResult result={result} />}
          </Card>
        )}
      </div>
    </DashboardTemplate>
  );
}
