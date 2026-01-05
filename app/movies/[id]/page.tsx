import { Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getWatchlistStatus } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import WatchlistButtons from "@/components/watchlist-buttons";
import { auth } from "@/lib/auth";
import { getImageUrl, getMovieDetails } from "@/lib/tmdb";
import { formatReleaseDate, formatRuntime } from "@/lib/utils";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    return { title: "Movie Not Found - Scene" };
  }

  try {
    const movie = await getMovieDetails(movieId);
    return {
      title: `${movie.title} - Scene`,
      description: movie.overview,
    };
  } catch {
    return { title: "Movie Not Found - Scene" };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  const [movie, session] = await Promise.all([
    getMovieDetails(movieId).catch(() => null),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!movie) {
    notFound();
  }

  const watchlistStatus = session
    ? await getWatchlistStatus(movieId)
    : { isPlanToWatch: false, isWatched: false };

  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div className="space-y-6">
      {/* Main Content */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Poster */}
        <div className="mx-auto shrink-0 sm:mx-0">
          <div className="bg-muted relative aspect-2/3 w-48 overflow-hidden rounded-lg shadow-xl sm:w-52">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                priority
                fill
                sizes="312px"
                className="object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center">
                No poster
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold sm:text-3xl">{movie.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {movie.release_date && (
              <div className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>{formatReleaseDate(movie.release_date)}</span>
              </div>
            )}
            {movie.runtime && (
              <div className="text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Watchlist Buttons */}
          <WatchlistButtons
            movie={{
              movieId: movie.id,
              title: movie.title,
              releaseDate: movie.release_date || null,
              runtime: movie.runtime,
              posterPath: movie.poster_path,
            }}
            initialStatus={watchlistStatus}
            isAuthenticated={!!session}
          />

          {/* Overview */}
          {movie.overview && (
            <div className="space-y-2">
              <h2 className="font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
