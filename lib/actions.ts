"use server";

import { and, eq } from "drizzle-orm";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { watchlist } from "@/lib/db/schema";

export async function toggleWatchlist(
  tmdbId: number,
  mediaType: "movie" | "tv",
  title: string,
  year: string,
  currentId?: string,
) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  if (currentId) {
    await db
      .delete(watchlist)
      .where(
        and(eq(watchlist.id, currentId), eq(watchlist.userId, session.user.id)),
      );
    return { id: null };
  }

  try {
    const id = crypto.randomUUID();
    await db
      .insert(watchlist)
      .values({ id, userId: session.user.id, tmdbId, mediaType, title, year });
    return { id };
  } catch {
    return { error: "Already on your watchlist" };
  }
}

export async function getWatchlist() {
  const session = await getSession();
  if (!session) return [];

  return db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, session.user.id));
}

export async function isOnWatchlist(tmdbId: number, mediaType: "movie" | "tv") {
  const session = await getSession();
  if (!session) return { onWatchlist: false };

  const [item] = await db
    .select({ id: watchlist.id })
    .from(watchlist)
    .where(
      and(
        eq(watchlist.userId, session.user.id),
        eq(watchlist.tmdbId, tmdbId),
        eq(watchlist.mediaType, mediaType),
      ),
    )
    .limit(1);

  return item ? { onWatchlist: true, id: item.id } : { onWatchlist: false };
}
