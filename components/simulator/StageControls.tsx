"use client";

import type { StageText } from "@/content/en";
import type { Stage } from "@/content/stages";
import { useLang } from "@/lib/providers";
import Button from "@/components/ui/Button";

export type Phase = "idle" | "playing" | "awaiting" | "finishing" | "done";

// The one action the stage needs right now: Run, answer / approve / fix, or move on.
export default function StageControls({
  phase,
  interaction,
  text,
  isLast,
  onRun,
  onAnswer,
  onNext,
}: {
  phase: Phase;
  interaction: Stage["interaction"];
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
        {interaction === "answer" && (
          <span className="text-sm font-semibold text-(--text-muted)">{t.sim.pickAnswer}</span>
        )}
        {text.answers.map((a, i) => {
          // Approve is the main action at a checkpoint; Fix is a single, urgent action.
          const primary = (interaction === "approve" && i === 0) || interaction === "fix";
          return (
            <Button
              key={a.label}
              variant={primary ? "primary" : "outline"}
              size={interaction === "answer" ? "sm" : "md"}
              onClick={() => onAnswer(i)}
              style={interaction === "fix" ? { background: "var(--danger)" } : undefined}
            >
              {interaction === "approve" && i === 0 ? "✓ " : interaction === "approve" ? "✎ " : ""}
              {a.label}
            </Button>
          );
        })}
      </div>
    );
  }

  if (phase === "done") {
    if (isLast) return null;
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-(--success)">✓ {t.sim.stageDone}</span>
        <Button onClick={onNext}>{t.sim.next} →</Button>
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
