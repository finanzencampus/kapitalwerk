"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { biases } from "@/lib/data";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Psychology() {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  return (
    <SectionShell
      id="psychologie"
      eyebrow="06 · Psychologie des Investierens"
      title={<>Dein größtes Risiko <span className="gradient-text">blickt dir im Spiegel entgegen</span></>}
      intro="Märkte sind rational – Menschen nicht. Sechs Denkfehler, die mehr Rendite vernichten als jede Krise. Tippe auf eine Karte, um Beispiel und Gegenmittel zu sehen."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {biases.map((bias, index) => {
          const Icon = bias.icon;
          const isFlipped = flippedId === bias.id;
          return (
            <Reveal key={bias.id} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => setFlippedId(isFlipped ? null : bias.id)}
                aria-expanded={isFlipped}
                className={cn(
                  "glass group relative block min-h-[19rem] w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1",
                  isFlipped ? "glass-strong border-violet-400/30" : "hover:bg-white/[0.06]"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, rotateY: -12 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/20 to-cyan-400/20 text-violet-300">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                        {bias.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-violet-300">{bias.hook}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{bias.explanation}</p>
                      <p className="absolute bottom-5 left-6 font-mono text-xs text-slate-600 transition-colors group-hover:text-cyan-400">
                        → Beispiel & Gegenmittel
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, rotateY: 12 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -12 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-full flex-col gap-4"
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                        {bias.title} in der Praxis
                      </h3>
                      <div className="rounded-2xl border border-rose-400/15 bg-rose-400/5 p-4">
                        <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-rose-300">Beispiel</p>
                        <p className="text-sm leading-relaxed text-slate-300">{bias.example}</p>
                      </div>
                      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                        <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-emerald-300">Gegenmittel</p>
                        <p className="text-sm leading-relaxed text-slate-300">{bias.antidote}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
