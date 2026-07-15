"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-xs border border-border text-foreground/80 transition-colors hover:border-foreground hover:text-foreground",
        className,
      )}
    >
      {/* Avoid hydration mismatch: render neutral until mounted */}
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          mounted && !isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          "absolute",
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all duration-300",
          mounted && isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          "absolute",
        )}
      />
      {!mounted && <span className="h-4 w-4" />}
    </button>
  );
}
