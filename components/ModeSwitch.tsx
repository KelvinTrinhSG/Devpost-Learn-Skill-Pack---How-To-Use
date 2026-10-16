"use client";

import { useLang, useProgress, useSound, type Mode } from "@/lib/providers";

const MODES: Mode[] = ["guided", "quick"];

// Guided ⇄ "I already know this" segmented toggle.
export default function ModeSwitch() {
  const { t } = useLang();
  const { mode, setMode } = useProgress();
  const { play } = useSound();
  return (
    <div
      role="radiogroup"
      aria-label={t.mode.label}
      className="flex rounded-(--radius-md) border border-(--border) bg-(--surface-2) p-1"
    >
      {MODES.map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              setMode(m);
              play("click");
            }}
            className="flex-1 cursor-pointer rounded-(--radius-sm) px-3 py-2 text-sm font-semibold transition-all"
            style={
              active
                ? { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-sm)" }
                : { color: "var(--text-dim)" }
            }
          >
            {m === "guided" ? "🧭 " : "⚡ "}
            {t.mode[m]}
          </button>
        );
      })}
    </div>
  );
}
