"use client";

import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import SignInDialog from "@/components/sign-in-dialog";
import { Button } from "@/components/ui/button";
import { toggleWatchlist } from "@/lib/actions";

export default function WatchlistButton({
  tmdbId,
  mediaType,
  title,
  year,
  isLoggedIn,
  initialWatchlistId,
}: {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  year: string;
  isLoggedIn: boolean;
  initialWatchlistId?: string;
}) {
  const [watchlistId, setWatchlistId] = useState(initialWatchlistId);
  const [isPending, startTransition] = useTransition();
  const [signInOpen, setSignInOpen] = useState(false);

  const onWatchlist = !!watchlistId;

  function handleClick() {
    if (!isLoggedIn) {
      setSignInOpen(true);
      return;
    }

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
    <>
      <Button
        variant={onWatchlist ? "secondary" : "default"}
        disabled={isPending}
        onClick={handleClick}>
        {onWatchlist ? <BookmarkMinus /> : <BookmarkPlus />}
        {onWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
      <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
    </>
  );
}
