// src/components/ConversionStatus.tsx
import type { JSX } from "preact/jsx-runtime";

type Props = {
  isProcessing: boolean;
  error: string | null;
};

export function ConversionStatus({ isProcessing, error }: Props): JSX.Element {
  return (
    <div class="mt-4">
      {isProcessing && <p class="text-yellow-600">Procesando video...</p>}
      {error && <p class="text-red-600">Error: {error}</p>}
    </div>
  );
}
