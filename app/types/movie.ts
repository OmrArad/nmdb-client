import { CrewMember } from "./crew";
import { TrendingMovies } from "./trending";

interface BaseMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  video_links: string[];
  vote_average: number;
  vote_count: number;
}

export interface TrendingMovie extends BaseMovie {
  media_type: string;
  genre_ids: number[];
}

export interface DetailedMovie extends BaseMovie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  director: CrewMember | null;
  screenwriter: CrewMember | null;
  recommendations: TrendingMovie[] | null;
}

export type Movie = TrendingMovie | DetailedMovie;
