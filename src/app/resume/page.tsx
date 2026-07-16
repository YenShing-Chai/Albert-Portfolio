import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { profile } from "@/data/profile";
import { metrics } from "@/data/metrics";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { education, certifications } from "@/data/leadership";
import { ButtonLink } from "@/components/ui/button";
import { Tag, StatusBadge } from "@/components/ui/tag";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LinkedInIcon, WhatsAppIcon } from "@/components/brand-icons";

export const metadata: Metadata = {
  title: "Résumé",
  description: site.description,
  alternates: { canonical: "/resume" },
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    // print:block flattens the label/content grid so long sections flow across
    // page breaks instead of jumping whole to the next page (wasted whitespace).
    <section className="grid gap-4 border-t border-border py-8 print:block print:break-before-auto print:py-5 md:grid-cols-12 md:gap-8">
      <p className="label-mono print:mb-2 md:col-span-3 md:pt-1">{label}</p>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className="container-page max-w-5xl py-10">
      {/* Top bar (hidden when printing / exporting to PDF) */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the world
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={site.resumePath}
            external
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4" /> PDF
          </ButtonLink>
        </div>
      </div>

      {/* Header */}
      <header className="mt-12">
        <p className="label-mono">{site.role} · {site.location}</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-foreground sm:text-5xl">
          {site.fullName}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.heroSupporting}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 rounded border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground"
          >
            <Mail className="h-4 w-4" /> {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground"
          >
            <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-border-strong px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
      </header>

      {/* Metrics */}
      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.slice(0, 5).map((m) => (
          <div key={m.id}>
            <p className="font-mono tabular text-2xl font-medium tracking-tight text-foreground">
              {m.prefix}
              {m.value}
              {m.suffix}
            </p>
            <p className="mt-1.5 text-xs text-muted">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        {/* Experience */}
        <Row label="Experience">
          <div className="space-y-7">
            {experience.map((r) => (
              <div key={r.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-xl text-foreground">
                    {r.title}
                  </h3>
                  <span className="font-mono text-xs text-faint">
                    {r.period}
                  </span>
                </div>
                <p className="text-sm text-muted">
                  {r.company}
                  {r.location ? ` · ${r.location}` : ""}
                </p>
                <p className="mt-2 text-sm text-muted">{r.summary}</p>
              </div>
            ))}
          </div>
        </Row>

        {/* Selected work */}
        <Row label="Selected work">
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <div
                key={p.slug}
                className="break-inside-avoid rounded border border-border p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.impact.slice(0, 2).map((im) => (
                    <Tag key={im.label}>
                      {im.value} · {im.label}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Row>

        {/* Skills */}
        <Row label="Skills">
          <div className="space-y-5">
            {skillGroups.map((g) => (
              <div key={g.id} className="break-inside-avoid">
                <p className="mb-2 text-sm font-medium text-foreground">
                  {g.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Row>

        {/* Education */}
        <Row label="Education">
          <div className="space-y-5">
            {education.map((e) => (
              <div key={e.credential} className="break-inside-avoid">
                <p className="font-medium text-foreground">{e.credential}</p>
                <p className="text-sm text-muted">
                  {e.institution}
                  {e.location ? ` · ${e.location}` : ""} · {e.year}
                </p>
                {e.note && (
                  <p className="mt-0.5 text-sm text-faint">{e.note}</p>
                )}
              </div>
            ))}
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                Certifications
              </p>
              <div className="flex flex-wrap gap-1.5">
                {certifications.map((c) => (
                  <Tag key={c.title}>
                    {c.title}
                    {c.year ? ` (${c.year})` : ""}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </Row>
      </div>

      <p className="mt-10 border-t border-border pt-6 text-sm leading-relaxed text-faint">
        {profile.disclaimer}
      </p>
    </main>
  );
}
