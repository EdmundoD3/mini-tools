import { useState } from "preact/hooks";
import { colorPresets, defaultGradient, toDegrees, toRadians, type TQRControls } from "./QRGeneratorUtils";
import type { Gradient } from "qr-code-styling";

export default function QRColorGenerator({options,setOptions}:TQRControls){
    const [customGradient, setCustomGradient] = useState<Gradient>(defaultGradient);
  const [useGradient, setUseGradient] = useState(false);
      const handleSolidColorChange = (color: string) => {
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, color, gradient: undefined },
    });
  };
  const handleGradientColorChange = (index: number, color: string) => {
    const updatedColorStops = [...customGradient.colorStops];
    updatedColorStops[index].color = color;

    const newGradient = { ...customGradient, colorStops: updatedColorStops };
    setCustomGradient(newGradient);
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: newGradient, color: undefined }
    });
  };

  const handleGradientTypeChange = (type: 'linear' | 'radial') => {
    const newGradient = { ...customGradient, type };
    setCustomGradient(newGradient);
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: newGradient }
    });
  };

  const handleRotationChange = (e: Event) => {
    const rotation = toRadians(Number((e.target as HTMLInputElement).value)) ;
    const newGradient = { ...customGradient, rotation };
    setCustomGradient(newGradient);
    setOptions({
      ...options,
      dotsOptions: { ...options.dotsOptions, gradient: newGradient }
    });
  };
    return <div className="qr-section">
      <h3>Color</h3>
      <div className="color-picker-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={useGradient}
            onChange={() => setUseGradient(!useGradient)}
          />
          Usar degradado
        </label>
        {!useGradient && <input
          type="color"
          value={options.dotsOptions?.color ?? "#000000ff"}
          onChange={(e) => handleSolidColorChange((e.target  as HTMLInputElement)?.value ?? "#000000ff")}
          className="color-picker color-picker-solid"
        />
        }
      </div>

      {useGradient ? (
        <div>
          <div className="gradient-controls">
            {customGradient.colorStops.map((stop, index) => (
              <div key={index} className="gradient-color-picker">
                <label>Color {index + 1}</label>
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleGradientColorChange(index, (e.target  as HTMLInputElement)?.value)}
                  className="color-picker"
                />
              </div>
            ))}
          </div>

          <div className="gradient-type-selector">
            <label>
              <input
                type="radio"
                checked={customGradient.type === 'linear'}
                onChange={() => handleGradientTypeChange('linear')}
              />
              Lineal
            </label>
            <label>
              <input
                type="radio"
                checked={customGradient.type === 'radial'}
                onChange={() => handleGradientTypeChange('radial')}
              />
              Radial
            </label>
          </div>

          {customGradient.type === 'linear' && (
            <div className="rotation-control">
              <label>Rotación: {toDegrees(customGradient.rotation??0)}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={toDegrees(customGradient.rotation??0)}
                onInput={handleRotationChange}
              />
            </div>
          )}

          <div
            className="full-gradient-preview"
            style={{
              background: customGradient.type === 'linear'
                ? `linear-gradient(${customGradient.rotation}deg, ${customGradient.colorStops[0].color}, ${customGradient.colorStops[1].color})`
                : `radial-gradient(${customGradient.colorStops[0].color}, ${customGradient.colorStops[1].color})`
            }}
          />
        </div>
      ) : (
        <>
          <div className="color-grid">
            {colorPresets.map((color) => (
              <button
                key={color}
                className="color-button"
                style={{ background: color }}
                onClick={() => handleSolidColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </>

      )}
    </div>
}