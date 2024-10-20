import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getViewsString(view: number): string {
  return `${(view / 1000000).toFixed(1)}M`;
}

export function getDurationString(duration: number): string {
  const hh = Math.floor(duration / 3600);
  const mm = Math.floor((duration % 3600) / 60);
  const ss = duration % 60;
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  }
}
