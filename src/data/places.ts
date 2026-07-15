/**
 * Places in the cozy world. Each maps a clickable building to a content panel.
 * Coordinates are world units on the ground plane: [x, z] (y is up).
 *  - `position`  = where the building sits
 *  - `stand`     = where the character stops to "read" it
 */
export type PlaceId =
  | "home"
  | "experience"
  | "work"
  | "ai"
  | "impact"
  | "contact"
  | "hextar";

export interface Place {
  id: PlaceId;
  /** In-world label above the building. */
  label: string;
  /** Character's speech bubble on arrival. */
  greeting: string;
  emoji: string;
  position: [number, number];
  stand: [number, number];
}

export const places: Place[] = [
  {
    id: "home",
    label: "Albert's Crib",
    greeting: "This is me — a little about who I am.",
    emoji: "🏠",
    position: [0, -4.6],
    stand: [0, -2.7],
  },
  {
    id: "hextar",
    label: "Hextar Technologies",
    greeting: "Where I lead product today.",
    emoji: "💳",
    position: [2.9, -3.5],
    stand: [1.7, -2.1],
  },
  {
    id: "experience",
    label: "The Airport",
    greeting: "Where I've worked — hop on a flight.",
    emoji: "✈️",
    position: [-5, -1.2],
    stand: [-3.1, -0.6],
  },
  {
    id: "work",
    label: "Albert's Project",
    greeting: "Things I've built, from zero to one.",
    emoji: "⚒️",
    // Pulled in so the 2.2-wide GLB workshop clears the island rim.
    position: [4.55, -1.1],
    stand: [2.85, -0.55],
  },
  {
    id: "ai",
    label: "Albert's AI Space",
    greeting: "Where I turn AI into real leverage.",
    emoji: "🔬",
    // Mirror of the Garden's inward nudge, keeping the front two symmetric.
    position: [-3.65, 2.65],
    stand: [-2.24, 1.58],
  },
  {
    id: "impact",
    label: "Results",
    greeting: "The numbers I've helped grow.",
    emoji: "🌷",
    // Pulled inward along the same ray: the 2.2-wide GLB garden overhung the
    // island rim at the old radius (~5.4); this keeps its far corner inside.
    position: [3.65, 2.65],
    stand: [2.24, 1.58],
  },
  {
    id: "contact",
    label: "The Mailbox",
    greeting: "Drop me a note — let's talk.",
    emoji: "📮",
    position: [0, 5],
    stand: [0, 3.2],
  },
];

export const START_POSITION: [number, number] = [0, 0.4];

export function getPlace(id: PlaceId | null): Place | undefined {
  return places.find((p) => p.id === id) ?? undefined;
}
