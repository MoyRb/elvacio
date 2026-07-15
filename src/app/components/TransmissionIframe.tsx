"use client";

type TransmissionIframeProps = {
  videoId: string;
  title: string;
};

function notifyVideoInteraction() {
  window.dispatchEvent(new Event("elvacio:video-play"));
}

export function TransmissionIframe({ videoId, title }: TransmissionIframeProps) {
  return (
    <iframe
      title={title}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onPointerDown={notifyVideoInteraction}
      onFocus={notifyVideoInteraction}
    />
  );
}
