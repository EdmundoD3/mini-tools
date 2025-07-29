// src/components/ConversionOptions.tsx

import type { JSX } from "preact/jsx-runtime";

type Props = {
  onConvert: (format: "pdf" | "gif" | "zip") => void;
  disabled?: boolean;
};

export function ConversionOptions({ onConvert, disabled }: Props): JSX.Element {
  return (
    <div class="flex gap-2 mt-4">
      <button
        disabled={disabled}
        onClick={() => onConvert("pdf")}
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Convertir a PDF
      </button>
      <button
        disabled={disabled}
        onClick={() => onConvert("gif")}
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Convertir a GIF
      </button>
      <button
        disabled={disabled}
        onClick={() => onConvert("zip")}
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Convertir a ZIP
      </button>
    </div>
  );
}
