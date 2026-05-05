// TicketForm — support ticket submission form. POSTs to /api/support and redirects to ticket detail.
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TicketForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Subject and message are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      toast.success("Ticket submitted! We'll get back to you soon.");
      router.push(`/dashboard/support/${data.ticket.id}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="oq-ticket-form space-y-[var(--space-4x)]">
      <div className="space-y-[var(--space-1x)]">
        <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">Subject</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What do you need help with?"
          maxLength={120}
          className="flex h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div className="space-y-[var(--space-1x)]">
        <label className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue in detail..."
          rows={5}
          className="flex w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-3x)] py-[var(--space-2x)] text-[var(--text-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="h-9 px-[var(--space-4x)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit ticket"}
      </button>
    </form>
  );
}
