"use client";

import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { metrics } from "@/data/metrics";
import { roleWords } from "@/data/navigation";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { RotatingWords } from "@/components/rotating-words";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Faint paper grid, fading out toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_30%_35%,black,transparent)]"
      />

      <div className="container-page w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Meta row */}
          <motion.div
            variants={item}
            className="flex items-center gap-4 text-faint"
          >
            <span className="label-mono">{site.fullName}</span>
            <span className="h-px flex-1 max-w-24 bg-border" />
            <span className="label-mono">{site.location}</span>
          </motion.div>

          {/* Availability */}
          <motion.div variants={item} className="mt-8">
            <span className="inline-flex items-center gap-2.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availability}
            </span>
          </motion.div>

          {/* Headline (H1) — serif display, editorial */}
          <motion.h1
            variants={item}
            className="font-display mt-6 max-w-4xl text-balance text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl"
          >
            Building products, platforms, and teams that turn strategy into{" "}
            <em className="italic text-muted">measurable</em> business impact.
          </motion.h1>

          {/* Role identity */}
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-3 text-base font-medium text-foreground md:text-lg"
          >
            <span className="h-px w-10 bg-accent" />
            <RotatingWords words={roleWords} />
          </motion.div>

          {/* Supporting copy */}
          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted md:text-base"
          >
            {profile.heroSupporting}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink href="#work" variant="primary" size="lg">
                Explore my work <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink
              href={site.resumePath}
              external
              variant="outline"
              size="lg"
            >
              <Download className="h-4 w-4" /> Résumé
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" size="lg">
              Get in touch
            </ButtonLink>
          </motion.div>

          {/* Metrics strip */}
          <motion.dl
            variants={item}
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {metrics.slice(0, 5).map((m) => (
              <div key={m.id}>
                <dt className="font-mono tabular text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
                  <Counter
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                  />
                </dt>
                <dd className="mt-2 text-xs leading-snug text-muted">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-faint lg:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      )}
    </section>
  );
}
