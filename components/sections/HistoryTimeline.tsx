"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { historyEvents, type HistoryEvent } from "@/lib/data";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Stilisierte Mini-Kurskurve pro Ereignis – illustrativ, keine echten Daten. */
function Sparkline({ data, falling }: { data: number[]; falling: boolean }) {
  const width = 220;
  const height = 64;
  const max = Math.max(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / max) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-16 w-full" aria-hidden>
      <motion.polyline
        points={points}
        fill="none"
        stroke={falling ? "#fb7185" : "#34d399"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function TimelineCard({ event, index }: { event: HistoryEvent; index: number }) {
  const isLeft = index % 2 === 0;
  const peak = Math.max(...event.spark);
  const falling = event.spark[event.spark.length - 1] < peak * 0.6;
  return (
    <div className={cn("relative md:grid md:grid-cols-2 md:gap-12", isLeft ? "" : "")}>
      {/* Knotenpunkt */}
      <motion.span
        className="absolute left-[11px] top-9 z-10 hidden h-3.5 w-3.5 rounded-full border-2 border-cyan-400 bg-night-950 shadow-[0_0_14px_rgba(34,211,238,0.7)] md:left-1/2 md:block md:-translate-x-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      />
      <Reveal
        className={cn(isLeft ? "md:col-start-1 md:pr-4" : "md:col-start-2 md:pl-4")}
        y={36}
      >
        <article className="glass group rounded-3xl p-6 transition-colors hover:bg-white/[0.06] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm tracking-widest text-cyan-300">{event.year}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                {event.title}
              </h3>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs whitespace-nowrap",
                falling ? "bg-rose-400/10 text-rose-300" : "bg-emerald-400/10 text-emerald-300"
              )}
            >
              {event.drawdown}
            </span>
          </div>
          <Sparkline data={event.spark} falling={falling} />
          <p className="text-sm leading-relaxed text-slate-300">{event.summary}</p>
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-amber-300" />
            <p className="text-sm leading-relaxed text-amber-100/90">
              <span className="font-semibold text-amber-300">Lehre: </span>
              {event.lesson}
            </p>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

export default function HistoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <SectionShell
      id="historie"
      eyebrow="03 · Historische Börsenreise"
      title={<>400 Jahre Gier, Angst <span className="gradient-text">und Fortschritt</span></>}
      intro="Die Börse wiederholt sich nicht – aber sie reimt sich. Acht Kapitel Marktgeschichte und die Lehren, die sich daraus für heutige Anleger ziehen lassen. Die Kurven sind stilisiert, die Lektionen echt."
    >
      <div ref={containerRef} className="relative space-y-12 md:space-y-20">
        {/* Vertikale Linie, die mit dem Scrollen wächst */}
        <div className="absolute left-[16px] top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block" aria-hidden />
        <motion.div
          className="absolute left-[16px] top-0 hidden h-full w-px origin-top bg-gradient-to-b from-teal-300 via-cyan-400 to-violet-400 md:left-1/2 md:block"
          style={{ scaleY: lineScale }}
          aria-hidden
        />
        {historyEvents.map((event, index) => (
          <TimelineCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
