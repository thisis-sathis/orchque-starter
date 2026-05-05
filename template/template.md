# Micro-SaaS Product Template
## From FloMCP Codebase — Battle-Tested, Production-Ready

*Source: flomcp/ (production — every piece has been debugged and run live)*  
*Last updated: April 24, 2026*

> **How to use this:** Read the stack decision. Then use the file list to copy what you need. Parts 1-2 = what to copy. Parts 3-6 = patterns + schema. Part 7 = SkillPulse-specific map. See `setup-guide.md` for accounts, env keys, and day-by-day build sequence.

---

## Stack Decision (Lock This In)

```
Frontend:   Next.js 14 App Router + TypeScript
Styling:    Tailwind CSS + shadcn/ui
Auth:       Supabase Auth (email + Google OAuth)
Database:   Supabase (Postgres + RLS)
Email:      Resend
Payments:   Lemon Squeezy  ← India-friendly, handles GST/VAT automatically
Hosting:    Vercel (frontend) + Supabase (db/auth)
```

**Why Lemon Squeezy over Stripe:**
- Accepts UPI, Indian debit/credit cards, international cards — no Stripe India friction
- Acts as Merchant of Record — they handle GST, EU VAT, sales tax for you
- No GST registration required on your side until you cross ₹20L threshold
- Simple checkout: generate a URL → redirect user → done
- Webhooks are identical pattern to Stripe

> **Don't change this stack per product.** Each product makes the next faster. Changing stack resets the clock.

---

## Part 1 — Copy Verbatim (Zero Changes Needed)

These files work for any product. Copy, update the product name/URL, done.

### 1.1 IPv4 Fix — `next.config.js`

```js
// Fix ConnectTimeoutError on Windows (undici IPv6 hanging issue)
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const { Agent, setGlobalDispatcher } = require("undici");
setGlobalDispatcher(new Agent({ connect: { family: 4 } }));

const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["undici"],
};
module.exports = nextConfig;
```

**Why:** Without this, Supabase calls hang for 10s on Windows due to IPv6 DNS resolution. Copy exactly.

---

### 1.2 Auth Middleware — `middleware.ts`

Full file from FloMCP. Strategy:
- No session cookie → **zero network calls** (anonymous users feel nothing)
- Session cookie exists → `getSession()` decodes JWT locally (instant)
- Only makes network call when token is expired and needs refresh
- Protects `/dashboard` → redirect to `/auth/signin`
- Signed-in users on auth pages → redirect to `/dashboard`

**Change only:** The protected route paths (if your dashboard lives elsewhere).

---

### 1.3 Supabase Clients

Three files, copy all three:

| File | Use |
|---|---|
| `lib/supabase.ts` | Browser client — cookies-based, 5s timeout |
| `lib/supabase-server.ts` | Server components + API routes — 12s timeout, IPv4 |
| `lib/supabase-admin.ts` | Service role — bypasses RLS for admin ops |

The timeout values and cookie patterns are tuned. Don't adjust unless you have a reason.

---

### 1.4 Retry Logic — `lib/retry.ts`

```typescript
withRetry(async () => {
  const result = await supabase.auth.signInWithPassword({ email, password });
  throwIfRetryable(result.error); // network error → throw → retry
  return result;
}, { maxRetries: 2, initialDelayMs: 1000 })
```

Handles: `AuthRetryableFetchError`, `AbortError`, `Failed to fetch`, `ECONNREFUSED`, `ECONNRESET`, socket hang-ups. Does NOT retry application errors (wrong password = don't retry).

Copy verbatim. Use everywhere you call Supabase from a server route.

---

### 1.5 In-Memory Rate Limiter — `lib/rate-limit.ts`

Sliding window, per-IP, no Redis needed. Works for single-instance Vercel deployments.

```typescript
const ip = getClientIP(request);
const rl = checkRateLimit(`signin:${ip}`, { maxRequests: 5, windowMs: 60000 });
if (!rl.allowed) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
```

Cleans up stale entries automatically every 5 minutes. Copy verbatim.

---

### 1.6 Email System — `lib/email.ts`

Resend wrapper with branded HTML shell. Copy the full file, update:
- `BRAND` color (hex)
- `fromAddress` (your product domain)
- Footer link

The `emailShell()` / `infoBox()` helpers produce clean notification emails. Reuse for:
- Welcome email on signup
- Action complete notification (scan done, etc.)
- Weekly digest
- Payment confirmation

---

### 1.7 Email Validation — `lib/validate-email.ts`

3-layer validation:
1. RFC-compliant regex
2. 3,500+ disposable domain blocklist (`disposable-email-domains` npm package)
3. Live MX record DNS lookup

Use in every signup route. Eliminates throwaway addresses before they ever hit your DB.

---

### 1.8 Input Validation — `lib/validate-input.ts`

Gibberish detection before sending to LLM API. Checks:
- Vowel ratio (gibberish < 0.20)
- Longest consonant run (> 4 = likely keysmash)
- Common English word presence

Prevents wasted LLM API calls from garbage input.

---

### 1.9 Auth Components

| Component | What It Does |
|---|---|
| `components/auth/SignIn.tsx` | Email + Google OAuth login, forgot password, network error handling |
| `components/auth/SignUp.tsx` | Registration with email verification flow |
| `components/auth/ProtectedRoute.tsx` | Client-side auth guard, reads from cookie (instant — no flash) |
| `components/auth/UserMenu.tsx` | Dropdown: profile, settings, sign out |

Copy all four. Update branding only.

---

### 1.10 Auth API Proxy Routes

```
app/api/auth/signin/route.ts      — POST email+password → Supabase (rate limited: 5/min)
app/api/auth/signup/route.ts      — POST register → Supabase (rate limited: 3/min)
app/api/auth/signout/route.ts     — POST → clear cookies
app/api/auth/reset-password/      — POST email → send reset link
app/auth/callback/route.ts        — OAuth redirect handler (Google + email verify)
app/auth/confirm/                 — Email confirmation handler
app/auth/verify-email/            — "Check your inbox" page
app/auth/reset-password/          — Password reset form
```

**Why proxy pattern:** Browser → Supabase fails in some ISP configs. Server → Supabase always works. All auth goes through your own API. Rate limiting included on every route.

---

### 1.11 Legal Pages

```
app/legal/privacy-policy/
app/legal/terms-of-service/
app/legal/acceptable-use/
app/legal/refund-policy/
```

Replace "FloMCP" with your product name. You need these before charging anyone.

---

### 1.12 SEO Setup

**`app/layout.tsx` metadata block:** title, description, keywords, OpenGraph, Twitter card, canonical URL, metadataBase.

**`app/sitemap.ts`** — returns all public routes with `changeFrequency` and `priority`.

**`app/robots.ts`** — disallows `/api/`, `/dashboard/`, `/auth/` — allows everything public.

Update URLs and page list only. Structure is reusable as-is.

---

### 1.13 UI Component Library

Copy the full `components/ui/` folder from FloMCP:

```
button.tsx, card.tsx, input.tsx, badge.tsx, textarea.tsx,
dialog.tsx, alert-dialog.tsx, checkbox.tsx, dropdown-menu.tsx,
skeleton.tsx, sonner.tsx (toast notifications)
```

Plus `lib/utils.ts` (cn() helper) and `components.json` (shadcn config).

---

## Part 2 — Adapt Per Product

These files have product-specific logic but the **structure and pattern** are the template.

### 2.1 Credits System

**FloMCP pattern — production-proven:**

```
lib/credits.ts           → Client-side tier estimation (cost calculation before action)
lib/credits-service.ts   → Server-side deduct/refund (uses admin client + SQL functions)
app/api/credits/balance/ → GET current balance (force-dynamic, never cached)
```

**Database tables:**
```sql
user_credits (
  user_id         UUID PRIMARY KEY,
  plan            TEXT DEFAULT 'free',    -- 'free' | 'pro'
  monthly_credits INTEGER DEFAULT 3,      -- resets monthly for pro
  bonus_credits   INTEGER DEFAULT 0,      -- never expire (top-ups, early adopter)
  month_reset_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
)
```

**Atomic SQL functions (critical — prevents race conditions):**
- `check_and_deduct_credits(user_id, amount)` — single DB call, never double-spends
- `refund_credits(user_id, amount)` — used when the core action fails after deduction

**Per-product adaptation:**
- Change `monthly_credits` default (3 for SkillPulse, 3 for FloMCP free)
- Rename `generation_count_month` → `scan_count_month` for SkillPulse
- Pro: unlimited (just check `plan = 'pro'`, skip credit deduction)

---

### 2.2 Rate Limiter (DB-backed, per user)

Two rate limiters in FloMCP:

1. **In-memory** (`rate-limit.ts`) — auth routes, per IP, no DB needed
2. **DB-backed** (`rate-limiter.ts`) — core action routes, per user, hourly/daily windows

The DB-backed one reads from `user_usage` table. Rename `generation_*` columns to match your action (`scan_*`). The tier/hour/day logic is identical.

---

### 2.3 Dashboard Structure

```
app/dashboard/
  layout.tsx   → Sidebar wrapper (no repeated imports per page)
  page.tsx     → Home: stats cards + quick action CTA
  [action]/    → Core action page (scan/, generate/, etc.)
  history/     → Past results list
  settings/    → Profile + plan + sign out
  support/     → Help / feedback
```

**Stats cards pattern:**
- Stat 1: Core action count this month
- Stat 2: Quality metric (avg score)
- Stat 3: Credit/scan balance remaining
- CTA: Primary action button in top-right

---

### 2.4 Notifications System

```sql
notifications (
  id         UUID,
  user_id    UUID,
  type       TEXT,   -- e.g. 'drift_alert' | 'scan_complete' | 'upgrade'
  title      TEXT,
  message    TEXT,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ
)
```

`NotificationPanel` component + badge on sidebar shows unread count. Copy both, update the `type` values for your product's events.

---

### 2.5 Pricing Page

```typescript
const FREE_FEATURES = [
  "X free [actions] — no card required",
  "[Key output] — [value prop]",
  "[Feature 3]",
]

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited [actions]",
  "[History / versioning]",
  "[Alerts / automation]",
]

const FAQ = [
  { q: "What counts as a [scan/credit]?", a: "..." },
  { q: "Can I cancel anytime?", a: "Yes — cancel from settings, access until period ends." },
]
```

Always include an FAQ section. Reduces checkout drop-off.

---

### 2.6 Payments — Lemon Squeezy

Lemon Squeezy is simpler than Stripe. Checkout is just a URL redirect.

**Pattern for upgrade flow:**

```typescript
// app/api/payments/checkout/route.ts
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
  const { userId, userEmail, variantId } = await request.json();

  lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! });

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,  // your Pro plan variant ID from LS dashboard
    {
      checkoutData: {
        email: userEmail,
        custom: { user_id: userId },  // passed back in webhook
      },
      checkoutOptions: {
        embed: false,
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
        receiptButtonText: "Go to Dashboard",
      },
    }
  );

  return NextResponse.json({ url: checkout.data?.data.attributes.url });
}
```

**Webhook to upgrade user plan:**

```typescript
// app/api/payments/webhook/route.ts
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  // Verify webhook signature
  const isValid = await verifyWebhookSignature(rawBody, signature, process.env.LEMONSQUEEZY_WEBHOOK_SECRET!);
  if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const event = JSON.parse(rawBody);

  if (event.meta.event_name === "order_created") {
    const userId = event.meta.custom_data?.user_id;
    if (userId) {
      // Upgrade user to pro in Supabase
      const admin = createAdminClient();
      await admin.from("user_credits").update({ plan: "pro", monthly_credits: 999 }).eq("user_id", userId);
    }
  }

  return NextResponse.json({ ok: true });
}
```

**Env vars needed:**
```bash
LEMONSQUEEZY_API_KEY=          # from LS dashboard → API → Keys
LEMONSQUEEZY_STORE_ID=         # from LS dashboard → Settings → Store ID
LEMONSQUEEZY_WEBHOOK_SECRET=   # from LS dashboard → Webhooks → your webhook
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=  # same as above, for client-side checkout links
```

**npm:** `npm install @lemonsqueezy/lemonsqueezy.js`

---

### 2.7 Core Action API Route

**Pattern — copy the structure, replace the logic:**

```typescript
// app/api/[action]/route.ts
export async function POST(request: Request) {
  // 1. Auth check
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Rate limit check (in-memory, per IP)
  const ip = getClientIP(request);
  const rl = checkRateLimit(`action:${ip}`, { maxRequests: 10, windowMs: 60000 });
  if (!rl.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  // 3. Input validation
  const body = await request.json();
  const validation = validateInput(body);
  if (!validation.valid) return NextResponse.json({ error: validation.reason }, { status: 422 });

  // 4. Credit check + deduct (atomic — prevents double-spend)
  const admin = createAdminClient();
  const deduct = await admin.rpc("check_and_deduct_credits", { p_user_id: user.id, p_amount: 1 });
  if (!deduct.data?.ok) {
    return NextResponse.json({ error: "No credits remaining", code: "upgrade_required" }, { status: 402 });
  }

  // 5. Run product logic
  try {
    const result = await runYourProductLogic(body);
    await admin.from("results").insert({ user_id: user.id, ...result });
    return NextResponse.json(result);
  } catch (err) {
    // 6. Refund on failure
    await admin.rpc("refund_credits", { p_user_id: user.id, p_amount: 1 });
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
```

---

## Part 3 — Database Schema Template

Run this in every new Supabase project. Add product-specific tables on top.

```sql
-- ── User credits ──────────────────────────────────────────────
CREATE TABLE user_credits (
  user_id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan            TEXT NOT NULL DEFAULT 'free',
  monthly_credits INTEGER NOT NULL DEFAULT 3,
  bonus_credits   INTEGER NOT NULL DEFAULT 0,
  month_reset_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON user_credits USING (auth.uid() = user_id);

-- ── Usage tracking ────────────────────────────────────────────
CREATE TABLE user_usage (
  user_id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier                       TEXT NOT NULL DEFAULT 'free',
  email_verified             BOOLEAN DEFAULT FALSE,
  tos_accepted               BOOLEAN DEFAULT FALSE,
  action_count_month         INTEGER DEFAULT 0,
  actions_last_hour          INTEGER DEFAULT 0,
  actions_last_day           INTEGER DEFAULT 0,
  last_action_at             TIMESTAMPTZ,
  last_action_cooldown_until TIMESTAMPTZ,
  month_reset_at             TIMESTAMPTZ
);
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON user_usage USING (auth.uid() = user_id);

-- ── Notifications ─────────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  message    TEXT,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON notifications USING (auth.uid() = user_id);

-- ── Atomic credit deduction ───────────────────────────────────
CREATE OR REPLACE FUNCTION check_and_deduct_credits(
  p_user_id UUID,
  p_amount  INTEGER
) RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  v_monthly      INTEGER;
  v_bonus        INTEGER;
  v_monthly_used INTEGER := 0;
  v_bonus_used   INTEGER := 0;
BEGIN
  SELECT monthly_credits, bonus_credits
    INTO v_monthly, v_bonus
    FROM user_credits
   WHERE user_id = p_user_id FOR UPDATE;

  IF (v_monthly + v_bonus) < p_amount THEN
    RETURN jsonb_build_object('ok', false, 'error', 'insufficient_credits');
  END IF;

  IF v_monthly >= p_amount THEN
    v_monthly_used := p_amount;
  ELSE
    v_monthly_used := v_monthly;
    v_bonus_used   := p_amount - v_monthly;
  END IF;

  UPDATE user_credits
     SET monthly_credits = monthly_credits - v_monthly_used,
         bonus_credits   = bonus_credits   - v_bonus_used
   WHERE user_id = p_user_id;

  RETURN jsonb_build_object(
    'ok', true,
    'monthly_used', v_monthly_used,
    'bonus_used',   v_bonus_used,
    'balance_after', (v_monthly - v_monthly_used) + (v_bonus - v_bonus_used)
  );
END;
$$;

-- ── Refund credits (call on failed action) ────────────────────
CREATE OR REPLACE FUNCTION refund_credits(
  p_user_id UUID,
  p_amount  INTEGER
) RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE user_credits
     SET bonus_credits = bonus_credits + p_amount
   WHERE user_id = p_user_id;
END;
$$;

-- ── Auto-create rows on signup ────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO user_credits (user_id, plan, monthly_credits, bonus_credits)
  VALUES (NEW.id, 'free', 3, 0)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO user_usage (user_id, tier, email_verified)
  VALUES (NEW.id, 'free', FALSE)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

---

## Part 4 — Folder Structure to Create

```
[product]/
├── next.config.js              ← COPY from FloMCP (verbatim)
├── middleware.ts               ← COPY from FloMCP (update protected routes)
├── tailwind.config.ts          ← COPY from FloMCP
├── components.json             ← COPY from FloMCP (shadcn config)
├── .env.local.example          ← see setup-guide.md
│
├── app/
│   ├── layout.tsx              ← ADAPT (product name, URL, OG image)
│   ├── page.tsx                ← BUILD (landing page)
│   ├── globals.css             ← COPY from FloMCP
│   ├── robots.ts               ← COPY (update domain)
│   ├── sitemap.ts              ← ADAPT (update URLs)
│   │
│   ├── auth/
│   │   ├── signin/page.tsx     ← COPY (update logo)
│   │   ├── signup/page.tsx     ← COPY
│   │   ├── callback/route.ts   ← COPY VERBATIM
│   │   ├── confirm/            ← COPY VERBATIM
│   │   ├── verify-email/       ← COPY VERBATIM
│   │   └── reset-password/     ← COPY VERBATIM
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/         ← COPY VERBATIM
│   │   │   ├── signup/         ← COPY VERBATIM
│   │   │   ├── signout/        ← COPY VERBATIM
│   │   │   └── reset-password/ ← COPY VERBATIM
│   │   ├── credits/balance/    ← COPY VERBATIM
│   │   ├── payments/
│   │   │   ├── checkout/       ← BUILD (Lemon Squeezy checkout — see 2.6)
│   │   │   └── webhook/        ← BUILD (Lemon Squeezy webhook — see 2.6)
│   │   ├── [action]/           ← BUILD (core product endpoint — see 2.7)
│   │   └── notifications/      ← COPY (update notification types)
│   │
│   ├── dashboard/
│   │   ├── layout.tsx          ← ADAPT (update nav items)
│   │   ├── page.tsx            ← ADAPT (update stats + CTA)
│   │   ├── [action]/           ← BUILD (main product UI)
│   │   ├── history/            ← ADAPT (was library/ in FloMCP)
│   │   ├── settings/           ← COPY (update profile fields)
│   │   └── support/            ← COPY
│   │
│   ├── pricing/page.tsx        ← ADAPT (update features + prices)
│   └── legal/                  ← COPY + rename product
│
├── components/
│   ├── Logo.tsx                ← BUILD (your logo)
│   ├── auth/                   ← COPY ALL 4 FILES
│   ├── dashboard/
│   │   ├── Sidebar.tsx         ← ADAPT (update nav items)
│   │   ├── CreditChip.tsx      ← COPY
│   │   ├── NotificationPanel.tsx ← COPY
│   │   └── UsageStats.tsx      ← ADAPT (rename metrics)
│   └── ui/                     ← COPY ALL
│
└── lib/
    ├── supabase.ts             ← COPY VERBATIM
    ├── supabase-server.ts      ← COPY VERBATIM
    ├── supabase-admin.ts       ← COPY VERBATIM
    ├── retry.ts                ← COPY VERBATIM
    ├── rate-limit.ts           ← COPY VERBATIM
    ├── email.ts                ← ADAPT (brand color + domain)
    ├── validate-email.ts       ← COPY VERBATIM
    ├── validate-input.ts       ← COPY VERBATIM
    ├── credits.ts              ← ADAPT (update tier thresholds)
    ├── credits-service.ts      ← ADAPT (update credit amounts)
    └── utils.ts                ← COPY VERBATIM
```

---

## Part 5 — Environment Variables

```bash
# ─── Supabase ─────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only — never expose to browser

# ─── App ──────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000   # prod: https://[product].uneefe.com

# ─── Email (Resend) ───────────────────────────────────────────
RESEND_API_KEY=
NOREPLY_EMAIL=no-reply@[product].uneefe.com
SUPPORT_EMAIL=support@[product].uneefe.com
FOUNDER_EMAIL=your@email.com
DISABLE_EMAILS=false              # set true in local dev

# ─── Admin ────────────────────────────────────────────────────
ADMIN_EMAIL=your@email.com

# ─── AI (only if product makes LLM calls) ─────────────────────
ANTHROPIC_API_KEY=                # Claude
# OPENAI_API_KEY=                 # or OpenAI

# ─── Payments (Lemon Squeezy — add when charging) ─────────────
LEMONSQUEEZY_API_KEY=             # LS dashboard → API → Keys
LEMONSQUEEZY_STORE_ID=            # LS dashboard → Settings → Store ID
LEMONSQUEEZY_WEBHOOK_SECRET=      # LS dashboard → Webhooks → secret
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=  # same as above

# ─── Dev flags ────────────────────────────────────────────────
DISABLE_CREDIT_DEDUCTION=false    # skip deduction during testing
```

---

## Part 6 — Build Order (Every Product)

```
Day 1-2: Foundation
  ✅ npx create-next-app + install deps (see Part 8)
  ✅ Copy next.config.js, middleware.ts, supabase clients, retry, rate-limit, utils
  ✅ Create Supabase project + run base schema SQL (Part 3)
  ✅ Fill .env.local (Supabase keys only — skip LS + Resend for now)
  ✅ VERIFY: npm run dev with no console errors

Day 3-4: Auth
  ✅ Copy all auth components + API proxy routes
  ✅ Set up Google OAuth (see setup-guide.md)
  ✅ Set DISABLE_EMAILS=true (skip email for now)
  ✅ VERIFY: signup → user appears in Supabase → signin → dashboard redirect
  ✅ VERIFY: /dashboard without session → redirects to /auth/signin
  ✅ VERIFY: Google OAuth → lands on /dashboard

Day 5-6: Dashboard Shell
  ✅ Copy Sidebar, CreditChip, NotificationPanel, UsageStats
  ✅ Build dashboard/layout.tsx + page.tsx (placeholder stats OK)
  ✅ Copy settings + support pages
  ✅ VERIFY: credit chip shows "3 credits" → settings → sign out works

Day 7: Email + Landing Page
  ✅ Set up Resend domain + copy lib/email.ts → update brand
  ✅ Add welcome email in signup route
  ✅ Build landing page (hero + CTA)
  ✅ Copy + adapt pricing page
  ✅ Copy legal pages → rename product
  ✅ VERIFY: new signup → welcome email arrives

Day 8-10: Core Product Feature
  ✅ Build /api/[action]/route.ts (pattern in Part 2.7)
  ✅ Build /dashboard/[action]/page.tsx
  ✅ Build results display component
  ✅ Add product-specific DB tables
  ✅ Build history page
  ✅ VERIFY: full flow — action runs → credits deducted → result saved → history shows it

Day 11-12: Payments + Launch
  ✅ Set up Lemon Squeezy product + variant
  ✅ Build checkout + webhook routes (pattern in Part 2.6)
  ✅ Add upgrade gate (show pricing when credits = 0)
  ✅ VERIFY: upgrade flow → webhook fires → plan updated to 'pro'
  ✅ SEO: update layout metadata + sitemap + robots
  ✅ Deploy to Vercel
  ✅ Update Supabase + Google OAuth redirect URLs to production domain
```

---

## Part 7 — SkillPulse Specific Map

### FloMCP → SkillPulse direct mapping

| FloMCP | SkillPulse | Change |
|---|---|---|
| `/api/generate/route.ts` | `/api/scan/route.ts` | Replace LLM generation with skill runner + scorer |
| `generation_count_month` | `scan_count_month` | Rename DB column |
| `MCPServersList` | `ScanHistoryList` | Rename + update data shape |
| `UsageStats` (servers, security score) | `UsageStats` (scans, avg health score) | Update labels + source |
| `library/` | `history/` | Rename folder |
| `generate/` (5-step wizard) | `scan/` (single upload form) | Much simpler — no wizard |
| Credit chip | Scan counter chip | Update label |
| Security report (22 checks) | Health report (3 scores) | Build new ScanReport component |

### SkillPulse-only DB tables

```sql
CREATE TABLE scans (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name     TEXT NOT NULL,
  skill_content  TEXT NOT NULL,
  health_score   INTEGER,
  security_score INTEGER,
  cost_score     INTEGER,
  issues         JSONB DEFAULT '[]',
  token_count    INTEGER,
  cost_per_run   DECIMAL(10,6),
  scanned_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON scans USING (auth.uid() = user_id);
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_scanned_at ON scans(scanned_at DESC);

CREATE TABLE skill_baselines (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name     TEXT NOT NULL,
  skill_hash     TEXT NOT NULL,
  baseline_runs  JSONB NOT NULL,
  established_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_name)
);
ALTER TABLE skill_baselines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON skill_baselines USING (auth.uid() = user_id);
```

### New component: `components/scan/ScanReport.tsx`

```
<ScanReport>
  <ScoreCard label="Health"   score={74} />
  <ScoreCard label="Security" score={62} />
  <ScoreCard label="Cost"     score={91} />
  <IssuesList issues={[...]} />
  <ShareButton reportId={...} />
  <UpgradeGate show={user.plan === 'free'} />
</ScanReport>
```

### What to skip for SkillPulse MVP

- FloMCP's 5-step wizard (generator-store.ts, Step1-5 components)
- Protocol validator (`protocol/validator.ts`) — MCP-specific
- Security report component (32 checks) — replace with ScanReport
- pgvector / embeddings — Phase 2+
- Enterprise contact form — Phase 2

---

## Part 8 — Dependencies to Install

```bash
# Core auth + DB
npm install @supabase/supabase-js @supabase/ssr

# Email
npm install resend disposable-email-domains

# UI
npm install lucide-react sonner class-variance-authority clsx tailwind-merge

# shadcn (run after init)
npx shadcn@latest init
npx shadcn@latest add button card input badge textarea dialog alert-dialog checkbox dropdown-menu skeleton

# Payments (add on Day 11 — not Day 1)
npm install @lemonsqueezy/lemonsqueezy.js
```

---

## Part 9 — Pre-Launch Checklist

```
Auth
  □ Signup → email verify → signin → dashboard  ✓ end-to-end
  □ Google OAuth works  ✓
  □ Password reset email delivers  ✓
  □ /dashboard without session → /auth/signin  ✓
  □ Rate limiting active on all /api/auth/* routes  ✓

Product
  □ Core action runs end-to-end  ✓
  □ Credits deducted on each action  ✓
  □ Results saved to DB  ✓
  □ History page shows past results  ✓
  □ At 0 credits → upgrade gate shows  ✓

Payments
  □ Lemon Squeezy checkout URL generates  ✓
  □ Webhook fires and upgrades plan in DB  ✓
  □ Pro users bypass credit limit  ✓

Email
  □ Welcome email on signup  ✓
  □ DISABLE_EMAILS=false in production  ✓

Legal
  □ Privacy policy, ToS, Acceptable Use live  ✓
  □ Footer links to legal pages  ✓

SEO
  □ title, description, OG image in layout.tsx  ✓
  □ sitemap.ts covers all public pages  ✓
  □ robots.ts disallows /api/ /dashboard/ /auth/  ✓
  □ OG image at /public/og-image.png (1200×630)  ✓

Security
  □ No API keys in client-side code  ✓
  □ Service role key only in server routes  ✓
  □ Rate limiting on auth routes  ✓
  □ Input validation before LLM calls  ✓
  □ Email validation blocks disposable addresses  ✓
```

---

## Quick Reference — Source of Each Pattern

| Pattern | Source | Status |
|---|---|---|
| `next.config.js` IPv4 fix | FloMCP production | ✅ Fixed real 10s timeout bug |
| `middleware.ts` cookie-first auth | FloMCP production | ✅ Zero latency for anon users |
| Auth API proxy (signin/signup) | FloMCP production | ✅ Eliminates browser→Supabase failures |
| `retry.ts` exponential backoff | FloMCP production | ✅ Handles flaky ISP connections |
| `rate-limit.ts` sliding window | FloMCP production | ✅ Prevents auth brute force |
| `validate-email.ts` 3-layer | FloMCP production | ✅ Blocks disposable emails |
| `validate-input.ts` gibberish | FloMCP production | ✅ Prevents wasted LLM API calls |
| `credits-service.ts` atomic SQL | FloMCP production | ✅ No double-spending race conditions |
| `email.ts` Resend wrapper | FloMCP production | ✅ Branded HTML emails working |
| `ProtectedRoute.tsx` instant | FloMCP production | ✅ No auth flash |
| Lemon Squeezy checkout + webhook | Pattern (not yet built) | ⚠️ Build fresh — simpler than Stripe |
