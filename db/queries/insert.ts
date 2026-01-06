import { db } from "@/db";
import { planToWatch, watched } from "@/db/schema";

type MovieInsertData = {
  id: string;
  userId: string;
  movieId: number;
  title: string;
  releaseDate?: string | null;
  runtime?: number | null;
  posterPath?: string | null;
};

export async function insertPlanToWatch(data: MovieInsertData) {
  return db.insert(planToWatch).values(data).returning();
}

export async function insertWatched(data: MovieInsertData) {
  return db.insert(watched).values(data).returning();
}
