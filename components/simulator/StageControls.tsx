"use client";

import type { StageText } from "@/content/en";
import { useLang } from "@/lib/providers";
import Button from "@/components/ui/Button";

export type Phase = "idle" | "playing" | "awaiting" | "finishing" | "done";

// The one action the stage needs right now: Run, pick an answer, or move on.
export default function StageControls({
  phase,
  text,
  isLast,
  onRun,
  onAnswer,
  onNext,
}: {
  phase: Phase;
  text: StageText;
  isLast: boolean;
  onRun: () => void;
  onAnswer: (i: number) => void;
  onNext: () => void;
}) {
  const { t } = useLang();

  if (phase === "awaiting" && text.answers) {
    return (
      <div className="line-in flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-(--text-muted)">{t.sim.pickAnswer}</span>
        {text.answers.map((a, i) => (
          <Button key={a.label} variant="outline" size="sm" onClick={() => onAnswer(i)}>
            {a.label}
          </Button>
        ))}
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-(--success)">✓ {t.sim.stageDone}</span>
        {!isLast && (
          <Button onClick={onNext}>
            {t.sim.next} →
          </Button>
        )}
      </div>
    );
  }

  const busy = phase !== "idle";
  return (
    <Button onClick={onRun} disabled={busy}>
      {busy ? t.sim.running : `▶ ${t.sim.run}`}
    </Button>
  );
}
