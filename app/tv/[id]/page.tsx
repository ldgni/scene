import { notFound } from "next/navigation";

import MediaDetail from "@/components/media-detail";
import { getTVShowDetails } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TVShowPage({ params }: Props) {
  const { id } = await params;
  const showId = Number(id);

  if (isNaN(showId)) notFound();

  const show = await getTVShowDetails(showId);

  return <MediaDetail media={show} />;
}
