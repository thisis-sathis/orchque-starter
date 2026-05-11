-- ═════════════════════════════════════════════════════════════════════════════
-- 04 — Support Ticket System (OPTIONAL)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- This file creates a complete customer support ticket system with threads.
--
-- ⚠️ OPTIONAL: Only run if your app needs a built-in support system.
--
-- WHAT THIS DOES:
--   ✅ Creates support_tickets table
--   ✅ Creates support_messages table (threaded conversations)
--   ✅ Sets up Row Level Security (users only see their own tickets)
--   ✅ Creates indexes for fast queries
--   ✅ Adds triggers for automatic timestamp updates
--
-- WHAT HAPPENS AFTER RUNNING:
--   • support_tickets table appears in Table Editor
--   • support_messages table appears in Table Editor
--   • Users can create and view their own tickets
--   • Each ticket can have multiple messages (like email threads)
--   • Staff replies are marked with is_staff=true
--   • Supports file attachments (URL array)
--
-- TABLES CREATED:
--   • support_tickets (id, user_id, subject, status, priority, created_at, updated_at)
--   • support_messages (id, ticket_id, user_id, body, is_staff, attachments, created_at)
--
-- TICKET STATUSES:
--   • open — New ticket
--   • in_progress — Being worked on
--   • resolved — Fixed
--   • closed — Closed by user/staff
--   • not_resolved — Couldn't be resolved
--
-- PRIORITY LEVELS:
--   • low — Can wait
--   • normal — Standard priority (default)
--   • high — Urgent
--   • urgent — Critical issue
--
-- USE CASES:
--   ✅ In-app customer support
--   ✅ Bug reports
--   ✅ Feature requests
--   ✅ Threaded conversations (like email)
--   ✅ File/screenshot attachments
--
-- SKIP IF:
--   ❌ You'll use external support (Zendesk, Intercom, etc.)
--   ❌ Email support is sufficient
--   ❌ Your app doesn't need support ticketing
--
-- TO RUN:
--   1. Make sure 01-core-extensions.sql was run first
--   2. Go to Supabase Dashboard → SQL Editor
--   3. Create new query
--   4. Copy and paste this entire file
--   5. Click "Run"
--   6. Verify: Table Editor → support_tickets and support_messages exist
--
-- ═════════════════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SUPPORT TICKETS TABLE
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject     text        NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 200),
  status      text        NOT NULL DEFAULT 'open'
                CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'not_resolved')),
  priority    text        NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Remove old body column if upgrading from older schema (moved to support_messages)
ALTER TABLE public.support_tickets DROP COLUMN IF EXISTS body;

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS support_tickets_user_id_idx ON public.support_tickets (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON public.support_tickets (status, created_at DESC);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SUPPORT MESSAGES TABLE
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.support_messages (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id   uuid        NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  body        text        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 5000),
  is_staff    boolean     NOT NULL DEFAULT false,
  attachments text[]      DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Add attachments column if upgrading from older schema
ALTER TABLE public.support_messages ADD COLUMN IF NOT EXISTS attachments text[] DEFAULT '{}';

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS support_messages_ticket_id_idx ON public.support_messages (ticket_id, created_at ASC);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════

-- TICKETS: Users can create, read, and update their own tickets
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "support_tickets: owner all" ON public.support_tickets;
CREATE POLICY "support_tickets: owner all"
  ON public.support_tickets FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- MESSAGES: Users can read and insert messages on their own tickets
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "support_messages: owner read" ON public.support_messages;
CREATE POLICY "support_messages: owner read"
  ON public.support_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_tickets t
      WHERE t.id = support_messages.ticket_id
        AND t.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "support_messages: owner insert" ON public.support_messages;
CREATE POLICY "support_messages: owner insert"
  ON public.support_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.support_tickets t
      WHERE t.id = support_messages.ticket_id
        AND t.user_id = auth.uid()
    )
  );

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ TRIGGERS
-- ══════════════════════════════════════════════════════════════════════════════

-- Auto-update updated_at timestamp on tickets
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON public.support_tickets;
CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ═════════════════════════════════════════════════════════════════════════════
-- ✅ SUPPORT SYSTEM INSTALLED
-- ═════════════════════════════════════════════════════════════════════════════
--
-- NEXT STEPS:
--   1. Verify tables exist: Table Editor → support_tickets, support_messages
--   2. Create a test ticket:
--      INSERT INTO support_tickets (user_id, subject, priority)
--      VALUES ('your-user-id', 'Test ticket', 'normal');
--   3. Add a message to the ticket:
--      INSERT INTO support_messages (ticket_id, user_id, body)
--      VALUES ('ticket-id', 'your-user-id', 'This is my first message');
--
-- ADMIN ACCESS:
--   Staff can view/reply to all tickets using service-role key:
--   
--   import { createAdminClient } from '@/lib/supabase-admin';
--   const admin = createAdminClient();
--   
--   // Get all open tickets
--   const { data } = await admin
--     .from('support_tickets')
--     .select('*, support_messages(*)')
--     .eq('status', 'open');
--   
--   // Reply to ticket (is_staff = true)
--   await admin.from('support_messages').insert({
--     ticket_id: ticketId,
--     user_id: staffUserId,
--     body: 'We are looking into this...',
--     is_staff: true
--   });
--
-- ═════════════════════════════════════════════════════════════════════════════
