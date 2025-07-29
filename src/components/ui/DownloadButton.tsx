// src/ui/DownloadButton.tsx
type Props = {
  blob: Blob;
  filename: string;
  mimeType: string;
};

export function DownloadButton({ blob, filename, mimeType }: Props) {
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
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={handleDownload}
    >
      Descargar {mimeType.split("/")[1].toUpperCase()}
    </button>
  );
}