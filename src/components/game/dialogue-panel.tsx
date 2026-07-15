"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getPlace, type PlaceId } from "@/data/places";
import { getSpot, travelOptions, type IslandId } from "@/data/islands";
import { personal } from "@/data/personal";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/leadership";
import { featuredProjects } from "@/data/projects";
import { impactCards } from "@/data/metrics";
import { aiNodes, aiCapabilities } from "@/data/leadership";
import { site } from "@/lib/site";
import { LinkedInIcon, WhatsAppIcon } from "@/components/brand-icons";
import { ContactForm } from "./contact-form";

const ink = "#3b2f22";
const body = "#6b543a";
const muted = "#9a866a";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#e4d3ae] bg-[#f3e7cd] px-2.5 py-0.5 text-[11px] text-[#6b543a]">
      {children}
    </span>
  );
}

function isPlaceholder(v: string) {
  return v.startsWith("Add ");
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#eaddc0] py-2 last:border-0">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-[#a8926f]">
        {label}
      </dt>
      <dd className="text-right text-sm text-[#4a3b28]">{value}</dd>
    </div>
  );
}

function PlaceholderValue({ value }: { value: string }) {
  return isPlaceholder(value) ? (
    <span className="italic text-[#bcae90]">to add</span>
  ) : (
    <>{value}</>
  );
}

function HomeContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: body }}>
        {profile.profileBody[0]}
      </p>
      <dl>
        <InfoRow label="Name" value={personal.name} />
        <InfoRow label="Role" value={personal.role} />
        <InfoRow label="Location" value={personal.currentLocation} />
        <InfoRow label="From" value={<PlaceholderValue value={personal.birthplace} />} />
        <InfoRow label="Born" value={<PlaceholderValue value={personal.birthDate} />} />
        <InfoRow label="Phone" value={<PlaceholderValue value={personal.phone} />} />
        <InfoRow
          label="Email"
          value={
            <a
              className="underline underline-offset-2 hover:text-[#8a6d3b]"
              href={`mailto:${personal.email}`}
            >
              {personal.email}
            </a>
          }
        />
        <InfoRow label="Languages" value={personal.languages.join(" · ")} />
      </dl>
    </div>
  );
}

function WorkContent() {
  return (
    <ul className="space-y-3">
      {featuredProjects.map((p) => (
        <li key={p.slug} className="rounded-lg border border-[#e4d3ae] bg-[#fffdf6] p-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold" style={{ color: ink }}>
              {p.title}
            </p>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-[#a8926f]">
              {p.status === "ongoing"
                ? "In dev"
                : p.status === "concept"
                  ? "Concept"
                  : "Launched"}
            </span>
          </div>
          <p className="mt-0.5 text-[13px] leading-snug" style={{ color: body }}>
            {p.subtitle}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.impact.slice(0, 2).map((im) => (
              <Chip key={im.label}>
                {im.value} · {im.label}
              </Chip>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

function AiContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: body }}>
        Turning AI from experimentation into operating leverage — practical
        adoption across the product organization.
      </p>
      <ul className="space-y-2">
        {aiNodes.map((n) => (
          <li key={n.id} className="flex gap-2.5">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#8aa2e8" }}
            />
            <p className="text-[13px] leading-snug" style={{ color: body }}>
              <span className="font-semibold" style={{ color: ink }}>
                {n.title}.
              </span>{" "}
              {n.example}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {aiCapabilities.slice(0, 8).map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  );
}

function ImpactContent() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {impactCards.map((m) => (
        <div key={m.id} className="rounded-lg border border-[#e4d3ae] bg-[#fffdf6] p-3">
          <p className="font-mono text-2xl font-semibold tracking-tight" style={{ color: ink }}>
            {m.prefix}
            {m.value}
            {m.suffix}
          </p>
          <p className="mt-1 text-[12px] font-medium" style={{ color: body }}>
            {m.label}
          </p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[#b0a184]">
            {m.type === "realized" ? "Realized" : "Estimated"}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e4d3ae] bg-[#fffdf6] px-3 py-1.5 text-xs font-medium text-[#4a3b28] hover:border-[#b98a5a]"
        >
          ✉︎ Email
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e4d3ae] bg-[#fffdf6] px-3 py-1.5 text-xs font-medium text-[#4a3b28] hover:border-[#b98a5a]"
        >
          <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
        </a>
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e4d3ae] bg-[#fffdf6] px-3 py-1.5 text-xs font-medium text-[#4a3b28] hover:border-[#b98a5a]"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
      <ContactForm />
    </div>
  );
}

/** Roles at a company (a company spot may hold several roles). */
function RolesContent({ roleIds }: { roleIds: string[] }) {
  const roles = roleIds
    .map((id) => experience.find((r) => r.id === id))
    .filter((r): r is (typeof experience)[number] => Boolean(r));
  return (
    <ul className="space-y-4">
      {roles.map((r) => (
        <li key={r.id} className="border-b border-[#eaddc0] pb-4 last:border-0">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#a8926f]">
              {r.period}
            </p>
            {r.current && (
              <span className="rounded-full bg-[#e8f0dc] px-2 py-0.5 text-[10px] font-medium text-[#5f7f3f]">
                Current
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold" style={{ color: ink }}>
            {r.title}
          </p>
          <p className="text-xs" style={{ color: muted }}>
            {r.location}
          </p>
          <p className="mt-1.5 text-[13px] leading-snug" style={{ color: body }}>
            {r.summary}
          </p>
          {r.highlights && r.highlights.length > 0 && (
            <ul className="mt-2 space-y-1">
              {r.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex gap-2 text-[12px] leading-snug" style={{ color: body }}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c8a06a]" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/** A school / education card. */
function SchoolContent({ index }: { index: number }) {
  const e = education[index];
  if (!e) return null;
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#e4d3ae] bg-[#fffdf6] p-4">
        <p className="text-sm font-semibold" style={{ color: ink }}>
          {e.credential}
        </p>
        <p className="mt-0.5 text-[13px]" style={{ color: body }}>
          {e.institution} · {e.location}
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider" style={{ color: muted }}>
          {e.year}
        </p>
        {e.note && (
          <div className="mt-2">
            <Chip>🏅 {e.note}</Chip>
          </div>
        )}
      </div>
    </div>
  );
}

/** Hometown placeholder (Kuching). */
function HometownContent() {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed" style={{ color: body }}>
        Home is Kuching, Malaysia — where I grew up before building a career in
        Singapore and Kuala Lumpur.
      </p>
      <p className="text-[13px]" style={{ color: muted }}>
        More of my story here soon. 🏡
      </p>
    </div>
  );
}

/** Airport departures — fly to another island. */
function AirportSelector({
  islandId,
  onFly,
}: {
  islandId: IslandId;
  onFly: (dest: IslandId) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: body }}>
        Pick a destination and I&apos;ll fly you there.
      </p>
      <div className="space-y-2.5">
        {travelOptions(islandId).map((dest) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => onFly(dest.id)}
            className="flex w-full items-center gap-3 rounded-xl border border-[#e4d3ae] bg-[#fffdf6] px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#b98a5a] hover:shadow-md"
          >
            <span className="text-3xl" aria-hidden>
              {dest.flag}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold" style={{ color: ink }}>
                Fly to {dest.name}
              </span>
              <span className="block text-[12px]" style={{ color: muted }}>
                {dest.chapter}
              </span>
            </span>
            <span className="text-lg" aria-hidden>
              ✈️
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const hubContentFor: Partial<Record<PlaceId, () => React.ReactElement>> = {
  home: HomeContent,
  work: WorkContent,
  ai: AiContent,
  impact: ImpactContent,
  contact: ContactContent,
};

interface Header {
  label: string;
  emoji: string;
  greeting: string;
}

function resolveHeader(islandId: IslandId, placeId: string): Header | null {
  if (islandId === "hub") {
    const pl = getPlace(placeId as PlaceId);
    return pl ? { label: pl.label, emoji: pl.emoji, greeting: pl.greeting } : null;
  }
  const s = getSpot(islandId, placeId);
  return s ? { label: s.label, emoji: s.emoji, greeting: s.greeting } : null;
}

export function DialoguePanel({
  islandId,
  placeId,
  onClose,
  onFly,
}: {
  islandId: IslandId;
  placeId: string | null;
  onClose: () => void;
  onFly: (dest: IslandId) => void;
}) {
  useEffect(() => {
    if (!placeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [placeId, onClose]);

  const header = placeId ? resolveHeader(islandId, placeId) : null;

  // Decide what body to render for the active place.
  let bodyKey = "";
  let Body: React.ReactNode = null;
  if (placeId && header) {
    const isAirport =
      (islandId === "hub" && placeId === "experience") ||
      (islandId !== "hub" && getSpot(islandId, placeId)?.kind === "airport");

    if (isAirport) {
      bodyKey = `${islandId}:airport`;
      Body = <AirportSelector islandId={islandId} onFly={onFly} />;
    } else if (islandId === "hub") {
      bodyKey = `hub:${placeId}`;
      if (placeId === "hextar") {
        Body = <RolesContent roleIds={["hextar-hop", "hextar-teamlead"]} />;
      } else {
        const C = hubContentFor[placeId as PlaceId];
        Body = C ? <C /> : null;
      }
    } else {
      const spot = getSpot(islandId, placeId);
      bodyKey = `${islandId}:${placeId}`;
      if (spot?.kind === "company" && spot.roleIds) {
        Body = <RolesContent roleIds={spot.roleIds} />;
      } else if (spot?.kind === "school" && spot.educationIndex != null) {
        Body = <SchoolContent index={spot.educationIndex} />;
      } else if (spot?.kind === "home") {
        Body = <HometownContent />;
      }
    }
  }

  return (
    <AnimatePresence>
      {header && Body && (
        <motion.div
          key={bodyKey}
          role="dialog"
          aria-modal="false"
          aria-label={header.label}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-lg px-4 pb-4 sm:bottom-20"
        >
          <div className="overflow-hidden rounded-2xl border border-[#e0cfa8] bg-[#fbf3e1] shadow-[0_12px_40px_rgba(60,40,20,0.28)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#eaddc0] bg-[#f6ead0] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {header.emoji}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: muted }}>
                    {header.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: ink }}>
                    {header.greeting}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-[#8a6d3b] transition-colors hover:bg-[#eaddc0]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Body */}
            <div className="max-h-[58vh] overflow-y-auto px-5 py-4">{Body}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
