"use client";

/**
 * Kuching is "Cat City" — a few cats scamper around the hometown island.
 * The cat GLB is NOT rigged, so there's no walk animation. Instead each cat
 * wanders procedurally: pick a spot, scurry to it with a little hop + lean,
 * turn to face travel, pause, repeat. At the game's camera distance a bobbing
 * body reads as "running around" without any skeleton.
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

const CAT_URL = "/models/buildings/kuching/cat.glb";
useGLTF.preload(CAT_URL);

// The cat's nose points along -Z in the exported model, so flip 180° to lead
// with the nose when running.
const FORWARD_OFFSET = Math.PI;

interface CatConfig {
  scale: number;
  speed: number; // units/sec while running
  start: [number, number];
}

// A few cats with slightly different sizes/speeds so they don't move in lockstep.
const CATS: CatConfig[] = [
  { scale: 0.55, speed: 1.15, start: [1.8, 1.2] },
  { scale: 0.48, speed: 1.35, start: [-2.2, 0.6] },
  { scale: 0.6, speed: 0.95, start: [2.6, -1.6] },
  { scale: 0.5, speed: 1.25, start: [-1.4, -2.2] },
];

const ROAM_RADIUS = 4.7; // keep them comfortably inside the 6-unit island rim

function pickTarget(cx: number, cz: number): [number, number] {
  // A new goal within a short hop of the current spot, clamped to the island.
  const ang = Math.random() * Math.PI * 2;
  const dist = 1.4 + Math.random() * 2.6;
  let x = cx + Math.cos(ang) * dist;
  let z = cz + Math.sin(ang) * dist;
  const r = Math.hypot(x, z);
  if (r > ROAM_RADIUS) {
    x = (x / r) * ROAM_RADIUS;
    z = (z / r) * ROAM_RADIUS;
  }
  return [x, z];
}

interface CatRuntime {
  x: number;
  z: number;
  tx: number;
  tz: number;
  heading: number;
  pause: number;
  bob: number; // accumulates while moving, drives the hop
}

function Cat({ config, index }: { config: CatConfig; index: number }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(CAT_URL);

  // Clone so every cat is an independent object (and we can enable shadows
  // without mutating drei's cached scene).
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

  // Initial values are deterministic (no Math.random during render — React 19
  // purity rule). Wander randomness lives in useFrame, which runs outside render.
  const state = useRef<CatRuntime>({
    x: config.start[0],
    z: config.start[1],
    tx: config.start[0],
    tz: config.start[1],
    heading: Math.atan2(config.start[0], config.start[1]),
    pause: 0.4 + index * 0.45, // stagger so they don't all dash at once
    bob: 0,
  });

  useFrame((_, rawDelta) => {
    const g = ref.current;
    if (!g) return;
    const delta = Math.min(rawDelta, 0.05); // clamp big frame gaps
    const s = state.current;

    if (s.pause > 0) {
      // Sitting for a beat — settle to the ground, breathe a little.
      s.pause -= delta;
      if (s.pause <= 0) {
        const [tx, tz] = pickTarget(s.x, s.z);
        s.tx = tx;
        s.tz = tz;
      }
      g.position.set(s.x, 0, s.z);
      g.rotation.set(0, s.heading + FORWARD_OFFSET, 0);
      return;
    }

    const dx = s.tx - s.x;
    const dz = s.tz - s.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 0.12) {
      // Arrived — take a short rest before the next dash.
      s.pause = 0.4 + Math.random() * 1.8;
      s.bob = 0;
      g.position.set(s.x, 0, s.z);
      return;
    }

    // Step toward the target.
    const step = Math.min(config.speed * delta, dist);
    s.x += (dx / dist) * step;
    s.z += (dz / dist) * step;

    // Turn smoothly toward travel direction.
    const want = Math.atan2(dx, dz);
    let diff = want - s.heading;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    s.heading += diff * Math.min(1, delta * 10);

    // Hop + scamper lean.
    s.bob += delta * config.speed * 9;
    const hop = Math.abs(Math.sin(s.bob)) * 0.09;
    const lean = Math.cos(s.bob * 2) * 0.05;

    g.position.set(s.x, hop, s.z);
    g.rotation.set(lean, s.heading + FORWARD_OFFSET, 0);
  });

  return (
    <group ref={ref} scale={config.scale}>
      <primitive object={model} />
    </group>
  );
}

export function WanderingCats() {
  return (
    <>
      {CATS.map((c, i) => (
        <Cat key={i} config={c} index={i} />
      ))}
    </>
  );
}
