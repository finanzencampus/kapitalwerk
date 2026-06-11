"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Compass, Sparkles, TrendingUp } from "lucide-react";
import { useRef } from "react";

/** Stilisierte Kurslinie – das Signatur-Element der Seite. Rein illustrativ. */
const CHART_PATH =
  "M0,300 C80,290 120,310 180,270 C240,230 280,260 340,220 C400,180 440,210 500,170 C560,130 620,160 680,110 C740,60 800,90 860,50 C920,20 980,40 1040,10";

const heroStats = [
  { value: "8–10 %", label: "Ø nominale Aktienmarktrendite p. a. (historisch, langfristig, vor Inflation & Kosten)" },
  { value: "~10×", label: "Vermögen nach 30 Jahren bei 8 % – rein durch Zinseszins (1 € → 10 €)" },
  { value: "0 €", label: "Mindestwissen kostet nichts. Genau dafür ist diese Seite da." },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={sectionRef} className="relative flex min-h-svh items-center overflow-hidden">
      {/* Parallax-Hintergrund: Raster + Farborbits */}
      <motion.div aria-hidden className="absolute inset-0" style={reduceMotion ? undefined : { y: backgroundY }}>
        <div className="bg-grid absolute inset-0 animate-grid-drift opacity-60" />
        <div className="absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night-950 to-transparent" />
      </motion.div>

      {/* Animierte Kurslinie */}
      <svg
        aria-hidden
        viewBox="0 0 1040 320"
        className="pointer-events-none absolute inset-x-0 bottom-12 mx-auto w-full max-w-6xl opacity-70"
        fill="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${CHART_PATH} L1040,320 L0,320 Z`}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
        />
        <motion.path
          d={CHART_PATH}
          stroke="url(#lineGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-40 pt-32 sm:px-8"
        style={reduceMotion ? undefined : { opacity: fade }}
      >
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
        >
          <Sparkles className="h-4 w-4" />
          Finanzbildung neu gedacht – interaktiv, ehrlich, ohne Verkaufsdruck
        </motion.p>

        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl md:text-7xl">
          {["Verstehe Geld.", "Baue Vermögen.", "Triff bessere Entscheidungen."].map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.14, ease: [0.21, 0.6, 0.35, 1] }}
            >
              {index === 2 ? <span className="gradient-text">{line}</span> : line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
        >
          Moderne Finanzbildung für die nächste Generation von Investoren. Simuliere den
          Zinseszins, erkunde Anlageklassen, lerne aus 400 Jahren Börsengeschichte – alles
          interaktiv, alles in deinem Browser.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#simulator"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-4 font-semibold text-night-950 shadow-[0_8px_40px_rgba(34,211,238,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <TrendingUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            Zinseszins simulieren
          </a>
          <a
            href="#wirtschaftswelt"
            className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Compass className="h-5 w-5" />
            Wirtschaftswelt erkunden
          </a>
        </motion.div>

        {/* Schwebende Glass-Statistiken */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 + index * 0.12 }}
              className="glass rounded-2xl p-5"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold gradient-text">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll-Indikator */}
      <motion.a
        href="#wirtschaftswelt"
        aria-label="Nach unten scrollen"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors hover:text-cyan-300"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
