"use client"
//@ts-ignore
import "./index.css";
import { Toaster } from "sonner";
import VideoSaver from "./components/VideoSaver";
import VideoGrid from "./components/VideoGrid";

export function App() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-xl font-bold mb-4">
        Video DB
      </h1>

      <div className="flex flex-col gap-2">  
        <VideoSaver />

        <VideoGrid />
      </div>

      <Toaster />
    </div>
  );
}

export default App;