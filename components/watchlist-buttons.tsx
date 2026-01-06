"use client";

import { BookmarkCheck, CheckCircle, CheckCircle2, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  addToPlanToWatch,
  addToWatched,
  type MovieData,
  removeFromPlanToWatch,
  removeFromWatched,
} from "@/app/actions";
import AuthForm from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface WatchlistActionsProps {
  movie: MovieData;
  initialStatus: { isPlanToWatch: boolean; isWatched: boolean };
  isAuthenticated: boolean;
}

export default function WatchlistButtons({
  movie,
  initialStatus,
  isAuthenticated,
}: WatchlistActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState(initialStatus);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleAddToWatchlist = async () => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    setActionLoading("plan");
    const result = await addToPlanToWatch(movie);
    if (result.error) {
      toast.error(result.error);
    } else {
      setStatus((prev) => ({ ...prev, isPlanToWatch: true }));
      toast.success("Added to watchlist");
    }
    setActionLoading(null);
    router.refresh();
  };

  const handleRemoveFromWatchlist = async () => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    setActionLoading("plan");
    const result = await removeFromPlanToWatch(movie.movieId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setStatus((prev) => ({ ...prev, isPlanToWatch: false }));
      toast.success("Removed from watchlist");
    }
    setActionLoading(null);
    router.refresh();
  };

  const handleMarkAsWatched = async () => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    setActionLoading("watched");
    const result = await addToWatched(movie);
    if (result.error) {
      toast.error(result.error);
    } else {
      setStatus({ isPlanToWatch: false, isWatched: true });
      toast.success("Marked as watched");
    }
    setActionLoading(null);
    router.refresh();
  };

  const handleUnwatch = async () => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    setActionLoading("watched");
    const result = await removeFromWatched(movie.movieId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setStatus((prev) => ({ ...prev, isWatched: false }));
      toast.success("Removed from watched");
    }
    setActionLoading(null);
    router.refresh();
  };

  return (
    <>
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

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              Sign in to add movies to your watchlist
            </DialogDescription>
          </DialogHeader>
          <AuthForm
            onSuccess={() => setIsAuthDialogOpen(false)}
            callbackURL={pathname}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
