-- ═════════════════════════════════════════════════════════════════════════════
-- 05 — Pricing Inquiries / Waitlist (OPTIONAL)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- This file creates a table for collecting waitlist signups and enterprise inquiries.
--
-- ⚠️ OPTIONAL: Only run if you need to collect leads/inquiries.
--
-- WHAT THIS DOES:
--   ✅ Creates pricing_inquiries table
--   ✅ No RLS (admin-only access via service-role)
--   ✅ Creates indexes for fast queries
--
-- WHAT HAPPENS AFTER RUNNING:
--   • pricing_inquiries table appears in Table Editor
--   • Anonymous users can submit inquiries via API
--   • Only admins (service-role key) can read inquiries
--   • Stores: name, email, company, timeline, use case, etc.
--
-- TABLES CREATED:
--   • pricing_inquiries (id, type, name, email, company_name, issues, expected_features, 
--                        timeline, use_case, team_size, created_at)
--
-- INQUIRY TYPES:
--   • waitlist — General waitlist signup
--   • pro — Pro plan interest
--   • enterprise — Enterprise plan inquiry
--
-- USE CASES:
--   ✅ Waitlist for early access
--   ✅ Pro upgrade requests
--   ✅ Enterprise sales leads
--   ✅ Beta program signups
--   ✅ Custom pricing requests
--
-- SKIP IF:
--   ❌ You don't have a waitlist
--   ❌ No enterprise/custom pricing
--   ❌ Direct signup only (no inquiry forms)
--
-- TO RUN:
--   1. Make sure 01-core-extensions.sql was run first
--   2. Go to Supabase Dashboard → SQL Editor
--   3. Create new query
--   4. Copy and paste this entire file
--   5. Click "Run"
--   6. Verify: Table Editor → pricing_inquiries table exists
--
-- ═════════════════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ PRICING INQUIRIES TABLE
-- ══════════════════════════════════════════════════════════════════════════════

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

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS pricing_inquiries_type_idx ON public.pricing_inquiries (type, created_at DESC);
CREATE INDEX IF NOT EXISTS pricing_inquiries_email_idx ON public.pricing_inquiries (email);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════

-- RLS DISABLED: Only service-role (admin) can access this table
-- Public users submit via API route which uses service-role key
ALTER TABLE public.pricing_inquiries DISABLE ROW LEVEL SECURITY;

-- ═════════════════════════════════════════════════════════════════════════════
-- ✅ PRICING INQUIRIES SYSTEM INSTALLED
-- ═════════════════════════════════════════════════════════════════════════════
--
-- NEXT STEPS:
--   1. Verify table exists: Table Editor → pricing_inquiries
--   2. Test inquiry submission (via your API route)
--   3. View inquiries (using service-role key):
--      SELECT * FROM pricing_inquiries ORDER BY created_at DESC;
--
-- API INTEGRATION:
--   Create inquiries from public-facing forms:
--   
--   import { createAdminClient } from '@/lib/supabase-admin';
--   const admin = createAdminClient();
--   
--   // Submit waitlist inquiry
--   await admin.from('pricing_inquiries').insert({
--     type: 'waitlist',
--     name: 'John Doe',
--     email: 'john@example.com',
--     use_case: 'Building a SaaS product'
--   });
--   
--   // Submit enterprise inquiry
--   await admin.from('pricing_inquiries').insert({
--     type: 'enterprise',
--     name: 'Jane Smith',
--     email: 'jane@company.com',
--     company_name: 'Acme Corp',
--     team_size: '50-100',
--     timeline: 'Q2 2026'
--   });
--
-- EXPORT INQUIRIES:
--   Download as CSV from Table Editor or query via service-role:
--   
--   SELECT email, name, company_name, type, created_at 
--   FROM pricing_inquiries 
--   WHERE type = 'enterprise'
--   ORDER BY created_at DESC;
--
-- ═════════════════════════════════════════════════════════════════════════════
