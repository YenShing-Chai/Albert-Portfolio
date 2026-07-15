"use client";

import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";
import type { IslandId } from "@/data/islands";
import type { WalkTarget } from "./character";

export interface GameCanvasProps {
  islandId: IslandId;
  target: WalkTarget | null;
  activePlace: string | null;
  visited: string[];
  onSelectPlace: (id: string) => void;
  onArrive: (place: string | null) => void;
  onGroundClick: (x: number, z: number) => void;
  reducedMotion: boolean;
  speech?: string | null;
}

export function GameCanvas(props: GameCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [9, 8.5, 11], fov: 34, near: 0.1, far: 100 }}
      gl={{ antialias: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0.6, 0.4);
      }}
    >
      <color attach="background" args={["#f4f1ea"]} />
      <fog attach="fog" args={["#f4f1ea", 22, 42]} />
      {/* Remount the scene on island change so the character + buildings reset. */}
      <Scene key={props.islandId} {...props} />
    </Canvas>
  );
}
