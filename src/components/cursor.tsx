"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Signature trailing-ring cursor. Renders only on fine-pointer (desktop)
 * devices and when reduced-motion is not requested. The native cursor stays
 * visible for accessibility; this is a decorative accent layer.
 */
export function Cursor() {
  const mounted = useMounted();
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = mounted && finePointer && !reduced;

  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest('a, button, [role="button"], [data-cursor="hover"]'),
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ x, y, opacity: hovering ? 0 : 0.8 }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 40 : 22,
          height: hovering ? 40 : 22,
          opacity: hovering ? 0.9 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </>
  );
}
