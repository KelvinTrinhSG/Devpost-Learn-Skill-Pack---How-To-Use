"use client";

import { useLang, useSound, useTheme, type Lang } from "@/lib/providers";
import { playSound } from "@/lib/sound";

const LANGS: Lang[] = ["vi", "en"];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const { sound, setSound, play } = useSound();

  const iconBtn =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-(--radius-sm) border border-(--border) bg-(--surface) text-base transition-colors hover:border-(--border-strong)";

  return (
    <header
      className="sticky top-0 z-40 border-b border-(--border) backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-extrabold tracking-tight">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-sm) text-sm text-white"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            aria-hidden
          >
            ✻
          </span>
          <span className="truncate">{t.nav.name}</span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <div
            role="group"
            aria-label={t.nav.language}
            className="flex rounded-(--radius-sm) border border-(--border) bg-(--surface) p-0.5"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  play("click");
                }}
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

          <button
            type="button"
            className={iconBtn}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              play("click");
            }}
            aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
            title={theme === "dark" ? t.nav.toLight : t.nav.toDark}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            className={iconBtn}
            onClick={() => {
              setSound(!sound);
              if (!sound) playSound("click"); // confirm that sound is back on
            }}
            aria-label={sound ? t.nav.mute : t.nav.unmute}
            aria-pressed={sound}
            title={sound ? t.nav.mute : t.nav.unmute}
          >
            {sound ? "🔊" : "🔇"}
          </button>
        </div>
      </nav>
    </header>
  );
}
