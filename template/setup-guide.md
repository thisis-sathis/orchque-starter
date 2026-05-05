# Setup Guide — What You Need Before Writing One Line of Code

*For every new micro-SaaS built on the FloMCP template stack.*  
*For reusable component patterns, see `template.md`.*

---

## Part A — Accounts to Create

| Service | Purpose | Free tier? |
|---|---|---|
| [supabase.com](https://supabase.com) | Auth + Postgres DB + RLS | Yes — 2 free projects |
| [resend.com](https://resend.com) | Transactional email | Yes — 100 emails/day |
| [vercel.com](https://vercel.com) | Hosting + CI/CD | Yes — hobby plan fine |
| [lemonsqueezy.com](https://app.lemonsqueezy.com) | Payments (add later — Day 11) | % fee, no monthly cost |

> **Set up in this order.** Supabase and Vercel first. Resend before launch. Lemon Squeezy only when ready to charge.

---

## Part B — Complete `.env.local`

Create this file at the project root. Never commit it to git (add to `.gitignore`).

```bash
# ── 1. Supabase ───────────────────────────────────────────────
# Source: supabase.com → Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# ⚠️ SERVICE_ROLE_KEY bypasses all RLS. Server-only. Never expose to browser.

# ── 2. App URL ────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Production: https://[product].uneefe.com

# ── 3. Resend (email) ─────────────────────────────────────────
# Source: resend.com → API Keys
RESEND_API_KEY=re_...
NOREPLY_EMAIL=no-reply@[product].uneefe.com
SUPPORT_EMAIL=support@[product].uneefe.com
FOUNDER_EMAIL=your@email.com
DISABLE_EMAILS=false
# Set DISABLE_EMAILS=true in local dev to skip email sends

# ── 4. Admin ──────────────────────────────────────────────────
ADMIN_EMAIL=your@email.com

# ── 5. AI (only for LLM-powered features) ────────────────────
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...

# ── 6. Lemon Squeezy (only when adding payments — Day 11) ─────
# Source: app.lemonsqueezy.com → Settings → API / Store
# LEMONSQUEEZY_API_KEY=
# LEMONSQUEEZY_STORE_ID=
# LEMONSQUEEZY_WEBHOOK_SECRET=
# NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=

# ── 7. Dev flags ──────────────────────────────────────────────
DISABLE_CREDIT_DEDUCTION=false
```

---

## Part C — Supabase Project Setup

### Step 1 — Create project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New project**
3. Name: `[product]-prod` (e.g. `skillpulse-prod`)
4. Database password: generate + save somewhere safe
5. Region: **Singapore** (lowest latency from India)
6. Wait ~2 min for provisioning

### Step 2 — Copy API keys

Dashboard → **Settings** → **API**:
- Copy `URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3 — Run base schema SQL

Dashboard → **SQL Editor** → **New query** → paste the entire SQL from `template.md` Part 3.

> Click **Run**. You should see "Success" with no errors. If tables already exist, the `ON CONFLICT DO NOTHING` handles it safely.

### Step 4 — Enable Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. **New project** → name it `[product]`
3. Left menu → **APIs & Services** → **OAuth consent screen**
4. User type: **External** → click Create
5. Fill in:
   - App name: `[Product Name]`
   - User support email: your email
   - Developer contact: your email
6. Click **Save and Continue** (scopes page — skip, just continue)
7. Click **Save and Continue** (test users — skip)
8. Left menu → **Credentials** → **Create Credentials** → **OAuth client ID**
9. Application type: **Web application**
10. Name: `[Product] Web`
11. Authorized JavaScript origins: `https://[project-ref].supabase.co`
12. Authorized redirect URIs: `https://[project-ref].supabase.co/auth/v1/callback`
13. Click **Create** → copy Client ID + Client Secret

14. Back in Supabase → **Authentication** → **Providers** → **Google**
15. Enable toggle ON
16. Paste Client ID + Client Secret
17. Save

> **Local dev:** Also add `http://localhost:3000` to JavaScript origins, and `http://localhost:3000/auth/callback` to redirect URIs.

### Step 5 — Configure Auth settings in Supabase

Dashboard → **Authentication** → **URL Configuration**:
- Site URL: `http://localhost:3000` (update to production URL when deploying)
- Redirect URLs: add `http://localhost:3000/auth/callback`

Dashboard → **Authentication** → **Email Templates**:
- Optional: customise the verification and password reset emails. Default is fine for MVP.

### Step 6 — Enable Email confirmations

Dashboard → **Authentication** → **Providers** → **Email**:
- Enable "Confirm email" → ON

### Step 7 — Row Level Security check

After running the schema SQL, verify RLS is enabled:
- Go to **Table Editor** → click a table → **RLS** tab → should show "Row Level Security: enabled"
- Do this for: `user_credits`, `user_usage`, `notifications`, and all product tables

---

## Part D — Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. **Domains** → **Add domain** → enter your product domain (e.g. `skillpulse.uneefe.com`)
3. Add the DNS records it shows (TXT + CNAME) to your domain registrar
4. Wait for green checkmarks (usually < 5 minutes)
5. **API Keys** → **Create API Key** → copy to `RESEND_API_KEY`
6. Update `NOREPLY_EMAIL` to `no-reply@[your-verified-domain]`

> **Local dev shortcut:** Set `DISABLE_EMAILS=true` so you don't need domain verification to test locally. You'll still see email content in server logs.

---

## Part E — Vercel Deploy

### First deploy

1. Push your project to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo
3. Framework: **Next.js** (auto-detected)
4. Add all environment variables from Part B (production values)
5. Click **Deploy**

### Custom domain

Vercel dashboard → your project → **Settings** → **Domains**:
- Add `[product].uneefe.com`
- Copy the CNAME/A record → add to uneefe.com DNS
- Wait for SSL propagation

### After deploying

1. Update `NEXT_PUBLIC_APP_URL` to the production URL
2. Update Supabase **Authentication** → **URL Configuration** → Site URL to production URL
3. Update Google OAuth redirect URIs to add the production URL

---

## Part F — Auth Flow Diagram

```
User enters email/password → browser
  ↓
POST /api/auth/signin  (your Next.js server)
  ↓
Rate limit check (5 attempts/min per IP — in-memory)
  ↓
withRetry() → supabase.auth.signInWithPassword()  (server → Supabase — never browser → Supabase)
  ↓
Success: Set auth cookie → return { user }
Fail: Return error message (wrong password / unverified / network)
  ↓
Frontend reads cookie → ProtectedRoute allows access instantly
```

**Google OAuth flow:**

```
User clicks "Sign in with Google" → browser
  ↓
Supabase generates OAuth URL → redirect to Google
  ↓
Google authenticates → redirects to /auth/callback?code=...
  ↓
app/auth/callback/route.ts exchanges code → sets session cookie
  ↓
Redirect to /dashboard
```

**Why the proxy pattern:** In India, some ISPs block WebSocket + HTTP/2 connections directly to Supabase endpoints. Routing all auth through your own server (`/api/auth/*`) eliminates this. Adds one hop but zero reliability issues.

---

## Part G — 8-Day Build Sequence with Verify Steps

### Day 1-2: Foundation

```bash
npx create-next-app@latest [product] --typescript --tailwind --app --src-dir=false
cd [product]
npm install @supabase/supabase-js @supabase/ssr
npx shadcn@latest init
npx shadcn@latest add button card input badge textarea dialog alert-dialog checkbox dropdown-menu skeleton
```

Copy from FloMCP:
- `next.config.js` (IPv4 fix)
- `middleware.ts` (update protected route list)
- `lib/supabase.ts`, `lib/supabase-server.ts`, `lib/supabase-admin.ts`
- `lib/retry.ts`, `lib/rate-limit.ts`, `lib/utils.ts`

Fill `.env.local` with Supabase keys only.

**Verify:** `npm run dev` — no console errors, no TypeScript errors.

---

### Day 3-4: Auth

Copy from FloMCP:
- `components/auth/SignIn.tsx`, `SignUp.tsx`, `ProtectedRoute.tsx`, `UserMenu.tsx`
- `app/api/auth/signin/route.ts`, `signup/`, `signout/`, `reset-password/`
- `app/auth/callback/route.ts`, `confirm/`, `verify-email/`, `reset-password/`
- `lib/validate-email.ts`, `lib/validate-input.ts`

Set up Google OAuth (Part C Step 4). Set `DISABLE_EMAILS=true`.

**Verify:**
- [ ] Signup with email → user appears in Supabase Auth dashboard
- [ ] Sign in → redirects to `/dashboard`
- [ ] `/dashboard` without session → redirects to `/auth/signin`
- [ ] Google OAuth → lands on `/dashboard`
- [ ] Sign out → session cleared

---

### Day 5: Dashboard Shell

Copy from FloMCP:
- `components/dashboard/Sidebar.tsx` (update nav items)
- `components/dashboard/CreditChip.tsx`
- `components/dashboard/NotificationPanel.tsx`
- `app/dashboard/layout.tsx`, `settings/`, `support/`
- `app/api/credits/balance/route.ts`
- `app/api/notifications/route.ts`

**Verify:**
- [ ] Credit chip shows "3 credits" for new user
- [ ] Settings page loads
- [ ] Sign out from user menu works

---

### Day 6-7: Email + Landing

```bash
npm install resend disposable-email-domains
```

Copy `lib/email.ts` → update brand colour + domain.  
Add welcome email in `app/api/auth/signup/route.ts` after successful signup.

Build:
- `app/page.tsx` (landing page — hero + CTA only)
- `app/pricing/page.tsx` (Free / Pro tiers + FAQ)
- `app/legal/` (copy from FloMCP, replace "FloMCP" → product name)

Set `DISABLE_EMAILS=false`. Set up Resend domain (Part D).

**Verify:**
- [ ] New signup → welcome email arrives
- [ ] Landing page renders
- [ ] Pricing page renders

---

### Day 8-10: Core Feature

Build the core product:
- `app/api/[action]/route.ts` (pattern in template.md Part 2.7)
- `app/dashboard/[action]/page.tsx`
- Results display component
- Product-specific DB tables (run SQL in Supabase editor)
- `app/dashboard/history/page.tsx`

**Verify:**
- [ ] Core action runs end-to-end
- [ ] Credits deducted (check Supabase table)
- [ ] Result saved to DB
- [ ] History page shows it

---

### Day 11-12: Payments + Launch

**Lemon Squeezy setup:**
1. [app.lemonsqueezy.com](https://app.lemonsqueezy.com) → create account
2. **Store** → add your product
3. **Products** → create Free + Pro products with monthly pricing
4. Note the **Variant ID** for Pro (you'll pass this to the checkout API)
5. **Settings** → **API** → copy API key
6. **Webhooks** → create webhook pointing to `https://[domain]/api/payments/webhook`
7. Copy webhook secret

```bash
npm install @lemonsqueezy/lemonsqueezy.js
```

Build checkout + webhook routes (pattern in template.md Part 2.6).

**Verify:**
- [ ] Checkout URL generates (test mode)
- [ ] Webhook fires → plan updated to 'pro' in Supabase
- [ ] Pro user bypasses credit limit

**SEO + Deploy:**
- Update `app/layout.tsx` metadata (title, OG image, description)
- Update `app/sitemap.ts`
- Deploy to Vercel
- Update production env vars

---

## Part H — All Dependencies

```bash
# Day 1-2: Core
npm install @supabase/supabase-js @supabase/ssr

# Day 6-7: Email validation
npm install resend disposable-email-domains

# Day 8-10: LLM (if needed)
npm install @anthropic-ai/sdk        # or openai

# Day 11: Payments
npm install @lemonsqueezy/lemonsqueezy.js

# shadcn/ui (run once on Day 1)
npx shadcn@latest init
npx shadcn@latest add button card input badge textarea dialog alert-dialog checkbox dropdown-menu skeleton

# Utility (usually already there)
npm install lucide-react sonner class-variance-authority clsx tailwind-merge
```

---

## Part I — What You Do NOT Need to Set Up

| Skip | Reason |
|---|---|
| Redis / Upstash | In-memory rate limiter handles it for single-instance Vercel |
| Prisma / Drizzle ORM | Supabase client + raw SQL functions are enough |
| NextAuth.js | Supabase Auth + the API proxy handles auth completely |
| Separate Node API server | Next.js API routes handle everything |
| Docker for local dev | Just `npm run dev` with Supabase cloud |
| Lemon Squeezy Day 1 | Add payments on Day 11 — don't slow down the start |
| Custom email server | Resend handles everything |
| pgvector / vector DB | Phase 2+ feature — skip for MVP |
