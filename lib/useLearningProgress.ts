"use client";

import { useCallback, useEffect, useState } from "react";
import { navItems, type SectionId } from "@/lib/data";

const STORAGE_KEY = "kapitalwerk.progress.v1";

interface StoredProgress {
  visited: SectionId[];
  bestQuizScore: number;
}

function readStorage(): StoredProgress {
  if (typeof window === "undefined") return { visited: [], bestQuizScore: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { visited: [], bestQuizScore: 0 };
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      visited: Array.isArray(parsed.visited) ? (parsed.visited as SectionId[]) : [],
      bestQuizScore: typeof parsed.bestQuizScore === "number" ? parsed.bestQuizScore : 0,
    };
  } catch {
    return { visited: [], bestQuizScore: 0 };
  }
}

/**
 * Lokales Fortschritts-Tracking (Lernpfad) via IntersectionObserver + localStorage.
 * Keine Daten verlassen den Browser.
 */
export function useLearningProgress() {
  const [progress, setProgress] = useState<StoredProgress>({ visited: [], bestQuizScore: 0 });

  useEffect(() => {
    setProgress(readStorage());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as SectionId;
          setProgress((previous) => {
            if (previous.visited.includes(id)) return previous;
            const next = { ...previous, visited: [...previous.visited, id] };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
          });
        }
      },
      { threshold: 0.35 }
    );
    for (const item of navItems) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const saveQuizScore = useCallback((score: number) => {
    setProgress((previous) => {
      const next = { ...previous, bestQuizScore: Math.max(previous.bestQuizScore, score) };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { ...progress, saveQuizScore, total: navItems.length };
}
