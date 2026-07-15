import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Adds a hairline divider above the section. */
  divider?: boolean;
}

export function Section({ id, className, children, divider }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 md:py-28 lg:py-32",
        divider && "divider-top",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/** Standard editorial section header: mono index + eyebrow, large title. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <div className="flex items-center gap-3">
        <span className="label-mono" style={{ color: "var(--accent)" }}>
          {index}
        </span>
        <span className="h-px w-8 bg-border-strong" />
        <span className="label-mono">{eyebrow}</span>
      </div>
      <h2 className="font-display mt-5 text-balance text-[2rem] leading-[1.08] tracking-[-0.015em] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
