// src/VideoToImg.tsx
import { useState, useMemo, useCallback, useEffect } from "preact/hooks";
import { VideoUploader } from "./components/VideoUploader";
import { VideoPreview } from "./components/VideoPreview";
import { useVideoProcessor, type VideoProcessorSettings } from "./hooks/useVideoProcessor";
import { FormatSelector } from "./components/FormatSelector";
import { getFilenameBase } from "./utils/fileHelpers";
import { DownloadButton } from "../ui/DownloadButton";
import { useTranslation } from "../../context/LanguageContext";
import "./videoToImage.css"
import { VideoSettings } from "./components/VideoSettings";

export function VideoToImg() {
  const { t } = useTranslation();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<VideoProcessorSettings>({
    startTime: 0,
    endTime: 0,
    captureInterval: 1,
    gifDelay: 1000,
    gifQuality: 10,
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [format, setFormat] = useState<"gif" | "pdf" | "zip">("gif");
  const [previewTime, setPreviewTime] = useState(0);

  const { processVideo, result, isProcessing, progress, error, reset, cancelProcessing } = useVideoProcessor(settings);

  const videoUrl = useMemo(() => {
    if (videoFile) {
      return URL.createObjectURL(videoFile);
    }
    return null;
  }, [videoFile]);

  // Limpia la ObjectURL para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFileSelect = (file: File) => {
    setVideoFile(file);
    reset();
  };

  const handleProcess = async () => {
    if (!videoFile) return;
    await processVideo(videoFile, format);
  };

  const handleLoadedMetadata = useCallback((duration: number) => {
    setVideoDuration(duration);
    setSettings((prev) => ({
      ...prev,
      endTime: duration,
    }));
  }, []);
  return (
    <>
      <h1 class="">{t('video.title')}</h1>

      <VideoUploader onUpload={handleFileSelect} />

      {videoFile && videoUrl && (
        <>
          <VideoPreview
            videoUrl={videoUrl}
            previewTime={previewTime}
            onLoadedMetadata={handleLoadedMetadata}
          />

          <VideoSettings
            duration={videoDuration}
            settings={settings}
            onChange={(newSettings) => setSettings(newSettings)}
            onPreviewTimeChange={setPreviewTime}
          />


          <FormatSelector selectedFormat={format} onChange={setFormat} />

          <div class="process-buttons-container">
            <button
              onClick={handleProcess}
              class="process-button"
              disabled={isProcessing}
            >
              {isProcessing ? t('video.processing') : t('video.process_button')}
            </button>
            {isProcessing && (
              <button
                onClick={cancelProcessing}
                class="cancel-button"
              >
                {t('video.cancel_processing')}
              </button>
            )}
          </div>

          {isProcessing && format === 'gif' && (
            <div class="progress-bar-container">
              <p>{t('video.generating_gif')}</p>
              <progress class="progress-bar" value={progress} max="1"></progress>
            </div>
          )}

          {error && <p class="text-red-600 mt-2">{t('video.error_prefix', 'Error')}: {t(error)}</p>}

          {result && (
            <DownloadButton
              blob={result.blob}
              mimeType={result.mimeType}
              filename={result.filename || `${getFilenameBase(videoFile)}.${format}`}
            />
          )}
        </>
      )}
    </>
  );
}
