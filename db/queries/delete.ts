import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { planToWatch, watched } from "@/db/schema";

// Plan to watch deletes
export async function deletePlanToWatch(userId: string, movieId: number) {
  await db
    .delete(planToWatch)
    .where(
      and(eq(planToWatch.userId, userId), eq(planToWatch.movieId, movieId)),
    );
}

// Watched deletes
export async function deleteWatched(userId: string, movieId: number) {
  await db
    .delete(watched)
    .where(and(eq(watched.userId, userId), eq(watched.movieId, movieId)));
}

