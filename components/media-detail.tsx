import { BookmarkPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie, TVShow } from "@/lib/types";

export default function MediaDetail({ media }: { media: Movie | TVShow }) {
  const isMovie = media.media_type === "movie";
  const title = isMovie ? (media as Movie).title : (media as TVShow).name;

  const releaseYear = isMovie
    ? (media as Movie).release_date?.slice(0, 4)
    : (media as TVShow).first_air_date?.slice(0, 4);

  const director = isMovie
    ? (media as Movie).credits.crew.find((c) => c.job === "Director")?.name
    : (media as TVShow).created_by.map((c) => c.name).join(", ");

  const runtime = isMovie
    ? `${Math.floor((media as Movie).runtime! / 60)}h ${(media as Movie).runtime! % 60}m`
    : `${(media as TVShow).number_of_episodes} eps.`;

  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="bg-muted text-muted-foreground h-93.75-full flex shrink-0 items-center justify-center rounded-xl text-sm sm:w-62.5">
        No poster available
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        <p>
          {isMovie ? "Directed by" : "Created by"} {director}
        </p>
        <p className="text-muted-foreground">
          {releaseYear} · {runtime}
        </p>
        <div className="flex flex-wrap gap-2">
          {media.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
        <p className="my-2">{media.overview}</p>
        <Button disabled title="Coming soon">
          <BookmarkPlus />
          Add to Watchlist
        </Button>
      </div>
    </div>
  );
}
