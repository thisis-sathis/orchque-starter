# Database Schema Setup Guide

## Overview
This folder contains **modular** Supabase database schemas for the Starter SaaS application. Each schema file is **optional** (except core extensions) and can be run independently based on your needs.

---

## 📂 Schema Files

### Required

| File | Description | Required? |
|------|-------------|-----------|
| **01-core-extensions.sql** | PostgreSQL extensions (UUID, crypto) | ✅ **REQUIRED** |

### Optional Features

| File | Description | Skip If... |
|------|-------------|------------|
| **02-user-credits.sql** | Credit/usage tracking system | ❌ No usage limits needed |
| **03-notifications.sql** | In-app notification system | ❌ Email-only notifications |
| **04-support-system.sql** | Support ticket system | ❌ Using external support (Zendesk, etc.) |
| **05-pricing-inquiries.sql** | Waitlist/enterprise inquiries | ❌ No waitlist or custom pricing |

**✨ You only install what you need!**

---

## 🚀 Quick Start

### Option A: Install Everything (Recommended for Most Apps)

Run all schema files in order:

1. Go to Supabase Dashboard → **SQL Editor**
2. For each file (01 → 05), click **New Query**
3. Copy file contents → Paste → **Run**
4. Verify success: "Success. No rows returned"

**Result:** All features enabled (credits, notifications, support, waitlist)

---

### Option B: Pick What You Need (Minimal Setup)

**Example 1: No credits, no support, just auth**
```
✅ Run: 01-core-extensions.sql
❌ Skip: Everything else
```

**Example 2: Credits + notifications only**
```
✅ Run: 01-core-extensions.sql
✅ Run: 02-user-credits.sql
✅ Run: 03-notifications.sql
❌ Skip: 04-support-system.sql, 05-pricing-inquiries.sql
```

**Example 3: Full SaaS with support**
```
✅ Run: 01-core-extensions.sql
✅ Run: 02-user-credits.sql
✅ Run: 03-notifications.sql
✅ Run: 04-support-system.sql
✅ Run: 05-pricing-inquiries.sql
```

---

## 📋 Detailed File Guide

### 01-core-extensions.sql (REQUIRED)

**What it does:**
- Enables `pgcrypto` extension (UUID generation, crypto functions)
- Enables `uuid-ossp` extension (additional UUID functions)

**After running:**
- ✅ Extensions are available
- ✅ UUID generation works: `gen_random_uuid()`

**Skip if:**
- ❌ Never skip this - required for all other schemas

---

### 02-user-credits.sql (OPTIONAL)

**What it does:**
- Creates `user_credits` table
- Tracks monthly/bonus credits per user
- Supports free/pro/enterprise tiers
- SQL functions for checking/deducting credits
- Row Level Security (users see only their credits)

**After running:**
- ✅ `user_credits` table in Table Editor
- ✅ New signups get credit row automatically (via API)
- ✅ Functions available: `check_and_deduct_credits()`, `get_user_credit_balance()`

**Use cases:**
- Free tier with monthly limits (e.g., 10 generations/month)
- Pro tier with higher limits
- Bonus credit promotions
- Usage tracking

**Skip if:**
- ❌ All features are free/unlimited
- ❌ No tiered pricing
- ❌ External billing system handles limits

**Code changes needed if skipped:**
- Remove credit seeding from `src/app/api/auth/signup/route.ts`
- Remove credit checks from API routes

---

### 03-notifications.sql (OPTIONAL)

**What it does:**
- Creates `notifications` table
- In-app notification system
- Supports: info, success, warning, error, system types
- Row Level Security (users see only their notifications)

**After running:**
- ✅ `notifications` table in Table Editor
- ✅ Users can see read/unread notifications
- ✅ Admins can create notifications (service-role)

**Use cases:**
- Welcome messages on signup
- Credit alerts ("2 credits left")
- Feature announcements
- System maintenance notices

**Skip if:**
- ❌ Email notifications only
- ❌ No in-app alerts needed
- ❌ Using external notification service (OneSignal, etc.)

**Code changes needed if skipped:**
- Remove notification creation from `src/app/api/auth/signup/route.ts`
- Remove notification UI components

---

### 04-support-system.sql (OPTIONAL)

**What it does:**
- Creates `support_tickets` table
- Creates `support_messages` table (threaded conversations)
- Supports statuses: open, in_progress, resolved, closed
- Supports priorities: low, normal, high, urgent
- File attachment support
- Row Level Security (users see only their tickets)

**After running:**
- ✅ `support_tickets` table in Table Editor
- ✅ `support_messages` table in Table Editor
- ✅ Users can create/view their tickets
- ✅ Each ticket has message thread

**Use cases:**
- In-app customer support
- Bug reports
- Feature requests
- Threaded conversations

**Skip if:**
- ❌ Using external support (Zendesk, Intercom, etc.)
- ❌ Email support is sufficient
- ❌ No support system needed

**Code changes needed if skipped:**
- Remove support ticket UI from dashboard
- Remove `/api/support` API routes (if exists)

---

### 05-pricing-inquiries.sql (OPTIONAL)

**What it does:**
- Creates `pricing_inquiries` table
- Collects waitlist signups
- Stores enterprise inquiry details
- Admin-only access (no RLS)

**After running:**
- ✅ `pricing_inquiries` table in Table Editor
- ✅ Public forms can submit inquiries (via API)
- ✅ Only admins can read inquiries

**Use cases:**
- Waitlist for early access
- Pro upgrade interest forms
- Enterprise sales leads
- Beta program signups

**Skip if:**
- ❌ No waitlist
- ❌ Direct signup only
- ❌ No custom/enterprise pricing

**Code changes needed if skipped:**
- Remove waitlist forms from landing page
- Remove `/api/waitlist` or `/api/pricing-inquiry` routes (if exists)

---

## 🔧 Environment Setup

**Before running any schema:**

1. Get Supabase credentials:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project → **Settings** → **API**
   - Copy: Project URL, anon key, service_role key

2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   ```

3. Restart dev server: `npm run dev`

---

## ✅ Verification Checklist

After running schemas, verify in Supabase Dashboard:

### All Files Run?

Go to **Table Editor** and check for these tables:

- ✅ `user_credits` (if ran 02-user-credits.sql)
- ✅ `notifications` (if ran 03-notifications.sql)
- ✅ `support_tickets` (if ran 04-support-system.sql)
- ✅ `support_messages` (if ran 04-support-system.sql)
- ✅ `pricing_inquiries` (if ran 05-pricing-inquiries.sql)

### Test Authentication + Database Integration

1. **Sign up a test user:**
   - Go to `/auth/signup`
   - Create account with test email
   - Verify email

2. **Check database:**
   - Go to Table Editor → `user_credits` (if installed)
   - Should see row for your user_id with 10 credits
   - Verify `plan = 'free'`

3. **Test RLS (Row Level Security):**
   - Sign in as test user
   - Open browser console
   - Try this:
     ```javascript
     // Should only return YOUR data
     const { data } = await supabase.from('user_credits').select('*');
     console.log(data);
     ```

---

## 🎯 What Runs When You Execute Each File

### 01-core-extensions.sql
**Execution time:** < 1 second  
**Output:** "Success. No rows returned"

**What happens:**
1. ✅ Enables `pgcrypto` extension
2. ✅ Enables `uuid-ossp` extension

**Verification:**
```sql
-- Check extensions are installed
SELECT * FROM pg_extension WHERE extname IN ('pgcrypto', 'uuid-ossp');
```

---

### 02-user-credits.sql
**Execution time:** < 2 seconds  
**Output:** "Success. No rows returned"

**What happens:**
1. ✅ Creates `user_credits` table with 7 columns
2. ✅ Creates 2 indexes (user_id, plan)
3. ✅ Enables RLS with 2 policies (read, update)
4. ✅ Creates SQL function `check_and_deduct_credits()`
5. ✅ Creates SQL function `get_user_credit_balance()`
6. ✅ Creates trigger for auto-updating `updated_at`

**Verification:**
```sql
-- Check table exists
SELECT * FROM user_credits LIMIT 1;

-- Check functions exist
SELECT proname FROM pg_proc WHERE proname LIKE '%credit%';

-- Test function
SELECT get_user_credit_balance('00000000-0000-0000-0000-000000000000');
```

---

### 03-notifications.sql
**Execution time:** < 1 second  
**Output:** "Success. No rows returned"

**What happens:**
1. ✅ Creates `notifications` table with 7 columns
2. ✅ Creates 2 indexes (user_id + created_at, user_id + read + created_at)
3. ✅ Enables RLS with 1 policy (owner can do all)

**Verification:**
```sql
-- Check table exists
SELECT * FROM notifications LIMIT 1;

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename = 'notifications';
```

---

### 04-support-system.sql
**Execution time:** < 2 seconds  
**Output:** "Success. No rows returned"

**What happens:**
1. ✅ Creates `support_tickets` table with 6 columns
2. ✅ Creates `support_messages` table with 6 columns
3. ✅ Creates 3 indexes total
4. ✅ Enables RLS with 3 policies
5. ✅ Creates trigger for auto-updating `updated_at`

**Verification:**
```sql
-- Check tables exist
SELECT * FROM support_tickets LIMIT 1;
SELECT * FROM support_messages LIMIT 1;

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('support_tickets', 'support_messages');
```

---

### 05-pricing-inquiries.sql
**Execution time:** < 1 second  
**Output:** "Success. No rows returned"

**What happens:**
1. ✅ Creates `pricing_inquiries` table with 10 columns
2. ✅ Creates 2 indexes (type + created_at, email)
3. ✅ RLS is **disabled** (admin-only access)

**Verification:**
```sql
-- Check table exists
SELECT * FROM pricing_inquiries LIMIT 1;

-- Verify RLS is disabled (admin-only)
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename = 'pricing_inquiries';
-- Should show: rowsecurity = false
```

---

## 🔄 Safe to Re-run

**All schema files are idempotent:**
- ✅ Uses `IF NOT EXISTS` for all CREATE statements
- ✅ Uses `DROP ... IF EXISTS` before policies
- ✅ Uses `ADD COLUMN IF NOT EXISTS` for upgrades
- ✅ Safe to run multiple times without errors

**Re-run to:**
- Add missing tables if you skipped some before
- Upgrade schema (adds new columns without losing data)
- Fix broken policies or triggers

---

## 🗑️ Removing Features

If you installed a feature but want to remove it:

### Remove Credits System
```sql
DROP TABLE IF EXISTS user_credits CASCADE;
DROP FUNCTION IF EXISTS check_and_deduct_credits;
DROP FUNCTION IF EXISTS get_user_credit_balance;
```

### Remove Notifications
```sql
DROP TABLE IF EXISTS notifications CASCADE;
```

### Remove Support System
```sql
DROP TABLE IF EXISTS support_messages CASCADE;
DROP TABLE IF EXISTS support_tickets CASCADE;
```

### Remove Pricing Inquiries
```sql
DROP TABLE IF EXISTS pricing_inquiries CASCADE;
```

**⚠️ Warning:** Dropping tables deletes all data permanently!

---

## 🔍 Troubleshooting

### "Extension already exists"
- ✅ This is normal! It means extensions were already installed
- ✅ Safe to ignore

### "Relation already exists"
- ✅ This is normal! It means table was already created
- ✅ Safe to ignore

### "Function already exists"
- ✅ This is normal! Schema will replace it
- ✅ Safe to ignore

### Tables not appearing in Table Editor
- ❌ Check SQL Editor for error messages
- ❌ Make sure 01-core-extensions.sql ran first
- ❌ Refresh browser page
- ❌ Check you're in correct Supabase project

### RLS preventing queries
- ✅ This is correct behavior!
- ✅ Users should only see their own data
- ✅ Use service-role key in API routes for admin access

---

## 📊 Database Size Estimates

**With all features enabled:**

| Table | Estimated Size (1000 users) |
|-------|----------------------------|
| user_credits | ~100 KB |
| notifications | ~1 MB (10 notifications/user) |
| support_tickets | ~500 KB (5 tickets/user) |
| support_messages | ~2 MB (10 messages/user) |
| pricing_inquiries | ~50 KB (50 inquiries) |
| **Total** | **~3.7 MB** |

**Supabase free tier:** 500 MB database (plenty for thousands of users)

---

## 🚀 Production Deployment

### Before Going Live:

1. **Create separate production Supabase project**
2. **Run schema files in production:**
   - Run 01-core-extensions.sql
   - Run only the features you need (02-05)
3. **Update production `.env`:**
   - Use production Supabase keys
   - Remove `DEV_BYPASS_AUTH`
4. **Verify RLS policies work:**
   - Test with real users
   - Try accessing other users' data (should fail)
5. **Set up backups:**
   - Supabase Pro: automatic daily backups
   - Free tier: manual exports via Table Editor

### Migration from Dev to Prod:

**Don't copy dev database to prod!** Instead:
1. Run fresh schema in production
2. Test authentication flow
3. Users create new accounts in prod
4. No migration needed (fresh start)

---

## 📚 Additional Resources

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Functions](https://supabase.com/docs/guides/database/functions)
- [PostgreSQL Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Supabase Best Practices](https://supabase.com/docs/guides/database/best-practices)

---

## 💡 Tips

### Performance Optimization
- ✅ All critical queries have indexes
- ✅ RLS policies use indexed columns (user_id)
- ✅ Functions use `SECURITY DEFINER` for performance

### Security Best Practices
- ✅ RLS enabled on all user-facing tables
- ✅ Service-role key only used in API routes
- ✅ User IDs from `auth.uid()` (can't be spoofed)
- ✅ Check constraints prevent invalid data

### Monitoring
- Check slow queries: Dashboard → Database → Query Performance
- Monitor table sizes: Table Editor → table → ... → Size
- View logs: Dashboard → Logs

---

## 🆘 Support

**Need help?**
1. Check error messages in SQL Editor
2. Review this README troubleshooting section
3. Check Supabase docs: https://supabase.com/docs
4. Join Supabase Discord: https://discord.supabase.com

---

**Last Updated:** May 11, 2026  
**Schema Version:** 2.0.0 (Modular)  
**Compatible With:** Supabase Postgres 15+, Next.js 14+

### 4. Test Authentication

1. Start your development server: `npm run dev`
2. Go to `/auth/signup`
3. Create a test account
4. Check your email for verification link
5. Verify email and sign in
6. Check `user_credits` table - you should see a row for your user

## What This Schema Creates

### Tables

| Table | Purpose | RLS Enabled |
|-------|---------|-------------|
| `user_credits` | Tracks credit balance for free/pro users | ✅ Yes |
| `notifications` | In-app notification system | ✅ Yes |
| `support_tickets` | Customer support ticket system | ✅ Yes |
| `support_messages` | Messages within support tickets | ✅ Yes |
| `pricing_inquiries` | Waitlist + enterprise enquiries | ❌ No (admin only) |

### SQL Functions

- **`check_and_deduct_credits(user_id, cost)`** - Atomically checks and deducts credits
- **`get_user_credit_balance(user_id)`** - Returns total credit balance for a user

### Triggers

- Auto-updates `updated_at` timestamp on `support_tickets` and `user_credits`

## Row Level Security (RLS)

All tables (except `pricing_inquiries`) have RLS enabled:
- **Users can only see/edit their own data**
- **Service-role key bypasses RLS** (used in API routes for admin operations)
- **Anonymous users cannot access any data** (must be authenticated)

## Default Credit Configuration

New users get:
- **Plan**: `free`
- **Monthly Credits**: `10` (configured in `src/lib/config.ts` → `CREDITS.FREE_MONTHLY`)
- **Bonus Credits**: `0`

To change defaults, update:
1. `src/lib/config.ts` → `CREDITS` object
2. `src/app/api/auth/signup/route.ts` → credit seeding logic

## Authentication Flow

### Sign Up
1. User submits email/password → `/auth/signup`
2. API route → `/api/auth/signup`
3. Creates Supabase user
4. Seeds `user_credits` row (via admin client)
5. Creates welcome notification
6. Sends verification email
7. User verifies email via link

### Sign In
1. User submits email/password → `/auth/signin`
2. API route → `/api/auth/signin`
3. Verifies credentials with Supabase
4. Checks email verification status
5. Sets session cookie
6. Redirects to `/dashboard`

### Forgot Password
1. User submits email → `/auth/forgot-password`
2. API route → `/api/auth/reset-password`
3. Sends password reset email
4. User clicks link → `/auth/reset-password?token=...`
5. User sets new password
6. Redirects to `/auth/signin`

## Development Mode

For local development without Supabase:
```bash
# Enable dev bypass in .env.local
DEV_BYPASS_AUTH=true
```

This allows signing in with:
- **Email**: `testid@testskills.com`
- **Password**: `testid@123`

No database required! Perfect for frontend development.

## Troubleshooting

### "Failed to create account"
- ✅ Check that all 3 env variables are set correctly
- ✅ Verify schema was run successfully
- ✅ Check Supabase Dashboard → Authentication → Users
- ✅ Look for errors in Network tab (browser DevTools)

### "Email not verified"
- ✅ Check your email inbox (including spam)
- ✅ Verify email redirect URL in Supabase:
  - Go to Authentication → URL Configuration
  - Add `http://localhost:3000/auth/callback` to allowed URLs
  - In production, add your domain

### "Insufficient credits"
- ✅ Check `user_credits` table for your user_id
- ✅ Verify monthly_credits + bonus_credits > 0
- ✅ Check credit deduction logic in API routes

### "Authentication service unavailable"
- ✅ Check Supabase project status (Dashboard)
- ✅ Verify network connectivity
- ✅ Check API keys are correct
- ✅ Look for 500 errors in API routes

## Migration Guide

### From Existing Schema

If you're upgrading from an older schema:
1. **Backup your data first!**
2. Run the new `schema.sql` - it's idempotent
3. New columns will be added automatically
4. Existing data remains intact
5. Verify all tables and columns exist

### To Production

1. Create a new Supabase project for production
2. Run `schema.sql` in production SQL Editor
3. Update production `.env` with new project keys
4. Update email redirect URLs:
   - Go to Authentication → URL Configuration
   - Add production domain + `/auth/callback`
5. Test signup/signin flow in production

## Security Best Practices

### Environment Variables
- ✅ **Never commit** `.env.local` to git
- ✅ Use `.env.local.example` for documentation
- ✅ Use **different Supabase projects** for dev/staging/production
- ✅ Rotate service-role key if accidentally exposed

### Service Role Key
- ⚠️ **Only use server-side** (API routes, not client components)
- ⚠️ **Bypasses all RLS policies** - use carefully
- ✅ Used for: admin operations, credit seeding, notifications
- ❌ Never use for: user-facing queries, client-side code

### Row Level Security
- ✅ All user data tables have RLS enabled
- ✅ Policies enforce `auth.uid() = user_id`
- ✅ Service-role bypasses RLS (used in `/api/*` routes)
- ✅ Test RLS by trying to query other users' data

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Authentication Helpers](https://supabase.com/docs/guides/auth/server-side-rendering)

## Support

If you encounter issues:
1. Check this README troubleshooting section
2. Review error messages in browser console
3. Check Supabase logs (Dashboard → Logs)
4. Open an issue with error details

---

**Last Updated**: May 11, 2026  
**Schema Version**: 1.0.0  
**Compatible With**: Supabase Postgres 15+
