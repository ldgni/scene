import type { Movie, SearchResult, TVShow } from "@/lib/types";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Generic fetch function for TMDB API
async function fetchFromAPI(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${API_KEY || ""}` },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
}

// Search movies and TV shows
export async function searchMedia(query: string): Promise<SearchResult[]> {
  const data = await fetchFromAPI(
    `/search/multi?query=${encodeURIComponent(query)}`,
  );
  return data.results.filter(
    (item: SearchResult) =>
      item.media_type === "movie" || item.media_type === "tv",
  );
}

// Fetch movie details
export async function getMovieDetails(id: number): Promise<Movie> {
  const data = await fetchFromAPI(`/movie/${id}?append_to_response=credits`);
  return { ...data, media_type: "movie" };
}

// Fetch TV show details
export async function getTVShowDetails(id: number): Promise<TVShow> {
  const data = await fetchFromAPI(`/tv/${id}`);
  return { ...data, media_type: "tv" };
}
