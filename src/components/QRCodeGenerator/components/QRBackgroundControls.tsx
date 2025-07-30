// src/components/QRControls/QRBackgroundControls.tsx
import type { GradientType, Options } from 'qr-code-styling';
import { defaultGradient, toRadians, type TQRControls } from '../QRGeneratorUtils';
import { useTranslation } from '../../../context/LanguageContext';
import { QRModeSelector, type TMode } from './QRModeSelector';
import { QRGradientControls } from './QRGradientControls';
import { QRSolidColorSelector } from './QRSolidColorSelector';

export function QRBackgroundControls({ options, setOptions }: TQRControls) {
  const { t } = useTranslation();

  // Deriva el modo directamente de las props para evitar desincronización
  const mode: TMode = (() => {
    if (options.backgroundOptions?.gradient) {
      return 'gradient';
    }
    if (options.backgroundOptions?.color === 'transparent') {
      return 'transparent';
    }
    return 'solid';
  })();

  const updateBackground = (changes: Partial<Options['backgroundOptions']>) => {
    setOptions({
      ...options,
      backgroundOptions: {
        ...options.backgroundOptions,
        ...changes
      }
    });
  };

  const handleModeChange = (newMode: TMode) => {
    switch (newMode) {
      case 'solid':
        updateBackground({ color: '#ffffff', gradient: undefined });
        break;
      case 'transparent':
        updateBackground({ color: 'transparent', gradient: undefined });
        break;
      case 'gradient':
        updateBackground({ color: undefined, gradient: options.backgroundOptions?.gradient || defaultGradient });
        break;
    }
  };

  const handleSolidColorChange = (color: string) => {
    updateBackground({ color: color });
  };

  const handleGradientColorChange = (index: number, color: string) => {
    const currentGradient = options.backgroundOptions?.gradient || defaultGradient;
    const newGradient = {
      ...currentGradient,
      colorStops: currentGradient.colorStops.map((stop, i) =>
        i === index ? { ...stop, color } : stop
      )
    };
    updateBackground({ gradient: newGradient });
  };

  const handleGradientTypeChange = (type: GradientType) => {
    const currentGradient = options.backgroundOptions?.gradient || defaultGradient;
    updateBackground({ gradient: { ...currentGradient, type } });
  };


  const handleRotationChange = (e: Event) => {
    const degrees = parseFloat((e.target as HTMLInputElement).value);
    const radians = toRadians(degrees);
    const currentGradient = options.backgroundOptions?.gradient || defaultGradient;
    updateBackground({ gradient: { ...currentGradient, rotation: radians } });
  };

  return (
    <div className="qr-section tool-panel">
      <h3>{t('background_title')}</h3>

      <div className="background-controls">
        <QRModeSelector
          mode={mode}
          handleModeChange={handleModeChange}
          modes={['solid', 'transparent', 'gradient']}
        />

        {mode === 'solid' && (
          <QRSolidColorSelector
            currentColor={options.backgroundOptions?.color??"#ffffff"}
            handleSolidColorChange={handleSolidColorChange}
          />

        )}

        {mode === 'transparent' && (
          <p>{t('transparent_bg_active')}</p>
        )}

        {mode === 'gradient' && (<QRGradientControls
          name="background-gradient-type"
          currentGradient={options.backgroundOptions?.gradient || defaultGradient}
          handleGradientColorChange={handleGradientColorChange}
          handleGradientTypeChange={handleGradientTypeChange}
          handleRotationChange={handleRotationChange}
        />
        )}
      </div>
    </div>
  );
}