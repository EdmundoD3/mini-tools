// src/components/ConversionStatus.tsx
import type { JSX } from "preact/jsx-runtime";

type Props = {
  isProcessing: boolean;
  error: string | null;
};

export function ConversionStatus({ isProcessing, error }: Props): JSX.Element {
  return (
    <div class="">
      {isProcessing && <p class="">Procesando video...</p>}
      {error && <p class="">Error: {error}</p>}
    </div>
  );
}
