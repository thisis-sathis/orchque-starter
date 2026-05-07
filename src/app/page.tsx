import { LandingRenderer } from "@/ui/LandingRenderer";
import { landingSections } from "@/lib/config";

export default function HomePage() {
  return <LandingRenderer config={landingSections} />;
}