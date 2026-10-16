"use client";

import { useLang } from "@/lib/providers";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function TipsSection() {
  const { t } = useLang();
  const b = t.bestPractices;
  return (
    <section id="tips" className="scroll-mt-16 border-t border-(--border)">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="max-w-3xl">
          <SectionLabel>{b.label}</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{b.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-(--text-muted) sm:text-lg">{b.intro}</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {b.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <div className="card-hover relative h-full overflow-hidden rounded-(--radius-lg) border border-(--border) bg-(--surface) p-5">
                  <span
                    className="figure pointer-events-none absolute -right-1 -top-3 text-6xl font-extrabold"
                    style={{ color: "color-mix(in srgb, var(--text) 6%, transparent)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl" aria-hidden>
                    {item.icon}
                  </span>
                  <h3 className="mt-3 font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--text-muted)">{item.body}</p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px]"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--primary-strong))" }}
                    aria-hidden
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
