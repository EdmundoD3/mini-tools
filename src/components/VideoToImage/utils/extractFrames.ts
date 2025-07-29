// src/utils/extractFrames.ts

export async function extractFrames(file: File, fps = 1): Promise<HTMLCanvasElement[]> {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.src = url;
  video.crossOrigin = "anonymous";

  return new Promise((resolve, reject) => {
    const frames: HTMLCanvasElement[] = [];

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const interval = 1 / fps;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas 2D no disponible");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let currentTime = 0;

      const capture = () => {
        video.currentTime = currentTime;
      };

      video.ontimeupdate = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const copy = document.createElement("canvas");
        copy.width = canvas.width;
        copy.height = canvas.height;
        copy.getContext("2d")?.drawImage(canvas, 0, 0);
        frames.push(copy);

        currentTime += interval;
        if (currentTime <= duration) {
          capture();
        } else {
          URL.revokeObjectURL(url);
          resolve(frames);
        }
      };

      capture();
    };

    video.onerror = () => reject("Error cargando el video");
  });
}