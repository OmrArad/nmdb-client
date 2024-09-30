"use client";
import { useState, useEffect, useRef } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import { IWatchlistItem } from "@/app/types/watchlist";
import { AxiosError } from "axios";
import { useWatchlist } from "@/app/user/watchlist/watchlistContext";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "@/app/user/watchlist/watchlistUtils";

export const WatchlistButton = ({ contentId }: { contentId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const watchlistIdRef = useRef("");
  const { watchlist, updateWatchlist } = useWatchlist();

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const watchlists = await getWatchlist();
        updateWatchlist(watchlists);
        watchlistIdRef.current = watchlists.ID;
        const isMovieInWatchlist =
          watchlists &&
          watchlists.Content.some(
            (item: IWatchlistItem) => item.tmdb_id === contentId
          );
        setIsInWatchlist(isMovieInWatchlist);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          setIsLoggedIn(false);
        }
        console.error("Error fetching watchlist status", error);
      } finally {
        setLoading(false);
      }
    };

    checkWatchlistStatus();
  }, [contentId, isLoggedIn]);

  const handleAdd = () =>
    handleAddToWatchlist(
      watchlist!,
      updateWatchlist,
      contentId,
      setIsInWatchlist
    );

  const handleRemove = () =>
    handleRemoveFromWatchlist(
      watchlist!,
      updateWatchlist,
      contentId,
      setIsInWatchlist
    );

  const handleDisabledButtonClick = () => {
    setShowMessage(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      {isLoggedIn ? (
        isInWatchlist ? (
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-yellow-500"
            onClick={handleRemove}
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-yellow-500"
            onClick={handleAdd}
          >
            Add to Watchlist
          </button>
        )
      ) : (
        <>
          <button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={handleDisabledButtonClick}
          >
            Add to Watchlist
          </button>
          {showMessage && (
            <p className="text-red-500 mt-2">
              Please log in to add or remove items from your watchlist.
            </p>
          )}
        </>
      )}
    </div>
  );
};
