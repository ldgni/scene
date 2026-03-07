import { notFound } from "next/navigation";

import MediaDetail from "@/components/media-detail";
import { isOnWatchlist } from "@/lib/actions";
import { getTVShowDetails } from "@/lib/api";
import { getSession } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TVPage({ params }: Props) {
  const { id } = await params;
  const showId = Number(id);

  if (isNaN(showId)) notFound();

  const [show, session] = await Promise.all([
    getTVShowDetails(showId),
    getSession(),
  ]);

  const watchlistId = session ? await isOnWatchlist(showId, "tv") : undefined;

  return (
    <MediaDetail
      media={show}
      isLoggedIn={!!session}
      watchlistId={watchlistId}
    />
  );
}
