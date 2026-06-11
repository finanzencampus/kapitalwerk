"use client";

import { useMemo, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { buildSeries } from "@/lib/finance";
import { formatEuro } from "@/lib/utils";
import SectionShell from "@/components/ui/SectionShell";
import Slider from "@/components/ui/Slider";
import ChartTooltip from "@/components/ui/ChartTooltip";
import Reveal from "@/components/ui/Reveal";

function compactEuro(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toLocaleString("de-DE", { maximumFractionDigits: 1 })} Mio. €`;
  if (value >= 1_000) return `${Math.round(value / 1_000).toLocaleString("de-DE")}k €`;
  return `${value} €`;
}

export default function WealthSimulator() {
  const [startCapital, setStartCapital] = useState(1000);
  const [monthlyRate, setMonthlyRate] = useState(150);
  const [years, setYears] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(7);

  const series = useMemo(
    () => buildSeries({ startCapital, monthlyRate, years, annualReturn }),
    [startCapital, monthlyRate, years, annualReturn]
  );

  const final = series[series.length - 1];
  const invested = final.invested;
  const expected = final.expected;
  const interestShare = expected > 0 ? Math.max(0, 1 - invested / expected) : 0;

  return (
    <SectionShell
      id="simulator"
      eyebrow="02 · Vermögens-Simulator"
      title={<>Der Zinseszins ist <span className="gold-text">keine Magie</span>. Er ist Mathematik.</>}
      intro="Stell die Regler ein und sieh in Echtzeit, was Zeit und Kontinuität aus kleinen Beträgen machen. Alle Berechnungen laufen lokal in deinem Browser – ohne Live-Daten, ohne Prognoseanspruch."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
        {/* Eingaben */}
        <Reveal className="glass-strong space-y-7 self-start rounded-3xl p-6 sm:p-8">
          <Slider
            label="Startkapital"
            value={startCapital}
            min={0}
            max={50000}
            step={500}
            format={(value) => formatEuro(value)}
            onChange={setStartCapital}
          />
          <Slider
            label="Monatliche Sparrate"
            value={monthlyRate}
            min={0}
            max={2000}
            step={25}
            format={(value) => formatEuro(value)}
            onChange={setMonthlyRate}
          />
          <Slider
            label="Anlagedauer"
            value={years}
            min={1}
            max={50}
            format={(value) => `${value} Jahre`}
            onChange={setYears}
          />
          <Slider
            label="Erwartete Rendite p. a."
            value={annualReturn}
            min={0}
            max={12}
            step={0.5}
            format={(value) => `${value.toLocaleString("de-DE")} %`}
            onChange={setAnnualReturn}
          />

          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-400">Eingezahlt</span>
              <span className="font-mono font-semibold tabular-nums text-white">{formatEuro(invested)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-400">Erwartetes Endvermögen</span>
              <motion.span
                key={expected}
                initial={{ scale: 1.06, color: "#fbbf24" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.45 }}
                className="font-mono text-xl font-bold tabular-nums"
              >
                {formatEuro(expected)}
              </motion.span>
            </div>
            {/* Zinseszins-Anteil visualisiert */}
            <div>
              <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                <span>davon Kapitalerträge</span>
                <span className="font-mono tabular-nums text-amber-300">
                  {(interestShare * 100).toLocaleString("de-DE", { maximumFractionDigits: 0 })} %
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
                  animate={{ width: `${interestShare * 100}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Je länger der Zeitraum, desto stärker stammt dein Vermögen aus Erträgen
                statt aus Einzahlungen – das ist der Zinseszins-Effekt.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Diagramm */}
        <Reveal delay={0.1} className="glass rounded-3xl p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <h3 className="text-sm font-semibold text-white">Entwicklung über {years} Jahre</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-500" /> Eingezahlt</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-400" /> Erwartet ({annualReturn.toLocaleString("de-DE")} %)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-400" /> Optimistisch (+2 %)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300" /> Vorsichtig (−2 %)</span>
            </div>
          </div>
          <div className="h-[22rem] w-full sm:h-[26rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <defs>
                  <linearGradient id="expectedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="optimisticFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="rgba(255,255,255,0.25)"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.25)"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={compactEuro}
                  tickLine={false}
                  axisLine={false}
                  width={70}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="optimistic" name="Optimistisch" stroke="#a78bfa" strokeWidth={1.5} fill="url(#optimisticFill)" />
                <Area type="monotone" dataKey="expected" name="Erwartet" stroke="#22d3ee" strokeWidth={2.5} fill="url(#expectedFill)" />
                <Area type="monotone" dataKey="pessimistic" name="Vorsichtig" stroke="#cbd5e1" strokeWidth={1.25} strokeDasharray="5 5" fill="transparent" />
                <Area type="monotone" dataKey="invested" name="Eingezahlt" stroke="#64748b" strokeWidth={1.5} strokeDasharray="2 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
