import { useCallback, useSyncExternalStore } from "react";

// Safe localStorage under the "skillguide:" prefix. If storage is blocked (private mode,
// quota), values live in memory for this visit, so the page still works without memory.

export const PREFIX = "skillguide:";
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(PREFIX + key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writeRaw(key: string, value: string) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // storage unavailable — the in-memory copy keeps this visit working
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// A stored string, restricted to `allowed` values. Pre-rendered HTML and the first
// render use `fallback`; the saved value takes over right after hydration.
export function useStored<T extends string>(key: string, allowed: readonly T[], fallback: T): [T, (v: T) => void] {
  const raw = useSyncExternalStore(subscribe, () => readRaw(key), () => null);
  const value = raw !== null && (allowed as readonly string[]).includes(raw) ? (raw as T) : fallback;
  const set = useCallback((v: T) => writeRaw(key, v), [key]);
  return [value, set];
}

// Raw stored JSON text (stable between renders, so it's safe as a snapshot); parse with a validator.
export function useStoredRaw(key: string): [string | null, (v: string) => void] {
  const raw = useSyncExternalStore(subscribe, () => readRaw(key), () => null);
  const set = useCallback((v: string) => writeRaw(key, v), [key]);
  return [raw, set];
}

const noop = () => () => {};
// False while pre-rendering and hydrating, true afterwards.
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export type Progress = { stage: number; done: number[]; answers: Record<number, number> };

export const EMPTY_PROGRESS: Progress = { stage: 1, done: [], answers: {} };

// Parses saved progress; anything malformed falls back to a fresh start.
export function parseProgress(raw: string | null, stageCount: number): Progress {
  if (!raw) return EMPTY_PROGRESS;
  try {
    const v = JSON.parse(raw);
    const isId = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= stageCount;
    if (!v || typeof v !== "object" || !isId(v.stage) || !Array.isArray(v.done) || !v.done.every(isId)) {
      return EMPTY_PROGRESS;
    }
    const answers: Record<number, number> = {};
    if (v.answers && typeof v.answers === "object") {
      for (const [k, a] of Object.entries(v.answers)) {
        if (isId(Number(k)) && Number.isInteger(a) && (a as number) >= 0) answers[Number(k)] = a as number;
      }
    }
    return { stage: v.stage, done: [...new Set<number>(v.done)], answers };
  } catch {
    return EMPTY_PROGRESS;
  }
}
