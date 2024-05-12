import type { TrendingMovie } from "./movie";

export type TrendingMovies = {
  page: number;
  results: TrendingMovie[];
  total_pages: number;
  total_results: number;
};

// export type TrendingShows = {
//   page: number;
//   results: TrendingShow[];
//   total_pages: number;
//   total_results: number;
// };
