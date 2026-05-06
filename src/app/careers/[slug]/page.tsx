// careers/[slug]/page.tsx — thin data wrapper. All rendering in CareersJobPage ui/page.
"use client";
import { CareersJobPage, type JobSection } from "@/ui/pages/CareersJobPage/CareersJobPage";
import { brand, landing } from "@/lib/config";
import { StatusPage } from "@/ui/pages/StatusPage/StatusPage";
import { use } from "react";

// Job data — replace with a CMS or config lookup when ready.
const JOBS: Record<string, {
  title: string; department?: string; location?: string; type?: string;
  salary?: string; summary?: string; sections: JobSection[];
}> = {
  "senior-fullstack": {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k – $160k",
    summary: "We're looking for a senior full-stack engineer to help shape the core product. You'll work closely with the founder, own large features end-to-end, and help define the engineering culture of a small, fast-moving team.",
    sections: [
      {
        heading: "What you'll do",
        items: [
          "Own and ship full-stack features from design to deployment",
          "Work with Next.js App Router, Supabase, and TypeScript",
          "Improve developer experience, documentation, and tooling",
          "Collaborate async-first — great writing matters more than meetings",
          "Help define technical architecture as the product scales",
        ],
      },
      {
        heading: "What we're looking for",
        marker: "✓",
        items: [
          "5+ years of experience building production web applications",
          "Strong proficiency in TypeScript, React, and Node.js",
          "Experience with Supabase or PostgreSQL",
          "Comfortable working autonomously in a remote environment",
          "Strong written communication skills",
        ],
      },
      {
        heading: "Nice to have",
        marker: "·",
        items: [
          "Experience with Next.js App Router",
          "Open source contributions",
          "Prior startup / small team experience",
        ],
      },
    ],
  },
  "devrel": {
    title: "Developer Advocate",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$90k – $120k",
    summary: "Help developers discover and succeed with our starter kit. You'll create content, engage with the community, and be the bridge between builders and the product team.",
    sections: [
      {
        heading: "What you'll do",
        items: [
          "Create tutorials, demos, and written guides",
          "Be active in Discord, GitHub Discussions, and Twitter",
          "Represent the product at virtual events and online communities",
          "Surface developer feedback to the product team",
        ],
      },
      {
        heading: "What we're looking for",
        marker: "✓",
        items: [
          "2+ years in a developer-facing role (DevRel, developer support, or similar)",
          "Comfortable building with TypeScript and Next.js",
          "Strong written and verbal communication",
          "Genuine enthusiasm for the developer tools space",
        ],
      },
    ],
  },
  "designer": {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    salary: "$80–$120/hr",
    summary: "Help us design beautiful, developer-friendly interfaces for the UI kit, landing pages, and product dashboard.",
    sections: [
      {
        heading: "What you'll do",
        items: [
          "Design new UI kit components and landing sections",
          "Improve existing screens and flows",
          "Own design system tokens and documentation",
          "Create high-fidelity mockups in Figma",
        ],
      },
      {
        heading: "What we're looking for",
        marker: "✓",
        items: [
          "Strong Figma proficiency",
          "Experience designing developer tools or SaaS products",
          "Ability to translate complex workflows into clean UIs",
        ],
      },
    ],
  },
};

async function handleApply(slug: string, data: { name: string; email: string; linkedin: string; message: string }) {
  const res = await fetch("/api/careers/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, ...data }),
  });
  if (!res.ok) throw new Error("Failed to send application");
}

export default function CareersJobRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const job = JOBS[slug];

  if (!job) {
    return (
      <StatusPage
        icon="404"
        iconIsNumeral
        heading="Role not found"
        body="This job posting doesn't exist or may have been filled."
        actions={[
          { label: "View all roles", href: "/careers" },
          { label: "Go home", href: "/", variant: "secondary" },
        ]}
      />
    );
  }

  return (
    <CareersJobPage
      navbar={{
        logoText: brand.name,
        links: landing.nav.links as any,
        ctaText: landing.nav.cta.label,
        ctaHref: landing.nav.cta.href,
      }}
      footer={{
        logoText: brand.name,
        tagline: landing.footer.tagline,
        legalLinks: landing.footer.links,
      }}
      {...job}
      onApply={(data) => handleApply(slug, data)}
    />
  );
}