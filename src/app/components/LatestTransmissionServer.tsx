import { getLatestYouTubeVideo } from "@/lib/youtube/get-latest-video";
import { LatestTransmission } from "./LatestTransmission";

export async function LatestTransmissionServer() {
  const result = await getLatestYouTubeVideo();
  return <LatestTransmission result={result} />;
}
