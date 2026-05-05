import { getServerUser, isSupabaseConfigured } from "@/lib/server-user";
import { createServerClient } from "@/lib/supabase-server";
import TicketForm from "@/ui/blocks/molecules/TicketForm/TicketForm";
import TicketList from "@/ui/blocks/molecules/TicketList/TicketList";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader/PageHeader";
import { Card } from "@/ui/components/card/Card";
import { product } from "@/lib/config";

export const metadata = { title: "Support" };

export default async function SupportPage() {
  const user = await getServerUser();

  let tickets: { id: string; subject: string; status: string; created_at: string }[] = [];

  if (user && isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      const { data } = await supabase
        .from("support_tickets")
        .select("id, subject, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      tickets = data ?? [];
    } catch {
      // Supabase unavailable — show empty list
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        title={product.support.heading}
        description={product.support.subheading}
      />

      <Card title="New ticket">
        <TicketForm />
      </Card>

      {(tickets?.length ?? 0) > 0 && (
        <Card title="Your tickets">
          <TicketList tickets={tickets ?? []} />
        </Card>
      )}
    </div>
  );
}
