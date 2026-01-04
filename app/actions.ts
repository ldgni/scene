"use server";

import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { planToWatch, watched } from "@/db/schema";
import { auth } from "@/lib/auth";

export type MovieData = {
  movieId: number;
  title: string;
  releaseDate?: string | null;
  runtime?: number | null;
  posterPath?: string | null;
};

// Get watchlist status for a movie
export async function getWatchlistStatus(movieId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isPlanToWatch: false, isWatched: false };
  }

  const [planToWatchEntry] = await db
    .select()
    .from(planToWatch)
    .where(
      and(
        eq(planToWatch.userId, session.user.id),
        eq(planToWatch.movieId, movieId),
      ),
    );

  const [watchedEntry] = await db
    .select()
    .from(watched)
    .where(
      and(eq(watched.userId, session.user.id), eq(watched.movieId, movieId)),
    );

  return {
    isPlanToWatch: !!planToWatchEntry,
    isWatched: !!watchedEntry,
  };
}

// Add to plan to watch
export async function addToPlanToWatch(movie: MovieData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const { movieId, title, releaseDate, runtime, posterPath } = movie;

  if (!movieId || !title) {
    return { error: "Movie ID and title are required" };
  }

  // Check if already in plan to watch
  const [existing] = await db
    .select()
    .from(planToWatch)
    .where(
      and(
        eq(planToWatch.userId, session.user.id),
        eq(planToWatch.movieId, movieId),
      ),
    );

  if (existing) {
    return { error: "Movie already in plan to watch" };
  }

  const id = crypto.randomUUID();

  await db.insert(planToWatch).values({
    id,
    userId: session.user.id,
    movieId,
    title,
    releaseDate,
    runtime,
    posterPath,
  });

  return { success: true, id };
}

// Remove from plan to watch
export async function removeFromPlanToWatch(movieId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  await db
    .delete(planToWatch)
    .where(
      and(
        eq(planToWatch.userId, session.user.id),
        eq(planToWatch.movieId, movieId),
      ),
    );

  return { success: true };
}

// Add to watched
export async function addToWatched(movie: MovieData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const { movieId, title, releaseDate, runtime, posterPath } = movie;

  if (!movieId || !title) {
    return { error: "Movie ID and title are required" };
  }

  // Check if already watched
  const [existing] = await db
    .select()
    .from(watched)
    .where(
      and(eq(watched.userId, session.user.id), eq(watched.movieId, movieId)),
    );

  if (existing) {
    return { error: "Movie already marked as watched" };
  }

  const id = crypto.randomUUID();

  // Add to watched
  await db.insert(watched).values({
    id,
    userId: session.user.id,
    movieId,
    title,
    releaseDate,
    runtime,
    posterPath,
  });

  // Remove from plan to watch if it was there
  await db
    .delete(planToWatch)
    .where(
      and(
        eq(planToWatch.userId, session.user.id),
        eq(planToWatch.movieId, movieId),
      ),
    );

  return { success: true, id };
}

// Remove from watched
export async function removeFromWatched(movieId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  await db
    .delete(watched)
    .where(
      and(
        eq(watched.userId, session.user.id),
        eq(watched.movieId, movieId),
      ),
    );

  return { success: true };
}

// Get plan to watch list
export async function getPlanToWatchList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { movies: [] };
  }

  const movies = await db
    .select()
    .from(planToWatch)
    .where(eq(planToWatch.userId, session.user.id))
    .orderBy(desc(planToWatch.createdAt));

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

  const movies = await db
    .select()
    .from(watched)
    .where(eq(watched.userId, session.user.id))
    .orderBy(desc(watched.createdAt));

  return { movies };
}

