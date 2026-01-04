"use client";

import {
  BookmarkCheck,
  CheckCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  addToPlanToWatch,
  addToWatched,
  type MovieData,
  removeFromPlanToWatch,
  removeFromWatched,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface WatchlistActionsProps {
  movie: MovieData;
  initialStatus: { isPlanToWatch: boolean; isWatched: boolean };
}

export default function WatchlistButtons({
  movie,
  initialStatus,
}: WatchlistActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleAddToWatchlist = async () => {
    setActionLoading("plan");
    await addToPlanToWatch(movie);
    setStatus((prev) => ({ ...prev, isPlanToWatch: true }));
    setActionLoading(null);
    router.refresh();
  };

  const handleRemoveFromWatchlist = async () => {
    setActionLoading("plan");
    await removeFromPlanToWatch(movie.movieId);
    setStatus((prev) => ({ ...prev, isPlanToWatch: false }));
    setActionLoading(null);
    router.refresh();
  };

  const handleMarkAsWatched = async () => {
    setActionLoading("watched");
    await addToWatched(movie);
    setStatus({ isPlanToWatch: false, isWatched: true });
    setActionLoading(null);
    router.refresh();
  };

  const handleUnwatch = async () => {
    setActionLoading("watched");
    await removeFromWatched(movie.movieId);
    setStatus((prev) => ({ ...prev, isWatched: false }));
    setActionLoading(null);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {!status.isWatched && (
        <Button
          variant={status.isPlanToWatch ? "secondary" : "outline"}
          onClick={
            status.isPlanToWatch
              ? handleRemoveFromWatchlist
              : handleAddToWatchlist
          }
          disabled={actionLoading === "plan"}>
          {actionLoading === "plan" ? (
            <Spinner />
          ) : status.isPlanToWatch ? (
            <BookmarkCheck />
          ) : (
            <Clock />
          )}
          {status.isPlanToWatch ? "In Watchlist" : "Add to Watchlist"}
        </Button>
      )}

      <Button
        variant={status.isWatched ? "default" : "outline"}
        onClick={status.isWatched ? handleUnwatch : handleMarkAsWatched}
        disabled={actionLoading === "watched"}>
        {actionLoading === "watched" ? (
          <Spinner />
        ) : status.isWatched ? (
          <CheckCircle2 />
        ) : (
          <CheckCircle />
        )}
        {status.isWatched ? "Watched" : "Mark as Watched"}
      </Button>
    </div>
  );
}
