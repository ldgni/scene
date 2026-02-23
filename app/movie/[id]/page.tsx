import { notFound } from "next/navigation";

import MediaDetail from "@/components/media-detail";
import { getMovieDetails } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  const movie = await getMovieDetails(movieId);

  return <MediaDetail media={movie} />;
}
