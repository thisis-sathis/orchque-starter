// SupportPage.tsx — product support page. DashboardTemplate > PageHeader + new ticket form + ticket list.
// Data-driven: all strings come from props. Used for /dashboard/support.
import React from "react";
import { DashboardTemplate, type DashboardTemplateProps } from "@/ui/templates/DashboardTemplate";
import { PageHeader } from "@/ui/blocks/organisms/product/PageHeader";
import { Card } from "@/ui/components/card/Card";
import TicketForm from "@/ui/blocks/molecules/TicketForm/TicketForm";
import TicketList from "@/ui/blocks/molecules/TicketList/TicketList";

export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  created_at: string;
}

export interface SupportPageProps {
  /** DashboardTemplate layout config — sidebar, nav, user */
  layout: Omit<DashboardTemplateProps, "children">;
  /** Page heading — defaults to "Support" */
  heading?: string;
  /** Page subheading */
  subheading?: string;
  /** Existing tickets to show below the form. Empty = form only. */
  tickets?: SupportTicket[];
}

export function SupportPage({
  layout,
  heading = "Support",
  subheading = "Submit a ticket and we'll get back to you shortly.",
  tickets = [],
}: SupportPageProps) {
  return (
    <DashboardTemplate {...layout}>
      <div className="max-w-[42rem] space-y-[var(--space-8x)]">
        <PageHeader title={heading} description={subheading} />

        <Card title="New ticket">
          <TicketForm />
        </Card>

        {tickets.length > 0 && (
          <Card title="Your tickets">
            <TicketList tickets={tickets} />
          </Card>
        )}
      </div>
    </DashboardTemplate>
  );
}
