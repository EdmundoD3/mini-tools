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


// import { useState } from "preact/hooks";
// import { colorPresets, defaultGradient, toDegrees, toRadians, type TQRControls } from "./QRGeneratorUtils";
// import type { Gradient } from "qr-code-styling";
// import { useTranslation } from "../../context/LanguageContext";

// export default function QRColorGenerator({options,setOptions}:TQRControls){
//     const { t } = useTranslation();
//     const [customGradient, setCustomGradient] = useState<Gradient>(defaultGradient);
//   const [useGradient, setUseGradient] = useState(false);
//       const handleSolidColorChange = (color: string) => {
//     setOptions({
//       ...options,
//       dotsOptions: { ...options.dotsOptions, color, gradient: undefined },
//     });
//   };
//   const handleGradientColorChange = (index: number, color: string) => {
//     const updatedColorStops = [...customGradient.colorStops];
//     updatedColorStops[index].color = color;

//     const newGradient = { ...customGradient, colorStops: updatedColorStops };
//     setCustomGradient(newGradient);
//     setOptions({
//       ...options,
//       dotsOptions: { ...options.dotsOptions, gradient: newGradient, color: undefined }
//     });
//   };

//   const handleGradientTypeChange = (type: 'linear' | 'radial') => {
//     const newGradient = { ...customGradient, type };
//     setCustomGradient(newGradient);
//     setOptions({
//       ...options,
//       dotsOptions: { ...options.dotsOptions, gradient: newGradient }
//     });
//   };

//   const handleRotationChange = (e: Event) => {
//     const rotation = toRadians(Number((e.target as HTMLInputElement).value)) ;
//     const newGradient = { ...customGradient, rotation };
//     setCustomGradient(newGradient);
//     setOptions({
//       ...options,
//       dotsOptions: { ...options.dotsOptions, gradient: newGradient }
//     });
//   };
//     return <div className="qr-section" >
//       <h3>{t('color_title')}</h3>
//       <div className="color-picker-container">
//         <label className="toggle-switch">
//           <input
//             type="checkbox"
//             checked={useGradient}
//             onChange={() => setUseGradient(!useGradient)}
//           />
//           {t('use_gradient')}
//         </label>
//         {!useGradient && <input
//           type="color"
//           value={options.dotsOptions?.color ?? "#000000ff"}
//           onChange={(e) => handleSolidColorChange((e.target  as HTMLInputElement)?.value ?? "#000000ff")}
//           className="color-picker color-picker-solid"
//         />
//         }
//       </div>

//       {useGradient ? (
//         <div>
//           <div className="gradient-controls">
//             {customGradient.colorStops.map((stop, index) => (
//               <div key={index} className="gradient-color-picker">
//                 <label>{t('color_n', index + 1)}</label>
//                 <input
//                   type="color"
//                   value={stop.color}
//                   onChange={(e) => handleGradientColorChange(index, (e.target  as HTMLInputElement)?.value)}
//                   className="color-picker"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="gradient-type-selector">
//             <label>
//               <input
//                 type="radio"
//                 checked={customGradient.type === 'linear'}
//                 onChange={() => handleGradientTypeChange('linear')}
//               />
//               Lineal
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 checked={customGradient.type === 'radial'}
//                 onChange={() => handleGradientTypeChange('radial')}
//               />
//               Radial
//             </label>
//           </div>

//           {customGradient.type === 'linear' && (
//             <div className="rotation-control">
//               <label>Rotación: {toDegrees(customGradient.rotation??0)}°</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="360"
//                 value={toDegrees(customGradient.rotation??0)}
//                 onInput={handleRotationChange}
//               />
//             </div>
//           )}

//           <div
//             className="full-gradient-preview"
//             style={{
//               background: customGradient.type === 'linear'
//                 ? `linear-gradient(${customGradient.rotation}deg, ${customGradient.colorStops[0].color}, ${customGradient.colorStops[1].color})`
//                 : `radial-gradient(${customGradient.colorStops[0].color}, ${customGradient.colorStops[1].color})`
//             }}
//           />
//         </div>
//       ) : (
//         <>
//           <div className="color-grid">
//             {colorPresets.map((color) => (
//               <button
//                 key={color}
//                 className="color-button"
//                 style={{ background: color }}
//                 onClick={() => handleSolidColorChange(color)}
//                 title={color}
//               />
//             ))}
//           </div>
//         </>

//       )}
//     </div>
// }