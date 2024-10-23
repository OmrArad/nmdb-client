// Type for individual ratings
export interface Rating {
  tmdb_id: string;
  is_movie: boolean;
  rating: number;
}

export type RatingItem = {
  ID: string;
  User_ID: string;
  is_movie: boolean;
  media_ID: string;
  rating: number;
  rating_date: string;
};

export type RatingsResponse = {
  ratings: RatingItem[];
};

export interface VideoLink {
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

export interface RatedContentItem {
  genres: string[];
  is_movie: boolean;
  item_id: string;
  list_id: string | null;
  overview: string;
  poster_path: string;
  release_date: string;
  small_poster_path: string;
  streaming_services: string[] | null;
  title: string;
  tmdb_id: string;
  tmdb_rating: number;
  user_id: string;
  user_rating: number;
  video_links: VideoLink[];
}

export interface UserRatingsListResponse {
  content: RatedContentItem[];
  list_id: string | null;
  user_id: string;
}

export type UserDataRatings = {
  Content: RatedContentItem[];
};
