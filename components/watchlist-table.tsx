"use client";

import { CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  addToWatched,
  removeFromPlanToWatch,
  removeFromWatched,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatReleaseDate, formatRuntime } from "@/lib/utils";

interface WatchlistMovie {
  id: string;
  movieId: number;
  title: string;
  releaseDate: string | null;
  runtime: number | null;
  posterPath: string | null;
}

interface WatchlistTableProps {
  initialMovies: WatchlistMovie[];
  type: "plan-to-watch" | "watched";
}

export default function WatchlistTable({
  initialMovies,
  type,
}: WatchlistTableProps) {
  const router = useRouter();
  const [movies, setMovies] = useState(initialMovies);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleRemove = async (movieId: number) => {
    setLoadingId(movieId);
    const result =
      type === "plan-to-watch"
        ? await removeFromPlanToWatch(movieId)
        : await removeFromWatched(movieId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setMovies((prev) => prev.filter((m) => m.movieId !== movieId));
      toast.success(
        type === "plan-to-watch"
          ? "Removed from watchlist"
          : "Removed from watched",
      );
    }
    setLoadingId(null);
    router.refresh();
  };

  const handleMarkAsWatched = async (movie: WatchlistMovie) => {
    setLoadingId(movie.movieId);
    const result = await addToWatched({
      movieId: movie.movieId,
      title: movie.title,
      releaseDate: movie.releaseDate,
      runtime: movie.runtime,
      posterPath: movie.posterPath,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      setMovies((prev) => prev.filter((m) => m.movieId !== movie.movieId));
      toast.success("Marked as watched");
    }
    setLoadingId(null);
    router.refresh();
  };

  if (movies.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          {type === "plan-to-watch"
            ? "Your watchlist is empty. Search for movies to add them!"
            : "You haven't watched any movies yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => {
            const isLoading = loadingId === movie.movieId;

            return (
              <TableRow key={movie.id}>
                <TableCell>
                  <Link href={`/movies/${movie.movieId}`}>{movie.title}</Link>
                </TableCell>

                <TableCell>
                  {movie.releaseDate
                    ? formatReleaseDate(movie.releaseDate)
                    : "—"}
                </TableCell>

                <TableCell>
                  {movie.runtime ? (
                    <span>{formatRuntime(movie.runtime)}</span>
                  ) : (
                    "—"
                  )}
                </TableCell>

                <TableCell className="text-center">
                  {type === "plan-to-watch" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleMarkAsWatched(movie)}
                      disabled={isLoading}
                      title="Mark as watched">
                      <CheckCircle />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemove(movie.movieId)}
                    disabled={isLoading}
                    title="Remove">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
