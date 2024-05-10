"use client";
import React, { useEffect, useState } from "react";
import {
  getUserWatchlists,
  createWatchlist,
  Watchlist,
} from "@/app/api/watchlist/watchlistServices";
import WatchlistPage from "./watchlistPage";
import toast from "react-hot-toast";

const WatchlistComponent = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>();

  useEffect(() => {
    loadWatchlists();
  }, []);

  const loadWatchlists = async () => {
    try {
      const data = await getUserWatchlists();
      setWatchlists(data);
    } catch (error) {
      toast.error(`Failed to load watchlists: ${error}`);
    }
  };

  const handleCreateWatchlist = async () => {
    try {
      const newWatchlist = await createWatchlist();
      setWatchlists([...(watchlists ?? []), newWatchlist]);
      toast.success(`New watchlist created successfuly: ${newWatchlist.name}`);
    } catch (error) {
      toast.error(`Failed to create watchlist: ${error}`);
    }
  };

  return (
    <div className="container mx-auto my-2 py-4 px-16">
      <WatchlistPage />
      <button className="text-white" onClick={handleCreateWatchlist}>
        Create New Watchlist
      </button>
      {(watchlists ?? []).map((watchlist) => (
        <div key={watchlist.id}>{watchlist.name}</div>
      ))}
    </div>
  );
};

export default WatchlistComponent;
