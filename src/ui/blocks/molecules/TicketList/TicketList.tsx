// TicketList — renders a list of support tickets with status badges. Links to ticket detail.
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export interface Ticket {
  id: string;
  subject: string;
  status: string;
  created_at: string;
}

export interface TicketListProps {
  tickets: Ticket[];
}

const STATUS_STYLES: Record<string, string> = {
  open: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  pending: "bg-[var(--color-warning-surface)] text-[var(--color-warning)]",
  closed: "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]",
};

export default function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] py-[var(--space-6x)] text-center">
        No support tickets yet. Create one above.
      </p>
    );
  }

  return (
    <div className="oq-ticket-list space-y-[var(--space-2x)]">
      {tickets.map((ticket) => (
        <Link
          key={ticket.id}
          href={`/dashboard/support/${ticket.id}`}
          className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4x)] py-[var(--space-3x)] hover:bg-[var(--color-surface-raised)] transition-colors"
        >
          <div className="min-w-0">
            <p className="text-[var(--text-sm)] font-medium truncate text-[var(--color-text)]">{ticket.subject}</p>
            <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-0.5">
              {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
            </p>
          </div>
          <span className={`ml-[var(--space-4x)] shrink-0 rounded-full px-[var(--space-2x)] py-0.5 text-[var(--text-xs)] font-medium ${STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open}`}>
            {ticket.status}
          </span>
        </Link>
      ))}
    </div>
  );
}
