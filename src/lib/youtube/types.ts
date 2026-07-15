export type YouTubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

export type LatestYouTubeVideo = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail?: YouTubeThumbnail;
  channelTitle: string;
  isFallback?: boolean;
};

export type LatestYouTubeResult =
  | { status: "ready"; video: LatestYouTubeVideo }
  | { status: "unavailable"; reason: string };

type YouTubeSnippet = {
  title?: string;
  description?: string;
  publishedAt?: string;
  channelTitle?: string;
  thumbnails?: Record<string, YouTubeThumbnail | undefined>;
};

export type YouTubeChannelListResponse = {
  items?: Array<{
    snippet?: YouTubeSnippet;
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
  error?: { message?: string };
};

export type YouTubePlaylistItemsResponse = {
  items?: Array<{
    snippet?: YouTubeSnippet & { resourceId?: { videoId?: string } };
    contentDetails?: { videoId?: string; videoPublishedAt?: string };
    status?: { privacyStatus?: string };
  }>;
  error?: { message?: string };
};
