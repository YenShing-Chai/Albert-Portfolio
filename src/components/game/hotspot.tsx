"use client";

import { Html } from "@react-three/drei";

/** Minimal shape shared by hub places and country spots. */
export interface HotspotPlace {
  id: string;
  label: string;
  emoji: string;
}

export function Hotspot({
  place,
  active,
  visited,
  onSelect,
}: {
  place: HotspotPlace;
  active: boolean;
  visited: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Html
      position={[0, 2.5, 0]}
      center
      distanceFactor={10}
      zIndexRange={[20, 0]}
      className="select-none"
      style={{ pointerEvents: "none" }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(place.id);
        }}
        aria-label={`Visit ${place.label}`}
        className="group/pin flex flex-col items-center gap-1"
        style={{ pointerEvents: "auto" }}
      >
        <span
          className={[
            "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-semibold shadow-[0_4px_14px_rgba(60,40,20,0.18)] transition-all duration-200",
            active
              ? "border-[#c8a06a] bg-[#3b2f22] text-[#f7ecd6]"
              : "border-[#e4d3ae] bg-[#fbf3e1] text-[#6b543a] group-hover/pin:-translate-y-0.5 group-hover/pin:border-[#c8a06a]",
          ].join(" ")}
        >
          <span aria-hidden className="text-base leading-none">
            {place.emoji}
          </span>
          {place.label}
          {visited && !active && (
            <span aria-hidden className="text-[#8bbf6a]">
              ✓
            </span>
          )}
        </span>
        {/* bobbing pointer */}
        <span
          aria-hidden
          className="h-2 w-2 rotate-45 rounded-[1px] border-b border-r border-[#e4d3ae] bg-[#fbf3e1] motion-safe:animate-bounce"
          style={{ marginTop: -6 }}
        />
      </button>
    </Html>
  );
}
