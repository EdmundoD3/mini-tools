import { useState } from "preact/hooks";
import { generatePDF } from "../utils/generatePDF";
import { generateGIF } from "../utils/generateGIF";
import { generateZIP } from "../utils/generateZIP";

export type VideoProcessorSettings = {
  startTime: number;
  endTime: number;
  captureInterval: number;
  gifDelay: number;
};

export function useVideoProcessor(settings: VideoProcessorSettings) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    mimeType: string;
    filename: string;
  } | null>(null);

  const reset = () => {
    setIsProcessing(false);
    setError(null);
    setResult(null);
  };

  const processVideo = async (
    file: File,
    format: "pdf" | "gif" | "zip"
  ): Promise<void> => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const frames = await extractFramesFromVideo(file, settings);
      if (frames.length === 0) throw new Error("video.error.no_frames");

      const baseName = file.name.replace(/\.[^/.]+$/, "");

      if (format === "pdf") {
        const blob = await generatePDF(frames);
        setResult({ blob, mimeType: "application/pdf", filename: `${baseName}.pdf` });
      } else if (format === "gif") {
        const blob = await generateGIF(frames, settings.gifDelay);
        setResult({ blob, mimeType: "image/gif", filename: `${baseName}.gif` });
      } else if (format === "zip") {
        const blob = await generateZIP(frames, baseName);
        setResult({ blob, mimeType: "application/zip", filename: `${baseName}.zip` });
      } else {
        throw new Error("video.error.unsupported_format");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return { processVideo, result, isProcessing, error, reset };
}

async function extractFramesFromVideo(file: File, settings: VideoProcessorSettings): Promise<HTMLCanvasElement[]> {
  const { startTime, endTime, captureInterval } = settings;
  const videoURL = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.src = videoURL;
  video.crossOrigin = "anonymous";
  video.muted = true;

  return new Promise((resolve, reject) => {
    const frames: HTMLCanvasElement[] = [];

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const actualEndTime = Math.min(endTime || duration, duration);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("video.error.canvas_context"));

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let currentTime = startTime;

      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const copy = document.createElement("canvas");
        copy.width = canvas.width;
        copy.height = canvas.height;
        copy.getContext("2d")?.drawImage(canvas, 0, 0);
        frames.push(copy);

        currentTime += captureInterval;
        if (currentTime <= actualEndTime) {
          video.currentTime = currentTime;
        } else {
          URL.revokeObjectURL(videoURL);
          resolve(frames);
        }
      };

      // Inicia el proceso de búsqueda
      video.currentTime = currentTime;
    };

    video.onerror = () => reject(new Error("video.error.video_load"));
  });
}
