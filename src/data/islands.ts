/**
 * Islands for the "travel" feature. The character flies between:
 *   - hub      → Kuala Lumpur, Malaysia (home base, where he works now; the
 *                rich hub rendered from places.ts + a Hextar building)
 *   - singapore→ earlier career (companies + school)
 *   - kuching  → hometown (minimal "Home" island, House placeholder)
 *
 * Country-island buildings are procedural placeholders — each spot can later
 * point to a country-specific GLB via `modelUrl`.
 */

export type IslandId = "hub" | "singapore" | "kuching";

export type SpotKind = "company" | "school" | "airport" | "home";

/** Procedural placeholder building shapes reused from the hub object kit. */
export type BuildingKind =
  | "cottage"
  | "workshop"
  | "lab"
  | "well"
  | "signpost"
  | "mailbox";

export interface CountrySpot {
  id: string;
  label: string;
  greeting: string;
  emoji: string;
  kind: SpotKind;
  building: BuildingKind;
  /** Optional GLB override — set when a country-specific model is provided. */
  modelUrl?: string;
  position: [number, number];
  stand: [number, number];
  /** Role ids into experience.ts (a company may hold several roles). */
  roleIds?: string[];
  /** Index into education[] for school spots. */
  educationIndex?: number;
}

export interface Island {
  id: IslandId;
  name: string;
  flag: string;
  /** Shown on the landing card after the flight. */
  landingMessage: string;
  /** Short subtitle under the landing message. */
  chapter: string;
  /** Character spawn point on arrival. */
  start: [number, number];
  /** Grass tint so the islands read distinctly. */
  grass: string;
  /** Country-island buildings (empty for the hub, which uses places.ts). */
  spots: CountrySpot[];
}

/** Airport spot present on travel islands to fly onward / home. */
function airport(position: [number, number], stand: [number, number]): CountrySpot {
  return {
    id: "airport",
    label: "The Airport",
    greeting: "Ready for the next stop?",
    emoji: "✈️",
    kind: "airport",
    building: "signpost",
    modelUrl: "/models/buildings/kuala-lumpur/airport.glb",
    position,
    stand,
  };
}

export const islands: Record<IslandId, Island> = {
  hub: {
    id: "hub",
    name: "Kuala Lumpur",
    flag: "🇲🇾",
    landingMessage: "Back in Kuala Lumpur",
    chapter: "home base · Head of Product",
    start: [0, 0.4],
    grass: "#9ccb6a",
    spots: [], // hub is rendered from places.ts
  },

  singapore: {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    landingMessage: "You have landed in Singapore",
    chapter: "2014 – 2024 · where my career began",
    start: [0, 0.4],
    grass: "#8fc96a",
    spots: [
      {
        id: "sg-aigens",
        label: "Aigens Technology",
        greeting: "Product & project work across APAC F&B.",
        emoji: "🍽️",
        kind: "company",
        building: "workshop",
        modelUrl: "/models/buildings/singapore/aigens.glb",
        position: [0, -4],
        stand: [0, -2.4],
        roleIds: ["aigens-pm", "aigens-projmgr", "aigens-support"],
      },
      {
        id: "sg-revel",
        label: "Revel Systems",
        greeting: "Onboarding enterprise clients onto cloud POS.",
        emoji: "🧾",
        kind: "company",
        building: "lab",
        modelUrl: "/models/buildings/singapore/revel.glb",
        position: [-4.2, -0.8],
        stand: [-2.5, -0.5],
        roleIds: ["revel"],
      },
      {
        id: "sg-bindo",
        label: "Bindo Labs",
        greeting: "POS setup & reseller partners across SEA.",
        emoji: "🛍️",
        kind: "company",
        building: "cottage",
        modelUrl: "/models/buildings/singapore/bindo.glb",
        position: [4.2, -0.8],
        stand: [2.5, -0.5],
        roleIds: ["bindo"],
      },
      {
        id: "sg-durst",
        label: "Durst Image Technology",
        greeting: "Where I started — precision imaging engineering.",
        emoji: "🖨️",
        kind: "company",
        building: "well",
        modelUrl: "/models/buildings/singapore/durst.glb",
        position: [-3.4, 3.2],
        stand: [-2.1, 2.0],
        roleIds: ["durst"],
      },
      {
        id: "sg-nanyang",
        label: "Nanyang",
        greeting: "Diploma in Digital & Precision Engineering.",
        emoji: "🎓",
        kind: "school",
        building: "lab",
        modelUrl: "/models/buildings/singapore/nanyang.glb",
        position: [3.4, 3.2],
        stand: [2.1, 2.0],
        educationIndex: 0,
      },
      airport([0, 4.6], [0, 2.9]),
    ],
  },

  kuching: {
    id: "kuching",
    name: "Kuching",
    flag: "🏝️",
    landingMessage: "You have landed in Kuching",
    chapter: "my hometown — where I'm from",
    start: [0, 0.4],
    grass: "#a6d16a",
    spots: [
      {
        id: "kuching-home",
        label: "Home",
        greeting: "This is where I grew up.",
        emoji: "🏡",
        kind: "home",
        building: "cottage",
        modelUrl: "/models/buildings/kuching/kuching-home.glb",
        position: [0, -3],
        stand: [0, -1.2],
      },
      airport([0, 4], [0, 2.4]),
    ],
  },
};

/** Destinations you can fly to from a given island (everything but itself). */
export function travelOptions(from: IslandId): Island[] {
  const order: IslandId[] = ["hub", "singapore", "kuching"];
  return order.filter((id) => id !== from).map((id) => islands[id]);
}

export function getSpot(island: IslandId, spotId: string): CountrySpot | undefined {
  return islands[island].spots.find((s) => s.id === spotId);
}
