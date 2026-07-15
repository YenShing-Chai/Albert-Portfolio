"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getPlace, type PlaceId } from "@/data/places";
import { getSpot, islands, type IslandId } from "@/data/islands";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { playChime } from "@/lib/chime";
import { setMuted, startBackground } from "@/lib/audio";
import type { WalkTarget } from "./character";
import { DialoguePanel } from "./dialogue-panel";
import { GameChrome, GameLoader, IntroOverlay } from "./game-ui";
import { TravelOverlay } from "./travel-overlay";

const GameCanvas = dynamic(
  () => import("./game-canvas").then((m) => m.GameCanvas),
  { ssr: false, loading: () => <GameLoader /> },
);

const WELCOME =
  "Hi, I'm Albert. Welcome to my portfolio. You can explore by clicking around the map.";

export function GameHome() {
  const reducedMotion = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);

  const [location, setLocation] = useState<IslandId>("hub");
  const [traveling, setTraveling] = useState<IslandId | null>(null);
  const [target, setTarget] = useState<WalkTarget | null>(null);
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [speech, setSpeech] = useState<string | null>(null);

  const standFor = useCallback(
    (id: string): [number, number] | undefined => {
      if (location === "hub") return getPlace(id as PlaceId)?.stand;
      return getSpot(location, id)?.stand;
    },
    [location],
  );

  const selectPlace = useCallback(
    (id: string) => {
      const stand = standFor(id);
      if (!stand) return;
      setSpeech(null);
      setActivePlace(null);
      setTarget({ x: stand[0], z: stand[1], place: id });
    },
    [standFor],
  );

  const onArrive = useCallback((place: string | null) => {
    if (!place) return;
    setActivePlace(place);
    setVisited((v) => (v.includes(place) ? v : [...v, place]));
    if (soundRef.current) playChime();
  }, []);

  const onGroundClick = useCallback((x: number, z: number) => {
    setSpeech(null);
    setActivePlace(null);
    setTarget({ x, z, place: null });
  }, []);

  // ---- Travel between islands -------------------------------------------
  const flyTo = useCallback(
    (dest: IslandId) => {
      if (dest === location || traveling) return;
      setSpeech(null);
      setActivePlace(null);
      setTarget(null);
      setTraveling(dest);
    },
    [location, traveling],
  );

  // Mid-cutscene: swap the island behind the opaque landing card.
  const onLanded = useCallback(() => {
    if (!traveling) return;
    setLocation(traveling);
    setVisited([]);
    setActivePlace(null);
    setTarget(null);
  }, [traveling]);

  const onTravelDone = useCallback(() => setTraveling(null), []);

  const toggleSound = useCallback(() => {
    setSound((s) => {
      const next = !s;
      soundRef.current = next;
      setMuted(!next);
      return next;
    });
  }, []);

  const onStart = useCallback(() => {
    setStarted(true);
    startBackground();
    if (soundRef.current) playChime();
    // Character greets the visitor, then the bubble fades on its own.
    setSpeech(WELCOME);
    window.setTimeout(() => setSpeech(null), 9000);
  }, []);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#f4f1ea]">
      <GameCanvas
        islandId={location}
        target={target}
        activePlace={activePlace}
        visited={visited}
        onSelectPlace={selectPlace}
        onArrive={onArrive}
        onGroundClick={onGroundClick}
        reducedMotion={reducedMotion}
        speech={speech}
      />

      <GameChrome
        islandId={location}
        activePlace={activePlace}
        visited={visited}
        onSelect={selectPlace}
        onFlyHome={() => flyTo("hub")}
        sound={sound}
        onToggleSound={toggleSound}
      />

      <DialoguePanel
        islandId={location}
        placeId={activePlace}
        onClose={() => setActivePlace(null)}
        onFly={flyTo}
      />

      <TravelOverlay
        destination={traveling ? islands[traveling] : null}
        onLanded={onLanded}
        onDone={onTravelDone}
      />

      <AnimatePresence>
        {!started && <IntroOverlay onStart={onStart} />}
      </AnimatePresence>
    </div>
  );
}
