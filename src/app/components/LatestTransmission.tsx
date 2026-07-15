import { YOUTUBE_CHANNEL_URL } from "@/lib/youtube/constants";
import type { LatestYouTubeResult } from "@/lib/youtube/types";
import { TransmissionIframe } from "./TransmissionIframe";

type LatestTransmissionProps = {
  result: LatestYouTubeResult;
};

function formatDate(value: string) {
  if (!value) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function LatestTransmission({ result }: LatestTransmissionProps) {
  const video = result.status === "ready" ? result.video : null;
  const youtubeUrl = video ? `https://www.youtube.com/watch?v=${video.videoId}` : YOUTUBE_CHANNEL_URL;

  return (
    <section className="transmission-panel" id="ultima-transmision" aria-labelledby="latest-title">
      <div className="panel-header">
        <span>ÚLTIMA TRANSMISIÓN</span>
        <span className="frequency">FM 00.0</span>
      </div>
      <h2 id="latest-title">{video?.title ?? "SEÑAL NO DISPONIBLE"}</h2>
      <p className="transmission-meta">
        {video ? `${formatDate(video.publishedAt)} / ${video.channelTitle}` : "Pérdida de señal con el canal oficial"}
      </p>
      <div className="video-frame">
        {video ? (
          <TransmissionIframe title={`Última transmisión de El Vacío: ${video.title}`} videoId={video.videoId} />
        ) : (
          <div className="video-standby" role="status">
            <span>SEÑAL NO DISPONIBLE</span>
            <strong>{result.status === "unavailable" ? result.reason : ""}</strong>
          </div>
        )}
      </div>
      {video?.description ? <p className="transmission-description">{video.description}</p> : null}
      <a className="youtube-link" href={youtubeUrl} target="_blank" rel="noreferrer">
        Abrir en YouTube
      </a>
    </section>
  );
}
