import type { VideoProcessorSettings } from "./hooks/useVideoProcessor";

export const defaultSettings:VideoProcessorSettings = {
    startTime: 0,
    endTime: 0,
    captureInterval: 1,
    gifDelay: 1000,
    gifQuality: 5,
  }