import { useEffect, useRef, useState } from 'preact/hooks';
import QRCodeStyling, { type Options } from 'qr-code-styling';
import './QRCodeStyles.css';
import { defaultOptions, type TQRControls } from './QRGeneratorUtils';
import { QRBackgroundControls } from './components/QRBackgroundControls';
import { QRImageControls } from './components/QRImageControls';
import { QRDownloadControls } from './components/QRDownloadControls';
import { AdBanner } from '../../ads/AdBanner';
import { useTranslation } from '../../context/LanguageContext';
import QRDotsControls from './components/QRDotsControls';

export const QRCodeGenerator = () => {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const qrRef = useRef<HTMLDivElement>(null);
  // Usamos un ref para mantener la instancia de QRCodeStyling a través de los renders.
  // Se inicializa solo una vez en el primer render.
  const qrCode = useRef<QRCodeStyling | null>(null);

  // Actualizar QR
  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(options);
      qrCode.current.append(qrRef.current!);
    } else {
      qrCode.current.update(options);
    }
  }, [options]);

  return (
      <div className="qr-generator-container">
        <div className="qr-container">
          {/* Previsualización */}
          <div className="qr-preview-container">
            <div ref={qrRef} className="qr-preview" />
            {/* Pasamos la instancia del QR para la descarga */}
            {qrCode.current && <QRDownloadControls qrCode={qrCode.current} qrData={options.data || ''} />}
            {/* Aquí colocamos nuestro banner de publicidad para mayor visibilidad */}
            <AdBanner />
          </div>
          <QRGeneratorOptions
            options={options}
            setOptions={setOptions}
          />
        </div>
      </div>
  );
};

function QRGeneratorOptions({ options, setOptions }: TQRControls) {
  const { t } = useTranslation();
  // Manejadores
  const handleDataChange = (e: Event) => {
    setOptions({ ...options, data: (e.target as HTMLInputElement).value });
  };

  return <div className="qr-options-container">
    {/* Sección de contenido */}
    <div className="qr-section">
      <label htmlFor={"qr-url"}>{t('content_label')}{" "}</label>
      <input
        id="qr-url"
        type="text"
        value={options.data}
        onInput={handleDataChange}
        className="qr-input"
        placeholder={t('content_placeholder')}
      />
    </div>

    {/* Selector de imagen */}
    <QRImageControls options={options} setOptions={setOptions} />

    {/* Tipo de puntos */}
    <QRDotsControls options={options} setOptions={setOptions} />
    {/* Nuevo control de fondo */}
    <QRBackgroundControls options={options} setOptions={setOptions} />

  </div>
}
