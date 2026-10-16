"use client";

// Terminal output, revealed one line at a time. Lines starting with "$ " are typed commands.
export default function TerminalView({
  lines,
  shown,
  idleText,
  active,
}: {
  lines: string[];
  shown: number;
  idleText: string;
  active: boolean;
}) {
  return (
    <div className="figure space-y-1 text-[13px] leading-relaxed">
      {shown === 0 && <p style={{ color: "var(--term-dim)" }}>{idleText}</p>}
      {lines.slice(0, shown).map((line, i) => {
        const isCmd = line.startsWith("$ ");
        return (
          <div key={i} className="line-in whitespace-pre-wrap break-all">
            {isCmd ? (
              <>
                <span style={{ color: "var(--term-green)" }}>$ </span>
                <span style={{ color: "var(--term-text)" }}>{line.slice(2)}</span>
              </>
            ) : (
              <span style={{ color: line.startsWith("◆") ? "var(--term-green)" : "var(--term-violet)" }}>{line}</span>
            )}
          </div>
        );
      })}
      {active && (
        <span className="caret inline-block h-4 w-2 align-middle" style={{ background: "var(--term-text)" }} />
      )}
    </div>
  );
}
