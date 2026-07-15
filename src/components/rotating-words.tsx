"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function RotatingWords({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = window.setInterval(
      () => setI((prev) => (prev + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {/* Reserve width with the longest word to avoid layout shift */}
      <span className="invisible" aria-hidden>
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: "0.55em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.55em", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
