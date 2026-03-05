import { notFound } from "next/navigation";

import MediaDetail from "@/components/media-detail";
import { isOnWatchlist } from "@/lib/actions";
import { getMovieDetails } from "@/lib/api";
import { getSession } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  const movie = await getMovieDetails(movieId);

  const session = await getSession();
  const watchlistStatus = session
    ? await isOnWatchlist(movieId, "movie")
    : undefined;

  return <MediaDetail media={movie} watchlistId={watchlistStatus?.id} />;
}
