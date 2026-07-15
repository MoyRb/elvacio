"use client";

import { useEffect, useRef, useState } from "react";
import { AMBIENT_AUDIO_SRC } from "../config/site";

const STORAGE_KEY = "elvacio:ambient-audio";

export function AmbientAudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(() =>
    typeof window === "undefined" ? false : sessionStorage.getItem(STORAGE_KEY) === "on",
  );
  const [available, setAvailable] = useState(true);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!enabled) {
      audio.pause();
      sessionStorage.setItem(STORAGE_KEY, "off");
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "on");
    audio.volume = 0.18;
    audio.play().catch(() => setEnabled(false));
  }, [enabled]);

  useEffect(() => {
    const pauseAmbient = () => {
      audioRef.current?.pause();
      setEnabled(false);
    };

    window.addEventListener("elvacio:video-play", pauseAmbient);
    return () => window.removeEventListener("elvacio:video-play", pauseAmbient);
  }, []);

  return (
    <div className="ambient-control" aria-live="polite">
      <audio
        ref={audioRef}
        src={AMBIENT_AUDIO_SRC}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        className="terminal-button"
        type="button"
        aria-pressed={enabled}
        onClick={() => setEnabled((current) => !current)}
      >
        AMBIENTE: {enabled ? "ON" : "OFF"}
      </button>
      {!available ? (
        <span className="audio-note">audio oficial pendiente</span>
      ) : null}
    </div>
  );
}
