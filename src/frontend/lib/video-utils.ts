import type { Video } from "@/types";

const getVideoId = (url: string): string | null => {
  const u = new URL(url);
  const result = u.searchParams.get("v");
  return result ? result : null
};

export const getThumbnail = (url: string) => {
  const videoId = getVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export const getVideoMeta = async (url: string): Promise<Video["meta"]> => {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    return await res.json();
  } catch {
    // fallback method
  }
}