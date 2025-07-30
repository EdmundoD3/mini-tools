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

  return (
    <div class="video-settings-container">
      <h3 class="text-lg font-semibold mb-2">{t('video.settings.title')}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tiempo de Inicio */}
        <div class="setting-item col-span-2">
          <label for="startTime">{t('video.settings.start_time')}</label>
          <div class="input-group">
            <input
              type="range"
              id="startTimeRange"
              name="startTime"
              min="0"
              max={settings.endTime}
              step="0.01"
              value={settings.startTime}
              onInput={handleSettingChange}
            />
            <input type="number" id="startTime" name="startTime" value={settings.startTime} onInput={handleSettingChange} step="0.1" class="time-input" />
            <span>s</span>
          </div>
        </div>

        {/* Tiempo de Fin */}
        <div class="setting-item col-span-2">
          <label for="endTime">{t('video.settings.end_time')}</label>
          <div class="input-group">
            <input
              type="range"
              id="endTimeRange"
              name="endTime"
              min={settings.startTime}
              max={duration}
              step="0.01"
              value={settings.endTime}
              onInput={handleSettingChange}
            />
            <input type="number" id="endTime" name="endTime" value={settings.endTime} onInput={handleSettingChange} step="0.1" class="time-input" />
            <span>s</span>
          </div>
        </div>

        {/* Intervalo de Captura */}
        <div class="setting-item">
          <label for="captureInterval">{t('video.settings.interval')}: {settings.captureInterval}s</label>
          <input type="number" id="captureInterval" name="captureInterval" value={settings.captureInterval} onInput={handleSettingChange} min="0.1" step="0.1" class="number-input" />
        </div>

        {/* Retardo del GIF */}
        <div class="setting-item">
          <label for="gifDelay">{t('video.settings.gif_delay')}: {settings.gifDelay}ms</label>
          <input type="number" id="gifDelay" name="gifDelay" value={settings.gifDelay} onInput={handleSettingChange} min="10" step="10" class="number-input" />
        </div>

        {/* Calidad del GIF */}
        <div class="setting-item col-span-2">
          <label for="gifQuality">{t('video.settings.gif_quality')}</label>
          <div class="input-group">
            <span>{t('video.settings.gif_quality_low')}</span>
            <input
              type="range"
              id="gifQualityRange"
              name="gifQuality"
              min="1"  // La librería usa 1 como la mejor calidad
              max="30" // y 30 como la peor
              step="1"
              // Invertimos el valor para que el slider sea intuitivo (más a la derecha = mejor calidad)
              value={31 - settings.gifQuality}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const invertedValue = 31 - Number(target.value);
                const newEvent = { ...e, target: { ...target, name: 'gifQuality', value: invertedValue.toString() } };
                handleSettingChange(newEvent as unknown as Event);
              }}
            />
            <span>{t('video.settings.gif_quality_high')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
