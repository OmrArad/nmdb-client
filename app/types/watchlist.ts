export type WatchlistItem = {
  genres: string[];
  poster_path: string;
  title: string;
  tmdb_id: string;
  watchlist_item_id: string;
};

export type Watchlist = {
  content: WatchlistItem[];
  id: string;
  name: string;
};