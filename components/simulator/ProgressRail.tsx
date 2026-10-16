"use client";

import { stageText } from "@/content/en";
import { stages } from "@/content/stages";
import { useLang } from "@/lib/providers";

export default function ProgressRail({
  current,
  done,
  onJump,
}: {
  current: number;
  done: number[];
  onJump: (index: number) => void;
}) {
  const { t } = useLang();
  return (
    <ol className="flex gap-1.5 overflow-x-auto pb-1">
      {stages.map((s, i) => {
        const isDone = done.includes(s.id);
        const isCurrent = i === current;
        const color = isCurrent ? "var(--primary)" : isDone ? "var(--success)" : "var(--text-faint)";
        return (
          <li key={s.id} className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onJump(i)}
              aria-label={`${t.sim.jumpTo} ${s.id}: ${stageText(t, s.id).title}`}
              aria-current={isCurrent ? "step" : undefined}
              className="group flex w-full min-w-[64px] cursor-pointer flex-col items-center gap-1.5 rounded-(--radius-sm) px-1 py-1.5 transition-colors hover:bg-(--neutral-tint)"
            >
              <span
                className="figure flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all"
                style={{
                  color: isCurrent || isDone ? "var(--on-primary)" : color,
                  background: isCurrent ? "var(--primary)" : isDone ? "var(--success)" : "var(--surface)",
                  border: `1.5px solid ${color}`,
                  boxShadow: isCurrent ? "0 0 0 4px color-mix(in srgb, var(--primary) 18%, transparent)" : "none",
                }}
              >
                {isDone && !isCurrent ? "✓" : s.id}
              </span>
              <span
                className="w-full truncate text-center text-[11px] font-semibold"
                style={{ color: isCurrent ? "var(--text)" : "var(--text-dim)" }}
              >
                {stageText(t, s.id).title}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
