// TicketDetail — shows thread of messages for a support ticket with reply form.
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

export interface Message {
  id: string;
  body: string;
  is_staff: boolean;
  created_at: string;
}

export interface TicketDetailProps {
  ticket: { id: string; subject: string; status: string };
  messages: Message[];
  /** Current user's id — used to differentiate staff vs user messages */
  currentUserId: string;
}

export default function TicketDetail({ ticket, messages: initial, currentUserId }: TicketDetailProps) {
  const [messages, setMessages] = useState(initial);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/support/${ticket.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: reply }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setMessages((prev) => [...prev, data.message]);
      setReply("");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="oq-ticket-detail space-y-[var(--space-6x)]">
      {/* Message thread */}
      <div className="space-y-[var(--space-3x)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-[var(--radius-md)] p-[var(--space-4x)] text-[var(--text-sm)] ${
              msg.is_staff
                ? "bg-[var(--color-surface-raised)] border border-[var(--color-border)]"
                : "bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20"
            }`}
          >
            <div className="flex items-center justify-between mb-[var(--space-1x)]">
              <span className="text-[var(--text-xs)] font-medium text-[var(--color-text)]">
                {msg.is_staff ? "Support team" : "You"}
              </span>
              <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-[var(--color-text)]">{msg.body}</p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      {ticket.status !== "closed" && (
        <form onSubmit={handleReply} className="space-y-[var(--space-3x)]">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
            className="flex w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] py-[var(--space-2x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
          />
          <button
            type="submit"
            disabled={loading || !reply.trim()}
            className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reply"}
          </button>
        </form>
      )}

      {ticket.status === "closed" && (
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] text-center py-[var(--space-4x)]">
          This ticket is closed.
        </p>
      )}
    </div>
  );
}
