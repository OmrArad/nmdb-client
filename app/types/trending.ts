import { Movie } from "./movie";

export type TrendingMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
