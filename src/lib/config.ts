/**
 * Product configuration — the ONLY file you need to edit when copying this
 * template for a new product. Change name, color, pricing, hero copy, and
 * feature list here. Everything else reads from PRODUCT / CREDITS.
 */

export const PRODUCT = {
  name: "Your Product",
  tagline: "The tagline goes here",
  description: "A short product description for meta tags and og:description.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  domain: "yourproduct.uneefe.com",
  supportEmail: "support@yourproduct.uneefe.com",
  notifyEmail: "notify@yourproduct.uneefe.com",

  color: {
    /** Hex without # — used in email templates */
    hex: "6366f1",
    /** Full hex — used in inline styles */
    primary: "#6366f1",
  },

  nav: {
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  pricing: {
    free: {
      name: "Free",
      price: 0,
      actions: 3,
      /** Label for the action unit — e.g. "scans", "analyses", "generations" */
      actionLabel: "actions",
      features: [
        "3 actions per month",
        "Core features",
        "Community support",
      ],
    },
    pro: {
      name: "Pro",
      price: 9,
      currency: "USD",
      /** Lemon Squeezy variant ID — fill in when wiring payments */
      variantId: "",
      actions: 999,
      actionLabel: "actions",
      features: [
        "Unlimited actions",
        "Priority support",
        "Advanced features",
        "Export results",
      ],
    },
  },

  hero: {
    headline: "Your Headline Here",
    subhead: "A compelling one-liner that explains what your product does and why it matters.",
    cta: "Get Started Free",
    ctaHref: "/auth/signup",
    secondaryCta: "See how it works",
    secondaryCtaHref: "/#features",
  },

  features: [
    {
      icon: "Zap",
      title: "Feature One",
      description: "Short description of the first key feature and the value it delivers.",
    },
    {
      icon: "Shield",
      title: "Feature Two",
      description: "Short description of the second key feature and the value it delivers.",
    },
    {
      icon: "BarChart",
      title: "Feature Three",
      description: "Short description of the third key feature and the value it delivers.",
    },
  ],
} as const;

/**
 * Credit constants — determines how many credits users get per plan
 * and how many are consumed per action.
 */
export const CREDITS = {
  FREE_MONTHLY: 3,
  PRO_MONTHLY: 999,
  COST_PER_ACTION: 1,
} as const;
