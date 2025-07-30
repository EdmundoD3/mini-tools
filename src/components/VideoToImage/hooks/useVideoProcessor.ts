import { useState, useRef } from "preact/hooks";
import { generatePDF } from "../utils/generatePDF";
import { generateGIF } from "../utils/generateGIF";
import { generateZIP } from "../utils/generateZIP";

export type VideoProcessorSettings = {
  startTime: number;
  endTime: number;
  captureInterval: number;
  gifDelay: number;
  gifQuality: number;
};

export function useVideoProcessor(settings: VideoProcessorSettings) {
  const [isProcessing, setIsProcessing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    blob: Blob;
    mimeType: string;
    filename: string;
  } | null>(null);

  const reset = () => {
    setIsProcessing(false);
    abortControllerRef.current?.abort();
    setProgress(0);
    setError(null);
    setResult(null);
  };

  const cancelProcessing = () => {
    abortControllerRef.current?.abort();
  };

  const processVideo = async (
    file: File,
    format: "pdf" | "gif" | "zip"
  ): Promise<void> => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const frames = await extractFramesFromVideo(file, settings, controller.signal);
      if (frames.length === 0) throw new Error("video.error.no_frames");

      const baseName = file.name.replace(/\.[^/.]+$/, "");

      if (format === "pdf") {
        const blob = await generatePDF(frames);
        setResult({ blob, mimeType: "application/pdf", filename: `${baseName}.pdf` });
      } else if (format === "gif") {
        const blob = await generateGIF(frames, settings.gifDelay, settings.gifQuality, setProgress, controller.signal);
        setResult({ blob, mimeType: "image/gif", filename: `${baseName}.gif` });
      } else if (format === "zip") {
        const blob = await generateZIP(frames, baseName);
        setResult({ blob, mimeType: "application/zip", filename: `${baseName}.zip` });
      } else {
        throw new Error("video.error.unsupported_format");
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message);
      }
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  return { processVideo, result, isProcessing, progress, error, reset, cancelProcessing };
}

async function extractFramesFromVideo(
  file: File, settings: VideoProcessorSettings, signal: AbortSignal
): Promise<HTMLCanvasElement[]> {
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
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject(new Error("video.error.canvas_context"));

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let currentTime = startTime;

      video.onseeked = () => {
        if (signal.aborted) {
          URL.revokeObjectURL(videoURL);
          return reject(new DOMException('Proceso cancelado por el usuario.', 'AbortError'));
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const copy = document.createElement("canvas");
        copy.width = canvas.width;
        copy.height = canvas.height;
        const copyCtx = copy.getContext("2d", { willReadFrequently: true });
        copyCtx?.drawImage(canvas, 0, 0);
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
