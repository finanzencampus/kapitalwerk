"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LineChart, Mail, ShieldCheck } from "lucide-react";
import { faqItems, navItems } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <footer id="footer" className="relative mt-12 border-t border-white/10">
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.4fr]">
          {/* Marke */}
          <Reveal>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500">
                <LineChart className="h-5 w-5 text-night-950" strokeWidth={2.5} />
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                Kapital<span className="gradient-text">werk</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Interaktive Finanzbildung für die nächste Generation. Alle Rechner laufen
              lokal in deinem Browser – ohne Tracking, ohne Live-Daten, ohne Produktverkauf.
            </p>
            <p className="mt-5 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
              Alle Inhalte dienen ausschließlich der Bildung und stellen keine Anlage-,
              Steuer- oder Rechtsberatung dar. Historische Werte sind keine Garantie für
              zukünftige Entwicklungen.
            </p>
          </Reveal>

          {/* Navigation & Ressourcen */}
          <Reveal delay={0.08}>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Lernstationen</h3>
            <ul className="mt-4 grid gap-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-slate-300 transition-colors hover:text-cyan-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Kontakt</h3>
            <a
              href="mailto:hallo@kapitalwerk.example"
              className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-300"
            >
              <Mail className="h-4 w-4" /> hallo@kapitalwerk.example
            </a>
          </Reveal>

          {/* FAQ */}
          <Reveal delay={0.16}>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Häufige Fragen</h3>
            <div className="mt-4 space-y-2.5">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.question} className="glass rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-slate-200"
                    >
                      {item.question}
                      <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-500 transition-transform", isOpen && "rotate-180 text-cyan-300")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm leading-relaxed text-slate-400">{item.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-600 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kapitalwerk · Ein Bildungsprojekt</p>
          <div className="flex gap-6">
            <a href="#footer" className="transition-colors hover:text-slate-300">Datenschutz (Platzhalter)</a>
            <a href="#footer" className="transition-colors hover:text-slate-300">Impressum (Platzhalter)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
