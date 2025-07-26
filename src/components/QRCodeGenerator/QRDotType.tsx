import type { DotType } from "qr-code-styling";
import { dotTypes, type TQRControls } from "./QRGeneratorUtils";

export default function QRDotType({options,setOptions}:TQRControls) {
    const handleDotTypeChange = (type: DotType) => {
    setOptions({ ...options, dotsOptions: { ...options.dotsOptions, type } });
  };
    return <div className="qr-section">
      <h3>Estilo de puntos</h3>
      <div className="qr-button-group">
        {dotTypes.map((dot) => (
          <button
            key={dot.value}
            onClick={() => handleDotTypeChange(dot.value)}
            className={`dot-button ${options.dotsOptions?.type === dot.value ? 'active' : ''}`}
          >
            {dot.icon} {dot.label}
          </button>
        ))}
      </div>
    </div>
}