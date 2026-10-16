"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Dictionary } from "@/content/en";
import { vi } from "@/content/vi";

export type Lang = "en" | "vi";

const dictionaries: Record<Lang, Dictionary> = { en, vi };

type LangContextValue = { lang: Lang; t: Dictionary; setLang: (l: Lang) => void };

const LangContext = createContext<LangContextValue | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  // First visit: Vietnamese (spec.md > Data Model).
  const [lang, setLang] = useState<Lang>("vi");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <Providers>");
  return ctx;
}
