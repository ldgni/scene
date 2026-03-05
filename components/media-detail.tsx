import SearchBar from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import WatchlistButton from "@/components/watchlist-button";
import type { Movie, TVShow } from "@/lib/types";
import {
  getMediaDirector,
  getMediaRuntime,
  getMediaTitle,
  getMediaYear,
} from "@/lib/utils";

export default function MediaDetail({
  media,
  watchlistId,
}: {
  media: Movie | TVShow;
  watchlistId?: string;
}) {
  const title = getMediaTitle(media);
  const releaseYear = getMediaYear(media);
  const director = getMediaDirector(media);
  const runtime = getMediaRuntime(media);

  return (
    <div className="flex flex-col gap-2">
      <SearchBar />
      <h1 className="mt-8 text-2xl font-extrabold tracking-tight">{title}</h1>
      <p>
        {media.media_type === "movie" ? "Directed by" : "Created by"} {director}
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
      <WatchlistButton
        tmdbId={media.id}
        mediaType={media.media_type}
        title={title}
        year={releaseYear}
        initialWatchlistId={watchlistId}
      />
    </div>
  );
}
