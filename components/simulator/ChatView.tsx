"use client";

import { useLang } from "@/lib/providers";

export type ChatMessage = { from: "you" | "agent"; text: string; mono?: boolean };

// Claude Code conversation: the slash command, the agent's messages, the chosen answer, the reply.
export default function ChatView({ messages, idleText }: { messages: ChatMessage[]; idleText: string }) {
  const { t } = useLang();
  if (messages.length === 0) {
    return (
      <p className="figure text-[13px]" style={{ color: "var(--term-dim)" }}>
        {idleText}
      </p>
    );
  }

  return (
    <div className="space-y-3 text-[13.5px] leading-relaxed">
      {messages.map((m, i) => (
        <div key={i} className={`line-in flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
          <div
            className="max-w-[85%] rounded-(--radius-md) px-3 py-2"
            style={
              m.from === "you"
                ? { background: "color-mix(in srgb, var(--term-pink) 18%, transparent)", color: "var(--term-text)" }
                : { background: "var(--term-bar)", color: "var(--term-text)", border: "1px solid var(--term-border)" }
            }
          >
            <div
              className="mb-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: m.from === "you" ? "var(--term-pink)" : "var(--term-violet)" }}
            >
              {m.from === "you" ? t.sim.you : `✻ ${t.sim.agent}`}
            </div>
            <div className={m.mono ? "figure" : ""}>{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
