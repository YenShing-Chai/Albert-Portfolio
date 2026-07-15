import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" divider>
      <SectionHeader
        index="03"
        eyebrow="Experience"
        title="A decade of building and scaling."
        description="From service engineering to Head of Product — a through-line of ownership, execution, and commercial outcomes."
      />

      <div className="mt-14">
        {experience.map((role) => (
          <Reveal
            key={role.id}
            className="grid gap-4 border-t border-border py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            {/* Left: period + company */}
            <div className="md:col-span-4">
              <p className="font-mono text-xs tracking-wide text-faint">
                {role.period}
              </p>
              <p className="mt-3 font-medium text-foreground">{role.company}</p>
              {role.location && (
                <p className="mt-1 text-sm text-muted">{role.location}</p>
              )}
              {role.current && (
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Current
                </span>
              )}
            </div>

            {/* Right: role + detail */}
            <div className="md:col-span-8">
              <h3 className="font-display text-2xl tracking-tight text-foreground">
                {role.title}
              </h3>
              <p className="mt-3 text-muted">{role.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {role.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-border-strong"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {role.achievements && (
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {role.achievements.map((a) => (
                    <div
                      key={a.title}
                      className="rounded border border-border bg-surface/50 p-4"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {a.title}
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {a.points.map((pt, i) => (
                          <li
                            key={i}
                            className="text-[0.8rem] leading-snug text-muted"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
