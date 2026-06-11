"use client";

import { useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { buildRiskCorridor, riskProfileLabel } from "@/lib/finance";
import SectionShell from "@/components/ui/SectionShell";
import Slider from "@/components/ui/Slider";
import ChartTooltip from "@/components/ui/ChartTooltip";
import Reveal from "@/components/ui/Reveal";
import { formatEuro } from "@/lib/utils";

export default function RiskLab() {
  const [risk, setRisk] = useState(6);
  const [diversification, setDiversification] = useState(7);
  const [horizonYears, setHorizonYears] = useState(20);

  const corridor = useMemo(
    () => buildRiskCorridor({ risk, diversification, horizonYears }),
    [risk, diversification, horizonYears]
  );
  const last = corridor[corridor.length - 1];
  const profile = riskProfileLabel({ risk, diversification, horizonYears });
  const spreadRatio = last.mid > 0 ? (last.high - last.low) / last.mid : 0;

  return (
    <SectionShell
      id="risiko"
      eyebrow="04 · Risiko-Labor"
      title={<>Risiko ist kein Feind. <span className="gradient-text">Es ist der Preis der Rendite.</span></>}
      intro="Experimentiere mit den drei wichtigsten Stellschrauben jedes Portfolios. Der Korridor zeigt modellhaft, wie weit sich 10.000 € Startkapital entwickeln könnten – keine Marktdaten, keine Prognose, reine Anschauung."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
        <Reveal className="glass-strong space-y-7 self-start rounded-3xl p-6 sm:p-8">
          <Slider label="Risikobereitschaft" value={risk} min={1} max={10} format={(v) => `${v} / 10`} onChange={setRisk} />
          <Slider label="Diversifikation" value={diversification} min={1} max={10} format={(v) => `${v} / 10`} onChange={setDiversification} />
          <Slider label="Zeithorizont" value={horizonYears} min={1} max={40} format={(v) => `${v} Jahre`} onChange={setHorizonYears} />

          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Portfoliocharakter</span>
              <motion.span
                key={profile}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-gradient-to-r from-cyan-400/15 to-violet-400/15 px-4 py-1.5 text-sm font-semibold text-cyan-200"
              >
                {profile}
              </motion.span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Spanne nach {horizonYears} J.</p>
                <p className="mt-1 font-mono font-semibold tabular-nums text-white">
                  {formatEuro(last.low)} – {formatEuro(last.high)}
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Schwankungsbreite</p>
                <p className="mt-1 font-mono font-semibold tabular-nums text-white">
                  ±{Math.round(spreadRatio * 50)} %
                </p>
              </div>
            </div>
            <p className="flex gap-2 text-xs leading-relaxed text-slate-500">
              <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
              Beobachte: Mehr Diversifikation verengt den Korridor, ohne die Mitte zu
              senken – mehr Zeit lässt die Mitte davonziehen. Genau das ist evidenzbasiertes Investieren.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-3xl p-4 sm:p-6">
          <h3 className="mb-4 px-2 text-sm font-semibold text-white">
            Modellkorridor für 10.000 € Startkapital
          </h3>
          <div className="h-[22rem] w-full sm:h-[26rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={corridor} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <defs>
                  <linearGradient id="corridorFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(value: number) =>
                    value >= 1000 ? `${Math.round(value / 1000).toLocaleString("de-DE")}k €` : `${value} €`
                  }
                  tickLine={false}
                  axisLine={false}
                  width={64}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="high" name="Günstiger Verlauf" stroke="#a78bfa" strokeWidth={1.5} fill="url(#corridorFill)" />
                <Area type="monotone" dataKey="mid" name="Erwartung" stroke="#22d3ee" strokeWidth={2.5} fill="transparent" />
                <Area type="monotone" dataKey="low" name="Ungünstiger Verlauf" stroke="#fb7185" strokeWidth={1.5} strokeDasharray="5 5" fill="#04060c" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
