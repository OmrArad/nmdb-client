"use client";

import { useState, useEffect, useRef } from "react";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/app/api/watchlist/watchlistServices";
import { WatchlistItem } from "@/app/types/watchlist";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const WatchlistButton = ({ contentId }: { contentId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const watchlistIdRef = useRef("");

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const watchlists = await getWatchlist();
        watchlistIdRef.current = watchlists.id;
        const isMovieInWatchlist =
          watchlists &&
          watchlists.content.some(
            (item: WatchlistItem) => item.tmdb_id === contentId
          );
        setIsInWatchlist(isMovieInWatchlist);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response!.status === 401) {
          setIsLoggedIn(false);
        }
        console.error("Error fetching watchlist status", error);
      } finally {
        setLoading(false);
      }
    };

    checkWatchlistStatus();
  }, [contentId, isLoggedIn]);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(watchlistIdRef.current, contentId, true); // Assuming true for is_movie
      setIsInWatchlist(true);
      toast.success("Successfully added to your watchlist!");
    } catch (error) {
      console.error("Error adding to watchlist", error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      await removeFromWatchlist(contentId, watchlistIdRef.current);
      setIsInWatchlist(false);
      toast.success("Successfully removed from your watchlist!");
    } catch (error) {
      console.error("Error removing from watchlist", error);
    }
  };

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
            onClick={handleRemoveFromWatchlist}
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-yellow-500"
            onClick={handleAddToWatchlist}
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