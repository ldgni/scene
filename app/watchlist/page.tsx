import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

export default async function WatchlistPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <h1>Watchlist</h1>;
}
