"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  className?: string;
}

/** Einheitlicher Rahmen für alle Inhaltssektionen. */
export default function SectionShell({
  id, eyebrow, title, intro, children, className,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32", className)}>
      <Reveal>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          {eyebrow}
        </p>
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">{intro}</p>
        ) : null}
      </Reveal>
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}
