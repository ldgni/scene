import { headers } from "next/headers";

import MovieSearch from "@/components/movie-search";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-6">
      {session ? (
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">Scene</h1>
          <p className="text-muted-foreground mt-2 italic">
            Keep track of your movie watchlist
          </p>
        </div>
      )}
      <MovieSearch />
    </div>
  );
}
