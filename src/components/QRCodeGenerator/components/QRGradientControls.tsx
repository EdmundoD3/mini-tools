import type { Gradient, GradientType } from "qr-code-styling";
import { useTranslation } from "../../../context/LanguageContext";
import { toDegrees } from "../QRGeneratorUtils";
import type { h } from "preact";

type QRGradientControlsProps = {
    name: string;
    currentGradient: Gradient;
    handleGradientColorChange: (index: number, color: string) => void
    handleRotationChange: (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => void;
    handleGradientTypeChange?: (type: GradientType) => void;
}

export function QRGradientControls({
    name,
    currentGradient,
    handleGradientColorChange,
    handleRotationChange,
    handleGradientTypeChange,
}: QRGradientControlsProps) {
    const { t } = useTranslation();

    return <div>
        <div className="gradient-controls">
            {currentGradient.colorStops.map((stop, index) => (
                <div key={index} className="gradient-color-picker">
                    <label>{t('color_n', index + 1)}</label>
                    <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => handleGradientColorChange(index, e.currentTarget.value)}
                        className="color-picker"
                    />
                </div>
            ))}
        </div>

        {handleGradientTypeChange &&
            <div className="gradient-type-selector">
                <label>
                    <input
                        type="radio"
                        name={name}
                        checked={currentGradient.type === 'linear'}
                        onChange={() => handleGradientTypeChange('linear')}
                    />
                    {t('linear')}
                </label>
                <label>
                    <input
                        type="radio"
                        name={name}
                        checked={currentGradient.type === 'radial'}
                        onChange={() => handleGradientTypeChange('radial')}
                    />
                    {t('radial')}
                </label>
            </div>
        }
        {currentGradient.type === 'linear' &&
            <div className="rotation-control">
                <label>{t('rotation_label', toDegrees(currentGradient.rotation ?? 0))}</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={toDegrees(currentGradient.rotation ?? 0)}
                    onInput={handleRotationChange}
                />
            </div>
        }


        {/* 
        <div
            className="full-gradient-preview"
            style={{
                background: currentGradient.type === 'linear'
                    ? `linear-gradient(${toDegrees(currentGradient.rotation ?? 0)}deg, ${currentGradient.colorStops[0].color}, ${currentGradient.colorStops[1].color})`
                    : `radial-gradient(${currentGradient.colorStops[0].color}, ${currentGradient.colorStops[1].color})`
            }}
        /> */}
    </div>
}
