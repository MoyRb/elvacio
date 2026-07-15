import { YOUTUBE_API_BASE_URL, YOUTUBE_CHANNEL_HANDLE, YOUTUBE_REVALIDATE_SECONDS } from "./constants";
import type { YouTubeChannelListResponse } from "./types";

export async function getUploadsPlaylistId(apiKey: string): Promise<string | null> {
  const url = new URL(`${YOUTUBE_API_BASE_URL}/channels`);
  url.searchParams.set("part", "contentDetails,snippet");
  url.searchParams.set("forHandle", YOUTUBE_CHANNEL_HANDLE);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, { next: { revalidate: YOUTUBE_REVALIDATE_SECONDS } });

  if (!response.ok) return null;

  const data = (await response.json()) as YouTubeChannelListResponse;
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}
