// 🎞️ generateGIF.ts
// ----------------------

export async function generateGIF(frames: HTMLCanvasElement[], delay: number): Promise<Blob> {
  const GIF = (await import("gif.js.optimized")).default;
  return new Promise((resolve, reject) => {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: "/gif.worker.js",
    });

    for (const frame of frames) {
      gif.addFrame(frame, { delay });
    }

    gif.on("finished", (blob: Blob) => resolve(blob));
    gif.on("error", reject);
    gif.render();
  });
}

