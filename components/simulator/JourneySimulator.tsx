"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { stageText, type Dictionary, type StageText } from "@/content/en";
import { stages, type Stage, type TipKey } from "@/content/stages";
import { useLang } from "@/lib/providers";
import CopyButton from "@/components/ui/CopyButton";
import ProgressRail from "./ProgressRail";
import SimWindow, { type Tab } from "./SimWindow";
import TerminalView from "./TerminalView";
import ChatView, { type ChatMessage } from "./ChatView";
import FileTree from "./FileTree";
import DocPreview from "./DocPreview";
import StageControls, { type Phase } from "./StageControls";
import StageDetails from "./StageDetails";
import TipPopup from "./TipPopup";
import CompletionMoment from "./CompletionMoment";

const STEP_MS = 380; // delay between simulated lines
const FINISH_MS = 700; // pause between the visitor's answer and the agent's reply

// How many lines/messages a stage plays before it needs input or completes.
function totalSteps(stage: Stage, text: StageText) {
  return stage.tab === "chat" ? 1 + (text.chat?.length ?? 0) : (stage.terminalLines?.length ?? 0);
}

function docPath(stage: Stage) {
  return stage.files?.find((f) => f.startsWith("devpost/")) ?? null;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function JourneySimulator() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const [tab, setTab] = useState<Tab>(stages[0].tab);
  const [selected, setSelected] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string[]>([]);
  const [flash, setFlash] = useState<Tab[]>([]);
  const [tip, setTip] = useState<TipKey | null>(null);
  const [celebrate, setCelebrate] = useState(false); // confetti only when stage 7 is completed, not on revisit

  const stage = stages[current];
  const text = stageText(t, stage.id);
  const total = totalSteps(stage, text);

  function complete() {
    setDone((d) => (d.includes(stage.id) ? d : [...d, stage.id]));
    setPhase("done");
    if (current === stages.length - 1) setCelebrate(true);
    if (stage.files?.length) {
      setFresh(stage.files);
      setSelected(docPath(stage));
      setTab("files");
      if (stage.tab === "chat") setFlash(["chat"]);
    }
  }

  // Play the script: reveal one line per tick, then wait for input or complete.
  useEffect(() => {
    if (phase !== "playing") return;
    const delay = prefersReducedMotion() ? 0 : STEP_MS;
    const id = window.setTimeout(() => {
      if (shown < total) setShown((s) => s + 1);
      else if (stage.interaction !== "run") setPhase("awaiting");
      else complete();
    }, delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, shown, total, stage]);

  // After an answer: short pause, then the agent replies and the document appears.
  useEffect(() => {
    if (phase !== "finishing") return;
    const id = window.setTimeout(complete, prefersReducedMotion() ? 0 : FINISH_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function run() {
    setFresh([]);
    setFlash([]);
    setTab(stage.tab);
    setShown(prefersReducedMotion() ? total : 0);
    setPhase("playing");
  }

  function answer(i: number) {
    setAnswers((a) => ({ ...a, [stage.id]: i }));
    setPhase("finishing");
  }

  const closeTip = useCallback(() => setTip(null), []);

  function next() {
    if (stage.tipKey) setTip(stage.tipKey);
    goTo(current + 1);
  }

  function startOver() {
    setDone([]);
    setAnswers({});
    setSelected(null);
    setCelebrate(false);
    goTo(0, true);
  }

  function goTo(index: number, reset = false) {
    const next = stages[index];
    const isDone = !reset && done.includes(next.id);
    setCurrent(index);
    setPhase(isDone ? "done" : "idle");
    setShown(isDone ? totalSteps(next, stageText(t, next.id)) : 0);
    setTab(next.tab);
    setFresh([]);
    setFlash([]);
    if (isDone && docPath(next)) setSelected(docPath(next));
  }

  // Every file created by a completed stage, in journey order.
  const visibleFiles = useMemo(
    () => stages.filter((s) => done.includes(s.id)).flatMap((s) => s.files ?? []),
    [done],
  );

  const docs = useMemo(() => buildDocs(t, answers), [t, answers]);
  const activeDoc =
    selected && visibleFiles.includes(selected)
      ? selected
      : ([...visibleFiles].reverse().find((f) => docs[f]) ?? null);

  // Terminal tab: the stage's own script, or (for chat stages) the running Claude session.
  const terminalLines =
    stage.tab === "chat" ? ["$ claude", ...(shown > 0 ? [`> ${stage.command}`] : [])] : (stage.terminalLines ?? []);
  const terminalShown = stage.tab === "chat" ? terminalLines.length : shown;

  // Claude Code tab: command → agent messages → chosen answer → reply.
  const messages: ChatMessage[] = [];
  if (stage.tab === "chat" && shown > 0) {
    messages.push({ from: "you", text: stage.command, mono: true });
    (text.chat ?? []).slice(0, shown - 1).forEach((m) => messages.push({ from: "agent", text: m }));
    const picked = answers[stage.id];
    const chosen = picked !== undefined ? text.answers?.[picked] : undefined;
    if (chosen && (phase === "finishing" || phase === "done")) messages.push({ from: "you", text: chosen.label });
    const reply = chosen?.reply ?? text.reply;
    if (phase === "done" && reply) messages.push({ from: "agent", text: reply });
  }

  const isLast = current === stages.length - 1;

  const views: Record<Tab, ReactNode> = {
    terminal: (
      <TerminalView
        lines={terminalLines}
        shown={terminalShown}
        idleText={t.sim.terminalIdle}
        active={phase === "playing" && stage.tab === "terminal"}
      />
    ),
    chat: <ChatView messages={messages} idleText={stage.tab === "chat" ? t.sim.chatIdle : t.sim.chatOtherStage} />,
    files: (
      <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <FileTree
          files={visibleFiles}
          fresh={fresh}
          selected={activeDoc}
          onSelect={setSelected}
          hasDoc={(p) => Boolean(docs[p])}
          emptyText={t.sim.filesEmpty}
        />
        <div className="border-t pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0" style={{ borderColor: "var(--term-border)" }}>
          <DocPreview
            path={activeDoc}
            lines={activeDoc ? docs[activeDoc].lines : null}
            answer={activeDoc ? docs[activeDoc].answer : null}
            emptyText={visibleFiles.length ? t.sim.pickFile : t.sim.filesEmpty}
          />
        </div>
      </div>
    ),
  };

  return (
    <div className="relative space-y-4">
      <ProgressRail current={current} done={done} onJump={goTo} />

      <div>
        <div className="flex items-baseline gap-2">
          <span className="figure text-xs font-bold text-(--primary)">
            {t.sim.stageLabel} {String(stage.id).padStart(2, "0")}
          </span>
          <h2 className="text-lg font-bold tracking-tight">{text.title}</h2>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-(--text-muted)">{text.caption}</p>
      </div>

      <SimWindow
        tab={tab}
        onTab={(id) => {
          setTab(id);
          setFlash((f) => f.filter((x) => x !== id));
        }}
        views={views}
        scrollKey={`${stage.id}-${shown}-${phase}`}
        flash={flash}
      />

      <div className="min-h-[44px]">
        {isLast && phase === "done" ? (
          <CompletionMoment celebrate={celebrate} onStartOver={startOver} />
        ) : (
          <StageControls
            phase={phase}
            interaction={stage.interaction}
            text={text}
            isLast={isLast}
            onRun={run}
            onAnswer={answer}
            onNext={next}
          />
        )}
      </div>

      <CopyButton command={stage.command} label={t.sim.commandLabel} />
      <StageDetails key={stage.id} text={text} />

      {tip && <TipPopup tip={tip} onClose={closeTip} />}
    </div>
  );
}

// Document previews for every stage that writes a devpost/ file, with the chosen answer filled in.
function buildDocs(t: Dictionary, answers: Record<number, number>) {
  const docs: Record<string, { lines: string[]; answer: string | null }> = {};
  for (const s of stages) {
    const path = docPath(s);
    const text = stageText(t, s.id);
    if (!path || !text.doc) continue;
    const picked = answers[s.id];
    docs[path] = {
      lines: text.doc,
      answer: picked !== undefined && text.answers ? text.answers[picked].text : null,
    };
  }
  return docs;
}
