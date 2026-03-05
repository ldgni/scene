"use client";

import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { toggleWatchlist } from "@/lib/actions";

export default function WatchlistButton({
  tmdbId,
  mediaType,
  title,
  year,
  initialWatchlistId,
}: {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  year: string;
  initialWatchlistId?: string;
}) {
  const [watchlistId, setWatchlistId] = useState(initialWatchlistId);
  const [isPending, startTransition] = useTransition();

  const onWatchlist = !!watchlistId;

  function handleClick() {
    startTransition(async () => {
      const result = await toggleWatchlist(
        tmdbId,
        mediaType,
        title,
        year,
        watchlistId,
      );

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      setWatchlistId(result.id ?? undefined);
      toast.success(
        result.id
          ? `Added "${title}" to your watchlist`
          : `Removed "${title}" from your watchlist`,
      );
    });
  }

  return (
    <Button
      variant={onWatchlist ? "secondary" : "default"}
      disabled={isPending}
      onClick={handleClick}>
      {onWatchlist ? <BookmarkMinus /> : <BookmarkPlus />}
      {onWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
