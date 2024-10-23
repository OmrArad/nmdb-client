import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/app/api/watchlist/watchlistServices";
import { IWatchlist, IWatchlistItem } from "@/app/types/watchlist";
import { SetStateAction } from "react";
import toast from "react-hot-toast";

export const handleRemoveFromWatchlist = async (
  watchlist: IWatchlist,
  updateWatchlist: (newWatchlist: IWatchlist) => void,
  mediaId: string,
  setIsInWatchlist: (value: SetStateAction<boolean>) => void
) => {
  try {
    await removeFromWatchlist(mediaId, watchlist.ID);
    setIsInWatchlist(false);
    const updatedWatchlist = watchlist!;
    updatedWatchlist.Content = updatedWatchlist?.Content.filter(
      (content) => content.tmdb_id !== mediaId
    );
    updateWatchlist(updatedWatchlist);
    toast.success("Successfully removed from your watchlist!");
  } catch (error) {
    console.error("Error removing from watchlist", error);
  }
};

export const handleAddToWatchlist = async (
  watchlist: IWatchlist | null,
  updateWatchlist: (newWatchlist: IWatchlist) => void,
  mediaId: string,
  setIsInWatchlist: (value: SetStateAction<boolean>) => void,
  isMovie: boolean
) => {
  try {
    if (!watchlist) {
      watchlist = await getWatchlist();
      updateWatchlist(watchlist);
    }
    await addToWatchlist(watchlist.ID, mediaId, isMovie);
    setIsInWatchlist(true);
    // const updatedWatchlist = watchlist!;
    // updatedWatchlist?.Content.push(contentId)
    const updatedWatchlist = await getWatchlist();
    updateWatchlist(updatedWatchlist);
    toast.success("Successfully added to your watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist", error);
  }
};

export const isMediaInWatchlist = (
  watchlists: IWatchlist | null,
  contentId: string
): boolean => {
  return watchlists
    ? watchlists.Content.some(
        (item: IWatchlistItem) => item.tmdb_id === contentId
      )
    : false;
};
