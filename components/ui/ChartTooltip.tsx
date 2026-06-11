"use client";

import type { TooltipProps } from "recharts";
import { formatEuro } from "@/lib/utils";

/** Einheitlicher Glass-Tooltip für alle Recharts-Diagramme. */
export default function ChartTooltip({
  active, payload, label, labelPrefix = "Jahr",
}: TooltipProps<number, string> & { labelPrefix?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-3 text-sm shadow-2xl">
      <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-slate-400">
        {labelPrefix} {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.dataKey?.toString()} className="flex items-center gap-2 tabular-nums">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="font-semibold text-white">{formatEuro(entry.value ?? 0)}</span>
        </p>
      ))}
    </div>
  );
}
