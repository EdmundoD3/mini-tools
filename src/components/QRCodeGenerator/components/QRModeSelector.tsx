import { useTranslation } from "../../../context/LanguageContext";

export type TMode = 'solid' | 'transparent' | 'gradient';

// Mapeo de modos a sus claves de traducción para mantener el componente limpio
const modeLabels: Record<TMode, string> = {
    solid: 'solid_color_bg',
    transparent: 'transparent_bg',
    gradient: 'gradient_title'
};

const defaultModes: TMode[] = ['solid', 'transparent', 'gradient'];

type QRModeSelectorProps = {
    mode: TMode;
    handleModeChange: (mode: TMode) => void;
    // Prop opcional para especificar los modos a mostrar
    modes?: TMode[];
}

export function QRModeSelector({ mode, handleModeChange, modes = defaultModes }: QRModeSelectorProps) {
    const { t } = useTranslation();

    return (
        <div className="qr-button-group">
            {modes.map((currentMode) => (
                <button key={currentMode} onClick={() => handleModeChange(currentMode)} className={`dot-button ${mode === currentMode ? 'active' : ''}`} >
                    {t(modeLabels[currentMode] as any)}
                </button>
            ))}
        </div>
    );
}