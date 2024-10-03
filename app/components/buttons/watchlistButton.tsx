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
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";
import { Spinner } from "flowbite-react";

export const WatchlistButton = ({ contentId }: { contentId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const watchlistIdRef = useRef("");
  const { watchlist, updateWatchlist } = useWatchlist();
  const { data: session } = useSession();

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
        if (session && err.response?.status === 401) {
          await signOut();
        }
        setIsLoggedIn(false);
        console.error("Error fetching watchlist status", error);
      } finally {
        setLoading(false);
      }
    };

    checkWatchlistStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, isLoggedIn, session]);

  const handleAdd = () =>
    handleAddToWatchlist(
      watchlist,
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

  const handleAddToWatchlistClick = () => {
    isLoggedIn ? handleAdd() : handleDisabledButtonClick();
  };

  const handleDisabledButtonClick = () => {
    setShowMessage(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-col">
      {isInWatchlist ? (
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={handleRemove}
        >
          Remove from Watchlist
        </button>
      ) : (
        <>
          <button
            className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
            onClick={handleAddToWatchlistClick}
          >
            Add to Watchlist
          </button>
          {showMessage && (
            <p className="text-red-500 mt-2 w-40 text-center">
              Please log in to add this item to your watchlist.
            </p>
          )}
        </>
      )}
    </div>
  );
};
