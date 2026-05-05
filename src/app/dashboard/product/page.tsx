"use client";

import { useState, useCallback } from "react";
import ProductInput from "@/ui/blocks/molecules/ProductInput/ProductInput";
import ProductResult from "@/ui/blocks/molecules/ProductResult/ProductResult";
import UpgradeGate from "@/ui/blocks/molecules/UpgradeGate/UpgradeGate";
import CreditChip from "@/ui/blocks/molecules/CreditChip/CreditChip";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader/PageHeader";
import { Card } from "@/ui/components/card/Card";
import { product } from "@/lib/config";

export default function ProductPage() {
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
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title={product.dashboard.heading} description={product.dashboard.subheading} />
        <CreditChip key={refreshKey} />
      </div>

      {outOfCredits ? (
        <UpgradeGate />
      ) : (
        <Card className="p-6 space-y-5">
          <ProductInput
            onResult={handleResult}
            onCreditsChanged={handleCreditsChanged}
          />
          {result && <ProductResult result={result} />}
        </Card>
      )}
    </div>
  );
}
