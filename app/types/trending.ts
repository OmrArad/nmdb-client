import type { TrendingMovie } from "./movie";
import type { TrendingTVShow } from "./tvShow";

export type TrendingMovies = {
  page: number;
  results: TrendingMovie[];
  total_pages: number;
  total_results: number;
};

export type TrendingTVShows ={
  page: number;
  results: TrendingTVShow[];
  total_pages: number;
  total_results: number;
};
