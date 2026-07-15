"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ButtonLink } from "@/components/ui/button";

const sectionIds = navItems.map((n) => n.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Background treatment after scrolling past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-lg"
            : "border-b border-transparent",
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm tracking-tight"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xs border border-border-strong font-mono text-[0.7rem] text-foreground transition-colors group-hover:border-foreground">
              AC
            </span>
            <span className="hidden font-medium sm:inline">{site.name}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-2 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <ButtonLink
              href={site.resumePath}
              external
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Download className="h-4 w-4" />
              Résumé
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Contact
            </ButtonLink>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xs border border-border text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="container-page flex h-16 items-center justify-between">
              <span className="text-sm font-semibold">{site.name}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xs border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              className="container-page mt-6 flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex items-baseline justify-between border-b border-border py-4 text-3xl tracking-tight"
                  >
                    {item.label}
                    <span className="label-mono">
                      {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-page mt-8 flex flex-col gap-3">
              <ButtonLink href={site.resumePath} external variant="outline" size="lg">
                <Download className="h-4 w-4" />
                Download résumé
              </ButtonLink>
              <ButtonLink
                href="#contact"
                variant="primary"
                size="lg"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </ButtonLink>
              <div className="mt-2 flex items-center justify-between">
                <span className="label-mono">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
