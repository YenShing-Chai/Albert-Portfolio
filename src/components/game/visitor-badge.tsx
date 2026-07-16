"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small "👀 1,247" visitor counter in the game corner. Counts UNIQUE visitors:
 * the first load in a browser POSTs to /api/views (increments), later loads GET
 * (read-only), deduped via localStorage. If the counter store isn't configured
 * (API returns count: null), the badge renders nothing — so the site works fine
 * before Upstash is connected.
 */
const SEEN_KEY = "pf_visited";

export function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);
  const ran = useRef(false); // guard against React strict-mode double-invoke

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const isNew = !localStorage.getItem(SEEN_KEY);
    fetch("/api/views", { method: isNew ? "POST" : "GET" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") {
          setCount(data.count);
          // Only mark as seen once we actually counted — so visitors from
          // before the store existed still get counted on a later visit.
          if (isNew) localStorage.setItem(SEEN_KEY, "1");
        }
      })
      .catch(() => {
        /* offline / not configured — leave the badge hidden */
      });
  }, []);

  if (count === null) return null;

  return (
    <div
      className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#e0cfa8] bg-[#fbf3e1]/90 px-3 py-1.5 text-xs font-semibold text-[#6b543a] shadow-sm backdrop-blur"
      title={`${count.toLocaleString()} visitors`}
      aria-label={`${count.toLocaleString()} visitors`}
    >
      <span aria-hidden>👀</span>
      <span>{count.toLocaleString()}</span>
    </div>
  );
}
