// src/components/FormatSelector.tsx
export type FormatType = "gif" | "pdf" | "zip";

type Props = {
  selectedFormat: FormatType;
  onChange: (format: FormatType) => void;
};

export function FormatSelector({ selectedFormat, onChange }: Props) {
  return (
    <div class="flex gap-4 items-center">
      <label>Formato:</label>
      <select
        value={selectedFormat}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value as FormatType)}
        class="border rounded px-2 py-1"
      >
        <option value="gif">GIF</option>
        <option value="pdf">PDF</option>
        <option value="zip">ZIP</option>
      </select>
    </div>
  );
}