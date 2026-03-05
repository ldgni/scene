import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Movie, TVShow } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaTitle(media: {
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
}): string {
  return media.title ?? media.name ?? "";
}

export function getMediaYear(media: {
  release_date?: string;
  first_air_date?: string;
}): string {
  return (media.release_date || media.first_air_date)?.slice(0, 4) || "TBA";
}

export function getMediaDirector(media: Movie | TVShow): string {
  if (media.media_type === "movie") {
    return media.credits.crew.find((c) => c.job === "Director")?.name ?? "N/A";
  }
  return media.created_by.map((c) => c.name).join(", ") || "N/A";
}

export function getMediaRuntime(media: Movie | TVShow): string {
  if (media.media_type === "movie") {
    const r = media.runtime;
    return r ? `${Math.floor(r / 60)}h ${r % 60}m` : "N/A";
  }
  return `${media.number_of_episodes} eps.`;
}
