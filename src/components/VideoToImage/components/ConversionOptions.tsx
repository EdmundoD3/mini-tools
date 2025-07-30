// src/components/ConversionOptions.tsx

import type { JSX } from "preact/jsx-runtime";

type Props = {
  onConvert: (format: "pdf" | "gif" | "zip") => void;
  disabled?: boolean;
};

export function ConversionOptions({ onConvert, disabled }: Props): JSX.Element {
  return (
    <div class="">
      <button
        disabled={disabled}
        onClick={() => onConvert("pdf")}
        class=""
      >
        Convertir a PDF
      </button>
      <button
        disabled={disabled}
        onClick={() => onConvert("gif")}
        class=""
      >
        Convertir a GIF
      </button>
      <button
        disabled={disabled}
        onClick={() => onConvert("zip")}
        class=""
      >
        Convertir a ZIP
      </button>
    </div>
  );
}
