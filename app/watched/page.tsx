import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getWatchedList } from "@/app/actions";
import WatchlistTable from "@/components/watchlist-table";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Watched - Scene",
  description: "Movies you have watched",
};

export default async function WatchedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { movies } = await getWatchedList();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <CheckCircle />
        <div>
          <h1 className="text-xl font-bold">Watched</h1>
          <p className="text-muted-foreground text-sm">
            {movies.length} {movies.length === 1 ? "movie" : "movies"}
          </p>
        </div>
      </div>

      <WatchlistTable initialMovies={movies} type="watched" />
    </div>
  );
}
