export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  media_type: "movie";
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  status: string;
  genres: Genre[];
};

export type TVShow = {
  id: number;
  media_type: "tv";
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  status: string;
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
};

export type SearchResult = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
};
