import { useState } from "react";
import { Input } from "./components/ui/input";
import "./index.css";
import { Button } from "./components/ui/button";
import { getThumbnail } from "./lib/thumbnail";
import { toast, Toaster } from "sonner"
import API from "./lib/fetch";

export function App() {
  const [url, setUrl] = useState<string>("");
  const [thumb, setThumb] = useState<string | null>(null);

  const handleSubmit = () => {
    const img = getThumbnail(url)
    setThumb(img);
  };

  const handleSave = async () => {
    const result = await API.fetch('/save', {
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
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-xl font-bold mb-4">
        Video DB
      </h1>

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
      <Toaster />
    </div>
  );
}

export default App;