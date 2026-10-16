"use client";

import { useLang } from "@/lib/providers";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function SiteFooter() {
  const { t } = useLang();
  const f = t.footer;
  const links = [...f.videos.map((v) => ({ ...v, icon: "▶" })), { ...f.skillPack, icon: "✻" }];

  return (
    <footer id="sources" className="scroll-mt-16 border-t border-(--border) bg-(--bg-alt)">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal className="max-w-3xl">
          <SectionLabel>{f.label}</SectionLabel>
          <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{f.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-(--text-muted) sm:text-base">{f.body}</p>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {links.map((l, i) => (
            <li key={l.url}>
              <Reveal delay={i * 70} className="h-full">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover flex h-full gap-3 rounded-(--radius-lg) border border-(--border) bg-(--surface) p-4"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm text-white"
                    style={{ background: l.icon === "▶" ? "#FF0033" : "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
                    aria-hidden
                  >
                    {l.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-snug">{l.title} ↗</span>
                    <span className="mt-1 block text-xs leading-relaxed text-(--text-dim)">{l.note}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--text-faint)">
          {f.unofficial}
        </p>
      </div>
    </footer>
  );
}
