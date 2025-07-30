import { useEffect, useState, useRef } from "preact/hooks";
import type { JSX } from "preact";
import { useTranslation } from "../../../context/LanguageContext";

type VideoPreviewProps = {
  videoUrl: string;
  previewTime: number;
  onLoadedMetadata: (duration: number) => void;
};

export function VideoPreview({
  videoUrl,
  previewTime,
  onLoadedMetadata,
}: VideoPreviewProps): JSX.Element {
  const { t } = useTranslation();
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  // Usamos useRef para que los elementos de video y canvas persistan entre renders
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Efecto 1: Inicializa el video y carga los metadatos. Se ejecuta solo cuando cambia videoUrl.
  useEffect(() => {
    if (!videoUrl) return;

    setIsLoading(true);
    setAspectRatio(null);
    setPreviewImageUrl(null);

    const video = document.createElement("video");
    video.muted = true;
    video.crossOrigin = "anonymous";
    videoRef.current = video;
    canvasRef.current = document.createElement("canvas");

    const handleMetadata = () => {
      if (!videoRef.current) return;
      onLoadedMetadata(videoRef.current.duration);
      setAspectRatio(`${videoRef.current.videoWidth} / ${videoRef.current.videoHeight}`);
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.src = videoUrl; // Inicia la carga

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      videoRef.current = null;
      canvasRef.current = null;
    };
  }, [videoUrl, onLoadedMetadata]);

  // Efecto 2: Genera el fotograma de la vista previa. Se ejecuta cuando cambia el tiempo o después de cargar los metadatos.
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !aspectRatio) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    setIsLoading(true);

    const onSeeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPreviewImageUrl(canvas.toDataURL("image/jpeg", 0.8));
      setIsLoading(false);
    }

    video.addEventListener("seeked", onSeeked);
    video.currentTime = previewTime;

    return () => {
      video.removeEventListener("seeked", onSeeked);
    };
  }, [previewTime, aspectRatio]);

  return (
    <div class="preview-container" style={aspectRatio ? { aspectRatio } : {}} data-loading={isLoading}>
      {isLoading && !previewImageUrl && <div class="preview-loading">{t('video.preview_loading')}</div>}
      {previewImageUrl && (
        <img src={previewImageUrl} alt="Video preview" class="preview-image" />
      )}
    </div>
  );
}
