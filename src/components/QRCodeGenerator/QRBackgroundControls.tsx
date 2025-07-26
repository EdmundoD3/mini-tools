// src/components/QRControls/QRBackgroundControls.tsx
import { useState, useEffect } from 'preact/hooks';
import type { Options, Gradient } from 'qr-code-styling';
import { type TQRControls } from './QRGeneratorUtils';


export function QRBackgroundControls({ options, setOptions }: TQRControls) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [gradient, setGradient] = useState<Gradient>({
    type: 'linear',
    rotation: 0,
    colorStops: [
      { offset: 0, color: '#ffffff' },
      { offset: 1, color: '#f0f0f0' }
    ]
  });

  useEffect(() => {
    if (options.backgroundOptions?.gradient) {
      setGradient(options.backgroundOptions.gradient);
    }
  }, [options.backgroundOptions?.gradient]);

  const updateBackground = (changes: Partial<Options['backgroundOptions']>) => {
    setOptions({
      ...options,
      backgroundOptions: {
        ...options.backgroundOptions,
        ...changes
      }
    });
  };

  const handleColorChange = (e: Event) => {
    updateBackground({
      color: (e.target as HTMLInputElement).value,
      gradient: undefined,
      round: undefined
    });
  };

  const handleTransparentToggle = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    updateBackground({
      color: checked ? 'transparent' : '#ffffff',
      gradient: undefined,
      round: undefined,
    });
  };

  const handleGradientColorChange = (index: number, color: string) => {
    const newGradient = {
      ...gradient,
      colorStops: gradient.colorStops.map((stop, i) =>
        i === index ? { ...stop, color } : stop
      )
    };
    setGradient(newGradient);
    updateBackground({
      gradient: newGradient,
      color: undefined,
      round: undefined,
    });
  };

  return (
    <div className="qr-section">
      <h3>Fondo del QR</h3>

      <div className="background-controls">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={options.backgroundOptions?.color === 'transparent'}
            onChange={handleTransparentToggle}
          />
          Transparente
        </label>

        {options.backgroundOptions?.color !== 'transparent' && (
          <div className="color-picker-container">
            <input
              type="color"
              value={options.backgroundOptions?.color || '#ffffff'}
              onChange={handleColorChange}
              className="color-picker"
            />
            <span>Color sólido</span>
          </div>
        )}

        <button
          className="toggle-advanced-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '▲ Ocultar avanzado' : '▼ Mostrar avanzado'}
        </button>

        {showAdvanced && (
          <div className="advanced-background-options">
            {/* Gradiente */}
            <div className="gradient-control">
              <h4>Degradado</h4>
              <div className="gradient-stops">
                {gradient.colorStops.map((stop, index) => (
                  <div key={index} className="gradient-stop">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => handleGradientColorChange(index, (e.target as HTMLInputElement)?.value)}
                    />
                    <span>{Math.round(stop.offset * 100)}%</span>
                  </div>
                ))}
              </div>
              <div className="rotation-control">
                <label>
                  Rotación: {Math.round((gradient.rotation ?? 0) * (180 / Math.PI))}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={(gradient.rotation ?? 0) * (180 / Math.PI)}
                  onInput={(e) => {
                    const degrees = parseFloat((e.target as HTMLInputElement).value);
                    const radians = degrees * (Math.PI / 180);
                    const newGradient = {
                      ...gradient,
                      rotation: radians
                    };
                    setGradient(newGradient);
                    updateBackground({
                      gradient: newGradient,
                      color: undefined,
                      round: undefined
                    });
                  }}
                />
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// function QRBackgroundControls({ options, setOptions }: {
//   options: Options;
//   setOptions: Dispatch<StateUpdater<Options>>;
// }) {
//   const handleBackgroundColorChange = (e: Event) => {
//     const color = (e.target as HTMLInputElement).value;
//     setOptions({
//       ...options,
//       backgroundOptions: {
//         ...options.backgroundOptions,
//         color: color || '#ffffff' // Default to white if empty
//       }
//     });
//   };

//   const handleTransparentToggle = (e: Event) => {
//     const isTransparent = (e.target as HTMLInputElement).checked;
//     setOptions({
//       ...options,
//       backgroundOptions: {
//         ...options.backgroundOptions,
//         color: isTransparent ? 'transparent' : '#ffffff'
//       }
//     });
//   };

//   return (
//     <div className="qr-section">
//       <h3>Fondo del QR</h3>

//       <div className="background-controls">
//         <label className="toggle-switch">
//           <input
//             type="checkbox"
//             checked={options.backgroundOptions?.color === 'transparent'}
//             onChange={handleTransparentToggle}
//           />
//           Fondo transparente
//         </label>

//         {options.backgroundOptions?.color !== 'transparent' && (
//           <div className="color-picker-container">
//             <input
//               type="color"
//               value={options.backgroundOptions?.color || '#ffffff'}
//               onChange={handleBackgroundColorChange}
//               className="color-picker"
//             />
//             <input
//               type="text"
//               value={options.backgroundOptions?.color || '#ffffff'}
//               onChange={handleBackgroundColorChange}
//               placeholder="#FFFFFF"
//               className="color-text-input"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }