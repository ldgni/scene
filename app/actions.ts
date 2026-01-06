"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { deletePlanToWatch, deleteWatched } from "@/db/queries/delete";
import { insertPlanToWatch, insertWatched } from "@/db/queries/insert";
import {
  findPlanToWatchEntry,
  findWatchedEntry,
  getPlanToWatchByUserId,
  getWatchedByUserId,
} from "@/db/queries/select";
import { auth } from "@/lib/auth";

const movieDataSchema = z.object({
  movieId: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  releaseDate: z.string().nullish(),
  runtime: z.number().int().positive().nullish(),
  posterPath: z.string().nullish(),
});

export type MovieData = z.infer<typeof movieDataSchema>;

const movieIdSchema = z.object({
  movieId: z.number().int().positive("Invalid movie ID"),
});

// Get watchlist status for a movie
export async function getWatchlistStatus(movieId: number) {
  const parsed = movieIdSchema.safeParse({ movieId });

  if (!parsed.success) {
    return { isPlanToWatch: false, isWatched: false };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isPlanToWatch: false, isWatched: false };
  }

  const [planToWatchEntry, watchedEntry] = await Promise.all([
    findPlanToWatchEntry(session.user.id, parsed.data.movieId),
    findWatchedEntry(session.user.id, parsed.data.movieId),
  ]);

  return {
    isPlanToWatch: !!planToWatchEntry,
    isWatched: !!watchedEntry,
  };
}

// Add to plan to watch
export async function addToPlanToWatch(movie: z.infer<typeof movieDataSchema>) {
  const parsed = movieDataSchema.safeParse(movie);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const { movieId, title, releaseDate, runtime, posterPath } = parsed.data;

  // Check if already in plan to watch
  const existing = await findPlanToWatchEntry(session.user.id, movieId);

  if (existing) {
    return { error: "Movie already in plan to watch" };
  }

  try {
    await insertPlanToWatch({
      id: crypto.randomUUID(),
      userId: session.user.id,
      movieId,
      title,
      releaseDate,
      runtime,
      posterPath,
    });

    return { success: true };
  } catch {
    return { error: "Failed to add movie to plan to watch" };
  }
}

// Remove from plan to watch
export async function removeFromPlanToWatch(movieId: number) {
  const parsed = movieIdSchema.safeParse({ movieId });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await deletePlanToWatch(session.user.id, parsed.data.movieId);

    return { success: true };
  } catch {
    return { error: "Failed to remove movie from plan to watch" };
  }
}

// Add to watched
export async function addToWatched(movie: z.infer<typeof movieDataSchema>) {
  const parsed = movieDataSchema.safeParse(movie);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const { movieId, title, releaseDate, runtime, posterPath } = parsed.data;

  // Check if already watched
  const existing = await findWatchedEntry(session.user.id, movieId);

  if (existing) {
    return { error: "Movie already marked as watched" };
  }

  try {
    // Add to watched
    await insertWatched({
      id: crypto.randomUUID(),
      userId: session.user.id,
      movieId,
      title,
      releaseDate,
      runtime,
      posterPath,
    });

    // Remove from plan to watch if it was there
    await deletePlanToWatch(session.user.id, movieId);

    return { success: true };
  } catch {
    return { error: "Failed to add movie to watched" };
  }
}

// Remove from watched
export async function removeFromWatched(movieId: number) {
  const parsed = movieIdSchema.safeParse({ movieId });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await deleteWatched(session.user.id, parsed.data.movieId);

    return { success: true };
  } catch {
    return { error: "Failed to remove movie from watched" };
  }
}

// Get plan to watch list
export async function getPlanToWatchList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { movies: [] };
  }

  const movies = await getPlanToWatchByUserId(session.user.id);

  return { movies };
}

// Get watched list
export async function getWatchedList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { movies: [] };
  }

  const movies = await getWatchedByUserId(session.user.id);

  return { movies };
}
