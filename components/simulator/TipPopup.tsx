"use client";

import { useEffect, useRef } from "react";
import type { TipKey } from "@/content/stages";
import { useLang } from "@/lib/providers";
import Button from "@/components/ui/Button";

// A short tip shown over the simulator when moving to the next stage.
export default function TipPopup({ tip, onClose }: { tip: TipKey; onClose: () => void }) {
  const { t } = useLang();
  const btnRef = useRef<HTMLButtonElement>(null);
  const content = t.tips[tip];

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center rounded-(--radius-lg) p-4"
      style={{ background: "color-mix(in srgb, var(--bg) 70%, transparent)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tip-title"
        className="hero-in w-full max-w-sm rounded-(--radius-lg) border border-(--border) bg-(--surface) p-5"
        style={{ boxShadow: "var(--shadow-lg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-(--gold)">💡 {t.tips.label}</span>
        <h3 id="tip-title" className="mt-1.5 text-lg font-bold tracking-tight">
          {content.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-(--text-muted)">{content.body}</p>
        <Button ref={btnRef} className="mt-4" onClick={onClose}>
          {t.tips.gotIt}
        </Button>
      </div>
    </div>
  );
}
