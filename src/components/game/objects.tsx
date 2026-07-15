"use client";

import { type ReactNode } from "react";
import type { ThreeElements } from "@react-three/fiber";

/** Cozy low-poly palette. */
export const C = {
  grass: "#9ccb6a",
  grassDark: "#7bb04f",
  soil: "#b07f52",
  soilDark: "#8a613c",
  wood: "#c49a6c",
  woodDark: "#9c6f45",
  wall: "#f3e8d2",
  wallWarm: "#ecd9b8",
  roof: "#d9806f",
  roofDark: "#c25f50",
  water: "#8fd0e6",
  waterDeep: "#6bb8d6",
  leaf: "#83b96a",
  leaf2: "#9ecb7f",
  trunk: "#9c6f45",
  stone: "#d2cabb",
  stoneDark: "#b6ac9a",
  pink: "#f4a6c0",
  yellow: "#f6d365",
  white: "#fdfdf6",
  glow: "#ffcf87",
  tech: "#c7d3f0",
  techGlow: "#8aa2e8",
  red: "#e0796b",
} as const;

type GroupProps = ThreeElements["group"];

/** Small helper for a faceted standard material. */
function Mat({
  color,
  flat = true,
  rough = 0.85,
  emissive,
  emissiveIntensity,
}: {
  color: string;
  flat?: boolean;
  rough?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      flatShading={flat}
      roughness={rough}
      metalness={0}
      emissive={emissive ?? "#000000"}
      emissiveIntensity={emissiveIntensity ?? 0}
    />
  );
}

function Box({
  args,
  position,
  rotation,
  color,
  flat = true,
  rough,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  flat?: boolean;
  rough?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <Mat color={color} flat={flat} rough={rough} />
    </mesh>
  );
}

/** 4-sided pyramid roof. */
function Roof({
  radius,
  height,
  y,
  color,
}: {
  radius: number;
  height: number;
  y: number;
  color: string;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[radius, height, 4]} />
      <Mat color={color} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ House */
export function Cottage(props: GroupProps) {
  return (
    <group {...props}>
      <Box args={[1.7, 1.15, 1.5]} position={[0, 0.58, 0]} color={C.wall} />
      <Roof radius={1.45} height={1.0} y={1.62} color={C.roof} />
      {/* door */}
      <Box args={[0.44, 0.66, 0.08]} position={[0, 0.33, 0.76]} color={C.woodDark} />
      {/* windows */}
      <Box args={[0.32, 0.32, 0.06]} position={[-0.55, 0.72, 0.76]} color={C.techGlow} />
      <Box args={[0.32, 0.32, 0.06]} position={[0.55, 0.72, 0.76]} color={C.techGlow} />
      {/* chimney */}
      <Box args={[0.22, 0.55, 0.22]} position={[0.5, 1.7, -0.2]} color={C.roofDark} />
      {/* step */}
      <Box args={[0.7, 0.12, 0.3]} position={[0, 0.06, 0.92]} color={C.stone} />
    </group>
  );
}

/* --------------------------------------------------------------- Signpost */
export function Signpost(props: GroupProps) {
  return (
    <group {...props}>
      <Box args={[0.14, 1.3, 0.14]} position={[0, 0.65, 0]} color={C.woodDark} />
      <Box args={[1.0, 0.4, 0.1]} position={[0.15, 1.02, 0]} rotation={[0, 0, -0.04]} color={C.wood} />
      <Box args={[0.8, 0.34, 0.1]} position={[-0.12, 0.6, 0]} rotation={[0, 0, 0.05]} color={C.wallWarm} />
      {/* cap */}
      <mesh position={[0, 1.34, 0]} castShadow>
        <coneGeometry args={[0.13, 0.16, 6]} />
        <Mat color={C.roofDark} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- Workshop */
export function Workshop(props: GroupProps) {
  return (
    <group {...props}>
      {/* hut */}
      <Box args={[1.5, 1.0, 1.3]} position={[0, 0.5, 0]} color={C.wallWarm} />
      <Roof radius={1.3} height={0.85} y={1.42} color={C.woodDark} />
      <Box args={[0.5, 0.7, 0.08]} position={[0, 0.35, 0.66]} color={C.woodDark} />
      {/* anvil */}
      <Box args={[0.4, 0.18, 0.24]} position={[0.95, 0.28, 0.6]} color={C.stoneDark} />
      <Box args={[0.16, 0.2, 0.16]} position={[0.95, 0.12, 0.6]} color={C.stone} />
      {/* campfire */}
      <group position={[-0.95, 0, 0.7]}>
        <Box args={[0.5, 0.1, 0.14]} position={[0, 0.06, 0]} rotation={[0, 0.4, 0]} color={C.woodDark} />
        <Box args={[0.5, 0.1, 0.14]} position={[0, 0.06, 0]} rotation={[0, -0.5, 0]} color={C.wood} />
        <mesh position={[0, 0.28, 0]} castShadow>
          <coneGeometry args={[0.16, 0.4, 6]} />
          <Mat color={C.glow} emissive={C.glow} emissiveIntensity={0.8} />
        </mesh>
        <pointLight position={[0, 0.4, 0]} color={C.glow} intensity={6} distance={3} decay={2} />
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------- Lab */
export function Lab(props: GroupProps) {
  return (
    <group {...props}>
      <Box args={[1.5, 1.0, 1.3]} position={[0, 0.5, 0]} color={C.tech} />
      <Roof radius={1.28} height={0.75} y={1.4} color={C.techGlow} />
      <Box args={[0.5, 0.66, 0.08]} position={[0, 0.33, 0.66]} color={C.woodDark} />
      {/* antenna */}
      <mesh position={[0.45, 1.75, -0.2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
        <Mat color={C.stoneDark} />
      </mesh>
      {/* glowing orb */}
      <mesh position={[-0.6, 1.35, 0.5]} castShadow>
        <icosahedronGeometry args={[0.24, 0]} />
        <Mat color={C.techGlow} emissive={C.techGlow} emissiveIntensity={1.1} />
      </mesh>
      <pointLight position={[-0.6, 1.35, 0.5]} color={C.techGlow} intensity={5} distance={3} decay={2} />
    </group>
  );
}

/* ----------------------------------------------------------- Garden / Well */
export function Well(props: GroupProps) {
  return (
    <group {...props}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.6, 12]} />
        <Mat color={C.stone} />
      </mesh>
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.04, 12]} />
        <Mat color={C.waterDeep} flat={false} rough={0.3} />
      </mesh>
      {/* posts + roof */}
      <Box args={[0.1, 0.9, 0.1]} position={[-0.45, 1.0, 0]} color={C.woodDark} />
      <Box args={[0.1, 0.9, 0.1]} position={[0.45, 1.0, 0]} color={C.woodDark} />
      <Roof radius={0.85} height={0.5} y={1.65} color={C.roof} />
      <Flower position={[0.9, 0, 0.5]} color={C.pink} />
      <Flower position={[-0.9, 0, 0.6]} color={C.yellow} />
      <Flower position={[0.7, 0, -0.7]} color={C.white} />
    </group>
  );
}

/* -------------------------------------------------------------- Mailbox */
export function Mailbox(props: GroupProps) {
  return (
    <group {...props}>
      <Box args={[0.12, 0.85, 0.12]} position={[0, 0.42, 0]} color={C.woodDark} />
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 12, 1, false, 0, Math.PI]} />
        <Mat color={C.red} />
      </mesh>
      <Box args={[0.5, 0.02, 0.44]} position={[0, 0.73, 0]} color={C.red} />
      {/* flag */}
      <Box args={[0.04, 0.22, 0.02]} position={[0.26, 1.02, 0.1]} color={C.woodDark} />
      <Box args={[0.14, 0.12, 0.02]} position={[0.33, 1.08, 0.1]} color={C.yellow} />
    </group>
  );
}

/* -------------------------------------------------------------- Scenery */
export function Tree({
  scale = 1,
  ...props
}: GroupProps & { scale?: number }) {
  return (
    <group {...props} scale={scale}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.8, 6]} />
        <Mat color={C.trunk} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <icosahedronGeometry args={[0.5, 0]} />
        <Mat color={C.leaf} />
      </mesh>
      <mesh position={[0.2, 1.35, 0.1]} castShadow>
        <icosahedronGeometry args={[0.34, 0]} />
        <Mat color={C.leaf2} />
      </mesh>
      <mesh position={[-0.2, 1.25, -0.1]} castShadow>
        <icosahedronGeometry args={[0.3, 0]} />
        <Mat color={C.leaf} />
      </mesh>
    </group>
  );
}

export function Bush({ scale = 1, ...props }: GroupProps & { scale?: number }) {
  return (
    <group {...props} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <icosahedronGeometry args={[0.34, 0]} />
        <Mat color={C.leaf2} />
      </mesh>
      <mesh position={[0.25, 0.2, 0.1]} castShadow>
        <icosahedronGeometry args={[0.24, 0]} />
        <Mat color={C.leaf} />
      </mesh>
    </group>
  );
}

export function Flower({
  color = C.pink,
  ...props
}: GroupProps & { color?: string }) {
  return (
    <group {...props}>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.32, 5]} />
        <Mat color={C.grassDark} />
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow>
        <icosahedronGeometry args={[0.09, 0]} />
        <Mat color={color} />
      </mesh>
    </group>
  );
}

export function Rock({ scale = 1, ...props }: GroupProps & { scale?: number }) {
  return (
    <mesh {...props} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.3, 0]} />
      <Mat color={C.stone} />
    </mesh>
  );
}

export function Lantern(props: GroupProps) {
  return (
    <group {...props}>
      <Box args={[0.08, 0.6, 0.08]} position={[0, 0.3, 0]} color={C.woodDark} />
      <mesh position={[0, 0.68, 0]} castShadow>
        <boxGeometry args={[0.16, 0.2, 0.16]} />
        <Mat color={C.glow} emissive={C.glow} emissiveIntensity={0.9} />
      </mesh>
      <pointLight position={[0, 0.68, 0]} color={C.glow} intensity={2.2} distance={2.4} decay={2} />
    </group>
  );
}

/** Wrap children so they cast/receive nicely; convenience passthrough. */
export function Prop({ children, ...props }: GroupProps & { children: ReactNode }) {
  return <group {...props}>{children}</group>;
}
