// 📄 generatePDF.ts
// ----------------------

export async function generatePDF(frames: HTMLCanvasElement[]): Promise<Blob> {
  const pdf = await import("pdf-lib");
  const { PDFDocument } = pdf;
  const doc = await PDFDocument.create();

  for (let i = 0; i < frames.length; i++) {
    const canvas = frames[i];
    const imgData = canvas.toDataURL("image/jpeg");
    const imgBytes = await fetch(imgData).then(res => res.arrayBuffer());
    const img = await doc.embedJpg(imgBytes);
    const page = doc.addPage([canvas.width, canvas.height]);
    page.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
  }

  const pdfBytes = await doc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
