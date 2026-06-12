"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

function buildData(years: number, inflRate: number) {
  const nominalReturn = 8;
  const result: { year: number; cash: number; invested: number }[] = [];
  for (let y = 0; y <= years; y++) {
    result.push({
      year: y,
      cash: Math.round(1000 / Math.pow(1 + inflRate / 100, y)),
      invested: Math.round(1000 * Math.pow(1 + nominalReturn / 100, y)),
    });
  }
  return result;
}

function fmt(n: number) {
  return n.toLocaleString("de-DE");
}

function yAxisFmt(v: number) {
  return v >= 1000 ? `€${Math.round(v / 1000)}k` : `€${v}`;
}

export default function Inflation() {
  const [years, setYears] = useState(20);
  const [inflRate, setInflRate] = useState(2.5);

  const data = buildData(years, inflRate);
  const last = data[data.length - 1];
  const halvingYears = Math.round(72 / inflRate);

  return (
    <SectionShell
      id="inflation"
      eyebrow="07 · Kaufkraft & Inflation"
      title={<>Das stille Risiko: <span className="gradient-text">Inflation</span></>}
      intro="Inflation ist das Risiko, das man nicht auf dem Kontoauszug sieht – sie frisst still Kaufkraft, während das Konto nominell unberührt wirkt. Warum Nichtstun die teuerste Entscheidung ist."
    >
      <div className="space-y-6">
        {/* KPI-Kacheln */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-5 text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Ø EU-Inflation 2000–2023
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-amber-300">
                2,5 %
              </p>
              <p className="mt-1 text-xs text-slate-500">HVPI-Index (Eurostat)</p>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">EZB-Ziel</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-cyan-300">
                2,0 %
              </p>
              <p className="mt-1 text-xs text-slate-500">Symmetrisches mittelfristiges Ziel</p>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                DE Inflation 2022
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-rose-300">
                8,7 %
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Jahreshöchst (Statistisches Bundesamt)
              </p>
            </div>
          </div>
        </Reveal>

        {/* Interaktiver Rechner */}
        <Reveal delay={0.08}>
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            {/* Slider */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Zeitraum</span>
                  <span className="font-mono font-semibold text-white">{years} Jahre</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-2 w-full"
                  aria-label="Zeitraum in Jahren"
                />
              </div>
              <div>
                <label className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Inflationsrate</span>
                  <span className="font-mono font-semibold text-white">
                    {inflRate.toFixed(1)} %
                  </span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={6}
                  step={0.1}
                  value={inflRate}
                  onChange={(e) => setInflRate(Number(e.target.value))}
                  className="mt-2 w-full"
                  aria-label="Inflationsrate in Prozent"
                />
              </div>
            </div>

            {/* Ergebnis-Boxen */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-400/40 bg-rose-400/[0.10] p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-rose-300">
                  €&nbsp;1.000 als Bargeld gehalten
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-rose-100">
                  € {fmt(last.cash)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Reale Kaufkraft nach {years} Jahren&nbsp;(−€&nbsp;{fmt(1000 - last.cash)})
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/[0.10] p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">
                  €&nbsp;1.000 breit investiert (8&nbsp;%&nbsp;p.a.)
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-100">
                  € {fmt(last.invested)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Nominaler Wert nach {years} Jahren&nbsp;(+€&nbsp;{fmt(last.invested - 1000)})
                </p>
              </div>
            </div>

            {/* Flächen-Diagramm */}
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gInvest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gCash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f87171" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v}J`}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={yAxisFmt}
                    width={48}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(8,11,20,0.97)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 12,
                      fontSize: 12,
                      color: "#e2e8f0",
                    }}
                    labelStyle={{ color: "#94a3b8", marginBottom: 4 }}
                    labelFormatter={(v: number) => `Jahr ${v}`}
                    formatter={(val: number, name: string) => [
                      `€ ${(val as number).toLocaleString("de-DE")}`,
                      name === "invested" ? "Investiert (8 % p.a.)" : "Kaufkraft Bargeld",
                    ]}
                  />
                  <ReferenceLine
                    y={1000}
                    stroke="rgba(255,255,255,0.18)"
                    strokeDasharray="4 4"
                  />
                  <Area
                    type="monotone"
                    dataKey="invested"
                    stroke="#34d399"
                    strokeWidth={2}
                    fill="url(#gInvest)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="cash"
                    stroke="#f87171"
                    strokeWidth={2}
                    fill="url(#gCash)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-slate-600">
              8 % p.a. = historische Ø-Rendite globaler Aktienindizes (MSCI World nominal,
              1970–2024, Quelle: MSCI Inc.)
            </p>
          </div>
        </Reveal>

        {/* Info-Kacheln */}
        <Reveal delay={0.16}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-amber-400">
                72er-Regel
              </p>
              <p className="text-sm leading-relaxed text-slate-300">
                Bei {inflRate.toFixed(1)}&nbsp;% Inflation halbiert sich die Kaufkraft alle{" "}
                <span className="font-semibold text-white">{halvingYears} Jahre</span>{" "}
                (Faustregel: 72&nbsp;÷&nbsp;Inflationsrate).
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-cyan-400">
                Reale Rendite zählt
              </p>
              <p className="text-sm leading-relaxed text-slate-300">
                3&nbsp;% Zinsen bei 3&nbsp;% Inflation ergeben real{" "}
                <span className="font-semibold text-white">0&nbsp;%</span>. Echtes Wachstum
                entsteht nur, wenn die Rendite die Inflation übertrifft.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-violet-400">
                Aktien als Inflationsschutz
              </p>
              <p className="text-sm leading-relaxed text-slate-300">
                Unternehmen können Preise anheben – ihre Gewinne steigen{" "}
                <span className="font-semibold text-white">real mit der Inflation</span>.
                Aktien bieten langfristig strukturellen Kaufkraftschutz.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
