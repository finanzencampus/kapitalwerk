"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { LineChart, Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { useLearningProgress } from "@/lib/useLearningProgress";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { visited, total } = useLearningProgress();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Lese-Fortschritt als Kurslinie */}
      <motion.div
        aria-hidden
        className="h-0.5 origin-left bg-gradient-to-r from-teal-300 via-cyan-400 to-violet-400"
        style={{ scaleX: progressX }}
      />
      <nav
        className={cn(
          "mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled ? "glass-strong mx-3 shadow-2xl sm:mx-6 lg:mx-auto" : "bg-transparent"
        )}
        aria-label="Hauptnavigation"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_24px_rgba(34,211,238,0.4)]">
            <LineChart className="h-5 w-5 text-night-950" strokeWidth={2.5} />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white">
            Kapital<span className="gradient-text">werk</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-cyan-400 to-violet-400 transition-transform group-hover:scale-x-100",
                  visited.includes(item.id) && "scale-x-100 opacity-60"
                )}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex"
            title="Dein Lernpfad – lokal im Browser gespeichert"
          >
            <span className="font-mono text-xs text-slate-400">Lernpfad</span>
            <div className="flex gap-1" aria-label={`${visited.length} von ${total} Stationen besucht`}>
              {navItems.map((item) => (
                <span
                  key={item.id}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    visited.includes(item.id)
                      ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
                      : "bg-white/15"
                  )}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-3 mt-2 rounded-2xl p-3 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-200 transition-colors hover:bg-white/5"
              >
                {item.label}
                {visited.includes(item.id) ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                ) : null}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
