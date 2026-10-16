"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useLang } from "@/lib/providers";

export type Tab = "terminal" | "chat" | "files";
const TABS: Tab[] = ["terminal", "chat", "files"];

// Mac-style window frame with Terminal / Claude Code / devpost/ tabs.
export default function SimWindow({
  tab,
  onTab,
  views,
  scrollKey,
  flash,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  views: Record<Tab, ReactNode>;
  scrollKey: string; // changes whenever new content appears, to keep the newest line in view
  flash: Tab[]; // tabs with new content the visitor hasn't opened yet
}) {
  const { t } = useLang();
  const bodyRef = useRef<HTMLDivElement>(null);

  // Terminal and chat follow the newest line; the file view starts at the top.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = tab === "files" ? 0 : el.scrollHeight;
  }, [scrollKey, tab]);

  return (
    <div
      className="overflow-hidden rounded-(--radius-lg)"
      style={{ background: "var(--term-bg)", border: "1px solid var(--term-border)", boxShadow: "var(--shadow-lg)" }}
    >
      <div className="flex items-center gap-3 px-3 pt-2.5" style={{ background: "var(--term-bar)" }}>
        <div className="flex gap-1.5 pb-2.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex min-w-0 flex-1 gap-1" role="tablist">
          {TABS.map((id) => {
            const active = id === tab;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTab(id)}
                className="figure relative cursor-pointer truncate rounded-t-md px-3 py-1.5 text-[12px] transition-colors"
                style={{
                  background: active ? "var(--term-bg)" : "transparent",
                  color: active ? "var(--term-text)" : "var(--term-dim)",
                }}
              >
                {t.sim.tabs[id]}
                {flash.includes(id) && !active && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--term-pink)" }} />
                )}
              </button>
            );
          })}
        </div>
        <span
          className="hidden shrink-0 pb-2.5 text-[10px] font-bold uppercase tracking-wider sm:inline"
          style={{ color: "var(--term-dim)" }}
        >
          {t.sim.simulated}
        </span>
      </div>
      <div ref={bodyRef} className="h-[300px] overflow-y-auto p-4" role="tabpanel">
        {views[tab]}
      </div>
    </div>
  );
}
