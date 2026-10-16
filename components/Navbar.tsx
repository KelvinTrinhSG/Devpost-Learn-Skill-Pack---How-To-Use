"use client";

import { useLang, type Lang } from "@/lib/providers";

const LANGS: Lang[] = ["vi", "en"];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  return (
    <header
      className="sticky top-0 z-40 border-b border-(--border) backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-(--radius-sm) text-sm text-white"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            aria-hidden
          >
            ✻
          </span>
          <span className="truncate">{t.nav.name}</span>
        </a>

        <div
          role="group"
          aria-label={t.nav.language}
          className="flex shrink-0 rounded-(--radius-sm) border border-(--border) bg-(--surface) p-0.5"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className="figure cursor-pointer rounded-md px-2.5 py-1 text-xs font-bold uppercase transition-colors"
              style={
                lang === l
                  ? { background: "var(--primary)", color: "var(--on-primary)" }
                  : { color: "var(--text-dim)" }
              }
            >
              {l}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
