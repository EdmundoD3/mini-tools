// 🎞️ generateGIF.ts
// ----------------------

export async function generateGIF(
  frames: HTMLCanvasElement[],
  delay: number,
  quality: number,
  onProgress: (progress: number) => void,
  signal: AbortSignal
): Promise<Blob> {
  const GIF = (await import("gif.js.optimized")).default;
  return new Promise((resolve, reject) => {
    const gif = new GIF({
      workers: 2,
      quality,
      workerScript: "/gif.worker.js",
    });

    signal.addEventListener('abort', () => {
      gif.abort();
      reject(new DOMException('Proceso cancelado por el usuario.', 'AbortError'));
    });

    for (const frame of frames) {
      gif.addFrame(frame, { delay });
    }

    gif.on("progress", (p: number) => {
      if (onProgress) {
        onProgress(p);
      }
    });
    gif.on("finished", (blob: Blob) => resolve(blob));
    gif.on("error", reject);
    gif.render();
  });
}
