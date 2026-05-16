"use client";
// suppress-hydration-warnings.ts — Filter console errors caused by browser extensions
//
// Browser extensions (password managers, form fillers, etc.) inject attributes like
// `fdprocessedid` into buttons and inputs, causing React hydration mismatches.
// These are false positives — not actual bugs in your code.
//
// This utility suppresses those specific console errors during development.

import { useEffect } from "react";

export function SuppressHydrationWarnings() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || "";
      
      // Suppress hydration warnings caused by browser extension attributes
      if (
        message.includes("Hydration failed") ||
        message.includes("hydrated but some attributes") ||
        message.includes("fdprocessedid") ||
        message.includes("data-lastpass") ||
        message.includes("data-dashlane")
      ) {
        // Silently skip these known false positives
        return;
      }
      
      // Pass through all other errors
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
