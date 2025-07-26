import { useEffect, useRef, useState } from 'preact/hooks';
import QRCodeStyling, { type Options } from 'qr-code-styling';
import './QRCodeStyles.css';
import { defaultOptions, type TQRControls } from './QRGeneratorUtils';
import { QRBackgroundControls } from './QRBackgroundControls';
import { QRImageControls } from './QRImageControls';
import QRDotType from './QRDotType';
import QRColorGenerator from './QRColorSelector';

export const QRCodeGenerator = () => {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef(new QRCodeStyling(options));

  // Actualizar QR
  useEffect(() => {
    qrCode.current.update(options);
    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, [options]);

  return (
    <div className="qr-generator-container">
      {/* <h2 className="qr-title">Generador de QR</h2> */}
      <div className="qr-container">
        {/* Previsualización */}
        <div className="qr-preview-container">
          <div ref={qrRef} className="qr-preview" />
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
  // Manejadores
  const handleDataChange = (e: Event) => {
    setOptions({ ...options, data: (e.target as HTMLInputElement).value });
  };

  return <div className="qr-options-container">
    {/* Sección de contenido */}
    <div className="qr-section">
      <label htmlFor={"qr-url"}>URL o texto:{" "}</label>
      <input
        id="qr-url"
        type="text"
        value={options.data}
        onInput={handleDataChange}
        className="qr-input"
        placeholder="Ingresa URL o texto"
      />
    </div>

    {/* Selector de imagen */}
    <QRImageControls options={options} setOptions={setOptions} />
    
    {/* Tipo de puntos */}
    <QRDotType options={options} setOptions={setOptions} />
    {/* Nuevo control de fondo */}
    <QRBackgroundControls options={options} setOptions={setOptions} />
    {/* Selector de color */}
    <QRColorGenerator options={options} setOptions={setOptions} />
  </div>
}



