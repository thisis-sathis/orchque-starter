# 🚀 Quick Start — Authentication Setup

Get authentication working in **5 minutes** by following these steps.

## Prerequisites

- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free tier works)

---

## Step 1: Get Supabase Credentials (2 min)

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Fill in project name, password, region → **Create**
3. Once ready, go to **Settings** → **API**
4. Copy these 3 values:
   - **Project URL**
   - **anon public key**
   - **service_role secret key**

---

## Step 2: Configure Environment (30 sec)

1. Copy example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and paste your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## Step 3: Run Database Schema (1 min)

1. Go to Supabase Dashboard → **SQL Editor** → **New Query**
2. Open `src/app/schema/schema.sql` in your code editor
3. Copy entire file contents
4. Paste into SQL Editor → **Run**
5. Should see: "Success. No rows returned"

This creates all necessary tables:
- ✅ `user_credits` — Credit/usage tracking
- ✅ `notifications` — In-app notifications
- ✅ `support_tickets` — Support system
- ✅ `support_messages` — Support messages
- ✅ `pricing_inquiries` — Waitlist/enterprise

---

## Step 4: Configure Email Redirects (30 sec)

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/auth/callback
   ```
3. Click **Save**

---

## Step 5: Test Authentication (1 min)

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/auth/signup

3. Create a test account:
   - Email: your-email@example.com
   - Password: testpassword123

4. Check your email inbox (and spam!)

5. Click verification link

6. Should redirect to `/dashboard` ✅

---

## ✅ Done!

Your authentication is now fully working with:
- ✅ Sign up with email verification
- ✅ Sign in with password
- ✅ Forgot password flow
- ✅ Protected routes
- ✅ Credit system
- ✅ Row-level security

---

## Next Steps

### Test Complete Auth Flow

**Sign In:**
- Go to `/auth/signin`
- Sign in with your verified account
- Should redirect to `/dashboard`

**Forgot Password:**
- Go to `/auth/forgot-password`
- Enter your email
- Check inbox for reset link
- Set new password
- Sign in with new password

**Verify Database:**
- Go to Supabase → **Table Editor** → **user_credits**
- You should see a row with your user_id and 10 credits

---

## Troubleshooting

### "Failed to create account"
- ✅ Check that all 3 env variables are filled in `.env.local`
- ✅ Restart dev server after adding env variables
- ✅ Check browser console for errors

### "Email not verified"
- ✅ Check email inbox (and spam folder)
- ✅ Resend verification: Supabase → Authentication → Users → ... → Resend confirmation

### No email received
- ✅ Check spam folder
- ✅ Verify redirect URL is configured (Step 4)
- ✅ Check Supabase logs: Dashboard → Logs

### Tables not created
- ✅ Make sure schema.sql ran successfully
- ✅ Check for errors in SQL Editor
- ✅ Verify in Table Editor that tables exist

---

## Development Mode (Optional)

For frontend work without Supabase, enable dev bypass:

1. Add to `.env.local`:
   ```bash
   DEV_BYPASS_AUTH=true
   ```

2. Sign in with:
   - Email: `testid@testskills.com`
   - Password: `testid@123`

⚠️ **Remove before production!**

---

## Additional Documentation

- **Complete Setup Guide**: `AUTH_SETUP.md`
- **Schema Documentation**: `src/app/schema/README.md`
- **Supabase Docs**: https://supabase.com/docs

---

## Support

Need help? Check these resources:
- Review error messages in browser console
- Check Supabase logs (Dashboard → Logs)
- Read `AUTH_SETUP.md` for detailed troubleshooting
- Join Supabase Discord: https://discord.supabase.com

---

**Ready to build?** Start customizing your app! 🎉
