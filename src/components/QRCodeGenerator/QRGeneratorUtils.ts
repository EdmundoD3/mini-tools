import type { Dispatch, StateUpdater } from "preact/hooks";
import type {Options, Gradient } from "qr-code-styling";
export type TQRControls = {
  options: Options;
  setOptions: Dispatch<StateUpdater<Options>>;
}

export interface BackgroundPattern {
  name: string;
  url: string;
  thumbnail: string;
}
export const toRadians = (degrees: number) => degrees * (Math.PI / 180);
export const toDegrees = (radians: number) => Math.floor(radians * (180 / Math.PI));
export const backgroundPatterns: BackgroundPattern[] = [
  {
    name: "Puntos finos",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==",
    thumbnail: "data:image/svg+xml;base64,..."
  },
  {
    name: "Cuadrícula",
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTEwIDBIMHYxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9zdmc+",
    thumbnail: "data:image/svg+xml;base64,..."
  },
  // Agrega más patrones SVG en base64
];
export const colorPresets = [
  "#000000ff", "#ff0000ff", "#00ff00ff", "#ffff00ff",'#2a2a72', '#ff6b6b', '#48dbfb', '#1dd1a1',
  '#feca57', '#5f27cd', '#ff9ff3', '#54a0ff'
];



export const defaultOptions: Options = {
  width: 300,
  height: 300,
  type: 'canvas',
  data: 'https://ejemplo.com',
  dotsOptions: {
    type: 'rounded',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#ffffff', // Cambiado de 'transparent' a blanco por defecto
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 5,
  },
};

export const defaultGradient: Gradient = {
  type: 'linear',
  rotation: toRadians(90),
  colorStops: [
    { offset: 0, color: '#2a2a72' },
    { offset: 1, color: '#009ffd' }
  ]
};

