import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { planToWatch, watched } from "@/db/schema";

// Plan to watch queries
export async function findPlanToWatchEntry(userId: string, movieId: number) {
  const [entry] = await db
    .select()
    .from(planToWatch)
    .where(
      and(eq(planToWatch.userId, userId), eq(planToWatch.movieId, movieId)),
    );

  return entry ?? null;
}

export async function getPlanToWatchByUserId(userId: string) {
  return db
    .select()
    .from(planToWatch)
    .where(eq(planToWatch.userId, userId))
    .orderBy(desc(planToWatch.createdAt));
}

// Watched queries
export async function findWatchedEntry(userId: string, movieId: number) {
  const [entry] = await db
    .select()
    .from(watched)
    .where(and(eq(watched.userId, userId), eq(watched.movieId, movieId)));

  return entry ?? null;
}

export async function getWatchedByUserId(userId: string) {
  return db
    .select()
    .from(watched)
    .where(eq(watched.userId, userId))
    .orderBy(desc(watched.createdAt));
}

