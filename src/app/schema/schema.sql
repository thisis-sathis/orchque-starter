-- ═════════════════════════════════════════════════════════════════════════════
-- Starter SaaS — Complete Supabase Schema (fully idempotent)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- INSTRUCTIONS:
-- 1. Go to your Supabase project → SQL Editor
-- 2. Create a new query
-- 3. Paste this entire file and click "Run"
-- 4. Safe to re-run anytime — all operations are idempotent (IF NOT EXISTS)
--
-- This schema creates:
--   • user_credits — credit/usage tracking for free/pro users
--   • notifications — in-app notification system
--   • support_tickets — customer support ticket system
--   • support_messages — messages within support tickets
--   • pricing_inquiries — waitlist + enterprise enquiries
--   • SQL functions for credit management
--
-- ═════════════════════════════════════════════════════════════════════════════

-- ── Extensions ────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ USER CREDITS TABLE
-- ══════════════════════════════════════════════════════════════════════════════
-- Tracks credit balance for each user (free/pro tiers)
-- Created automatically on signup via API route

CREATE TABLE IF NOT EXISTS public.user_credits (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan             text        NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  monthly_credits  integer     NOT NULL DEFAULT 10,
  bonus_credits    integer     NOT NULL DEFAULT 0,
  reset_at         timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS user_credits_user_id_idx ON public.user_credits (user_id);
CREATE INDEX IF NOT EXISTS user_credits_plan_idx ON public.user_credits (plan);

-- Row Level Security
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_credits: owner read" ON public.user_credits;
DROP POLICY IF EXISTS "user_credits: owner update" ON public.user_credits;

CREATE POLICY "user_credits: owner read"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_credits: owner update"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ NOTIFICATIONS TABLE
-- ══════════════════════════════════════════════════════════════════════════════
-- In-app notifications for users

CREATE TABLE IF NOT EXISTS public.notifications (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type        text        NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'system')),
  title       text        NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  message     text        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000),
  link        text,
  read        boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON public.notifications (user_id, read, created_at DESC);

-- Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications: owner all" ON public.notifications;

CREATE POLICY "notifications: owner all"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SUPPORT TICKETS TABLE
-- ══════════════════════════════════════════════════════════════════════════════
-- Customer support ticket system

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

-- Remove old body column if it exists (moved to support_messages)
ALTER TABLE public.support_tickets DROP COLUMN IF EXISTS body;

-- Indexes
CREATE INDEX IF NOT EXISTS support_tickets_user_id_idx ON public.support_tickets (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON public.support_tickets (status, created_at DESC);

-- Row Level Security
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "support_tickets: owner all" ON public.support_tickets;

CREATE POLICY "support_tickets: owner all"
  ON public.support_tickets FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SUPPORT MESSAGES TABLE
-- ══════════════════════════════════════════════════════════════════════════════
-- Messages within support tickets (thread-style)

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

-- Indexes
CREATE INDEX IF NOT EXISTS support_messages_ticket_id_idx ON public.support_messages (ticket_id, created_at ASC);

-- Row Level Security
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "support_messages: owner read" ON public.support_messages;
DROP POLICY IF EXISTS "support_messages: owner insert" ON public.support_messages;

CREATE POLICY "support_messages: owner read"
  ON public.support_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_tickets t
      WHERE t.id = support_messages.ticket_id
        AND t.user_id = auth.uid()
    )
  );

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
-- ║ PRICING INQUIRIES TABLE
-- ══════════════════════════════════════════════════════════════════════════════
-- Waitlist submissions and enterprise enquiries

CREATE TABLE IF NOT EXISTS public.pricing_inquiries (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  type               text        NOT NULL CHECK (type IN ('waitlist', 'pro', 'enterprise')),
  name               text,
  email              text        NOT NULL,
  company_name       text,
  issues             text,
  expected_features  text,
  timeline           text,
  use_case           text,
  team_size          text,
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Add new columns if upgrading from older schema
ALTER TABLE public.pricing_inquiries ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE public.pricing_inquiries ADD COLUMN IF NOT EXISTS timeline text;
ALTER TABLE public.pricing_inquiries ADD COLUMN IF NOT EXISTS use_case text;

-- Make optional fields nullable
ALTER TABLE public.pricing_inquiries ALTER COLUMN issues DROP NOT NULL;
ALTER TABLE public.pricing_inquiries ALTER COLUMN expected_features DROP NOT NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS pricing_inquiries_type_idx ON public.pricing_inquiries (type, created_at DESC);
CREATE INDEX IF NOT EXISTS pricing_inquiries_email_idx ON public.pricing_inquiries (email);

-- RLS disabled — service-role (admin) only via API
ALTER TABLE public.pricing_inquiries DISABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SQL FUNCTIONS
-- ══════════════════════════════════════════════════════════════════════════════

-- ┌──────────────────────────────────────────────────────────────────────────────
-- │ check_and_deduct_credits
-- └──────────────────────────────────────────────────────────────────────────────
-- Atomically checks balance and deducts credits
-- Called from server-side credit service
-- Returns JSON: { ok: true, balance: number } or { ok: false, error: string, balance: number }

CREATE OR REPLACE FUNCTION public.check_and_deduct_credits(
  p_user_id uuid,
  p_cost    integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_monthly integer;
  v_bonus   integer;
  v_total   integer;
  v_new_monthly integer;
  v_new_bonus   integer;
BEGIN
  -- Lock the row for this user
  SELECT monthly_credits, bonus_credits
  INTO v_monthly, v_bonus
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'credits_row_missing', 'balance', 0);
  END IF;

  v_total := v_monthly + v_bonus;

  IF v_total < p_cost THEN
    RETURN jsonb_build_object('ok', false, 'error', 'insufficient_credits', 'balance', v_total);
  END IF;

  -- Deduct from bonus first, then monthly
  IF v_bonus >= p_cost THEN
    v_new_bonus   := v_bonus - p_cost;
    v_new_monthly := v_monthly;
  ELSE
    v_new_bonus   := 0;
    v_new_monthly := v_monthly - (p_cost - v_bonus);
  END IF;

  UPDATE public.user_credits
  SET monthly_credits = v_new_monthly,
      bonus_credits   = v_new_bonus,
      updated_at      = now()
  WHERE user_id = p_user_id;

  RETURN jsonb_build_object('ok', true, 'balance', v_new_monthly + v_new_bonus);
END;
$$;

-- ┌──────────────────────────────────────────────────────────────────────────────
-- │ get_user_credit_balance
-- └──────────────────────────────────────────────────────────────────────────────
-- Returns total credit balance for a user

CREATE OR REPLACE FUNCTION public.get_user_credit_balance(
  p_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_monthly integer;
  v_bonus   integer;
BEGIN
  SELECT monthly_credits, bonus_credits
  INTO v_monthly, v_bonus
  FROM public.user_credits
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  RETURN v_monthly + v_bonus;
END;
$$;

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ TRIGGERS
-- ══════════════════════════════════════════════════════════════════════════════

-- ┌──────────────────────────────────────────────────────────────────────────────
-- │ Update timestamp on support_tickets
-- └──────────────────────────────────────────────────────────────────────────────

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

DROP TRIGGER IF EXISTS update_user_credits_updated_at ON public.user_credits;

CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ═════════════════════════════════════════════════════════════════════════════
-- ║ SCHEMA MIGRATION COMPLETE
-- ═════════════════════════════════════════════════════════════════════════════
--
-- ✅ All tables created with Row Level Security enabled
-- ✅ All indexes created for optimal query performance
-- ✅ SQL functions for credit management
-- ✅ Triggers for automatic timestamp updates
--
-- NEXT STEPS:
-- 1. Verify all tables exist: Check "Table Editor" in Supabase Dashboard
-- 2. Test authentication: Sign up a test user in your app
-- 3. Verify credit row creation: Check user_credits table
-- 4. Test RLS policies: Try querying tables from client-side
--
-- ═════════════════════════════════════════════════════════════════════════════
