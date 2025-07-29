import { colorPresets } from "../QRGeneratorUtils";

type TQRColorPickerSelectorProps = { currentColor: string; handleSolidColorChange: (color: string) => void };

export function QRSolidColorSelector({ currentColor, handleSolidColorChange }: TQRColorPickerSelectorProps) {
    return <div className="color-grid">
        <input
            type="color"
            value={currentColor ?? "#000000"}
            onChange={(e) => handleSolidColorChange(e.currentTarget.value)}
            className="color-picker"
        />
        {colorPresets.map((color) => (
            <button
                key={color}
                className="color-button"
                style={{ background: color }}
                onClick={() => handleSolidColorChange(color)}
                aria-label={color}
                title={color}
            />
        ))}
    </div>
}