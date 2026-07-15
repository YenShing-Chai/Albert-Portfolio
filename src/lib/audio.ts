/**
 * Lightweight HTMLAudio manager: looping background music + one-shot SFX.
 * Browsers block autoplay until a user gesture, so start it from the intro
 * "Start" click. Honors the game's mute toggle alongside the WebAudio chime.
 */

let bg: HTMLAudioElement | null = null;
let planeAudio: HTMLAudioElement | null = null;
let muted = false;

function ensureBg() {
  if (typeof window === "undefined") return;
  if (!bg) {
    bg = new Audio("/audio/background.mp3");
    bg.loop = true;
    bg.volume = 0.3;
    bg.preload = "auto";
  }
}

/** Start (or resume) the looping background track — call on a user gesture. */
export function startBackground() {
  ensureBg();
  if (bg && !muted) void bg.play().catch(() => {});
}

export function setMuted(next: boolean) {
  muted = next;
  if (bg) {
    if (next) bg.pause();
    else void bg.play().catch(() => {});
  }
  if (next) stopPlaneSound();
}

/** One-shot plane engine sound for the travel cutscene. */
export function playPlaneSound() {
  if (typeof window === "undefined" || muted) return;
  stopPlaneSound();
  planeAudio = new Audio("/audio/plane.mp3");
  planeAudio.volume = 0.55;
  void planeAudio.play().catch(() => {});
}

export function stopPlaneSound() {
  if (planeAudio) {
    planeAudio.pause();
    planeAudio.currentTime = 0;
    planeAudio = null;
  }
}
