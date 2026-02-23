export type Genre = {
  id: number;
  name: string;
};

export type Creator = {
  id: number;
  name: string;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type Movie = {
  id: number;
  media_type: "movie";
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
  credits: {
    crew: CrewMember[];
  };
};

export type TVShow = {
  id: number;
  media_type: "tv";
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  created_by: Creator[];
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
