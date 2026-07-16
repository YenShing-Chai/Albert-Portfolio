"use client";

import { Suspense, useLayoutEffect } from "react";
import { type ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { places, type PlaceId } from "@/data/places";
import {
  islands,
  type BuildingKind,
  type CountrySpot,
  type IslandId,
} from "@/data/islands";
import {
  C,
  Cottage,
  Flower,
  Lab,
  Lantern,
  Mailbox,
  Rock,
  Signpost,
  Well,
  Workshop,
} from "./objects";
import { Character, type WalkTarget } from "./character";
import { ModelBuilding } from "./model-building";
import { WanderingCats } from "./wandering-cats";
import { Hotspot } from "./hotspot";

const ISLAND_RADIUS = 6;

// Warm up hub GLB buildings so they pop in without a hitch.
useGLTF.preload("/models/buildings/home.glb");
useGLTF.preload("/models/buildings/garden.glb");
useGLTF.preload("/models/buildings/lab.glb");
useGLTF.preload("/models/buildings/workshop.glb");
useGLTF.preload("/models/buildings/kuala-lumpur/hextar.glb");
useGLTF.preload("/models/buildings/kuala-lumpur/airport.glb");
useGLTF.preload("/models/buildings/kuala-lumpur/mailbox.glb");
useGLTF.preload("/models/buildings/tree.glb");
useGLTF.preload("/models/buildings/grass-bush.glb");

// Hub GLB models; scale tunable against the ~1.4-unit character.
const HouseModel = () => (
  <ModelBuilding url="/models/buildings/home.glb" scale={2.2} />
);
const GardenModel = () => (
  <ModelBuilding url="/models/buildings/garden.glb" scale={2.2} />
);
const LabModel = () => (
  <ModelBuilding url="/models/buildings/lab.glb" scale={2.2} />
);
const WorkshopModel = () => (
  <ModelBuilding url="/models/buildings/workshop.glb" scale={2.2} />
);
const HextarModel = () => (
  <ModelBuilding url="/models/buildings/kuala-lumpur/hextar.glb" scale={2.2} />
);
const AirportModel = () => (
  <ModelBuilding url="/models/buildings/kuala-lumpur/airport.glb" scale={2.2} />
);
// Smaller scale — it's a mailbox, not a building (reads ~character height).
const MailboxModel = () => (
  <ModelBuilding url="/models/buildings/kuala-lumpur/mailbox.glb" scale={1.6} />
);

// GLB scenery replacing the old procedural Tree/Bush. The tree GLB is authored
// ~1.7 units tall (matching the old procedural tree), so the scenery `scale`
// props carry over unchanged. The grass-bush GLB is a canonical 1 unit tall, so
// it carries a 0.6 base factor to land at the old bush's cozy footprint.
type SceneryProps = { position?: [number, number, number]; scale?: number };
const TreeModel = ({ scale = 1, ...props }: SceneryProps) => (
  <ModelBuilding url="/models/buildings/tree.glb" scale={scale} {...props} />
);
const BushModel = ({ scale = 1, ...props }: SceneryProps) => (
  <ModelBuilding url="/models/buildings/grass-bush.glb" scale={scale * 0.6} {...props} />
);

type BuildingComponent = (props: {
  position?: [number, number, number];
}) => React.ReactElement;

const hubBuildingFor: Record<PlaceId, BuildingComponent> = {
  home: HouseModel,
  experience: AirportModel, // The Airport (KL) — GLB
  work: WorkshopModel,
  ai: LabModel,
  impact: GardenModel,
  contact: MailboxModel, // GLB mailbox
  hextar: HextarModel, // GLB — Head of Product @ Hextar (KL)
};

// Procedural placeholder buildings for the country islands, keyed by kind.
// Each country spot can later point to a GLB via `modelUrl` to override these.
const proceduralFor: Record<BuildingKind, BuildingComponent> = {
  cottage: Cottage,
  workshop: Workshop,
  lab: Lab,
  well: Well,
  signpost: Signpost,
  mailbox: Mailbox,
};

function CountryBuilding({ spot }: { spot: CountrySpot }) {
  if (spot.modelUrl) return <ModelBuilding url={spot.modelUrl} scale={2.2} />;
  const B = proceduralFor[spot.building];
  return <B />;
}

// The island is wide but a phone screen is tall and narrow, so a fixed camera
// crops the world. This reframes it from the viewport aspect ratio: on portrait
// screens it widens the lens and dollies back so the whole island stays in view,
// while desktop keeps its original [9, 8.5, 11] / fov-34 framing. Re-runs on
// resize / orientation change (and once the OrbitControls register).
const CAM_TARGET = new THREE.Vector3(0, 0.6, 0.4);
const CAM_DIR = new THREE.Vector3(9, 7.9, 10.6).normalize();

function ResponsiveCamera() {
  const camera = useThree((s) => s.camera as THREE.PerspectiveCamera);
  const controls = useThree(
    (s) => s.controls as unknown as {
      minDistance: number;
      maxDistance: number;
      target: THREE.Vector3;
      update: () => void;
    } | null,
  );
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const aspect = width / Math.max(1, height);

  useLayoutEffect(() => {
    let fov: number;
    let dist: number;
    if (aspect >= 1.1) {
      // Landscape / desktop — the original framing.
      fov = 34;
      dist = 16;
    } else {
      // Ramp from square-ish (t=0) to a tall phone (t=1): wider lens + longer
      // dolly so a ~6.5-unit-radius island keeps a little margin on all sides.
      const t = THREE.MathUtils.clamp((1.1 - aspect) / (1.1 - 0.45), 0, 1);
      fov = THREE.MathUtils.lerp(37, 52, t);
      dist = THREE.MathUtils.lerp(17, 31, t);
    }
    camera.fov = fov;
    camera.position.copy(CAM_TARGET).addScaledVector(CAM_DIR, dist);
    camera.updateProjectionMatrix();
    camera.lookAt(CAM_TARGET);
    if (controls) {
      controls.minDistance = Math.max(8, dist - 5);
      controls.maxDistance = dist + 12;
      controls.target.copy(CAM_TARGET);
      controls.update();
    }
  }, [aspect, camera, controls]);

  return null;
}

interface Renderable {
  id: string;
  label: string;
  emoji: string;
  position: [number, number];
  Building: BuildingComponent;
}

interface SceneProps {
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

export function Scene({
  islandId,
  target,
  activePlace,
  visited,
  onSelectPlace,
  onArrive,
  onGroundClick,
  reducedMotion,
  speech = null,
}: SceneProps) {
  const island = islands[islandId];
  const isHub = islandId === "hub";

  const renderables: Renderable[] = isHub
    ? places.map((p) => ({
        id: p.id,
        label: p.label,
        emoji: p.emoji,
        position: p.position,
        Building: hubBuildingFor[p.id],
      }))
    : island.spots.map((s) => ({
        id: s.id,
        label: s.label,
        emoji: s.emoji,
        position: s.position,
        Building: () => <CountryBuilding spot={s} />,
      }));

  function handleGround(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    const p = e.point;
    if (Math.hypot(p.x, p.z) <= ISLAND_RADIUS - 0.4) {
      onGroundClick(p.x, p.z);
    }
  }

  function setCursor(hovering: boolean) {
    document.body.style.cursor = hovering ? "pointer" : "auto";
  }

  return (
    <>
      {/* Reframe the camera to the viewport so the island fits on phones too. */}
      <ResponsiveCamera />

      {/* Drag to orbit the island; kept on the cozy iso tilt, no pan.
          minDistance / maxDistance are set by ResponsiveCamera per aspect. */}
      <OrbitControls
        makeDefault
        target={[0, 0.6, 0.4]}
        enablePan={false}
        minPolarAngle={0.75}
        maxPolarAngle={1.3}
        rotateSpeed={0.7}
        zoomSpeed={0.7}
        enableDamping={!reducedMotion}
        dampingFactor={0.08}
      />

      {/* Lighting */}
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#fff6e6", "#b7d69a", 0.7]} />
      <directionalLight
        castShadow
        position={[6, 11, 4]}
        intensity={2.3}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-bias={-0.0004}
      />

      {/* Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
        <circleGeometry args={[13, 48]} />
        <meshStandardMaterial color={C.water} roughness={0.35} metalness={0} />
      </mesh>

      {/* Island soil + grass */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[ISLAND_RADIUS + 0.15, ISLAND_RADIUS - 0.5, 0.8, 32]} />
        <meshStandardMaterial color={C.soil} flatShading roughness={0.95} />
      </mesh>
      <mesh
        position={[0, -0.06, 0]}
        receiveShadow
        onClick={handleGround}
        onPointerMissed={() => {}}
      >
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS, 0.14, 40]} />
        <meshStandardMaterial color={island.grass} roughness={0.95} />
      </mesh>

      {/* Buildings + hotspots (hub places or country spots) */}
      {renderables.map((item) => {
        const [x, z] = item.position;
        const face = Math.atan2(-x, -z);
        return (
          <group key={item.id} position={[x, 0, z]}>
            <group
              rotation={[0, face, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlace(item.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setCursor(true);
              }}
              onPointerOut={() => setCursor(false)}
            >
              <Suspense fallback={null}>
                <item.Building />
              </Suspense>
            </group>
            <Hotspot
              place={item}
              active={activePlace === item.id}
              visited={visited.includes(item.id)}
              onSelect={onSelectPlace}
            />
          </group>
        );
      })}

      {/* Scenery — richer on the hub, a lighter set on country islands.
          Wrapped in Suspense because the GLB Tree/Bush models suspend while
          loading; without a boundary the whole Canvas render tree stalls. */}
      <Suspense fallback={null}>
      {isHub ? (
        <>
          <TreeModel position={[-5.2, 0, 1.8]} scale={1.1} />
          <TreeModel position={[5.3, 0, 1.6]} scale={0.95} />
          <TreeModel position={[2.4, 0, -4.4]} scale={1.05} />
          <TreeModel position={[-2.6, 0, -4.2]} scale={0.9} />
          <BushModel position={[1.8, 0, 4.2]} />
          <BushModel position={[-1.9, 0, 4.1]} scale={0.85} />
          <BushModel position={[3.6, 0, -3]} scale={0.9} />
          <Rock position={[-3.7, 0.2, 4]} scale={0.9} />
          <Rock position={[4.4, 0.2, 3.9]} scale={0.7} />
          <Flower position={[1.1, 0, 1.4]} color={C.pink} />
          <Flower position={[-1.3, 0, 1.7]} color={C.yellow} />
          <Flower position={[1.5, 0, -1.2]} color={C.white} />
          <Flower position={[-1.6, 0, -1.4]} color={C.pink} />
          <Lantern position={[-1.6, 0, 2.6]} />
          <Lantern position={[1.7, 0, 2.5]} />
          <Lantern position={[0, 0, -2.9]} />
        </>
      ) : (
        <>
          <TreeModel position={[-5.1, 0, 2.6]} scale={1.05} />
          <TreeModel position={[5.0, 0, 2.8]} scale={0.9} />
          <TreeModel position={[-4.6, 0, -3.2]} scale={0.95} />
          <TreeModel position={[4.7, 0, -3.0]} scale={1.0} />
          <BushModel position={[2.2, 0, 4.6]} scale={0.9} />
          <BushModel position={[-2.4, 0, 4.5]} scale={0.85} />
          <Rock position={[3.9, 0.2, 4.3]} scale={0.8} />
          <Rock position={[-3.9, 0.2, 4.2]} scale={0.7} />
          <Flower position={[1.2, 0, 1.6]} color={C.yellow} />
          <Flower position={[-1.4, 0, 1.5]} color={C.pink} />
          <Lantern position={[-1.6, 0, 2.6]} />
          <Lantern position={[1.7, 0, 2.5]} />
        </>
      )}
      </Suspense>

      {/* Ambient particles */}
      {!reducedMotion && (
        <Sparkles
          count={44}
          scale={[12, 4, 12]}
          position={[0, 2.2, 0]}
          size={3}
          speed={0.25}
          opacity={0.5}
          color={C.glow}
        />
      )}

      {/* Character */}
      <Suspense fallback={null}>
        <Character
          target={target}
          onArrive={onArrive}
          reducedMotion={reducedMotion}
          speech={speech}
        />
      </Suspense>

      {/* Kuching is "Cat City" — a few cats scamper around the hometown island. */}
      {islandId === "kuching" && !reducedMotion && (
        <Suspense fallback={null}>
          <WanderingCats />
        </Suspense>
      )}
    </>
  );
}
