import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { getThumbnail } from "../lib/video-utils";
import API from "@/lib/api";
import { toast } from "sonner";

const VideoSaver = () => {
  const [url, setUrl] = useState<string>("");
  const [thumb, setThumb] = useState<string | null>(null);

  const handleSubmit = () => {
    const img = getThumbnail(url)
    setThumb(img);
  };

  const handleSave = async () => {
    const result = await API.fetch('/api/video/save', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url })
    })
    if(result.ok) {
      toast("Saved successfully");
    }
    else {
      toast.error(result.error.message,);
    }
  }

  return (
    <>
      <div className="flex gap-2 justify-center">
        <Input
          type="text"
          placeholder="https://youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button onClick={handleSubmit}>Get Thumbnail</Button>
      </div>

      {thumb && (
        <div className="flex flex-col gap-2 mt-6">
          <img
            src={thumb}
            alt="YouTube thumbnail"
            className="rounded-lg shadow-lg mx-auto"
          />

          <Button onClick={handleSave} variant={"outline"}>Save</Button>
        </div>
      )}
    </>
  )
}

export default VideoSaver;