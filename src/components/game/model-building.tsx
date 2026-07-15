"use client";

import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GroupProps = ThreeElements["group"];

/**
 * A building loaded from a GLB (AI-generated or marketplace model) that drops
 * in for a procedural primitive. Each model is authored with its origin at the
 * base centre and its front facing +Z, so it sits on the ground and the scene's
 * face-the-centre rotation aims the entrance at the visitor.
 */
export function ModelBuilding({
  url,
  scale = 1,
  ...props
}: GroupProps & { url: string; scale?: number }) {
  const { scene } = useGLTF(url);

  // Clone so we can enable shadows without mutating drei's cached scene (and so
  // the same model could appear more than once without sharing one object).
  const model = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <group {...props} scale={scale}>
      <primitive object={model} />
    </group>
  );
}
