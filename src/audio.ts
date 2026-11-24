let context: AudioContext | null = null;
let enabled = false;

export function setSound(value: boolean) {
  enabled = value;
  if (value && !context) context = new AudioContext();
  if (value) void context?.resume();
}

export function sound(kind: "click" | "sweep" | "hit" | "select" = "click") {
  if (!enabled || !context) return;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = kind === "sweep" ? "sawtooth" : "sine";
  const from =
    kind === "hit"
      ? 115
      : kind === "select"
        ? 660
        : kind === "sweep"
          ? 180
          : 850;
  oscillator.frequency.setValueAtTime(from, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    kind === "select" ? 440 : 60,
    now + 0.13,
  );
  gain.gain.setValueAtTime(0.025, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(now + 0.17);
}
