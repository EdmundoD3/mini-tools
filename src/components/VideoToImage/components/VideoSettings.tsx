import { useTranslation } from "../../../context/LanguageContext";
import type { VideoProcessorSettings } from "../hooks/useVideoProcessor";
export type VideoSettings = {
    duration: number;
    settings: VideoProcessorSettings;
    onChange: (newSettings: VideoProcessorSettings) => void;
    onPreviewTimeChange: (time: number) => void;
  };
export function VideoSettings({ duration, settings, onChange, onPreviewTimeChange }: VideoSettings) {
  const { t } = useTranslation();

  const handleSettingChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    let newSettings: VideoProcessorSettings = { ...settings, [name]: Number(value) };

    // Lógica para que los sliders no se crucen
    if (name === 'startTime' && newSettings.startTime > newSettings.endTime) {
      newSettings.endTime = newSettings.startTime;
    }
    if (name === 'endTime' && newSettings.endTime < newSettings.startTime) {
      newSettings.startTime = newSettings.endTime;
    }

    onChange(newSettings);

    // ¡Aquí está la magia!
    // Actualiza la previsualización al mover los sliders de inicio y fin.
    if (name === 'startTime' || name === 'endTime') {
      onPreviewTimeChange(Number(value));
    }
  };

  const formatTime = (time: number) => new Date(time * 1000).toISOString().slice(14, 19);

  return (
    <div class="video-settings-container">
      <h3 class="text-lg font-semibold mb-2">{t('video.settings.title')}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tiempo de Inicio */}
        <div class="setting-item">
          <label for="startTime">{t('video.settings.start_time')}: {formatTime(settings.startTime)}</label>
          <input
            type="range"
            id="startTime"
            name="startTime"
            min="0"
            max={settings.endTime}
            step="0.1"
            value={settings.startTime}
            onInput={handleSettingChange}
          />
        </div>

        {/* Tiempo de Fin */}
        <div class="setting-item">
          <label for="endTime">{t('video.settings.end_time')}: {formatTime(settings.endTime)}</label>
          <input
            type="range"
            id="endTime"
            name="endTime"
            min={settings.startTime}
            max={duration}
            step="0.1"
            value={settings.endTime}
            onInput={handleSettingChange}
          />
        </div>

        {/* Intervalo de Captura */}
        <div class="setting-item">
          <label for="captureInterval">{t('video.settings.interval')}: {settings.captureInterval}s</label>
          <input type="number" id="captureInterval" name="captureInterval" value={settings.captureInterval} onInput={handleSettingChange} min="0.1" step="0.1" />
        </div>

        {/* Retardo del GIF */}
        <div class="setting-item">
          <label for="gifDelay">{t('video.settings.gif_delay')}: {settings.gifDelay}ms</label>
          <input type="number" id="gifDelay" name="gifDelay" value={settings.gifDelay} onInput={handleSettingChange} min="10" step="10" />
        </div>

      </div>
    </div>
  );
}
