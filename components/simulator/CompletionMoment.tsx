"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLang } from "@/lib/providers";
import Button from "@/components/ui/Button";

// Confetti + badge when stage 7 is complete.
export default function CompletionMoment({ celebrate, onStartOver }: { celebrate: boolean; onStartOver: () => void }) {
  const { t } = useLang();

  useEffect(() => {
    if (!celebrate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#FF004D", "#990070", "#5546FF", "#00D395", "#FFD700"];
    confetti({ particleCount: 120, spread: 80, origin: { x: 0.7, y: 0.55 }, colors });
    const id = window.setTimeout(
      () => confetti({ particleCount: 80, spread: 110, origin: { x: 0.7, y: 0.45 }, colors }),
      250,
    );
    return () => window.clearTimeout(id);
  }, [celebrate]);

  return (
    <div
      className="hero-in flex flex-wrap items-center gap-4 rounded-(--radius-md) p-4"
      style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 9%, transparent), color-mix(in srgb, var(--secondary) 9%, transparent))",
        border: "1px solid color-mix(in srgb, var(--primary) 19%, transparent)",
      }}
    >
      <span className="float text-4xl" aria-hidden>
        🏆
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold tracking-tight">{t.completion.badge}</p>
        <p className="text-sm text-(--text-muted)">{t.completion.body}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onStartOver}>
        ↺ {t.completion.startOver}
      </Button>
    </div>
  );
}
