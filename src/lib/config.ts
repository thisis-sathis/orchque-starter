/**
 * config.ts — reads product.config.json and exports typed values.
 * Edit product.config.json (project root) to customise your product.
 * Do NOT hardcode values here — always read from the config file.
 */

import rawConfig from "../../product.config.json";

// ─── Type helpers ────────────────────────────────────────────────────────────

type Config = typeof rawConfig;

// ─── Root exports ────────────────────────────────────────────────────────────

/** Global brand: name, tagline, domain, emails, assets */
export const brand = rawConfig.brand;

/** Theme: landing_theme, product_theme, dark_mode, tokens (colors, font, radius, spacing) */
export const theme = rawConfig.theme;

/** Feature flags — check with isEnabled() */
export const features = rawConfig.features;

/** Current product tier: "landing" | "product" | "pro" */
export const tier = rawConfig.tier;

/** Named icon map (lucide key strings) */
export const icons = rawConfig.icons;

/** Everything the marketing/landing site reads */
export const landing = rawConfig.landing;

/** All landing sections + navbar/footer/hero/sections order — single source for the landing page */
export const landingSections = {
  ...rawConfig.landing_sections,
  // Inject brand.name into navbar and footer at runtime (JSON can't self-reference)
  navbar: { ...rawConfig.landing_sections.navbar, logoText: rawConfig.brand.name },
  footer: { ...rawConfig.landing_sections.footer, logoText: rawConfig.brand.name },
};

/** Everything the product dashboard reads */
export const product = rawConfig.product;

// ─── Convenience shortcuts ───────────────────────────────────────────────────

/** App URL — from env in production, localhost in dev */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** Primary color hex (with #) — for inline styles */
export const primaryColor = rawConfig.theme.tokens.colors.primary;

/** Primary color hex without # — for email templates */
export const primaryColorHex = rawConfig.theme.tokens.colors.primary.replace("#", "");

// ─── Feature guard ───────────────────────────────────────────────────────────

/** Returns true if the feature flag is enabled in product.config.json */
export function isEnabled(feature: keyof Config["features"]): boolean {
  return rawConfig.features[feature] === true;
}

// ─── Legacy PRODUCT export (keeps existing app pages working) ────────────────
// TODO: migrate app pages to use the named exports above, then remove this.

export const PRODUCT = {
  name: brand.name,
  tagline: brand.tagline,
  description: brand.description,
  url: appUrl,
  domain: brand.domain,
  supportEmail: brand.supportEmail,
  notifyEmail: brand.notifyEmail,

  color: {
    hex: primaryColorHex,
    primary: primaryColor,
  },

  nav: landing.nav,
  hero: landing.hero,
  features: landing.features.items,

  pricing: {
    free: landing.pricing.plans.free,
    pro:  landing.pricing.plans.pro,
  },
} as const;

// ─── Credits ─────────────────────────────────────────────────────────────────

/**
 * Credit constants derived from pricing config.
 * COST_PER_ACTION: 1 credit per action (fixed).
 */
export const CREDITS = {
  FREE_MONTHLY:    landing.pricing.plans.free.actions,
  PRO_MONTHLY:     landing.pricing.plans.pro.actions,
  COST_PER_ACTION: 1,
} as const;
