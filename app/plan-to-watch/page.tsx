import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getPlanToWatchList } from "@/app/actions";
import WatchlistTable from "@/components/watchlist-table";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Plan to Watch - Scene",
  description: "Movies you plan to watch",
};

export default async function PlanToWatchPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { movies } = await getPlanToWatchList();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Clock />
        <div>
          <h1 className="text-xl font-bold">Plan to watch</h1>
          <p className="text-muted-foreground text-sm">
            {movies.length} {movies.length === 1 ? "movie" : "movies"}
          </p>
        </div>
      </div>

      <WatchlistTable initialMovies={movies} type="plan-to-watch" />
    </div>
  );
}
