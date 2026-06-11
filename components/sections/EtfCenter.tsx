"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { etfTopics } from "@/lib/data";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function EtfCenter() {
  const [openId, setOpenId] = useState<string | null>(etfTopics[0].id);

  return (
    <SectionShell
      id="etf"
      eyebrow="05 · ETF-Lernzentrum"
      title={<>Das Werkzeug, mit dem <span className="gradient-text">Millionen anfangen</span></>}
      intro="Sieben Konzepte, die du verstanden haben solltest, bevor du deinen ersten Euro investierst. Tipp: In dieser Reihenfolge lesen – sie bauen aufeinander auf."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {etfTopics.map((topic, index) => {
          const isOpen = openId === topic.id;
          return (
            <Reveal key={topic.id} delay={index * 0.06}>
              <motion.article
                layout
                className={cn(
                  "glass cursor-pointer rounded-3xl p-6 transition-colors hover:bg-white/[0.06]",
                  isOpen && "glass-strong border-cyan-400/25"
                )}
                onClick={() => setOpenId(isOpen ? null : topic.id)}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="font-mono text-xs tracking-widest text-slate-500">
                      Lektion {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{topic.short}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300",
                      isOpen && "rotate-180 text-cyan-300"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">{topic.body}</p>
                      <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-4">
                        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold gradient-text">
                          {topic.stat.value}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">{topic.stat.label}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
