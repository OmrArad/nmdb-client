import { SetStateAction } from "react";

export type IWatchlistItem = {
  watchlist_item_id: string;
  title: string;
  name?: string;
  genres: string[];
  poster_path: string | null;
  tmdb_id: string;
  overview: string;
  release_date: string;
  tmdb_rating: number | null;
  user_rating: number | null;
  video_links: string[];
  is_movie: boolean;
  streaming_services: string[];
  is_liked: boolean;
};

// Do not change to lower case
export type IWatchlist = {
  Content: IWatchlistItem[];
  ID: string;
  Name?: string;
};

export type IWatchlistHandlerProps = {
  watchlist: IWatchlist;
  updateWatchlist: (newWatchlist: IWatchlist) => void;
  mediaId: string;
  setIsInWatchlist: (value: SetStateAction<boolean>) => void;
};

// Type for individual content items in the watchlist
export interface WatchlistContentItem {
  tmdb_id: string;
  is_movie: boolean;
  title?: string;
  name?: string;
}

// Type for the watchlist content array
export interface WatchlistContent {
  Content: WatchlistContentItem[];
  ID: string;
}

// Type for the main watchlist structure
export interface MainWatchlist {
  Content: IWatchlist;
  ID: string;
}
// export interface MainWatchlist {
//   Content: WatchlistContent;
//   ID: string;
// }
