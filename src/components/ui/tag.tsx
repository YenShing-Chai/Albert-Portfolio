import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ImpactType, ProjectStatus } from "@/types/content";

/** Small editorial tag chip (sharp corners, hairline border). */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-border px-2.5 py-1 text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusLabel: Record<ProjectStatus, string> = {
  launched: "Launched",
  ongoing: "In development",
  concept: "Concept",
};

/** Project lifecycle badge with a small status dot. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "launched" && "bg-foreground",
          status === "ongoing" && "border border-foreground bg-transparent",
          status === "concept" &&
            "border border-dashed border-faint bg-transparent",
        )}
      />
      {statusLabel[status]}
    </span>
  );
}

/**
 * Distinguishes realized vs estimated outcomes — a confidentiality requirement.
 * Realized = filled marker; estimated = outlined + "est." prefix.
 */
export function ImpactTag({ type }: { type: ImpactType }) {
  const realized = type === "realized";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]",
        realized ? "text-muted" : "text-faint",
      )}
      title={
        realized
          ? "Realized — delivered and confirmed"
          : "Estimated — projected or in development"
      }
    >
      <span
        className={cn(
          "h-1 w-1 rounded-full",
          realized ? "bg-foreground" : "border border-faint",
        )}
      />
      {realized ? "Realized" : "Estimated"}
    </span>
  );
}
