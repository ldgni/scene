import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { getImageUrl, getMovieDetails } from "@/lib/tmdb";
import {
  formatRating,
  formatReleaseDate,
  formatRuntime,
} from "@/lib/utils";

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

  let movie;
  try {
    movie = await getMovieDetails(movieId);
  } catch {
    notFound();
  }

  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors">
        <ArrowLeft className="size-4" />
        Back to search
      </Link>

      {/* Main Content */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Poster */}
        <div className="mx-auto shrink-0 sm:mx-0">
          <div className="bg-muted relative aspect-[2/3] w-48 overflow-hidden rounded-lg shadow-xl sm:w-52">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="208px"
                priority
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
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-muted-foreground mt-1 italic">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}
          </div>

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
            {movie.vote_average > 0 && (
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">
                  {formatRating(movie.vote_average)}
                </span>
                <span className="text-muted-foreground">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
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

