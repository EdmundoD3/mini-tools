// src/ui/DownloadButton.tsx
type DownloadButtonProps = {
  blob: Blob;
  filename: string;
  mimeType: string;
};

export function DownloadButton({ blob, filename, mimeType }: DownloadButtonProps) {
  const handleDownload = () => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      class=""
      onClick={handleDownload}
    >
      Descargar {mimeType.split("/")[1].toUpperCase()}
    </button>
  );
}