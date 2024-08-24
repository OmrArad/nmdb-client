export type WatchlistItem = {
  genres: string[];
  poster_path: string;
  title: string;
  tmdb_id: string;
  watchlist_item_id: string;
};

// Do not change to lower case
export type Watchlist = {
  Content: WatchlistItem[];
  ID: string;
  Name: string;
};
