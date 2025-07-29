// src/utils/fileHelpers.ts
export function getFilenameBase(file: File): string {
  const name = file.name;
  return name.substring(0, name.lastIndexOf(".")) || name;
}
