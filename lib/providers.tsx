"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { en, type Dictionary } from "@/content/en";
import { vi } from "@/content/vi";
import { stages } from "@/content/stages";
import { playSound, type SoundName } from "./sound";
import { parseProgress, readRaw, useStored, useStoredRaw, type Progress } from "./storage";

export type Lang = "en" | "vi";
export type Theme = "light" | "dark";
export type Mode = "guided" | "quick";

const dictionaries: Record<Lang, Dictionary> = { en, vi };

type Ctx = {
  lang: Lang;
  t: Dictionary;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  sound: boolean;
  setSound: (on: boolean) => void;
  play: (s: SoundName) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  progress: Progress;
  updateProgress: (fn: (p: Progress) => Progress) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  // Defaults on first visit: English, light, sound on, Guided, stage 1 (spec.md > Data Model).
  const [lang, setLang] = useStored<Lang>("lang", ["en", "vi"], "en");
  const [theme, setTheme] = useStored<Theme>("theme", ["light", "dark"], "light");
  const [soundPref, setSoundPref] = useStored("sound", ["on", "off"], "on");
  const [mode, setMode] = useStored<Mode>("mode", ["guided", "quick"], "guided");
  const [progressRaw, setProgressRaw] = useStoredRaw("progress");

  const progress = useMemo(() => parseProgress(progressRaw, stages.length), [progressRaw]);
  // Always applies `fn` to the latest saved progress, so delayed simulator steps never write stale data.
  const updateProgress = useCallback(
    (fn: (p: Progress) => Progress) =>
      setProgressRaw(JSON.stringify(fn(parseProgress(readRaw("progress"), stages.length)))),
    [setProgressRaw],
  );
  const sound = soundPref === "on";
  const setSound = useCallback((on: boolean) => setSoundPref(on ? "on" : "off"), [setSoundPref]);
  const play = useCallback((s: SoundName) => sound && playSound(s), [sound]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        lang,
        t: dictionaries[lang],
        setLang,
        theme,
        setTheme,
        sound,
        setSound,
        play,
        mode,
        setMode,
        progress,
        updateProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("hooks from lib/providers must be used inside <Providers>");
  return ctx;
}

export function useLang() {
  const { lang, t, setLang } = useApp();
  return { lang, t, setLang };
}

export function useTheme() {
  const { theme, setTheme } = useApp();
  return { theme, setTheme };
}

export function useSound() {
  const { sound, setSound, play } = useApp();
  return { sound, setSound, play };
}

export function useProgress() {
  const { mode, setMode, progress, updateProgress } = useApp();
  return { mode, setMode, progress, updateProgress };
}
