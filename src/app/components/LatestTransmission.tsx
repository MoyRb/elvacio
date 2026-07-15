"use client";

import { LATEST_YOUTUBE_URL, LATEST_YOUTUBE_VIDEO_ID } from "../config/site";

function getEmbedSrc() {
  if (LATEST_YOUTUBE_VIDEO_ID) {
    return `https://www.youtube-nocookie.com/embed/${LATEST_YOUTUBE_VIDEO_ID}?rel=0`;
  }

  if (LATEST_YOUTUBE_URL) {
    try {
      const url = new URL(LATEST_YOUTUBE_URL);
      const videoId = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(-1);
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` : "";
    } catch {
      return "";
    }
  }

  return "";
}

export function LatestTransmission() {
  const embedSrc = getEmbedSrc();

  return (
    <section className="transmission-panel" id="ultima-transmision" aria-labelledby="latest-title">
      <div className="panel-header">
        <span>ÚLTIMA TRANSMISIÓN</span>
        <span className="frequency">FM 00.0</span>
      </div>
      <h2 id="latest-title">Señal central</h2>
      <div className="video-frame">
        {embedSrc ? (
          <iframe
            title="Última transmisión de El Vacío en YouTube"
            src={embedSrc}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onPointerDown={() => window.dispatchEvent(new Event("elvacio:video-play"))}
            onFocus={() => window.dispatchEvent(new Event("elvacio:video-play"))}
          />
        ) : (
          <div className="video-standby" role="status">
            <span>ESPERANDO ID OFICIAL DE YOUTUBE</span>
            <strong>NO SIGNAL / CONFIGURAR EN site.ts</strong>
          </div>
        )}
      </div>
    </section>
  );
}
