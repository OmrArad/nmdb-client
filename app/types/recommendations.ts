import { DetailedTVSeries } from "./tvShow";
import { DetailedMovie } from "./movie";

export interface TVRecommendations extends DetailedTVSeries {
  recommended_by: string;
  trailer: string;
}

export interface MovieRecommendations extends DetailedMovie {
  recommended_by: string;
  trailer: string;
}

export interface Recommendation extends DetailedMovie {
  recommended_by: string;
  trailer: string;
}

interface Genre {
  id: number;
  name: string;
}

interface VideoLink {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IRecommendedItem {
  is_movie: boolean;
  genres: Genre[];
  tmdb_id: string;
  item_id: string;
  list_id: string | null;
  overview: string;
  poster_path: string;
  release_date: string;
  small_poster_path: string;
  streaming_services: string | null;
  title: string;
  tmdb_rating: number;
  trailer: string | null;
  user_id: string;
  user_rating: number;
  video_links: string[];
  vote_average: number;
  Recommended_by: string;
}

export type GetRecommendationResponse = IRecommendedItem[];

export interface IRecommendedWatchlistItem {
  genres: Genre[];
  is_movie: boolean;
  overview: string;
  poster_path: string;
  release_date: string;
  small_poster_path: string;
  title: string;
  tmdb_id: string;
  tmdb_rating: number;
  user_rating: number | null;
  video_links: string[];
  watchlist_item_id: string;
}

export interface RecommendationFeedbackResponse {
  Content: IRecommendedWatchlistItem[];
  ID: string;
}

export type RecommendationWatchlistResponse = RecommendationFeedbackResponse;
