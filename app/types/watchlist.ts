import { SetStateAction } from "react";

export type IWatchlistItem = {
  watchlist_item_id: string;
  title: string;
  genres: string[];
  poster_path: string | null;
  tmdb_id: string;
  overview: string;
  release_date: string;
  tmdb_rating: number | null;
  user_rating: number | null;
  video_links: string[];
};

// Do not change to lower case
export type IWatchlist = {
  Content: IWatchlistItem[];
  ID: string;
  Name: string;
};

export type IWatchlistHandlerProps = {
  watchlist: IWatchlist;
  updateWatchlist: (newWatchlist: IWatchlist) => void;
  mediaId: string;
  setIsInWatchlist: (value: SetStateAction<boolean>) => void;
};
