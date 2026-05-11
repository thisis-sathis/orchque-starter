-- ═════════════════════════════════════════════════════════════════════════════
-- 03 — Notifications System (OPTIONAL)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- This file creates an in-app notification system for user alerts.
--
-- ⚠️ OPTIONAL: Only run if your app needs in-app notifications.
--
-- WHAT THIS DOES:
--   ✅ Creates notifications table
--   ✅ Sets up Row Level Security (users only see their own notifications)
--   ✅ Creates indexes for fast queries
--
-- WHAT HAPPENS AFTER RUNNING:
--   • notifications table appears in Table Editor
--   • Users can see their notifications (read/unread)
--   • Admins can create notifications via service-role key
--   • Each user only sees their own notifications (RLS)
--
-- TABLES CREATED:
--   • notifications (id, user_id, type, title, message, link, read, created_at)
--
-- NOTIFICATION TYPES:
--   • info — General information
--   • success — Success messages (e.g., "Account upgraded")
--   • warning — Warning messages (e.g., "Low credits")
--   • error — Error notifications
--   • system — System announcements
--
-- USE CASES:
--   ✅ Welcome messages on signup
--   ✅ Credit alerts (e.g., "You have 2 credits left")
--   ✅ Feature announcements
--   ✅ System maintenance notices
--   ✅ Action confirmations (e.g., "Password changed")
--
-- SKIP IF:
--   ❌ You'll use email-only notifications
--   ❌ Your app doesn't need user alerts
--   ❌ You prefer push notifications only
--
-- TO RUN:
--   1. Make sure 01-core-extensions.sql was run first
--   2. Go to Supabase Dashboard → SQL Editor
--   3. Create new query
--   4. Copy and paste this entire file
--   5. Click "Run"
--   6. Verify: Table Editor → notifications table exists
--
-- ═════════════════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ NOTIFICATIONS TABLE
-- ══════════════════════════════════════════════════════════════════════════════

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

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON public.notifications (user_id, read, created_at DESC);

-- ══════════════════════════════════════════════════════════════════════════════
-- ║ ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can read, update, and delete their own notifications
DROP POLICY IF EXISTS "notifications: owner all" ON public.notifications;
CREATE POLICY "notifications: owner all"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ═════════════════════════════════════════════════════════════════════════════
-- ✅ NOTIFICATIONS SYSTEM INSTALLED
-- ═════════════════════════════════════════════════════════════════════════════
--
-- NEXT STEPS:
--   1. Verify table exists: Table Editor → notifications
--   2. Create a test notification (using service-role key):
--      INSERT INTO notifications (user_id, type, title, message)
--      VALUES ('your-user-id', 'info', 'Welcome!', 'Thanks for signing up');
--   3. Query as user: SELECT * FROM notifications WHERE user_id = auth.uid();
--
-- API INTEGRATION:
--   Create notifications from your API routes:
--   
--   import { createAdminClient } from '@/lib/supabase-admin';
--   const admin = createAdminClient();
--   await admin.from('notifications').insert({
--     user_id: userId,
--     type: 'success',
--     title: 'Account upgraded',
--     message: 'You now have access to Pro features!',
--     link: '/dashboard/settings'
--   });
--
-- ═════════════════════════════════════════════════════════════════════════════
