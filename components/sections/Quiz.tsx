"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, Trophy, X } from "lucide-react";
import { quizQuestions } from "@/lib/data";
import { useLearningProgress } from "@/lib/useLearningProgress";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type QuizPhase = "question" | "feedback" | "result";

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>("question");
  const { bestQuizScore, saveQuizScore } = useLearningProgress();

  const question = quizQuestions[questionIndex];
  const isCorrect = selected === question.correctIndex;
  const progress = ((questionIndex + (phase === "feedback" ? 1 : 0)) / quizQuestions.length) * 100;

  function choose(index: number) {
    if (phase !== "question") return;
    setSelected(index);
    setPhase("feedback");
    if (index === question.correctIndex) setScore((value) => value + 1);
  }

  function next() {
    if (questionIndex + 1 >= quizQuestions.length) {
      const finalScore = score;
      saveQuizScore(finalScore);
      setPhase("result");
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
    setPhase("question");
  }

  function restart() {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("question");
  }

  return (
    <SectionShell
      id="quiz"
      eyebrow="07 · Finanzwissen-Quiz"
      title={<>Beweise, was du <span className="gold-text">gelernt hast</span></>}
      intro="Zwölf Fragen, sofortiges Feedback, Bestwert lokal gespeichert. Kein Druck – jede falsche Antwort hier ist ein vermiedener Fehler mit echtem Geld."
    >
      <Reveal className="mx-auto max-w-3xl">
        <div className="glass-strong overflow-hidden rounded-3xl">
          {/* Kopfzeile mit Fortschritt */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
            <p className="font-mono text-sm tabular-nums text-slate-400">
              {phase === "result" ? "Ergebnis" : `Frage ${questionIndex + 1} / ${quizQuestions.length}`}
            </p>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm tabular-nums text-cyan-300">{score} Punkte</p>
              {bestQuizScore > 0 ? (
                <p className="flex items-center gap-1.5 font-mono text-sm tabular-nums text-amber-300">
                  <Trophy className="h-4 w-4" /> Best: {bestQuizScore}
                </p>
              ) : null}
            </div>
          </div>
          <div className="h-1 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-300 via-cyan-400 to-violet-400"
              animate={{ width: `${phase === "result" ? 100 : progress}%` }}
              transition={{ type: "spring", stiffness: 110, damping: 22 }}
            />
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {phase !== "result" ? (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {question.question}
                  </h3>
                  <div className="mt-6 grid gap-3">
                    {question.options.map((option, index) => {
                      const chosen = selected === index;
                      const reveal = phase === "feedback";
                      const correct = index === question.correctIndex;
                      return (
                        <motion.button
                          key={option}
                          type="button"
                          onClick={() => choose(index)}
                          disabled={reveal}
                          whileTap={phase === "question" ? { scale: 0.985 } : undefined}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-all sm:text-base",
                            !reveal && "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/40 hover:bg-white/[0.07]",
                            reveal && correct && "border-emerald-400/50 bg-emerald-400/10 text-emerald-100",
                            reveal && chosen && !correct && "border-rose-400/50 bg-rose-400/10 text-rose-100",
                            reveal && !chosen && !correct && "border-white/5 bg-white/[0.02] text-slate-500"
                          )}
                        >
                          {option}
                          {reveal && correct ? <Check className="h-5 w-5 shrink-0 text-emerald-400" /> : null}
                          {reveal && chosen && !correct ? <X className="h-5 w-5 shrink-0 text-rose-400" /> : null}
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {phase === "feedback" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6"
                      >
                        <div
                          className={cn(
                            "rounded-2xl border p-4 text-sm leading-relaxed",
                            isCorrect
                              ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-100/90"
                              : "border-rose-400/20 bg-rose-400/5 text-rose-100/90"
                          )}
                        >
                          <p className="mb-1 font-semibold">
                            {isCorrect ? "Richtig!" : "Nicht ganz."}
                          </p>
                          {question.explanation}
                        </div>
                        <button
                          type="button"
                          onClick={next}
                          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 font-semibold text-night-950 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {questionIndex + 1 >= quizQuestions.length ? "Ergebnis anzeigen" : "Nächste Frage"}
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-amber-300/20 to-amber-500/20"
                  >
                    <Trophy className="h-10 w-10 text-amber-300" />
                  </motion.div>
                  <p className="mt-6 font-[family-name:var(--font-display)] text-5xl font-semibold gradient-text">
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-slate-400">
                    {score === quizQuestions.length
                      ? "Perfekt. Du denkst bereits wie ein disziplinierter Investor."
                      : score >= quizQuestions.length / 2
                        ? "Starke Basis. Schau dir die Sektionen zu deinen Fehlern noch einmal an – genau dort liegt dein nächster Renditepunkt."
                        : "Guter Anfang. Geh die Lernstationen oben in Ruhe durch und versuche es erneut – Wissen ist die einzige Rendite ohne Risiko."}
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Noch einmal spielen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
