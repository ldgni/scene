import SearchBar from "@/components/search-bar";
import SearchResultCard from "@/components/search-result-card";
import { searchMedia } from "@/lib/api";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = q ? await searchMedia(q) : [];

  return (
    <>
      <SearchBar defaultValue={q} />
      <div className="mt-8">
        {!q ? (
          <p className="text-muted-foreground text-center text-sm">
            Enter a title to search for movies and TV shows.
          </p>
        ) : results.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            No results for &ldquo;{q}&rdquo;.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
