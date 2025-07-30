// src/VideoToImg.tsx
import { useState, useMemo, useCallback, useEffect } from "preact/hooks";
import { VideoUploader } from "./components/VideoUploader";
import { VideoPreview } from "./components/VideoPreview";
import {
  useVideoProcessor,
  type VideoProcessorSettings,
} from "./hooks/useVideoProcessor";
import { FormatSelector } from "./components/FormatSelector";
import { getFilenameBase } from "./utils/fileHelpers";
import { DownloadButton } from "../ui/DownloadButton";
import { useTranslation } from "../../context/LanguageContext";
import "./videoToImage.css";
import { VideoSettings } from "./components/VideoSettings";
import { AdBanner } from "../../ads/AdBanner";
import { defaultSettings } from "./config";

export function VideoToImg() {
  const { t } = useTranslation();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<VideoProcessorSettings>(defaultSettings);
  const [videoDuration, setVideoDuration] = useState(0);
  const [format, setFormat] = useState<"gif" | "pdf" | "zip">("gif");
  const [previewTime, setPreviewTime] = useState(0);

  const {
    processVideo,
    result,
    isProcessing,
    progress,
    error,
    reset,
    cancelProcessing,
  } = useVideoProcessor(settings);

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
    <div class="video-tool-container">
      <div className={"video-uploader-container"}>
        {videoUrl && (
          <VideoPreview
            videoUrl={videoUrl}
            previewTime={previewTime}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}
        <VideoUploader onUpload={handleFileSelect} />
        {isProcessing && format === "gif" && (
              <div class="progress-bar-container">
                <p>{t("video.generating_gif")}</p>
                <progress
                  class="progress-bar"
                  value={progress}
                  max="1"
                ></progress>
              </div>
            )}
        <AdBanner />
      </div>

      {videoFile && videoUrl && (
        <div className={"video-config-container"}>
          <>
            <VideoSettings
              duration={videoDuration}
              settings={settings}
              onChange={(newSettings) => setSettings(newSettings)}
              onPreviewTimeChange={setPreviewTime}
            />

            <div class="process-buttons-container tool-panel">
              {!isProcessing ? (
                <button
                  onClick={handleProcess}
                  class="process-button buton-config"
                  disabled={isProcessing}
                >
                  {t("video.process_button")}
                </button>
              ) : (
                <button onClick={cancelProcessing} class="cancel-button buton-config">
                  {t("video.cancel_processing")}
                </button>
              )}
              <FormatSelector selectedFormat={format} onChange={setFormat} />
              
            </div>

            

            {error && (
              <p class="">
                {t("video.error_prefix", "Error")}: {t(error)}
              </p>
            )}
            {result && (
              <DownloadButton
                blob={result.blob}
                mimeType={result.mimeType}
                filename={
                  result.filename || `${getFilenameBase(videoFile)}.${format}`
                }
              />
            )}
          </>
        </div>
      )}
    </div>
  );
}
