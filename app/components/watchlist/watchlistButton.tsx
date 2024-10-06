"use client";
import { useState, useEffect, useRef } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import { useWatchlist } from "@/app/context/watchlistContext";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  isMovieInWatchlist,
} from "@/app/utils/watchlistUtils";
import { Spinner } from "flowbite-react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { setAuthToken } from "@/app/api/auth/auth";
import { useSession } from "next-auth/react";

const InWatchlist = () => (
  <>
    <FaCheck />
    <span>{"In Watchlist"}</span>
  </>
);
const AddtoWatchlist = () => (
  <>
    <FaPlus />
    <span>{"Add to Watchlist"}</span>
  </>
);
const SpinnerComponent = () => (
  <div className="flex justify-center">
    <Spinner />
  </div>
);

export const WatchlistButton = ({ contentId }: { contentId: string }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const watchlistIdRef = useRef("");
  const { watchlist, updateWatchlist } = useWatchlist();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const watchlists = await getWatchlist();
        updateWatchlist(watchlists);
        watchlistIdRef.current = watchlists.ID;
        setIsInWatchlist(isMovieInWatchlist(watchlist, contentId));
      } catch (error) {
        console.error("Error fetching watchlist status", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      setAuthToken(session.accessToken);
      checkWatchlistStatus();
      setIsLoggedIn(true);
    } else if (status === "unauthenticated") {
      setLoading(false);
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, isLoggedIn, status]);

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

  const buttonContent = isInWatchlist ? <InWatchlist /> : <AddtoWatchlist />;

  return (
    <div className="mb-4 flex flex-col">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded p-2"
        onClick={isInWatchlist ? handleRemove : handleAddToWatchlistClick}
      >
        <div className="flex gap-2 items-center justify-center">
          {loading ? <SpinnerComponent /> : buttonContent}
        </div>
      </button>

      {showMessage && (
        <p className="text-red-500 mt-2 w-40 text-center">
          Please log in to add this item to your watchlist.
        </p>
      )}
    </div>
  );
};
