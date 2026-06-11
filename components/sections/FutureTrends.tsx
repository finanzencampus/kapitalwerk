"use client";

import { motion } from "framer-motion";
import { trends } from "@/lib/data";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

export default function FutureTrends() {
  return (
    <SectionShell
      id="zukunft"
      eyebrow="08 · Zukunft des Investierens"
      title={<>Die Themen, die das <span className="gradient-text">nächste Jahrzehnt</span> prägen</>}
      intro="Sechs Technologiefelder mit realer wirtschaftlicher Substanz – sachlich erklärt, ohne Kursziele und ohne Prognosen. Trends zu verstehen heißt nicht, ihnen blind hinterherzukaufen."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend, index) => {
          const Icon = trend.icon;
          return (
            <Reveal key={trend.id} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="glass group relative h-full overflow-hidden rounded-3xl p-6"
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-400/15 to-violet-400/15 blur-2xl transition-opacity opacity-0 group-hover:opacity-100"
                />
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300 transition-colors group-hover:border-cyan-400/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {trend.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{trend.body}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                  <span className="font-mono uppercase tracking-widest text-cyan-400/80">Einordnung · </span>
                  {trend.fact}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
