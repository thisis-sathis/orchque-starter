# ═════════════════════════════════════════════════════════════════════════════
# Authentication Setup Guide
# ═════════════════════════════════════════════════════════════════════════════
#
# This guide walks you through setting up complete authentication for your SaaS.
# After following these steps, your app will have:
#   ✅ Sign up with email verification
#   ✅ Sign in with rate limiting
#   ✅ Password reset flow
#   ✅ Protected routes (middleware)
#   ✅ Credit system (user_credits table)
#   ✅ Notifications system
#
# ═════════════════════════════════════════════════════════════════════════════

## Step 1: Create a Supabase Project

1. Go to https://supabase.com
2. Sign in or create an account
3. Click "New project"
4. Fill in:
   - **Name**: your-product-name
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Get Your API Keys

1. Once project is ready, go to **Settings** → **API**
2. Copy these three values:

```
Project URL:     https://xxxxxxxxxxxxx.supabase.co
anon key:        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Add Environment Variables

1. Open `.env.local` in your project root
2. Fill in the three Supabase values:

```bash
# ── Fill these in when connecting to real Supabase ──
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file
4. Restart your dev server: `npm run dev`

## Step 4: Run the Database Schema

1. Go to your Supabase project → **SQL Editor**
2. Click **New Query**
3. Open `src/app/schema/schema.sql` in your code editor
4. Copy the entire contents
5. Paste into Supabase SQL Editor
6. Click **Run** (or Cmd/Ctrl + Enter)
7. Wait for: "Success. No rows returned"

This creates:
- ✅ user_credits table (with RLS)
- ✅ notifications table (with RLS)
- ✅ support_tickets table (with RLS)
- ✅ support_messages table (with RLS)
- ✅ pricing_inquiries table
- ✅ SQL functions for credit management
- ✅ Triggers for auto-updating timestamps

## Step 5: Configure Email Settings

### A. Set Email Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add these to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```

### B. Customize Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize these templates:
   - **Confirm signup** - Sent when user creates account
   - **Reset password** - Sent when user requests password reset
3. Use these variables:
   - `{{ .ConfirmationURL }}` - Email verification link
   - `{{ .Token }}` - Verification token
   - `{{ .SiteURL }}` - Your app URL

### C. Use Custom SMTP (Optional, Production Recommended)

**Why?** Supabase's default email service is rate-limited and may go to spam.

1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Enable **Enable Custom SMTP**
3. Fill in your SMTP credentials (e.g., from SendGrid, Resend, Postmark)
4. Click **Save**

**Recommended providers:**
- [Resend](https://resend.com) - Modern, great DX
- [SendGrid](https://sendgrid.com) - Established, free tier
- [Postmark](https://postmarkapp.com) - Transactional focus

## Step 6: Test Authentication Flow

### A. Sign Up Flow

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000/auth/signup
3. Enter email and password (min 8 chars)
4. Click "Sign up"
5. Check your email inbox (and spam folder!)
6. Click the verification link
7. Should redirect to `/auth/callback?verified=true` → `/dashboard`

**Troubleshooting:**
- ❌ "Failed to create account" → Check .env variables
- ❌ No email received → Check spam, verify email settings in Supabase
- ❌ "Email not verified" → Check that user confirmed email

### B. Sign In Flow

1. Go to http://localhost:3000/auth/signin
2. Enter your verified email and password
3. Click "Sign in"
4. Should redirect to `/dashboard`

**Troubleshooting:**
- ❌ "Invalid email or password" → Check credentials, ensure email is verified
- ❌ "Email not verified" → User must click verification link first
- ❌ Rate limited → Wait 60 seconds (anti-brute-force protection)

### C. Forgot Password Flow

1. Go to http://localhost:3000/auth/forgot-password
2. Enter your email
3. Click "Send reset link"
4. Check email for reset link
5. Click link → redirects to `/auth/reset-password`
6. Enter new password (min 8 chars)
7. Click "Update password"
8. Should redirect to `/dashboard`

**Troubleshooting:**
- ❌ No email received → Check spam, verify SMTP settings
- ❌ Link expired → Request new reset link (valid for 1 hour)
- ❌ "Failed to update password" → Request new reset link

## Step 7: Verify Database Tables

1. Go to **Table Editor** in Supabase Dashboard
2. Check that these tables exist:
   - ✅ user_credits
   - ✅ notifications
   - ✅ support_tickets
   - ✅ support_messages
   - ✅ pricing_inquiries

3. After signing up a test user:
   - Go to `user_credits` table
   - You should see a row with:
     - `user_id`: your auth.users id
     - `plan`: "free"
     - `monthly_credits`: 10
     - `bonus_credits`: 0

## Step 8: Test Row Level Security (RLS)

RLS ensures users can only see their own data.

### Test in Supabase

1. Go to **Table Editor** → **user_credits**
2. You should see all rows (you're using service-role key)
3. Open browser DevTools → Console
4. Try this client-side query:

```javascript
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(
  'YOUR_PROJECT_URL',
  'YOUR_ANON_KEY'
)
const { data, error } = await supabase
  .from('user_credits')
  .select('*')
console.log(data) // Should only show YOUR data (if signed in)
```

### Test in Your App

1. Sign up two different test users
2. Sign in as User A
3. Open browser DevTools → Network tab
4. Trigger any API call that fetches user_credits
5. Should only return User A's data
6. Sign out, sign in as User B
7. Should only see User B's data

## Step 9: Configure Rate Limiting

Rate limiting prevents brute-force attacks. Already configured in:
- `src/lib/rate-limit.ts` - In-memory rate limiter
- API routes use `checkRateLimit()` before processing

**Current limits:**
- Sign in: 5 attempts per 60s per IP
- Sign up: 3 attempts per 60s per IP
- Password reset: 3 attempts per 60s per IP

**To adjust:**
1. Open `src/lib/rate-limit.ts`
2. Modify these constants:
   ```typescript
   export const SIGNIN_LIMIT = { windowSeconds: 60, maxAttempts: 5 };
   export const SIGNUP_LIMIT = { windowSeconds: 60, maxAttempts: 3 };
   export const RESET_LIMIT = { windowSeconds: 60, maxAttempts: 3 };
   ```

## Step 10: Development Mode (Optional)

For rapid frontend development without Supabase:

1. Set in `.env.local`:
   ```bash
   DEV_BYPASS_AUTH=true
   ```

2. Sign in with test credentials:
   - **Email**: `testid@testskills.com`
   - **Password**: `testid@123`

3. No database required - uses mock session cookie

**⚠️ Warning:** This bypasses all auth. Remove before production!

## Production Deployment Checklist

### Before Going Live:

- [ ] Create separate Supabase project for production
- [ ] Run `schema.sql` in production project
- [ ] Update `.env` in production with prod Supabase keys
- [ ] Remove `DEV_BYPASS_AUTH` from production env
- [ ] Add production domain to Supabase Redirect URLs
- [ ] Enable Custom SMTP with real email service
- [ ] Test signup flow end-to-end in production
- [ ] Test signin flow in production
- [ ] Test password reset flow in production
- [ ] Verify RLS policies work correctly
- [ ] Set up monitoring/alerts for auth failures

### Security Hardening:

- [ ] Rotate service-role key if ever exposed
- [ ] Use different projects for dev/staging/prod
- [ ] Never commit `.env.local` to git
- [ ] Enable 2FA on Supabase account
- [ ] Review RLS policies quarterly
- [ ] Monitor failed login attempts
- [ ] Set up Supabase alerts for unusual activity

## Troubleshooting Common Issues

### "Authentication service temporarily unavailable"

**Cause:** Network issue or Supabase outage
**Fix:**
1. Check Supabase status: https://status.supabase.com
2. Verify your internet connection
3. Check browser console for specific errors
4. Try again in a few minutes

### "Email not verified"

**Cause:** User hasn't clicked verification link
**Fix:**
1. Check email inbox (and spam folder)
2. Resend verification email:
   - Go to Supabase → Authentication → Users
   - Find user → Click "..." → "Resend confirmation"
3. Check redirect URLs are configured correctly

### "Insufficient credits"

**Cause:** User has 0 credits remaining
**Fix:**
1. Go to `user_credits` table
2. Find user's row
3. Update `monthly_credits` or `bonus_credits`
4. Or upgrade user to `plan = 'pro'`

### "Failed to create account - already registered"

**Cause:** Email already exists in auth.users
**Fix:**
1. User should use "Sign in" instead
2. If user forgot password, use "Forgot password" flow
3. To delete account:
   - Go to Supabase → Authentication → Users
   - Find user → Click "..." → "Delete user"

### "Too many attempts"

**Cause:** Rate limit triggered (anti-brute-force)
**Fix:**
1. Wait 60 seconds
2. Try again
3. If developing, you can temporarily increase limits in `src/lib/rate-limit.ts`

## Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Auth Guide**: https://supabase.com/docs/guides/auth
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security
- **Email Templates**: https://supabase.com/docs/guides/auth/auth-email-templates
- **Next.js + Supabase**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

## Support

If you're stuck:
1. Check Supabase logs: Dashboard → Logs → Auth
2. Check browser console for client-side errors
3. Check server logs: `npm run dev` terminal output
4. Review this guide's troubleshooting section
5. Check Supabase Discord: https://discord.supabase.com

---

**Last Updated**: May 11, 2026  
**Supabase Version**: Latest  
**Next.js Version**: 16.x
