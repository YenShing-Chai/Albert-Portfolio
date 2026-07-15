import { Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { ImpactTag } from "@/components/ui/tag";
import { impactCards } from "@/data/metrics";

export function Impact() {
  return (
    <Section id="impact" divider>
      <SectionHeader
        index="02"
        eyebrow="Impact"
        title="Outcomes, measured."
        description="A snapshot of scale and efficiency delivered across fintech, loyalty, and digital commerce. Figures are marked as realized or estimated for transparency."
      />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {impactCards.map((m) => (
          <RevealItem
            key={m.id}
            className="group flex flex-col justify-between bg-background p-6 transition-colors hover:bg-surface md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono tabular text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                <Counter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </span>
              <ImpactTag type={m.type} />
            </div>
            <div className="mt-8">
              <p className="font-medium text-foreground">{m.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {m.detail}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
