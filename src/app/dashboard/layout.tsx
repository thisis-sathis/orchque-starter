import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-user";
import { DashboardTemplate } from "@/ui/templates/DashboardTemplate/DashboardTemplate";
import type { SidebarSection } from "@/ui/blocks/organisms/product/Sidebar/Sidebar";
import { brand, product } from "@/lib/config";
import type { IconName } from "@/ui/components/icon";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const navSections: SidebarSection[] = product.nav.sections.map((s) => ({
    items: s.items.map((item) => ({ ...item, icon: item.icon as IconName })),
  }));

  return (
    <DashboardTemplate
      sidebar={{
        sections: navSections,
        logoText: brand.name,
        user: { name: user!.email?.split("@")[0] ?? "User", email: user!.email },
      }}
    >
      {children}
    </DashboardTemplate>
  );
}
