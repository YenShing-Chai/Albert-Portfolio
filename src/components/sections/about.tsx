import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" divider>
      <SectionHeader
        index="01"
        eyebrow="Profile"
        title={profile.profileHeading}
      />

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Narrative */}
        <Reveal className="md:col-span-7">
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {profile.profileBody.map((p, i) => (
              <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Focus areas */}
        <div className="md:col-span-5 md:pl-8">
          <p className="label-mono">Focus areas</p>
          <RevealGroup as="ul" className="mt-6 divide-y divide-border">
            {profile.focusAreas.map((area, i) => (
              <RevealItem
                as="li"
                key={area}
                className="flex items-baseline gap-4 py-3"
              >
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{area}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <Reveal className="mt-14 border-t border-border pt-6">
        <p className="max-w-3xl text-sm leading-relaxed text-faint">
          {profile.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
