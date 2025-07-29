// 🗂️ generateZIP.ts
// ----------------------

export async function generateZIP(frames: HTMLCanvasElement[], baseName: string): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (let i = 0; i < frames.length; i++) {
    const canvas = frames[i];
    const dataUrl = canvas.toDataURL("image/jpeg");
    const imageData = await fetch(dataUrl).then(res => res.arrayBuffer());
    zip.file(`${baseName}_${i + 1}.jpg`, imageData);
  }

  return await zip.generateAsync({ type: "blob" });
}