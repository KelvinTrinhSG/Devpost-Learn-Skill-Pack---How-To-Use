"use client";

import { useLang, useProgress } from "@/lib/providers";
import Badge from "@/components/ui/Badge";
import ModeSwitch from "@/components/ModeSwitch";
import QuickCommandList from "@/components/QuickCommandList";
import JourneySimulator from "@/components/simulator/JourneySimulator";

export default function Hero() {
  const { t } = useLang();
  const { mode } = useProgress();
  return (
    <section id="top" className="hero-glow relative">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:py-20">
        <div className="hero-in lg:pt-10">
          <Badge>● {t.hero.badge}</Badge>
          <h1 className="headline mt-5">
            {t.hero.titleStart} <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-(--text-muted) sm:text-lg">{t.hero.subline}</p>
        </div>

        <div id="journey" className="hero-in space-y-3" style={{ animationDelay: "120ms" }}>
          <ModeSwitch />
          <div
            className="rounded-(--radius-lg) border border-(--border) bg-(--surface) p-4 sm:p-5"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {mode === "quick" ? <QuickCommandList /> : <JourneySimulator />}
          </div>
        </div>
      </div>
    </section>
  );
}
