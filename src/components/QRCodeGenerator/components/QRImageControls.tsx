import type { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useTranslation } from '../../../context/LanguageContext';
import type { TQRControls } from "../QRGeneratorUtils";

export function QRImageControls({ options, setOptions }: TQRControls) {
  const { t } = useTranslation();
  // Referencia al input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = e.currentTarget.files?.[0];
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

  const handleSizeChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const size = parseFloat(e.currentTarget.value);
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        imageSize: size / 100,
      }
    });
  };

  const handleMarginChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const margin = parseInt(e.currentTarget.value);
    setOptions({
      ...options,
      imageOptions: {
        ...options.imageOptions,
        margin: margin,
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="qr-section">
      <h3>{t('image_title')}</h3>

      <div className="image-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }} // Ocultamos el input real
          aria-hidden="true"
        />

        {options.image ? (
          <div className="image-options">
            <div className="slider-control">
              <label>{t('image_size_label', Math.round((options.imageOptions?.imageSize || 0.2) * 100))}</label>
              <input
                type="range"
                min="10"
                max="40"
                value={(options.imageOptions?.imageSize || 0.2) * 100}
                onInput={handleSizeChange}
              />
            </div>

            <div className="slider-control">
              <label>{t('image_margin_label', options.imageOptions?.margin || 0)}</label>
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
              {t('remove_image')}
            </button>
          </div>
        ) : (
          <button onClick={handleUploadClick} className="upload-image-button">
            {t('upload_image')}
          </button>
        )}
      </div>
    </div>
  );
}