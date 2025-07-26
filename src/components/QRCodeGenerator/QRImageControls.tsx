import { useRef } from 'preact/hooks';
import type { TQRControls } from "./QRGeneratorUtils";

export function QRImageControls({ options, setOptions }: TQRControls) {
  // Referencia al input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result as string;
      setOptions({
        ...options,
        image: dataURL,
        imageOptions: {
          ...options.imageOptions,
          imageSize: 0.2 // Tamaño por defecto (20% del QR)
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSizeChange = (e: Event) => {
    const size = parseFloat((e.target as HTMLInputElement).value);
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        imageSize: size / 100
      }
    });
  };

  const handleMarginChange = (e: Event) => {
    const margin = parseInt((e.target as HTMLInputElement).value);
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        margin: margin
      }
    });
  };

  const handleRemoveImage = () => {
    setOptions({
      ...options,
      image: undefined
    });
    
    // Limpiar el input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="qr-section">
      <h3>Logo (opcional)</h3>

      <div className="image-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="qr-file-input"
        />

        {options.image && (
          <>
            <div className="slider-control">
              <label>Tamaño: {Math.round((options.imageOptions?.imageSize || 0.2) * 100)}%</label>
              <input
                type="range"
                min="10"
                max="40"
                value={(options.imageOptions?.imageSize || 0.2) * 100}
                onInput={handleSizeChange}
              />
            </div>

            <div className="slider-control">
              <label>Margen: {options.imageOptions?.margin || 0}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={options.imageOptions?.margin || 0}
                onInput={handleMarginChange}
              />
            </div>

            <button
              onClick={handleRemoveImage}
              className="remove-image-button"
            >
              Eliminar logo
            </button>
          </>
        )}
      </div>
    </div>
  );
}