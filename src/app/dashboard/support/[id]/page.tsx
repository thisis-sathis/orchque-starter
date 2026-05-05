import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import { getServerUser, isSupabaseConfigured } from "@/lib/server-user";
import TicketDetail from "@/ui/blocks/molecules/TicketDetail/TicketDetail";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader/PageHeader";
import { Badge } from "@/ui/components/badge/Badge";
import { Button } from "@/ui/components/button/Button";
import { Icon } from "@/ui/components/icon";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Ticket" };

export default async function TicketPage({ params }: Props) {
  const { id } = await params;
  const user = await getServerUser();

  if (!user) notFound();
  if (!isSupabaseConfigured()) notFound();

  const supabase = createServerClient();

  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("id, subject, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!ticket) notFound();

  const { data: messages } = await supabase
    .from("support_messages")
    .select("id, body, is_staff, created_at")
    .eq("ticket_id", id)
    .order("created_at", { ascending: true });

  return (
    <div className="max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/support">
          <Icon name="ArrowLeft" size="sm" aria-hidden="true" />
          Back to support
        </Link>
      </Button>

      <div className="flex items-start gap-3">
        <PageHeader
          title={ticket.subject}
          description={`Ticket #${id.slice(0, 8)}`}
        />
        <Badge variant="outline" label={ticket.status} className="mt-1 capitalize" />
      </div>

      <TicketDetail
        ticket={ticket}
        messages={messages ?? []}
        currentUserId={user.id}
      />
    </div>
  );
}
