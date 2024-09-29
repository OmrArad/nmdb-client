import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/app/api/watchlist/watchlistServices";
import { IWatchlist } from "@/app/types/watchlist";
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
  watchlist: IWatchlist,
  updateWatchlist: (newWatchlist: IWatchlist) => void,
  mediaId: string,
  setIsInWatchlist: (value: SetStateAction<boolean>) => void
) => {
  try {
    await addToWatchlist(watchlist.ID, mediaId, true);
    setIsInWatchlist(true);
    const updatedWatchlist = await getWatchlist();
    // const updatedWatchlist = watchlist!;
    // updatedWatchlist?.Content.push(contentId)
    updateWatchlist(updatedWatchlist);
    toast.success("Successfully added to your watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist", error);
  }
};
