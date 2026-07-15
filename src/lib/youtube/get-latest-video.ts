import {
  YOUTUBE_API_BASE_URL,
  YOUTUBE_PLAYLIST_MAX_RESULTS,
  YOUTUBE_REVALIDATE_SECONDS,
} from "./constants";
import { getUploadsPlaylistId } from "./get-channel";
import type { LatestYouTubeResult, LatestYouTubeVideo, YouTubePlaylistItemsResponse, YouTubeThumbnail } from "./types";

function getBestThumbnail(thumbnails?: Record<string, YouTubeThumbnail | undefined>) {
  return thumbnails?.maxres ?? thumbnails?.standard ?? thumbnails?.high ?? thumbnails?.medium ?? thumbnails?.default;
}

function fallbackVideo(): LatestYouTubeResult | null {
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_FALLBACK_VIDEO_ID;
  if (!videoId) return null;

  return {
    status: "ready",
    video: {
      videoId,
      title: "Transmisión de respaldo",
      description: "Señal configurada como respaldo mientras se recupera la transmisión automática.",
      publishedAt: "",
      channelTitle: "El Vacío",
      isFallback: true,
    },
  };
}

function unavailable(reason: string): LatestYouTubeResult {
  return fallbackVideo() ?? { status: "unavailable", reason };
}

export async function getLatestYouTubeVideo(): Promise<LatestYouTubeResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return unavailable("Falta YOUTUBE_API_KEY en el servidor.");

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) return unavailable("No se pudo resolver la playlist de uploads del canal.");

    const url = new URL(`${YOUTUBE_API_BASE_URL}/playlistItems`);
    url.searchParams.set("part", "snippet,contentDetails,status");
    url.searchParams.set("playlistId", uploadsPlaylistId);
    url.searchParams.set("maxResults", String(YOUTUBE_PLAYLIST_MAX_RESULTS));
    url.searchParams.set("key", apiKey);

    const response = await fetch(url, { next: { revalidate: YOUTUBE_REVALIDATE_SECONDS } });
    if (!response.ok) return unavailable("YouTube no respondió con una señal válida.");

    const data = (await response.json()) as YouTubePlaylistItemsResponse;
    const validItem = data.items?.find((item) => {
      const title = item.snippet?.title?.toLowerCase() ?? "";
      const privacyStatus = item.status?.privacyStatus;
      return Boolean(
        item.contentDetails?.videoId &&
          privacyStatus === "public" &&
          title !== "deleted video" &&
          title !== "private video",
      );
    });

    if (!validItem?.contentDetails?.videoId) return unavailable("El canal no tiene videos públicos presentables.");

    const snippet = validItem.snippet;
    const video: LatestYouTubeVideo = {
      videoId: validItem.contentDetails.videoId,
      title: snippet?.title ?? "Última transmisión de El Vacío",
      description: snippet?.description ?? "",
      publishedAt: snippet?.publishedAt ?? validItem.contentDetails.videoPublishedAt ?? "",
      thumbnail: getBestThumbnail(snippet?.thumbnails),
      channelTitle: snippet?.channelTitle ?? "El Vacío",
    };

    return { status: "ready", video };
  } catch {
    return unavailable("Pérdida de señal al consultar YouTube.");
  }
}
