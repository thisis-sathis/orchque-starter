// CompanyLogosBlock.tsx — "Companies that trust us" — 2-row logo grid.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface CompanyLogo {
  name: string;
  logoSrc?: string;
}

export interface CompanyLogosBlockProps {
  heading?: string;
  subheading?: string;
  logos: CompanyLogo[];
  className?: string;
}

export function CompanyLogosBlock({
  heading = "Trusted by teams at",
  subheading,
  logos,
  className,
}: CompanyLogosBlockProps) {
  // Split into two rows
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);

  const LogoItem = ({ logo }: { logo: CompanyLogo }) => (
    <li className="flex items-center justify-center px-[var(--space-5x)]">
      {logo.logoSrc ? (
        <img
          src={logo.logoSrc}
          alt={logo.name}
          className="h-7 w-auto object-contain opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all"
        />
      ) : (
        <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text-muted)] tracking-[var(--tracking-wide)] uppercase opacity-60 hover:opacity-80 transition-opacity whitespace-nowrap">
          {logo.name}
        </span>
      )}
    </li>
  );

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] border-y border-[var(--color-border)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-6x)]">
        <div className="text-center flex flex-col gap-[var(--space-2x)]">
          {heading && (
            <p className="text-[var(--text-sm)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-muted)]">
              {heading}
            </p>
          )}
          {subheading && (
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Row 1 */}
        <ul className="flex flex-wrap items-center justify-center gap-y-[var(--space-4x)]" role="list">
          {row1.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
        </ul>

        {/* Row 2 */}
        {row2.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-y-[var(--space-4x)]" role="list">
            {row2.map((logo) => (
              <LogoItem key={logo.name} logo={logo} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
