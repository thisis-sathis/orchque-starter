-- ═════════════════════════════════════════════════════════════════════════════
-- 02 — User Credits System (OPTIONAL)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- This file creates the credit/usage tracking system for free/pro/enterprise users.
--
-- ⚠️ OPTIONAL: Only run if your app needs credit-based usage limits.
--
-- WHAT THIS DOES:
--   ✅ Creates user_credits table
--   ✅ Sets up Row Level Security (users only see their own credits)
--   ✅ Creates SQL functions for credit management
--   ✅ Adds triggers for automatic timestamp updates
--   ✅ Creates indexes for optimal performance
--
-- WHAT HAPPENS AFTER RUNNING:
--   • user_credits table appears in Table Editor
--   • New users get a credit row on signup (via API route)
--   • SQL functions available: check_and_deduct_credits(), get_user_credit_balance()
--   • Users can only query their own credit balance (RLS)
--   • Service-role key can access all rows (for admin operations)
--
-- TABLES CREATED:
--   • user_credits (id, user_id, plan, monthly_credits, bonus_credits, reset_at, created_at, updated_at)
--
-- USE CASES:
--   ✅ Free tier with monthly credit limits
--   ✅ Pro tier with higher/unlimited credits
--   ✅ Bonus credit system (referrals, promotions)
--   ✅ Usage tracking per user
--
-- SKIP IF:
--   ❌ Your app doesn't have usage limits
--   ❌ You don't need tiered pricing
--   ❌ All features are free/unlimited
--
-- TO RUN:
--   1. Make sure 01-core-extensions.sql was run first
--   2. Go to Supabase Dashboard → SQL Editor
--   3. Create new query
--   4. Copy and paste this entire file
--   5. Click "Run"
--   6. Verify: Table Editor → user_credits table exists
--
-- ═════════════════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ USER CREDITS TABLE
-- ══════════════════════════════════════════════════════════════════════════════

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

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS user_credits_user_id_idx ON public.user_credits (user_id);
CREATE INDEX IF NOT EXISTS user_credits_plan_idx ON public.user_credits (plan);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Users can only read their own credit balance
DROP POLICY IF EXISTS "user_credits: owner read" ON public.user_credits;
CREATE POLICY "user_credits: owner read"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own credit row (for marking reset_at, etc.)
DROP POLICY IF EXISTS "user_credits: owner update" ON public.user_credits;
CREATE POLICY "user_credits: owner update"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ SQL FUNCTIONS
-- ══════════════════════════════════════════════════════════════════════════════

-- ┌──────────────────────────────────────────────────────────────────────────────
-- │ check_and_deduct_credits
-- └──────────────────────────────────────────────────────────────────────────────
-- Atomically checks if user has enough credits and deducts them.
-- Called from server-side API routes (credit service).
--
-- USAGE:
--   SELECT * FROM check_and_deduct_credits('user-uuid-here', 5);
--
-- RETURNS JSON:
--   Success: { "ok": true, "balance": 5 }
--   Failure: { "ok": false, "error": "insufficient_credits", "balance": 0 }

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
  -- Lock the row for this user to prevent race conditions
  SELECT monthly_credits, bonus_credits
  INTO v_monthly, v_bonus
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'credits_row_missing', 'balance', 0);
  END IF;

  v_total := v_monthly + v_bonus;

  -- Check if user has enough credits
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

  -- Update the row
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
-- Returns total credit balance for a user (monthly + bonus).
--
-- USAGE:
--   SELECT get_user_credit_balance('user-uuid-here');
--
-- RETURNS:
--   Integer (total credits available)

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

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_credits_updated_at ON public.user_credits;
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ═════════════════════════════════════════════════════════════════════════════
-- ✅ USER CREDITS SYSTEM INSTALLED
-- ═════════════════════════════════════════════════════════════════════════════
--
-- NEXT STEPS:
--   1. Verify table exists: Table Editor → user_credits
--   2. Test signup flow: New users should get a credit row automatically
--   3. Check credit balance: SELECT * FROM user_credits WHERE user_id = 'your-user-id';
--   4. Test credit functions:
--      SELECT get_user_credit_balance('your-user-id');
--      SELECT check_and_deduct_credits('your-user-id', 1);
--
-- CONFIGURE DEFAULTS:
--   Edit src/lib/config.ts → CREDITS object to change default credit amounts
--
-- ═════════════════════════════════════════════════════════════════════════════
