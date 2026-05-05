# Template App Build Plan
## One reusable Next.js starter — spin up any micro-SaaS in days, not weeks

*Last updated: April 24, 2026*  
*Stack: Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui + Supabase + Resend*  
*Reference documents: `template.md` (components) · `setup-guide.md` (env + accounts)*

---

## What We're Building

A real, working Next.js project — not a document, not boilerplate stubs. A complete app where:

- Every page is built and working with placeholder content
- All auth flows work end-to-end
- Support tickets work
- Settings work
- Payments: placeholder UI only — wired up per product, not in template
- The "product page" is a blank slot — you drop in your product feature and the rest is done

**Target directory:** `s:\Engineering\2026\one\saas-template\`

**To start a new product from this template:**
1. Copy the folder, rename it
2. Edit `lib/config.ts` (product name, colors, pricing)
3. Replace `app/dashboard/product/` with your feature
4. Replace `/api/action/` with your core logic
5. Done — everything else works

---

## Complete File Map

Every file that will exist in the finished template.

```
saas-template/
│
├── next.config.js                          ← COPY from FloMCP (IPv4 fix)
├── middleware.ts                           ← COPY from FloMCP (update route list)
├── tailwind.config.ts                      ← COPY from FloMCP
├── components.json                         ← COPY from FloMCP (shadcn config)
├── tsconfig.json                           ← standard Next.js TS config
├── .env.local.example                      ← template env file
├── .gitignore                              ← exclude .env.local
│
├── lib/
│   ├── config.ts                           ← BUILD NEW — single file for all product config
│   ├── supabase.ts                         ← COPY from FloMCP
│   ├── supabase-server.ts                  ← COPY from FloMCP
│   ├── supabase-admin.ts                   ← COPY from FloMCP
│   ├── retry.ts                            ← COPY from FloMCP
│   ├── rate-limit.ts                       ← COPY from FloMCP
│   ├── email.ts                            ← COPY from FloMCP (update brand)
│   ├── validate-email.ts                   ← COPY from FloMCP
│   ├── validate-input.ts                   ← COPY from FloMCP
│   ├── credits.ts                          ← COPY from FloMCP
│   ├── credits-service.ts                  ← COPY from FloMCP
│   └── utils.ts                            ← COPY from FloMCP (cn() helper)
│
├── app/
│   ├── layout.tsx                          ← BUILD (metadata from config.ts)
│   ├── globals.css                         ← COPY from FloMCP
│   ├── page.tsx                            ← BUILD (landing page assembler)
│   ├── robots.ts                           ← COPY from FloMCP
│   ├── sitemap.ts                          ← BUILD (list all public routes)
│   │
│   ├── auth/
│   │   ├── signin/page.tsx                 ← COPY from FloMCP
│   │   ├── signup/page.tsx                 ← COPY from FloMCP
│   │   ├── callback/route.ts               ← COPY VERBATIM from FloMCP
│   │   ├── confirm/route.ts                ← COPY VERBATIM from FloMCP
│   │   ├── verify-email/page.tsx           ← COPY from FloMCP
│   │   └── reset-password/page.tsx         ← COPY from FloMCP
│   │
│   ├── pricing/
│   │   └── page.tsx                        ← BUILD (pricing cards + FAQ)
│   │
│   ├── legal/
│   │   ├── privacy-policy/page.tsx         ← COPY from FloMCP (replace product name)
│   │   ├── terms-of-service/page.tsx       ← COPY from FloMCP
│   │   ├── acceptable-use/page.tsx         ← COPY from FloMCP
│   │   └── refund-policy/page.tsx          ← COPY from FloMCP
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                      ← BUILD (sidebar wrapper)
│   │   ├── page.tsx                        ← BUILD (stats home)
│   │   ├── product/
│   │   │   └── page.tsx                    ← BUILD PLACEHOLDER (drop product here)
│   │   ├── history/
│   │   │   └── page.tsx                    ← BUILD (results list)
│   │   ├── settings/
│   │   │   └── page.tsx                    ← BUILD (profile + plan tabs)
│   │   └── support/
│   │       └── page.tsx                    ← BUILD (ticket list + new ticket form)
│   │
│   └── api/
│       ├── auth/
│       │   ├── signin/route.ts             ← COPY VERBATIM from FloMCP
│       │   ├── signup/route.ts             ← COPY VERBATIM from FloMCP
│       │   ├── signout/route.ts            ← COPY VERBATIM from FloMCP
│       │   └── reset-password/route.ts     ← COPY VERBATIM from FloMCP
│       ├── credits/
│       │   └── balance/route.ts            ← COPY VERBATIM from FloMCP
│       ├── notifications/
│       │   └── route.ts                    ← COPY from FloMCP
│       ├── support/
│       │   ├── tickets/route.ts            ← BUILD NEW (GET list, POST new ticket)
│       │   └── tickets/[id]/route.ts       ← BUILD NEW (GET detail, PATCH status)
│       ├── payments/
│       │   └── checkout/route.ts           ← PLACEHOLDER (returns 501 Not Implemented)
│       └── action/
│           └── route.ts                    ← BUILD PLACEHOLDER (drop product logic here)
│
└── components/
    ├── Logo.tsx                            ← BUILD (reads product name from config)
    │
    ├── marketing/
    │   ├── Navbar.tsx                      ← BUILD NEW
    │   ├── Hero.tsx                        ← BUILD NEW
    │   ├── Features.tsx                    ← BUILD NEW
    │   ├── PricingSection.tsx              ← BUILD NEW (summary — links to /pricing)
    │   └── Footer.tsx                      ← BUILD NEW
    │
    ├── auth/
    │   ├── SignIn.tsx                      ← COPY from FloMCP
    │   ├── SignUp.tsx                      ← COPY from FloMCP
    │   ├── ProtectedRoute.tsx              ← COPY from FloMCP
    │   └── UserMenu.tsx                    ← COPY from FloMCP
    │
    ├── dashboard/
    │   ├── Sidebar.tsx                     ← COPY + ADAPT from FloMCP
    │   ├── MobileSidebar.tsx               ← BUILD NEW (sheet-based mobile nav)
    │   ├── CreditChip.tsx                  ← COPY from FloMCP
    │   ├── NotificationPanel.tsx           ← COPY from FloMCP
    │   ├── StatsCard.tsx                   ← BUILD NEW (reusable stat card)
    │   └── EmptyState.tsx                  ← BUILD NEW (empty history / no actions)
    │
    ├── product/
    │   ├── ProductInput.tsx                ← BUILD PLACEHOLDER (textarea + submit)
    │   ├── ProductResult.tsx               ← BUILD PLACEHOLDER (result display)
    │   └── UpgradeGate.tsx                 ← BUILD NEW (shown when credits = 0)
    │
    ├── support/
    │   ├── TicketForm.tsx                  ← BUILD NEW (subject, category, message)
    │   ├── TicketList.tsx                  ← BUILD NEW (list with status badges)
    │   └── TicketDetail.tsx                ← BUILD NEW (ticket + message thread)
    │
    ├── settings/
    │   ├── ProfileForm.tsx                 ← BUILD NEW (name, email)
    │   ├── PlanCard.tsx                    ← BUILD NEW (current plan, upgrade CTA)
    │   └── DangerZone.tsx                  ← BUILD NEW (delete account)
    │
    └── ui/                                 ← COPY ALL from FloMCP (shadcn components)
        button.tsx, card.tsx, input.tsx, badge.tsx, textarea.tsx,
        dialog.tsx, alert-dialog.tsx, checkbox.tsx, dropdown-menu.tsx,
        select.tsx, tabs.tsx, separator.tsx, skeleton.tsx, sonner.tsx
```

---

## The One Config File — `lib/config.ts`

This is the only file you edit when cloning for a new product. Everything else reads from it.

```typescript
// lib/config.ts — edit this for each new product
export const PRODUCT = {
  name:        "Your Product",
  tagline:     "What your product does in one sentence.",
  description: "Longer SEO description for meta tags.",
  url:         process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  domain:      "yourproduct.uneefe.com",
  supportEmail:"support@yourproduct.uneefe.com",
  color: {
    primary:   "#6366f1",  // indigo — change per brand
    hex:       "6366f1",   // same, no hash (for email templates)
  },
  nav: {
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing",  href: "/pricing" },
    ],
  },
  pricing: {
    free: {
      name:       "Free",
      price:      0,
      actions:    3,
      actionLabel:"scans",
      features:   ["3 free scans/month", "Full report", "No card required"],
    },
    pro: {
      name:       "Pro",
      price:      9,          // USD/month
      currency:   "USD",
      variantId:  "",         // fill when adding payments per product
      features:   ["Unlimited scans", "Full history", "Priority support"],
    },
  },
  hero: {
    headline:   "Your headline goes here",
    subhead:    "Your supporting copy explaining what you do and for whom.",
    cta:        "Get Started Free",
    ctaHref:    "/auth/signup",
    secondaryCta:      "See Pricing",
    secondaryCtaHref:  "/pricing",
  },
  features: [
    { icon: "Zap",    title: "Feature One",   description: "What it does." },
    { icon: "Shield", title: "Feature Two",   description: "What it does." },
    { icon: "BarChart",title:"Feature Three", description: "What it does." },
  ],
} as const;

export const CREDITS = {
  FREE_MONTHLY:  3,
  PRO_MONTHLY:   999,   // effectively unlimited
  COST_PER_ACTION: 1,   // credits deducted per core action
} as const;
```

**One search-replace for product name. Done.**

---

## Database Schema — Full Template

Run all of this in Supabase SQL Editor when starting a new project.

```sql
-- ════════════════════════════════════════════════════
-- TEMPLATE BASE SCHEMA — run once per new product
-- ════════════════════════════════════════════════════

-- ── Profiles (extended user info) ────────────────────
CREATE TABLE profiles (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON profiles USING (auth.uid() = user_id);

-- ── Credits (usage gate) ──────────────────────────────
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

-- ── Usage tracking (rate limiting + analytics) ────────
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

-- ── Notifications ─────────────────────────────────────
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

-- ── Support tickets ────────────────────────────────────
CREATE TABLE support_tickets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject    TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'general',  -- general | billing | bug | feature
  status     TEXT NOT NULL DEFAULT 'open',     -- open | in_progress | resolved | closed
  priority   TEXT NOT NULL DEFAULT 'normal',   -- low | normal | high
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON support_tickets USING (auth.uid() = user_id);

-- ── Support messages (ticket thread) ─────────────────
CREATE TABLE support_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id  UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES auth.users(id),
  message    TEXT NOT NULL,
  is_staff   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own" ON support_messages
  USING (auth.uid() = user_id OR
         EXISTS (SELECT 1 FROM support_tickets t WHERE t.id = ticket_id AND t.user_id = auth.uid()));

-- ════════════════════════════════════════════════════
-- ATOMIC FUNCTIONS
-- ════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION check_and_deduct_credits(p_user_id UUID, p_amount INTEGER)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  v_monthly INTEGER; v_bonus INTEGER;
  v_monthly_used INTEGER := 0; v_bonus_used INTEGER := 0;
BEGIN
  SELECT monthly_credits, bonus_credits INTO v_monthly, v_bonus
    FROM user_credits WHERE user_id = p_user_id FOR UPDATE;
  IF (v_monthly + v_bonus) < p_amount THEN
    RETURN jsonb_build_object('ok', false, 'error', 'insufficient_credits');
  END IF;
  IF v_monthly >= p_amount THEN v_monthly_used := p_amount;
  ELSE v_monthly_used := v_monthly; v_bonus_used := p_amount - v_monthly; END IF;
  UPDATE user_credits
     SET monthly_credits = monthly_credits - v_monthly_used,
         bonus_credits   = bonus_credits   - v_bonus_used
   WHERE user_id = p_user_id;
  RETURN jsonb_build_object('ok', true, 'balance_after', (v_monthly - v_monthly_used) + (v_bonus - v_bonus_used));
END; $$;

CREATE OR REPLACE FUNCTION refund_credits(p_user_id UUID, p_amount INTEGER)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE user_credits SET bonus_credits = bonus_credits + p_amount WHERE user_id = p_user_id;
END; $$;

-- ── Auto-provision rows on signup ─────────────────────
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles    (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO user_credits(user_id, plan, monthly_credits) VALUES (NEW.id, 'free', 3) ON CONFLICT DO NOTHING;
  INSERT INTO user_usage  (user_id, tier) VALUES (NEW.id, 'free') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

---

## Page-by-Page Spec

### Landing Page — `app/page.tsx`

Assembles marketing sections in order:
```
<Navbar />              ← sticky, blurs on scroll
<Hero />               ← headline + CTA + visual
<Features />           ← 3-column feature grid
<PricingSection />     ← simplified 2-col (Free / Pro) + "View full pricing" link
<Footer />             ← links + legal + tagline
```

### Navbar — `components/marketing/Navbar.tsx`

```
[Logo]    Features · Pricing    [Sign In]  [Get Started →]
```

- Sticky top, `backdrop-blur` on scroll
- Mobile: hamburger → sheet menu
- When user is signed in: replace Sign In / Get Started with [Go to Dashboard]
- Reads nav links from `PRODUCT.nav.links` in config.ts

### Hero — `components/marketing/Hero.tsx`

```
Badge: "Free to start · No card required"
Headline:  PRODUCT.hero.headline
Subhead:   PRODUCT.hero.subhead
Buttons:   [Get Started Free]  [See Pricing]
Visual:    screenshot / animated demo placeholder (replace per product)
```

### Features — `components/marketing/Features.tsx`

Reads `PRODUCT.features` array from config.ts. Renders icon + title + description in a 3-column grid. Zero code change needed per product — just update config.ts.

### PricingSection — `components/marketing/PricingSection.tsx`

2-column simplified cards (Free + Pro). Reads pricing from config.ts. CTA button on Pro card links to `/pricing`. Includes "No credit card required" trust line under Free. Upgrade button is a placeholder — wire to payment provider per product.

### Footer — `components/marketing/Footer.tsx`

```
[Logo + tagline]
Product: Features · Pricing · Dashboard
Legal: Privacy · Terms · Acceptable Use · Refund
Contact: support@...
© 2026 Product Name. All rights reserved.
```

---

### Sign In — `app/auth/signin/page.tsx`

Form: email + password + "Forgot password?" link.
Google OAuth button.
Network error display (for ISP connectivity issues — FloMCP pattern).
Redirects to `/dashboard` on success.

### Sign Up — `app/auth/signup/page.tsx`

Form: email + password.
"Creating your account..." loading state.
On success → `/auth/verify-email` (check inbox page).
Google OAuth button (goes directly to dashboard — no email verify needed).

### Verify Email — `app/auth/verify-email/page.tsx`

Static page: "Check your inbox. Click the link we sent to [email]."
"Resend email" button (calls `/api/auth/resend`).

### Reset Password — `app/auth/reset-password/page.tsx`

Two states:
1. Email input (request reset link)
2. New password input (when user arrives from email link with `?code=`)

---

### Dashboard Layout — `app/dashboard/layout.tsx`

Renders `<Sidebar />` + `<MobileSidebar />` (for mobile). Wraps `{children}`.  
No auth check here — `middleware.ts` handles the redirect.

### Dashboard Home — `app/dashboard/page.tsx`

```
[Welcome back, {name}]
[StatsCard: Actions this month]  [StatsCard: Credits remaining]  [StatsCard: Avg score]
[Quick action CTA: big button → /dashboard/product]
[Recent results: last 3 from history — or EmptyState if none]
```

Sidebar nav items:
```
🏠 Home             → /dashboard
⚡ [Product Action] → /dashboard/product
📋 History          → /dashboard/history
── (divider) ──
💳 Settings         → /dashboard/settings
🎫 Support          → /dashboard/support
```

### Product Page — `app/dashboard/product/page.tsx`

This is the slot. Template ships with a placeholder:
```
<ProductInput />    ← textarea + submit button
<ProductResult />   ← shows result after submit (skeleton → result)
<UpgradeGate />     ← renders when credits = 0, hides result
```

When you use the template for a new product:
- Replace `ProductInput.tsx` content with your input UI
- Replace `ProductResult.tsx` with your result display
- Replace `/api/action/route.ts` with your logic
- Nothing else changes

### History Page — `app/dashboard/history/page.tsx`

```
[Search/filter bar]
[Result cards: date, preview, score/status, View button]
[EmptyState when no results: "Run your first [action] to see results here."]
[Pagination: 20 per page]
```

Reads from a generic `action_results` table (template) or product-specific table.

### Settings Page — `app/dashboard/settings/page.tsx`

Three tabs:
1. **Profile** — full name, email (read-only after Google OAuth), avatar URL
2. **Plan** — current plan badge, credits remaining, Upgrade button (placeholder — disabled with TODO comment)
3. **Account** — sign out button, delete account (with confirmation dialog)

### Support Page — `app/dashboard/support/page.tsx`

```
[New Ticket button]  →  opens TicketForm dialog
[TicketList: subject · category · status badge · date · View]
[TicketDetail: click a ticket → thread view with reply]
```

TicketForm fields:
- Subject (text input)
- Category (select: General / Billing / Bug / Feature Request)
- Message (textarea, min 20 chars)

Status badges: `open` (blue) · `in_progress` (yellow) · `resolved` (green) · `closed` (grey)

---

## API Routes Spec

### `/api/support/tickets` — GET + POST

```typescript
// GET — list user's tickets (newest first)
// POST — create new ticket + first message
{
  subject: string,
  category: "general" | "billing" | "bug" | "feature",
  message: string
}
// Also sends email to FOUNDER_EMAIL via Resend
```

### `/api/support/tickets/[id]` — GET + PATCH

```typescript
// GET — ticket detail + all messages
// PATCH — add reply message { message: string }
```

### `/api/payments/checkout` — POST (placeholder)

```typescript
// Placeholder — returns 501 until payment provider is wired per product
// When ready: POST { variantId } → generate checkout URL → return { url }
// Wire to Lemon Squeezy (see template.md Part 2.6) when adding payments
export async function POST() {
  return NextResponse.json({ error: "Payments not configured" }, { status: 501 });
}
```

### `/api/action` — POST (placeholder)

```typescript
// This is the slot for product logic. Template ships with:
// 1. Auth check
// 2. Rate limit check
// 3. Credit deduction
// 4. Placeholder result: { message: "Product logic goes here" }
// 5. Credit refund on error
```

---

## Phase-by-Phase Build Sequence

### Phase 0 — Project Bootstrap (30 min)

```bash
cd s:\Engineering\2026\one
npx create-next-app@latest saas-template --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd saas-template

# Core deps
npm install @supabase/supabase-js @supabase/ssr

# UI deps
npm install lucide-react sonner class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-separator

# shadcn init
npx shadcn@latest init
npx shadcn@latest add button card input badge textarea dialog alert-dialog checkbox dropdown-menu select tabs separator skeleton

# Email
npm install resend disposable-email-domains
```

Copy from FloMCP:
- `next.config.js` (IPv4 fix — verbatim)
- `tailwind.config.ts`
- `app/globals.css`
- `components.json`

Create `.env.local` from setup-guide.md Part B.

**Verify:** `npm run dev` — no errors, default Next.js page loads.

---

### Phase 1 — Infrastructure Libs (1 hr)

Copy from FloMCP (zero changes):
- `lib/supabase.ts`
- `lib/supabase-server.ts`
- `lib/supabase-admin.ts`
- `lib/retry.ts`
- `lib/rate-limit.ts`
- `lib/validate-email.ts`
- `lib/validate-input.ts`
- `lib/utils.ts`

Copy + adapt from FloMCP:
- `lib/email.ts` — update BRAND color to PRODUCT.color.hex
- `lib/credits.ts` — update FREE/PRO constants
- `lib/credits-service.ts` — update credit amounts

Build new:
- `lib/config.ts` — the product config file (spec above)

Copy `middleware.ts` from FloMCP — update to protect `/dashboard`.

Run base schema SQL in Supabase (SQL from DB Schema section above).

**Verify:** TypeScript compiles. No import errors.

---

### Phase 2 — Auth (2 hrs)

Copy from FloMCP (verbatim):
- `app/api/auth/signin/route.ts`
- `app/api/auth/signup/route.ts`
- `app/api/auth/signout/route.ts`
- `app/api/auth/reset-password/route.ts`
- `app/auth/callback/route.ts`
- `app/auth/confirm/route.ts`

Copy from FloMCP (update logo + PRODUCT.name):
- `components/auth/SignIn.tsx`
- `components/auth/SignUp.tsx`
- `components/auth/ProtectedRoute.tsx`
- `components/auth/UserMenu.tsx`
- `app/auth/signin/page.tsx`
- `app/auth/signup/page.tsx`
- `app/auth/verify-email/page.tsx`
- `app/auth/reset-password/page.tsx`

Set up Google OAuth per setup-guide.md Part C Step 4.
Set `DISABLE_EMAILS=true` for local testing.

**Verify checklist:**
- [ ] Signup with email → appears in Supabase Auth
- [ ] Verify email → confirm → signin → lands at `/dashboard`
- [ ] `/dashboard` without session → redirects to `/auth/signin`
- [ ] Google OAuth → lands at `/dashboard`
- [ ] Sign out → clears session

---

### Phase 3 — Marketing Pages (3 hrs)

Build `components/Logo.tsx` — reads `PRODUCT.name` from config, simple text logo with color dot.

Build marketing components (all read from `lib/config.ts`):
1. `components/marketing/Navbar.tsx`
2. `components/marketing/Hero.tsx`
3. `components/marketing/Features.tsx`
4. `components/marketing/PricingSection.tsx`
5. `components/marketing/Footer.tsx`

Build pages:
- `app/page.tsx` — assembles above in order
- `app/pricing/page.tsx` — full pricing cards + FAQ

Copy + rename product in legal pages:
- `app/legal/privacy-policy/page.tsx`
- `app/legal/terms-of-service/page.tsx`
- `app/legal/acceptable-use/page.tsx`
- `app/legal/refund-policy/page.tsx`

Build `app/layout.tsx` — reads metadata from `PRODUCT` config.

**Verify:**
- [ ] Landing page renders all 5 sections
- [ ] Nav links work
- [ ] "Get Started" → `/auth/signup`
- [ ] Pricing page renders
- [ ] Footer legal links work

---

### Phase 4 — Dashboard Shell (2 hrs)

Build dashboard layout and navigation:
1. `components/dashboard/Sidebar.tsx` — reads nav items from config, shows CreditChip + NotificationPanel
2. `components/dashboard/MobileSidebar.tsx` — sheet-based, same nav items
3. `components/dashboard/CreditChip.tsx` — copy from FloMCP
4. `components/dashboard/NotificationPanel.tsx` — copy from FloMCP
5. `components/dashboard/StatsCard.tsx` — new: props `{ label, value, icon, trend }`
6. `components/dashboard/EmptyState.tsx` — new: props `{ title, description, cta, ctaHref }`

Build:
- `app/dashboard/layout.tsx` — sidebar wrapper, handles mobile
- `app/dashboard/page.tsx` — 3 StatsCards + recent history list + CTA

Copy from FloMCP:
- `app/api/credits/balance/route.ts`
- `app/api/notifications/route.ts`

**Verify:**
- [ ] `/dashboard` shows sidebar + stats cards
- [ ] Credit chip shows "3 credits" for new user
- [ ] Mobile view shows hamburger → sheet sidebar
- [ ] Notification bell renders

---

### Phase 5 — Settings (2 hrs)

Build settings components:
1. `components/settings/ProfileForm.tsx` — full_name field, email (disabled), save button
2. `components/settings/PlanCard.tsx` — current plan badge, credits remaining, Upgrade button
3. `components/settings/DangerZone.tsx` — "Delete Account" button with confirmation dialog

Build `app/dashboard/settings/page.tsx` — three tabs: Profile / Plan / Account.

Add profile API:
- `app/api/profile/route.ts` — GET + PATCH (update full_name)

PlanCard upgrade button is a disabled placeholder with a `// TODO: wire payment provider` comment.

**Verify:**
- [ ] Profile tab shows name + email
- [ ] Save profile → Supabase `profiles` table updates
- [ ] Plan tab shows "Free · 3 credits remaining"
- [ ] Account tab → Sign Out works
- [ ] Delete Account → opens confirmation dialog

---

### Phase 6 — Support Tickets (2 hrs)

Build:
1. `components/support/TicketForm.tsx` — dialog with subject, category select, message textarea
2. `components/support/TicketList.tsx` — table/card list with status badge + created date
3. `components/support/TicketDetail.tsx` — ticket info + message thread + reply input

Build `app/dashboard/support/page.tsx` — TicketList + "New Ticket" button.

Build API routes:
- `app/api/support/tickets/route.ts` — GET (list), POST (create + send email to founder)
- `app/api/support/tickets/[id]/route.ts` — GET (detail + messages), PATCH (add reply)

New ticket creation also sends email via Resend to `FOUNDER_EMAIL` so you're notified immediately.

**Verify:**
- [ ] New ticket form submits → ticket appears in list
- [ ] Founder email received (or logged when DISABLE_EMAILS=true)
- [ ] Click ticket → detail view with message thread
- [ ] Reply → message appears in thread
- [ ] Status badge displays correctly

---

### Phase 7 — Product Placeholder (1 hr)

Build the placeholders that get replaced per product:

1. `components/product/ProductInput.tsx` — simple textarea + "Run [Action]" button with credit cost display
2. `components/product/ProductResult.tsx` — shows loading skeleton → then "Your result will appear here"
3. `components/product/UpgradeGate.tsx` — card: "You've used all 3 free [actions]" + Upgrade button (placeholder — no payment wiring)

Build `app/dashboard/product/page.tsx` — assembles the above.

Build `app/api/action/route.ts` — placeholder with full pattern:
```
1. Auth check
2. Rate limit (10/min per IP)
3. Input validation
4. Credit deduction (atomic)
5. Placeholder result: { output: "Product logic goes here", timestamp: new Date() }
6. Credit refund on error
```

Build `app/dashboard/history/page.tsx` — reads from `action_results` table (create this generic table too).

**Verify:**
- [ ] `/dashboard/product` renders input + result area
- [ ] Submit calls `/api/action` → credits deducted → result shows
- [ ] History page shows the result
- [ ] At 0 credits → UpgradeGate shows instead of result

---

### Phase 8 — SEO + Polish (1 hr)

- `app/layout.tsx` — full metadata from `PRODUCT` config (OG, Twitter card, canonical)
- `app/sitemap.ts` — all public routes
- `app/robots.ts` — disallow /api/ /dashboard/ /auth/
- Create `/public/og-image.png` placeholder (1200×630)

Add Vercel deployment (setup-guide.md Part E).

**Final verify:**
- [ ] `npm run build` — zero TypeScript errors
- [ ] `npm run start` — production build works
- [ ] Deploy to Vercel — live

---

## Summary: What To Do Per New Product

When cloning this template for a new product:

| Step | What to edit | Time |
|---|---|---|
| 1 | `lib/config.ts` — name, tagline, colors, features, pricing | 10 min |
| 2 | `components/Logo.tsx` — swap in SVG logo | 10 min |
| 3 | `components/product/ProductInput.tsx` — your input UI | 1-2 hrs |
| 4 | `components/product/ProductResult.tsx` — your result display | 1-2 hrs |
| 5 | `app/api/action/route.ts` — your product logic | varies |
| 6 | Product-specific DB tables in Supabase | 30 min |
| 7 | `app/dashboard/product/page.tsx` — rename + connect | 30 min |
| 8 | `app/dashboard/history/page.tsx` — adapt columns | 30 min |
| 9 | Legal pages — replace "Template Product" with name | 15 min |
| 10 | Update Supabase + Google OAuth + Vercel for new project | 30 min |

**Everything else — auth, credits, support tickets, settings, SEO, notifications — works without touching. Payments: wire when you're ready per product (see template.md Part 2.6).**

---

## Build Time Estimate

| Phase | Hours |
|---|---|
| 0 Bootstrap | 0.5 |
| 1 Infrastructure | 1.0 |
| 2 Auth | 2.0 |
| 3 Marketing pages | 3.0 |
| 4 Dashboard shell | 2.0 |
| 5 Settings | 2.0 |
| 6 Support tickets | 2.0 |
| 7 Product placeholder | 1.0 |
| 8 SEO + deploy | 1.0 |
| **Total** | **14.5 hrs (~3-4 focused days)** |

After this is built, each new product: **6-8 hours to a working app**.

---

## Next Step

Start with Phase 0. Run:

```bash
cd s:\Engineering\2026\one
npx create-next-app@latest saas-template --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

Then work through phases in order. Don't skip ahead — auth must work before dashboard, dashboard must work before product.
