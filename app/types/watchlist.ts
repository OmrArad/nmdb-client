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
};

// Do not change to lower case
export type IWatchlist = {
  Content: IWatchlistItem[];
  ID: string;
  Name: string;
};
