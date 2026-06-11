"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ScrollText } from "lucide-react";
import { assetClasses, type AssetClass } from "@/lib/data";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const hueClasses: Record<string, { ring: string; text: string; glow: string }> = {
  cyan: { ring: "border-cyan-400/40", text: "text-cyan-300", glow: "shadow-[0_0_32px_rgba(34,211,238,0.25)]" },
  indigo: { ring: "border-indigo-400/40", text: "text-indigo-300", glow: "shadow-[0_0_32px_rgba(129,140,248,0.25)]" },
  sky: { ring: "border-sky-400/40", text: "text-sky-300", glow: "shadow-[0_0_32px_rgba(56,189,248,0.25)]" },
  amber: { ring: "border-amber-400/40", text: "text-amber-300", glow: "shadow-[0_0_32px_rgba(251,191,36,0.25)]" },
  yellow: { ring: "border-yellow-400/40", text: "text-yellow-300", glow: "shadow-[0_0_32px_rgba(250,204,21,0.25)]" },
  orange: { ring: "border-orange-400/40", text: "text-orange-300", glow: "shadow-[0_0_32px_rgba(251,146,60,0.25)]" },
  emerald: { ring: "border-emerald-400/40", text: "text-emerald-300", glow: "shadow-[0_0_32px_rgba(52,211,153,0.25)]" },
  fuchsia: { ring: "border-fuchsia-400/40", text: "text-fuchsia-300", glow: "shadow-[0_0_32px_rgba(232,121,249,0.25)]" },
};

function RiskMeter({ level, hue }: { level: number; hue: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Risikostufe ${level} von 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 w-4 rounded-full",
            index < level ? cn("bg-current", hueClasses[hue]?.text) : "bg-white/10"
          )}
        />
      ))}
    </div>
  );
}

export default function EconomyMap() {
  const [active, setActive] = useState<AssetClass>(assetClasses[0]);

  return (
    <SectionShell
      id="wirtschaftswelt"
      eyebrow="01 · Wirtschaftswelt"
      title={<>Die Landkarte deiner <span className="gradient-text">Möglichkeiten</span></>}
      intro="Acht Wege, Geld arbeiten zu lassen – jeder mit eigenem Charakter, eigenen Chancen und eigenen Risiken. Wähle eine Anlageklasse und lerne sie kennen."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
        {/* Auswahl-Raster */}
        <Reveal className="grid grid-cols-2 gap-3 self-start sm:grid-cols-4 lg:grid-cols-2">
          {assetClasses.map((asset) => {
            const Icon = asset.icon;
            const isActive = asset.id === active.id;
            const hue = hueClasses[asset.hue] ?? hueClasses.cyan;
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => setActive(asset)}
                aria-pressed={isActive}
                className={cn(
                  "glass group flex flex-col items-start gap-2.5 rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]",
                  isActive && cn("border", hue.ring, hue.glow, "bg-white/[0.07]")
                )}
              >
                <Icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", hue.text)} />
                <span className="text-sm font-semibold text-white">{asset.name}</span>
                <span className="text-xs leading-snug text-slate-400">{asset.tagline}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Detailpanel */}
        <div className="relative min-h-[30rem]">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, x: 24, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
              className="glass-strong flex h-full flex-col gap-6 rounded-3xl p-6 sm:p-8"
            >
              <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-white/5", hueClasses[active.hue]?.text)}>
                    <active.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                      {active.name}
                    </h3>
                    <p className="text-sm text-slate-400">{active.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Risiko</span>
                  <RiskMeter level={active.riskLevel} hue={active.hue} />
                </div>
              </header>

              <p className="leading-relaxed text-slate-300">{active.description}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> Chancen
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {active.chancen.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-400/15 bg-rose-400/5 p-4">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-rose-300">
                    <AlertTriangle className="h-4 w-4" /> Risiken
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {active.risiken.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  <ScrollText className="h-3.5 w-3.5" /> Historische Bedeutung
                </p>
                <p className="text-sm leading-relaxed text-slate-300">{active.historie}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
