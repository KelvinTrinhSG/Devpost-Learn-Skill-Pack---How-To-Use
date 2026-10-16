"use client";

import { stageText } from "@/content/en";
import { stages } from "@/content/stages";
import { useLang } from "@/lib/providers";
import CopyButton from "@/components/ui/CopyButton";

// The 7 real commands with a one-line description and a Copy button each — no simulation.
export default function QuickCommandList() {
  const { t } = useLang();
  return (
    <div className="hero-in space-y-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight">{t.quick.title}</h2>
        <p className="mt-1 text-sm text-(--text-muted)">{t.quick.intro}</p>
      </div>
      <ol className="space-y-2.5">
        {stages.map((s) => (
          <li key={s.id} className="flex gap-3">
            <span
              className="figure mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ color: "var(--primary)", background: "color-mix(in srgb, var(--primary) 9%, transparent)" }}
            >
              {s.id}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-sm font-medium text-(--text-soft)">{stageText(t, s.id).short}</p>
              <CopyButton command={s.command} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
