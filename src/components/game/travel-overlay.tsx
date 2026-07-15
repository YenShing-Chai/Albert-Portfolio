"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "./plane";
import type { Island } from "@/data/islands";
import { playPlaneSound, stopPlaneSound } from "@/lib/audio";

const FLIGHT_MS = 2600;
const LAND_MS = 2000;

/** Plane bobbing/banking in place while the clouds scroll past it. */
function BankingPlane() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g0 = g.current;
    if (!g0) return;
    g0.position.y = Math.sin(t * 1.6) * 0.16;
    g0.rotation.z = -Math.PI / 2 + Math.sin(t * 1.15) * 0.12;
    g0.rotation.x = Math.sin(t * 0.9) * 0.06;
  });
  // Plane nose is +Z; yaw so it points screen-right and pitch up slightly.
  return (
    <group ref={g} rotation={[0, -Math.PI / 2, 0]} scale={1.2}>
      <Plane />
    </group>
  );
}

/** Soft drifting cloud puff. */
function Cloud({
  top,
  size,
  duration,
  delay,
  opacity,
}: {
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full bg-white blur-xl"
      style={{ top, width: size, height: size * 0.6, opacity }}
      initial={{ x: "110vw" }}
      animate={{ x: "-30vw" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export function TravelOverlay({
  destination,
  onLanded,
  onDone,
}: {
  destination: Island | null;
  /** Fired at end of flight — switch the underlying island behind the card. */
  onLanded: () => void;
  /** Fired when the whole cutscene is finished — clear the overlay. */
  onDone: () => void;
}) {
  const landedRef = useRef(false);

  useEffect(() => {
    if (!destination) return;
    landedRef.current = false;
    playPlaneSound();
    const t1 = window.setTimeout(() => {
      landedRef.current = true;
      onLanded();
    }, FLIGHT_MS);
    const t2 = window.setTimeout(() => {
      stopPlaneSound();
      onDone();
    }, FLIGHT_MS + LAND_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      stopPlaneSound();
    };
    // Re-run per distinct trip.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination?.id]);

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#bfe3f5] via-[#dcefff] to-[#f4f1ea]" />

          {/* Drifting clouds */}
          <Cloud top="18%" size={220} duration={3.2} delay={0} opacity={0.9} />
          <Cloud top="34%" size={150} duration={2.2} delay={0.4} opacity={0.75} />
          <Cloud top="60%" size={280} duration={3.8} delay={0.2} opacity={0.85} />
          <Cloud top="72%" size={170} duration={2.6} delay={0.9} opacity={0.7} />
          <Cloud top="8%" size={120} duration={2.0} delay={1.3} opacity={0.6} />

          {/* Plane */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Canvas
              dpr={[1, 1.8]}
              camera={{ position: [0, 0.3, 6], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.85} />
              <hemisphereLight args={["#ffffff", "#bfe3f5", 0.8]} />
              <directionalLight position={[4, 6, 5]} intensity={1.6} />
              <BankingPlane />
            </Canvas>
          </motion.div>

          {/* Landing card */}
          <AnimatePresence>
            <motion.div
              key="landing"
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: FLIGHT_MS / 1000, duration: 0.5 }}
            >
              <motion.div
                className="rounded-3xl border border-white/70 bg-white/40 px-10 py-8 text-center shadow-[0_20px_60px_rgba(60,80,110,0.25)] backdrop-blur-md"
                initial={{ scale: 0.9, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: FLIGHT_MS / 1000,
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                }}
              >
                <div className="text-6xl">{destination.flag}</div>
                <p className="mt-3 text-2xl font-semibold text-[#2f3e4e]">
                  {destination.landingMessage}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#5a7085]">
                  {destination.chapter}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
