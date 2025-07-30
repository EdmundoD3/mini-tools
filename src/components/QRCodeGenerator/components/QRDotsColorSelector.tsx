import type { h } from "preact";
import { colorPresets, defaultGradient, toRadians, type TQRControls } from "../QRGeneratorUtils";
import { useTranslation } from "../../../context/LanguageContext";
import { QRGradientControls } from "./QRGradientControls";
import type { GradientType } from "qr-code-styling";
import { QRModeSelector, type TMode } from "./QRModeSelector";
import { QRSolidColorSelector } from "./QRSolidColorSelector";

export default function QRDotsColorSelector({ options, setOptions }: TQRControls) {
  const { t } = useTranslation();

  // Derivar el estado directamente de las props para evitar desincronización
  const mode: TMode = options.dotsOptions?.gradient ? 'gradient' : 'solid';
  const currentGradient = options.dotsOptions?.gradient ?? defaultGradient;

  const handleModeChange = (newMode: TMode) => {
    if (newMode === 'gradient') {
      // Al activar, usamos el degradado por defecto y quitamos el color sólido
      setOptions({
        ...options,
        dotsOptions: { ...options.dotsOptions, gradient: defaultGradient, color: undefined },
      });
    } else {
      // Al seleccionar sólido, volvemos a un color por defecto y quitamos el degradado
      setOptions({
        ...options,
        dotsOptions: { ...options.dotsOptions, color: colorPresets[0], gradient: undefined },
      });
    }
  };

  const handleSolidColorChange = (color: string) => {
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, color, gradient: undefined },
    });
  };

  const handleGradientColorChange = (index: number, color: string) => {
    const updatedColorStops = [...currentGradient.colorStops];
    updatedColorStops[index] = { ...updatedColorStops[index], color };
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: { ...currentGradient, colorStops: updatedColorStops } },
    });
  };

  const handleGradientTypeChange = (type: GradientType) => {
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: { ...currentGradient, type } },
    });
  };

  const handleRotationChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const rotation = toRadians(Number(e.currentTarget.value));
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: { ...currentGradient, rotation } },
    });
  };

  return (
    <>
      <h3>{t('color_title')}</h3>
      <div className="color-picker-container">
        <QRModeSelector
          mode={mode}
          handleModeChange={handleModeChange}
          modes={['solid', 'gradient']}
        />

      </div>

      {mode === 'gradient' ? (
        <QRGradientControls
        name="dots-gradient-type"
          currentGradient={currentGradient}
          handleGradientColorChange={handleGradientColorChange}
          handleGradientTypeChange={handleGradientTypeChange}
          handleRotationChange={handleRotationChange}
        />
      ) : (
        <QRSolidColorSelector
          currentColor={options.dotsOptions?.color ?? colorPresets[0]}
          handleSolidColorChange={handleSolidColorChange}
        />
      )}
    </>
  );
}