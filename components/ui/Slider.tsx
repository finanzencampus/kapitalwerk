"use client";

import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}

/** Zugänglicher Slider mit Live-Wertanzeige im Terminal-Stil. */
export default function Slider({ label, value, min, max, step = 1, format, onChange }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <output className="font-mono text-sm font-semibold tabular-nums text-cyan-300">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={format(value)}
      />
    </div>
  );
}
