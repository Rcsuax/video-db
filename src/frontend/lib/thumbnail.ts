const getVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getThumbnail = (url: string) => {
  const videoId = getVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}