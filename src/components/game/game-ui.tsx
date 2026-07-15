"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, HelpCircle, Volume2, VolumeX, X } from "lucide-react";
import { places } from "@/data/places";
import { islands, type IslandId } from "@/data/islands";

/* ------------------------------------------------------------- Loader */
export function GameLoader() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f4f1ea]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d8c39a] border-t-[#3b2f22]" />
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#a8926f]">
        Building the world…
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- Intro */
export function IntroOverlay({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-[#f4f1ea]/85 px-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md rounded-3xl border border-[#e0cfa8] bg-[#fbf3e1] p-8 text-center shadow-[0_20px_60px_rgba(60,40,20,0.25)]"
      >
        <span className="text-4xl">🏡</span>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a8926f]">
          An interactive résumé
        </p>
        <h1 className="mt-2 font-display text-3xl text-[#3b2f22]">
          Welcome to Albert&rsquo;s little world
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6b543a]">
          I&rsquo;m the little character down there. Click a{" "}
          <span className="font-semibold">place</span> and I&rsquo;ll walk over
          to tell you about that part of my story — and visit the{" "}
          <span className="font-semibold">✈️ Airport</span> to fly through the
          countries I&rsquo;ve worked in.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-full bg-[#3b2f22] py-3 text-sm font-semibold text-[#f7ecd6] transition-colors hover:bg-[#4a3b28]"
        >
          Start exploring →
        </button>
        <Link
          href="/resume"
          className="mt-3 inline-block text-xs text-[#8a6d3b] underline underline-offset-2 hover:text-[#3b2f22]"
        >
          Prefer a classic résumé? View it here
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------- Help modal */
function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-sm rounded-2xl border border-[#e0cfa8] bg-[#fbf3e1] p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-[#3b2f22]">How to play</h2>
          <button
            onClick={onClose}
            aria-label="Close help"
            className="rounded-full p-1 text-[#8a6d3b] hover:bg-[#eaddc0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="mt-4 space-y-2.5 text-sm text-[#6b543a]">
          <li>🖱️ Click any labelled place — the character walks there.</li>
          <li>💬 When he arrives, a card reveals that part of the résumé.</li>
          <li>🌱 Click open grass to wander around.</li>
          <li>📄 Busy? Use “Résumé” for the classic one-page version.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------- Chrome */
export function GameChrome({
  islandId,
  activePlace,
  visited,
  onSelect,
  onFlyHome,
  sound,
  onToggleSound,
}: {
  islandId: IslandId;
  activePlace: string | null;
  visited: string[];
  onSelect: (id: string) => void;
  onFlyHome: () => void;
  sound: boolean;
  onToggleSound: () => void;
}) {
  const [help, setHelp] = useState(false);
  const island = islands[islandId];
  const isHub = islandId === "hub";
  const dockItems = isHub
    ? places.map((p) => ({ id: p.id as string, label: p.label, emoji: p.emoji }))
    : island.spots.map((s) => ({ id: s.id, label: s.label, emoji: s.emoji }));

  return (
    <>
      {/* Top-left: help */}
      <div className="pointer-events-none absolute left-4 top-4 z-20">
        <button
          type="button"
          onClick={() => setHelp(true)}
          aria-label="How to play"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 text-[#6b543a] shadow-sm backdrop-blur transition-colors hover:border-[#b98a5a]"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Top-center: current country + fly home (only away from the hub) */}
      {!isHub && (
        <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 px-3 py-1.5 text-xs font-semibold text-[#4a3b28] shadow-sm backdrop-blur">
            <span className="text-base" aria-hidden>
              {island.flag}
            </span>
            {island.name}
            <button
              type="button"
              onClick={onFlyHome}
              className="ml-1 rounded-full bg-[#3b2f22] px-2.5 py-1 text-[11px] font-medium text-[#f7ecd6] transition-colors hover:bg-[#4a3b28]"
            >
              ✈︎ Home
            </button>
          </div>
        </div>
      )}

      {/* Top-right: sound + résumé */}
      <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={sound ? "Mute sound" : "Enable sound"}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 text-[#6b543a] shadow-sm backdrop-blur transition-colors hover:border-[#b98a5a]"
        >
          {sound ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </button>
        <Link
          href="/resume"
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 px-3.5 py-2 text-xs font-semibold text-[#4a3b28] shadow-sm backdrop-blur transition-colors hover:border-[#b98a5a]"
        >
          <FileText className="h-4 w-4" /> Résumé
        </Link>
      </div>

      {/* Bottom: place dock */}
      <div
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4",
          activePlace ? "max-sm:hidden" : "",
        ].join(" ")}
      >
        <div className="pointer-events-auto flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 p-1.5 shadow-lg backdrop-blur">
          {dockItems.map((p) => {
            const isActive = activePlace === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                aria-label={`Go to ${p.label}`}
                className={[
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-[#3b2f22] text-[#f7ecd6]"
                    : "text-[#6b543a] hover:bg-[#eaddc0]",
                ].join(" ")}
              >
                <span aria-hidden>{p.emoji}</span>
                <span className="hidden sm:inline">
                  {p.label.replace("The ", "")}
                </span>
                {visited.includes(p.id) && !isActive && (
                  <span aria-hidden className="text-[#8bbf6a]">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {help && <HelpModal onClose={() => setHelp(false)} />}
      </AnimatePresence>
    </>
  );
}
