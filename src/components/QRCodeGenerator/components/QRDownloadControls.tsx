// src/components/QRCodeGenerator/QRDownloadControls.tsx
import { useState } from 'preact/hooks';
import type QRCodeStyling from 'qr-code-styling';
import { useTranslation } from '../../../context/LanguageContext';

interface TDownloadControls {
  qrCode: QRCodeStyling;
  qrData: string;
}

export function QRDownloadControls({ qrCode, qrData }: TDownloadControls) {
  const { t } = useTranslation();
  const [fileType, setFileType] = useState<'png' | 'jpeg' | 'webp' | 'svg'>('png');

  const handleDownload = () => {
    qrCode.download({
      name: 'codigo-qr',
      extension: fileType
    });
  };

  const handleFormatChange = (e: Event) => {
    setFileType((e.target as HTMLSelectElement).value as typeof fileType);
  };

  return (
    <div class="qr-download-controls">
      <div class="download-options">
        <select value={fileType} onChange={handleFormatChange} className="qr-format-selector">
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
          <option value="svg">SVG</option>
        </select>
        <button
          onClick={handleDownload}
          className="qr-input qr-download-button"
          disabled={!qrData}
          title={!qrData ? "Ingresa texto o URL para descargar" : "Descargar Código QR"}
        >
          {t('download_qr')}
        </button>
      </div>
    </div>
  );
}