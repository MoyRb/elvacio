"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AMBIENT_AUDIO_SRC } from "../config/site";

const STORAGE_KEY = "elvacio:ambient-audio";
const TARGET_VOLUME = 0.18;
const FADE_DURATION_MS = 900;
const FADE_STEP_MS = 50;

type AudioStatus = "idle" | "fading-in" | "playing" | "fading-out" | "blocked" | "unavailable";

export function AmbientAudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const userActivatedRef = useRef(false);
  const [enabled, setEnabled] = useState(() =>
    typeof window === "undefined" ? false : sessionStorage.getItem(STORAGE_KEY) === "on",
  );
  const [status, setStatus] = useState<AudioStatus>("idle");

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (targetVolume: number, afterFade?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      clearFade();
      const startVolume = audio.volume;
      const steps = Math.max(1, Math.round(FADE_DURATION_MS / FADE_STEP_MS));
      let step = 0;

      fadeRef.current = window.setInterval(() => {
        step += 1;
        const progress = Math.min(step / steps, 1);
        audio.volume = startVolume + (targetVolume - startVolume) * progress;

        if (progress >= 1) {
          clearFade();
          afterFade?.();
        }
      }, FADE_STEP_MS);
    },
    [clearFade],
  );

  const fadeOutAndPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setStatus("fading-out");
    fadeTo(0, () => {
      audio.pause();
      setStatus("idle");
    });
  }, [fadeTo]);

  const startAmbient = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.loop = true;
    audio.volume = 0;

    try {
      await audio.play();
      setStatus("fading-in");
      fadeTo(TARGET_VOLUME, () => setStatus("playing"));
    } catch {
      setEnabled(false);
      sessionStorage.setItem(STORAGE_KEY, "off");
      setStatus("blocked");
    }
  }, [clearFade, fadeTo]);


  useEffect(() => {
    if (!enabled) {
      sessionStorage.setItem(STORAGE_KEY, "off");
      if (audioRef.current && !audioRef.current.paused) fadeOutAndPause();
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "on");
    if (userActivatedRef.current) void startAmbient();
  }, [enabled, fadeOutAndPause, startAmbient]);

  useEffect(() => {
    const pauseAmbientForVideo = () => {
      if (audioRef.current && !audioRef.current.paused) fadeOutAndPause();
    };

    window.addEventListener("elvacio:video-play", pauseAmbientForVideo);
    return () => window.removeEventListener("elvacio:video-play", pauseAmbientForVideo);
  }, [fadeOutAndPause]);

  useEffect(() => () => clearFade(), [clearFade]);

  const toggleAmbient = () => {
    userActivatedRef.current = true;
    setEnabled((current) => !current);
  };

  const statusMessage = status === "unavailable"
    ? "audio no disponible"
    : status === "blocked"
      ? "audio bloqueado por el navegador"
      : null;

  return (
    <div className="ambient-control" aria-live="polite">
      <audio
        ref={audioRef}
        src={AMBIENT_AUDIO_SRC}
        loop
        preload="none"
        onError={() => {
          setEnabled(false);
          setStatus("unavailable");
        }}
      />
      <button
        className="terminal-button ambient-button"
        type="button"
        aria-label={`Audio ambiental de El Vacío: ${enabled ? "encendido" : "apagado"}`}
        aria-pressed={enabled}
        data-active={enabled ? "true" : "false"}
        onClick={toggleAmbient}
      >
        <span className="signal-dot" aria-hidden="true" />
        AMBIENTE: {enabled ? "ON" : "OFF"}
      </button>
      {statusMessage ? <span className="audio-note">{statusMessage}</span> : null}
    </div>
  );
}
