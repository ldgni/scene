"use client";

import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie, SearchResponse } from "@/types/movie";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchMovies = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/movies/search?q=${encodeURIComponent(searchQuery)}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: SearchResponse = await response.json();
      // Sort by vote count (descending) and take top 8
      const sortedResults = [...data.results].sort(
        (a, b) => b.vote_count - a.vote_count,
      );
      setResults(sortedResults.slice(0, 8));
      setIsOpen(true);
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchMovies]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          className="h-11 pr-9 pl-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
            aria-label="Clear search">
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="bg-popover border-border absolute top-full z-50 mt-2 max-h-[420px] w-full overflow-y-auto rounded-lg border shadow-lg">
          {isLoading ? (
            <div className="space-y-2 p-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <Skeleton className="h-18 w-12 shrink-0 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-destructive p-4 text-center text-sm">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No movies found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="p-1">
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-accent focus:bg-accent flex gap-3 rounded-md p-2 transition-colors focus:outline-none">
                  <div className="bg-muted relative h-18 w-12 shrink-0 overflow-hidden rounded">
                    {movie.poster_path ? (
                      <Image
                        src={getImageUrl(movie.poster_path, "w92")!}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium">{movie.title}</h4>
                    <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-sm">
                      {movie.release_date && (
                        <span>
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      )}
                      {movie.vote_average > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          {movie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                    {movie.overview && (
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                        {movie.overview}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
