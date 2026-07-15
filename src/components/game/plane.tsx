"use client";

import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { C } from "./objects";

type GroupProps = ThreeElements["group"];

/**
 * Cozy low-poly plane, nose pointing +Z. Procedural placeholder — swap for a
 * GLB later by dropping a model in and rendering it here instead. The parent
 * controls flight path / banking; this only spins its own propeller.
 */
export function Plane(props: GroupProps) {
  const prop = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (prop.current) prop.current.rotation.z += dt * 22;
  });

  return (
    <group {...props}>
      {/* Fuselage (cylinder laid along Z) */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 1.5, 12]} />
        <meshStandardMaterial color={C.wall} flatShading roughness={0.7} />
      </mesh>
      {/* Nose cone */}
      <mesh castShadow position={[0, 0, 0.86]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.35, 12]} />
        <meshStandardMaterial color={C.red} flatShading roughness={0.6} />
      </mesh>
      {/* Tail cap */}
      <mesh castShadow position={[0, 0.02, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.3, 12]} />
        <meshStandardMaterial color={C.wallWarm} flatShading roughness={0.7} />
      </mesh>

      {/* Main wings (span across X) */}
      <mesh castShadow position={[0, -0.02, 0.05]}>
        <boxGeometry args={[2.1, 0.07, 0.5]} />
        <meshStandardMaterial color={C.red} flatShading roughness={0.6} />
      </mesh>
      {/* Wing tips accent */}
      <mesh castShadow position={[0, 0.0, 0.05]}>
        <boxGeometry args={[2.16, 0.05, 0.18]} />
        <meshStandardMaterial color={C.wallWarm} flatShading roughness={0.6} />
      </mesh>

      {/* Horizontal stabilizer */}
      <mesh castShadow position={[0, 0.03, -0.72]}>
        <boxGeometry args={[0.9, 0.05, 0.28]} />
        <meshStandardMaterial color={C.red} flatShading roughness={0.6} />
      </mesh>
      {/* Vertical fin */}
      <mesh castShadow position={[0, 0.26, -0.74]}>
        <boxGeometry args={[0.06, 0.44, 0.32]} />
        <meshStandardMaterial color={C.red} flatShading roughness={0.6} />
      </mesh>

      {/* Cabin windows */}
      <mesh position={[0.2, 0.14, 0.34]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.12, 0.5]} />
        <meshStandardMaterial
          color={C.techGlow}
          emissive={C.techGlow}
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.2, 0.14, 0.34]}>
        <boxGeometry args={[0.02, 0.12, 0.5]} />
        <meshStandardMaterial
          color={C.techGlow}
          emissive={C.techGlow}
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>

      {/* Propeller */}
      <group ref={prop} position={[0, 0, 1.04]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.9, 0.03]} />
          <meshStandardMaterial color={C.woodDark} flatShading />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.06, 0.03]} />
          <meshStandardMaterial color={C.woodDark} flatShading />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color={C.stoneDark} />
        </mesh>
      </group>
    </group>
  );
}
