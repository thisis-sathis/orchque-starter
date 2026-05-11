-- ═════════════════════════════════════════════════════════════════════════════
-- 01 — Core Extensions (REQUIRED)
-- ═════════════════════════════════════════════════════════════════════════════
--
-- This file enables essential PostgreSQL extensions needed for the application.
-- 
-- ⚠️ REQUIRED: Run this first before any other schema files.
--
-- WHAT THIS DOES:
--   ✅ Enables pgcrypto extension (for gen_random_uuid())
--   ✅ Enables uuid-ossp extension (for UUID generation functions)
--
-- WHAT HAPPENS AFTER RUNNING:
--   • Extensions are available for all tables
--   • UUID generation functions work (gen_random_uuid())
--   • Safe to run multiple times (IF NOT EXISTS)
--
-- TO RUN:
--   1. Go to Supabase Dashboard → SQL Editor
--   2. Create new query
--   3. Copy and paste this entire file
--   4. Click "Run" (or Cmd/Ctrl + Enter)
--   5. Should see: "Success. No rows returned"
--
-- ═════════════════════════════════════════════════════════════════════════════

-- Enable pgcrypto for cryptographic functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enable uuid-ossp for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═════════════════════════════════════════════════════════════════════════════
-- ✅ EXTENSIONS ENABLED
-- ═════════════════════════════════════════════════════════════════════════════
