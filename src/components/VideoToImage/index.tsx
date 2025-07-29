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
  });
  const [videoDuration, setVideoDuration] = useState(0);
  const [format, setFormat] = useState<"gif" | "pdf" | "zip">("gif");
  const [previewTime, setPreviewTime] = useState(0);

  const { processVideo, result, isProcessing, error, reset } = useVideoProcessor(settings);

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
    <div class="max-w-3xl mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-4">{t('video.title')}</h1>

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

          <button
            onClick={handleProcess}
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? t('video.processing') : t('video.process_button')}
          </button>

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
    </div>
  );
}
