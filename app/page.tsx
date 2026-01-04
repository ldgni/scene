import MovieSearch from "@/components/movie-search";

export default function HomePage() {
  return (
    <div className="grid place-items-center gap-2">
      <h1 className="text-4xl font-bold sm:text-6xl">Scene</h1>
      <p className="text-muted-foreground mb-2 italic">
        Keep track of your movie watchlist
      </p>
      <MovieSearch />
    </div>
  );
}
