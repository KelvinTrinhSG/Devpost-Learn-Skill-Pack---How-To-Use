"use client";

import { useLang } from "@/lib/providers";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import DecisionGame from "./DecisionGame";

export default function WhySection() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section id="why" className="border-t border-(--border) bg-(--bg-alt) scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="max-w-3xl">
          <SectionLabel>{w.label}</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{w.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-(--text-muted) sm:text-lg">{w.intro}</p>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {w.points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 70} className="h-full">
                <div className="card-hover relative h-full overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface) p-5">
                  <span
                    className="figure pointer-events-none absolute -right-1 -top-3 text-6xl font-extrabold"
                    style={{ color: "color-mix(in srgb, var(--text) 6%, transparent)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="figure text-xs font-bold text-(--primary)">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--text-muted)">{p.body}</p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px]"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
                    aria-hidden
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <div className="rounded-(--radius-lg) border border-(--border) bg-(--surface) p-5 sm:p-8" style={{ boxShadow: "var(--shadow-md)" }}>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{w.game.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-(--text-muted)">{w.game.intro}</p>
            <div className="mt-6">
              <DecisionGame />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
