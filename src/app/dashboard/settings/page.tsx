import { getServerUser } from "@/lib/server-user";
import ProfileForm from "@/ui/blocks/molecules/ProfileForm/ProfileForm";
import PlanCard from "@/ui/blocks/molecules/PlanCard/PlanCard";
import DangerZone from "@/ui/blocks/molecules/DangerZone/DangerZone";
import { SettingsTemplate } from "@/ui/templates/SettingsTemplate/SettingsTemplate";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader/PageHeader";
import { product } from "@/lib/config";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await getServerUser();

  return (
    <SettingsTemplate
      title={product.settings.heading}
      navItems={product.settings.sections.map((s) => ({ label: s.label, href: s.href }))}
    >
      <div className="space-y-6">
        <PageHeader
          title={product.settings.heading}
          description="Manage your account and plan"
        />
        <ProfileForm email={user?.email ?? ""} />
        <PlanCard plan="free" />
        <DangerZone />
      </div>
    </SettingsTemplate>
  );
}
