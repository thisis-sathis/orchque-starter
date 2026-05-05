import { getServerUser } from "@/lib/server-user";
import ProfileForm from "@/ui/blocks/molecules/ProfileForm/ProfileForm";
import PlanCard from "@/ui/blocks/molecules/PlanCard/PlanCard";
import DangerZone from "@/ui/blocks/molecules/DangerZone/DangerZone";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await getServerUser();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and plan</p>
      </div>

      <ProfileForm email={user?.email ?? ""} />
      <PlanCard plan="free" />
      <DangerZone />
    </div>
  );
}
