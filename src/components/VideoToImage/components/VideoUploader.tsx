// src/components/VideoUploader.tsx

import type { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { useTranslation } from "../../../context/LanguageContext";

type VideoUploaderProps = {
  onUpload: (file: File) => void;
  videoSrc: string | null;
};

export function VideoUploader({ onUpload, videoSrc }: VideoUploaderProps): JSX.Element {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null | undefined) => {
    if (file && file.type.startsWith("video")) {
      onUpload(file);
    }
  };

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    handleFile(e.currentTarget.files?.[0]);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer?.files[0]);
  };

  if (videoSrc) {
    return (
      <div class="change-video-container">
        <label for="videoInput" class="change-video-button">
          {t('video.change_video')}
        </label>
        <input
          id="videoInput"
          type="file"
          accept="video/*"
          onChange={handleChange}
          class="video-uploader-input"
        />
      </div>
    );
  }

  return (
    <div
      class={`video-uploader-container ${isDragging ? "is-dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label class="video-uploader-label" for="videoInput">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="video-uploader-icon"
        ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
        <p>{t('video.upload_prompt')}</p>
        <span class="video-uploader-cta">{t('video.upload_cta')}</span>
      </label>
      <input
        id="videoInput"
        type="file"
        accept="video/*"
        onChange={handleChange}
        class="video-uploader-input"
      />
    </div>
  );
}