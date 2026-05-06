"use client";
// prelaunch/page.tsx - Pre-launch waitlist page. Logic only: submit handler + config data.
import { PrelaunchPage } from "@/ui/pages/PrelaunchPage/PrelaunchPage";
import { brand, landingSections } from "@/lib/config";

const LAUNCH_DATE = "2026-08-01T00:00:00Z";
const SPOTS_LEFT = 47; // TODO: replace with real count from DB

async function handleSubmit(email: string) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Submit failed");
}

export default function PrelaunchRoute() {
  return (
    <PrelaunchPage
      brandName={brand.name}
      spotsLeft={SPOTS_LEFT}
      heading="Launching soon"
      subheading={`${brand.name} is almost ready. Get early access, founder pricing, and exclusive bonuses when we launch.`}
      launchDate={LAUNCH_DATE}
      trustItems={["Free early access tier", "Founder pricing locked in", "No credit card needed"]}
      onSubmit={handleSubmit}
      submitLabel="Get early access"
    />
  );
}