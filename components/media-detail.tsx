import { BookmarkPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie, TVShow } from "@/lib/types";

export default function MediaDetail({ media }: { media: Movie | TVShow }) {
  const isMovie = media.media_type === "movie";
  const title = isMovie ? (media as Movie).title : (media as TVShow).name;

  const releaseYear =
    (isMovie
      ? (media as Movie).release_date
      : (media as TVShow).first_air_date
    )?.slice(0, 4) || "TBA";

  const director = isMovie
    ? (media as Movie).credits.crew.find((c) => c.job === "Director")?.name
    : (media as TVShow).created_by.map((c) => c.name).join(", ");

  const runtime = isMovie
    ? (() => {
        const r = (media as Movie).runtime;
        return r ? `${Math.floor(r / 60)}h ${r % 60}m` : "N/A";
      })()
    : `${(media as TVShow).number_of_episodes} eps.`;

  return (
    <div className="flex flex-col gap-2">
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
      <Button disabled>
        <BookmarkPlus />
        Add to Watchlist
      </Button>
    </div>
  );
}
