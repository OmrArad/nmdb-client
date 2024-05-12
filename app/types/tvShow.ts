interface TVShow {
  backdrop_path: string | null;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string | null;
  adult: boolean;
  name: string;
  original_language: string;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface TrendingTVShow extends TVShow {
  media_type: string;
  genre_ids: number[];
}

export interface DetailedTVSeries extends TVShow {
  created_by: any[]; // More specific type needed if structure is known
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
}
