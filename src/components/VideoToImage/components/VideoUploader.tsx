// src/components/VideoUploader.tsx

import type { JSX } from "preact/jsx-runtime";

type Props = {
  onUpload: (file: File) => void;
};

export function VideoUploader({ onUpload }: Props): JSX.Element {
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = e.currentTarget.files?.[0];
    if (file && file.type.startsWith("video")) {
      onUpload(file);
    }
  };

  return (
    <div class="">
      <label class="" for="videoInput">
        Subir video
      </label>
      <input
        id="videoInput"
        type="file"
        accept="video/*"
        onChange={handleChange}
        class=""
      />
    </div>
  );
}