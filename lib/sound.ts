// Small sound effects generated with the Web Audio API — no audio files.
// Browsers only allow audio after the visitor's first click; any failure is silent.

export type SoundName = "click" | "run" | "file" | "stage" | "drop" | "complete";

// [frequency Hz, start offset s, duration s]
const NOTES: Record<SoundName, [number, number, number][]> = {
  click: [[660, 0, 0.05]],
  run: [[440, 0, 0.07], [660, 0.06, 0.08]],
  file: [[880, 0, 0.06], [1320, 0.05, 0.08]],
  stage: [[523, 0, 0.12], [784, 0.1, 0.18]],
  drop: [[220, 0, 0.09], [330, 0.05, 0.08]],
  complete: [[523, 0, 0.14], [659, 0.12, 0.14], [784, 0.24, 0.14], [1047, 0.36, 0.3]],
};

let ctx: AudioContext | null = null;

export function playSound(name: SoundName) {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    for (const [freq, start, dur] of NOTES[name]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = name === "drop" ? "triangle" : "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.12, now + start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    }
  } catch {
    // audio unavailable — stay silent
  }
}
