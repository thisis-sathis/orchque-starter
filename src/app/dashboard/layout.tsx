import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-user";
import { Sidebar } from "@/ui/blocks/organisms/product/Sidebar/Sidebar";
import { MobileSidebar } from "@/ui/blocks/organisms/product/MobileSidebar/MobileSidebar";
import { PRODUCT } from "@/lib/config";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" as const },
  { label: "Product", href: "/dashboard/product", icon: "Zap" as const },
  { label: "Support", href: "/dashboard/support", icon: "MessageSquare" as const },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" as const },
];

const NAV_SECTIONS = [{ items: NAV_ITEMS }];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sections={NAV_SECTIONS}
        logoText={PRODUCT.name}
        user={{ name: user.email?.split("@")[0] ?? "User", email: user.email }}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileSidebar logoText={PRODUCT.name} items={NAV_ITEMS} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
