import { useEffect, useState } from "react";
import API from "@/lib/api";
import { toast } from "sonner";
import { getThumbnail, getVideoMeta } from "../lib/video-utils";
import type { Video, GETVideoResponse } from "@/types";

const VideoGrid = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const result = await API.fetch<GETVideoResponse>('/api/video', { method: "GET" })
      if(result.ok) {
        const videosWithMeta: Video[] = await Promise.all(
          result.data.videos.map(async v => {
            try {
              const meta = await getVideoMeta(v.url);
              return { ...v, meta };
            } catch {
              return { ...v };
            }
          })
        );
        
        setVideos(videosWithMeta);
        toast("Videos Loaded");
      }
      else {
        toast.error(result.error.message,);
      }
    }
    fetchVideos();
  }, [])


  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
      { videos.map( (video, index) => {
        return (
          <a
            key={`video-grid-index-${index}`}
            href={video.url}
            target="_blank"
            className="flex flex-col" 
          >
            <img 
              src={`${getThumbnail(video.url)}`} width={250}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="truncate">{ video.meta?.title }</p>
          </a>
        )
      })}
    </section>
  )
}

export default VideoGrid;