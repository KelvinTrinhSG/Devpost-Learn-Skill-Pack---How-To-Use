"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { stageText, type Dictionary, type StageText } from "@/content/en";
import { stages, type Stage, type TipKey } from "@/content/stages";
import { useLang, useProgress, useSound } from "@/lib/providers";
import { EMPTY_PROGRESS, readRaw, parseProgress, useHydrated, type Progress } from "@/lib/storage";
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

// Captured once per page load (the simulator remounts when switching modes).
let loadedProgress: Progress | null = null;
let welcomeClosed = false;
function progressAtPageLoad(): Progress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  loadedProgress ??= parseProgress(readRaw("progress"), stages.length);
  return loadedProgress;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function JourneySimulator() {
  const { t } = useLang();
  const { progress, updateProgress, setMode } = useProgress();
  const { play } = useSound();
  const hydrated = useHydrated();

  // Saved progress (current stage, completed stages, chosen answers) lives in the browser.
  const { done, answers } = progress;
  const current = progress.stage - 1;

  // Per-visit playback state for the current stage.
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const [tabOverride, setTabOverride] = useState<Tab | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string[]>([]);
  const [flash, setFlash] = useState<Tab[]>([]);
  const [tip, setTip] = useState<TipKey | null>(null);
  const [celebrate, setCelebrate] = useState(false); // confetti only when stage 7 is completed, not on revisit

  // "Welcome back" uses what was saved when the page opened; hidden once the visitor acts.
  const [savedAtLoad] = useState(progressAtPageLoad);
  const [welcomeDismissed, setWelcomeDismissedState] = useState(welcomeClosed);
  const setWelcomeDismissed = (v: boolean) => {
    welcomeClosed = v;
    setWelcomeDismissedState(v);
  };
  const showWelcome =
    hydrated && !welcomeDismissed && (savedAtLoad.stage > 1 || savedAtLoad.done.length > 0);

  const stage = stages[current];
  const text = stageText(t, stage.id);
  const total = totalSteps(stage, text);
  const isLast = current === stages.length - 1;

  // A completed stage that hasn't been replayed this visit shows its finished state.
  const restored = phase === "idle" && done.includes(stage.id);
  const viewPhase: Phase = restored ? "done" : phase;
  const viewShown = restored ? total : shown;
  const tab = tabOverride ?? stage.tab;

  function complete() {
    updateProgress((p) => ({ ...p, done: p.done.includes(stage.id) ? p.done : [...p.done, stage.id] }));
    setPhase("done");
    if (isLast) {
      setCelebrate(true);
      play("complete");
    } else {
      play(stage.files?.length ? "file" : "stage");
    }
    if (stage.files?.length) {
      setFresh(stage.files);
      setSelected(docPath(stage));
      setTabOverride("files");
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
    play("run");
    setWelcomeDismissed(true);
    setFresh([]);
    setFlash([]);
    setTabOverride(null);
    setShown(prefersReducedMotion() ? total : 0);
    setPhase("playing");
  }

  function answer(i: number) {
    play("click");
    updateProgress((p) => ({ ...p, answers: { ...p.answers, [stage.id]: i } }));
    setPhase("finishing");
  }

  const closeTip = useCallback(() => setTip(null), []);

  function next() {
    play("click");
    if (stage.tipKey) setTip(stage.tipKey);
    goTo(current + 1);
  }

  function startOver() {
    play("click");
    updateProgress(() => EMPTY_PROGRESS);
    setSelected(null);
    setCelebrate(false);
    resetPlayback();
  }

  function goTo(index: number) {
    updateProgress((p) => ({ ...p, stage: index + 1 }));
    resetPlayback();
    const path = docPath(stages[index]);
    if (path && done.includes(stages[index].id)) setSelected(path);
  }

  function resetPlayback() {
    setWelcomeDismissed(true);
    setPhase("idle");
    setShown(0);
    setTabOverride(null);
    setFresh([]);
    setFlash([]);
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
    stage.tab === "chat" ? ["$ claude", ...(viewShown > 0 ? [`> ${stage.command}`] : [])] : (stage.terminalLines ?? []);
  const terminalShown = stage.tab === "chat" ? terminalLines.length : viewShown;

  // Claude Code tab: command → agent messages → chosen answer → reply.
  const messages: ChatMessage[] = [];
  if (stage.tab === "chat" && viewShown > 0) {
    messages.push({ from: "you", text: stage.command, mono: true });
    (text.chat ?? []).slice(0, viewShown - 1).forEach((m) => messages.push({ from: "agent", text: m }));
    const picked = answers[stage.id];
    const chosen = picked !== undefined ? text.answers?.[picked] : undefined;
    if (chosen && (viewPhase === "finishing" || viewPhase === "done")) messages.push({ from: "you", text: chosen.label });
    const reply = chosen?.reply ?? text.reply;
    if (viewPhase === "done" && reply) messages.push({ from: "agent", text: reply });
  }

  const views: Record<Tab, ReactNode> = {
    terminal: (
      <TerminalView
        lines={terminalLines}
        shown={terminalShown}
        idleText={t.sim.terminalIdle}
        active={viewPhase === "playing" && stage.tab === "terminal"}
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
      {showWelcome && (
        <div
          className="line-in flex flex-wrap items-center justify-between gap-2 rounded-(--radius-md) px-3 py-2 text-sm"
          style={{
            background: "color-mix(in srgb, var(--secondary) 9%, transparent)",
            border: "1px solid color-mix(in srgb, var(--secondary) 19%, transparent)",
          }}
          role="status"
        >
          <span className="font-medium">👋 {t.welcome.back.replace("{n}", String(savedAtLoad.stage))}</span>
          <button
            type="button"
            onClick={startOver}
            className="cursor-pointer text-sm font-semibold text-(--secondary) hover:underline"
          >
            ↺ {t.welcome.startOver}
          </button>
        </div>
      )}

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
          setTabOverride(id);
          setFlash((f) => f.filter((x) => x !== id));
        }}
        views={views}
        scrollKey={`${stage.id}-${viewShown}-${viewPhase}`}
        flash={flash}
      />

      <div className="min-h-[44px]">
        {isLast && viewPhase === "done" ? (
          <CompletionMoment celebrate={celebrate} onStartOver={startOver} onQuick={() => setMode("quick")} />
        ) : (
          <StageControls
            phase={viewPhase}
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
      answer: picked !== undefined ? (text.answers?.[picked]?.text ?? null) : null,
    };
  }
  return docs;
}
