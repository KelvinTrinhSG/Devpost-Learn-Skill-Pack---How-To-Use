"use client";

// A generated devpost/ document. "{answer}" in a line is replaced by the visitor's chosen answer, highlighted.
export default function DocPreview({
  path,
  lines,
  answer,
  emptyText,
}: {
  path: string | null;
  lines: string[] | null;
  answer: string | null;
  emptyText: string;
}) {
  if (!path || !lines) {
    return (
      <p className="figure text-[12.5px]" style={{ color: "var(--term-dim)" }}>
        {emptyText}
      </p>
    );
  }

  return (
    <div className="line-in figure text-[12.5px] leading-6" key={path}>
      <div className="mb-2 text-[11px]" style={{ color: "var(--term-dim)" }}>
        {path}
      </div>
      {lines.map((line, i) => {
        if (line.includes("{answer}")) {
          const [before, after] = line.split("{answer}");
          return (
            <p key={i} style={{ color: "var(--term-text)" }}>
              {before}
              <span className="answer-flash px-1" style={{ color: "var(--term-pink)" }}>
                {answer ?? "…"}
              </span>
              {after}
            </p>
          );
        }
        const heading = line.startsWith("#");
        return (
          <p
            key={i}
            className={heading ? "font-bold" : ""}
            style={{ color: heading ? "var(--term-violet)" : "var(--term-text)", minHeight: "1.5em" }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}
