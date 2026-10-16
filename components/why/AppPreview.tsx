"use client";

import type { CSSProperties } from "react";
import { LOOKS, type CardId, type Zone } from "@/content/decisions";
import { useLang } from "@/lib/providers";

// A small phone mock. Each decision you own swaps that part of the app from the AI default to your choice.
export default function AppPreview({ positions }: { positions: Record<CardId, Zone> }) {
  const { t } = useLang();
  const p = t.why.game.preview;
  const mine = (id: CardId) => positions[id] === "you";

  const color = mine("color") ? LOOKS.color.you : LOOKS.color.ai;
  const font = mine("font") ? LOOKS.font.you : LOOKS.font.ai;
  const notebook = mine("style");

  const screen: CSSProperties = notebook
    ? {
        background: "#FFFBF2",
        backgroundImage: "repeating-linear-gradient(#FFFBF2 0 23px, #E9DFC9 23px 24px)",
        color: "#2B1A0E",
      }
    : { background: "#F7F7FB", color: "#1E1B2E" };

  const card: CSSProperties = notebook
    ? { background: "#FFFFFF", border: "1.5px dashed #C9B48F", borderRadius: 4, transform: "rotate(-0.6deg)" }
    : { background: "#FFFFFF", borderRadius: 14, boxShadow: "0 4px 14px rgba(30,27,46,0.08)" };

  return (
    <div
      className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[28px] border-[6px] p-0 transition-all duration-500"
      style={{ borderColor: "var(--text)", boxShadow: "var(--shadow-lg)" }}
      aria-live="polite"
    >
      <div className="min-h-[400px] transition-all duration-500" style={screen}>
        <div
          className="px-5 pb-6 pt-7 transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
            color: color.ink,
            borderRadius: notebook ? "0 0 0 0" : "0 0 24px 24px",
          }}
        >
          <p
            key={`${mine("name")}-${mine("font")}`}
            className="line-in text-2xl font-extrabold leading-tight"
            style={{ fontFamily: font, fontStyle: mine("font") ? "italic" : "normal" }}
          >
            {mine("name") ? p.youName : p.aiName}
          </p>
          <p key={String(mine("audience"))} className="line-in mt-1.5 text-[13px] leading-snug opacity-90">
            {mine("audience") ? p.youTagline : p.aiTagline}
          </p>
        </div>

        <ul className="space-y-2.5 px-4 py-5">
          {(mine("features") ? p.youFeatures : p.aiFeatures).map((f, i) => (
            <li
              key={f}
              className="line-in flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold"
              style={{ ...card, fontFamily: font, animationDelay: `${i * 60}ms` }}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: i % 2 ? color.to : color.from }}
                aria-hidden
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="px-4 pb-6">
          <div
            className="py-2.5 text-center text-sm font-bold transition-all duration-500"
            style={{
              background: color.from,
              color: "#FFFFFF",
              borderRadius: notebook ? 4 : 999,
              fontFamily: font,
            }}
          >
            {mine("features") ? p.youStart : p.start}
          </div>
        </div>
      </div>
    </div>
  );
}
