"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { START_POSITION } from "@/data/places";

export interface WalkTarget {
  x: number;
  z: number;
  /** Place/spot id being walked to (island-scoped), or null for free walks. */
  place: string | null;
}

const MODEL_URL = "/models/villager.glb";
useGLTF.preload(MODEL_URL);

// Mixamo mesh is ~0.98m tall; scale up to the game's ~1.4m character size.
const MODEL_SCALE = 1.43;
// Seconds the wave runs before crossfading back to idle.
const WAVE_SECONDS = 1.6;

function lerpAngle(a: number, b: number, t: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export function Character({
  target,
  onArrive,
  reducedMotion = false,
  speed = 2.8,
  speech = null,
}: {
  target: WalkTarget | null;
  onArrive: (place: string | null) => void;
  reducedMotion?: boolean;
  speed?: number;
  speech?: string | null;
}) {
  const group = useRef<THREE.Group>(null);
  const arrivedFor = useRef<string | null>(null);

  const { scene, animations } = useGLTF(MODEL_URL);

  // The Mixamo Walk clip bakes ~0.48u of forward (z) root motion into the Hips.
  // Because we drive the character's position in code, that baked drift both
  // double-moves him and snaps back to zero each loop — the visible "move,
  // stop, move" stutter. Flatten the Hips forward drift so the walk plays in
  // place (same as Mixamo's "In Place" option); the code movement is then the
  // only thing carrying him. Keep the vertical bob + side sway so it stays
  // lively, and leave Idle/Wave untouched.
  const clips = useMemo(
    () =>
      animations.map((clip) => {
        if (clip.name !== "Walk") return clip;
        const c = clip.clone();
        for (const track of c.tracks) {
          if (!track.name.endsWith("Hips.position")) continue;
          const v = track.values; // flat [x,y,z, x,y,z, ...]
          const z0 = v[2];
          for (let i = 2; i < v.length; i += 3) v[i] = z0;
        }
        return c;
      }),
    [animations]
  );

  const { actions } = useAnimations(clips, group);

  // AnimationAction API is mutation-based, so playback state lives in a ref.
  const anim = useRef({
    actions: null as null | typeof actions,
    current: null as THREE.AnimationAction | null,
    waving: false,
    waveUntil: 0,
  });

  useEffect(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.frustumCulled = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    anim.current.actions = actions;
    const idle = actions.Idle;
    if (idle) {
      idle.reset().play();
      anim.current.current = idle;
    }
  }, [actions]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const a = anim.current;
    const acts = a.actions;
    const now = state.clock.elapsedTime;

    const fadeTo = (name: "Idle" | "Walk", dur = 0.25) => {
      if (!acts) return;
      const next = acts[name];
      if (!next || a.current === next) return;
      next.reset().setEffectiveWeight(1).fadeIn(dur).play();
      a.current?.fadeOut(dur);
      a.current = next;
    };

    let walking = false;
    if (target) {
      const dx = target.x - g.position.x;
      const dz = target.z - g.position.z;
      const dist = Math.hypot(dx, dz);
      const sig = `${target.place ?? "free"}:${target.x.toFixed(2)},${target.z.toFixed(2)}`;

      if (dist > 0.08) {
        walking = true;
        const step = Math.min(dist, speed * Math.min(delta, 0.05));
        g.position.x += (dx / dist) * step;
        g.position.z += (dz / dist) * step;
        const angle = Math.atan2(dx, dz); // model faces +Z, aim it at travel dir
        g.rotation.y = reducedMotion
          ? angle
          : lerpAngle(g.rotation.y, angle, 0.25);
      } else if (arrivedFor.current !== sig) {
        arrivedFor.current = sig;
        onArrive(target.place);
        // Wave hello on arriving at a place.
        const w = acts?.Wave;
        if (w && target.place && !reducedMotion) {
          w.reset().setEffectiveWeight(1).fadeIn(0.2).play();
          if (a.current && a.current !== w) a.current.fadeOut(0.2);
          a.current = w;
          a.waving = true;
          a.waveUntil = now + WAVE_SECONDS;
        }
      }
    }

    // Walk/Idle are functional feedback and always play; only the wave respects
    // reduced-motion.
    if (walking) {
      a.waving = false;
      fadeTo("Walk");
    } else if (a.waving && now < a.waveUntil) {
      // hold the wave until it finishes
    } else {
      a.waving = false;
      fadeTo("Idle");
    }
  });

  return (
    <group ref={group} position={[START_POSITION[0], 0, START_POSITION[1]]}>
      <group scale={MODEL_SCALE}>
        <primitive object={scene} />
      </group>
      {speech && (
        <Html
          position={[0, 2.5, 0]}
          center
          distanceFactor={11}
          zIndexRange={[30, 0]}
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-[220px] select-none rounded-2xl border border-[#e0cfa8] bg-[#fbf3e1] px-4 py-2.5 text-center text-[13px] font-medium leading-snug text-[#3b2f22] shadow-[0_6px_20px_rgba(60,40,20,0.28)]"
          >
            {speech}
            <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-[7px] rotate-45 border-b border-r border-[#e0cfa8] bg-[#fbf3e1]" />
          </motion.div>
        </Html>
      )}
    </group>
  );
}
