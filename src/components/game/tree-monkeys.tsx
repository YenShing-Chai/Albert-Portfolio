"use client";

/**
 * A few monkeys climbing around the Kuching trees. The monkey GLB is unrigged,
 * so each one ORBITS its tree (a circle around the foliage) while rising and
 * dipping — a lazy spiral climb — and faces the way it's moving. At the game's
 * camera distance that reads as "climbing around the tree" without any rig.
 * Tree centres mirror the country-island Tree props in scene.tsx. Kuching only.
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

const MONKEY_URL = "/models/buildings/kuching/monkey.glb";
useGLTF.preload(MONKEY_URL);

interface TreeSpot {
  center: [number, number]; // x, z of the tree
  treeScale: number; // matches the Tree's scale so orbit + height fit the foliage
  monkeyScale: number;
  dir: 1 | -1; // orbit direction
  speed: number; // radians / sec
  phase: number; // stagger
}

// One monkey per tree (positions/scales mirror scene.tsx's country-island Trees).
const TREES: TreeSpot[] = [
  { center: [-5.1, 2.6], treeScale: 1.05, monkeyScale: 0.4, dir: 1, speed: 0.5, phase: 0 },
  { center: [5.0, 2.8], treeScale: 0.9, monkeyScale: 0.36, dir: -1, speed: 0.62, phase: 1.6 },
  { center: [4.7, -3.0], treeScale: 1.0, monkeyScale: 0.4, dir: 1, speed: 0.44, phase: 3.0 },
  { center: [-4.6, -3.2], treeScale: 0.95, monkeyScale: 0.38, dir: -1, speed: 0.56, phase: 4.2 },
];

function orbit(spot: TreeSpot, angle: number) {
  // Tuned to the GLB tree (tree.glb): foliage centre ~1.15 tall, radius ~0.775
  // at scale 1, so the monkey circles the canopy surface and rises/dips within it.
  const radius = 0.7 * spot.treeScale; // at the canopy surface
  const baseY = 1.12 * spot.treeScale; // foliage centre height
  const yAmp = 0.38 * spot.treeScale; // how far up/down the climb ranges
  const x = spot.center[0] + Math.cos(angle) * radius;
  const z = spot.center[1] + Math.sin(angle) * radius;
  const y = baseY + Math.sin(angle * 2 + spot.phase) * yAmp;
  // heading = tangent (direction of travel), so it leads face-first
  const heading = Math.atan2(-Math.sin(angle) * spot.dir, Math.cos(angle) * spot.dir);
  return { x, y, z, heading };
}

function Monkey({
  spot,
  reducedMotion,
}: {
  spot: TreeSpot;
  reducedMotion: boolean;
}) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(MONKEY_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Initial (also the resting spot when reduced-motion) — pure, ok in render.
  const start = orbit(spot, spot.phase);

  useFrame((state) => {
    const g = ref.current;
    if (reducedMotion || !g) return;
    const angle = spot.phase + state.clock.elapsedTime * spot.speed * spot.dir;
    const p = orbit(spot, angle);
    g.position.set(p.x, p.y, p.z);
    g.rotation.set(0, p.heading, Math.sin(angle * 2) * 0.06);
  });

  return (
    <group
      ref={ref}
      position={[start.x, start.y, start.z]}
      rotation={[0, start.heading, 0]}
      scale={spot.monkeyScale}
    >
      <primitive object={model} />
    </group>
  );
}

export function TreeMonkeys({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      {TREES.map((t, i) => (
        <Monkey key={i} spot={t} reducedMotion={reducedMotion} />
      ))}
    </>
  );
}
