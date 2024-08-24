"use client";
import React, { useEffect, useState } from "react";
import {
  getUserWatchlists,
  createWatchlist,
  getWatchlist,
} from "@/app/api/watchlist/watchlistServices";
import WatchlistPage from "./watchlistPage";
import toast from "react-hot-toast";
import type { Watchlist } from "@/app/types/watchlist";

const WatchlistComponent = () => {
  const [mainWatchlist, setMainWatchlist] = useState<Watchlist>();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);

  useEffect(() => {
    loadWatchlists();
    loadMainWatchlist();
  }, []);

  const loadWatchlists = async () => {
    try {
      const data = await getUserWatchlists();
      setWatchlists(data);
    } catch (error) {
      console.error(`Failed to load watchlists: ${error}`);
    }
  };

  const loadMainWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setMainWatchlist(data);
    } catch (error) {
      console.error(`Failed to load main watchlist: ${error}`);
    }
  };

  const handleCreateWatchlist = async () => {
    try {
      const newWatchlist = await createWatchlist();
      setWatchlists([...(watchlists ?? []), newWatchlist]);
      toast.success(`New watchlist created successfuly: ${newWatchlist.Name}`);
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
      {mainWatchlist ? (
        <div key={mainWatchlist.ID}>{mainWatchlist.Name}</div>
      ) : null}
      <span>All watchlists: </span>
      {Array.isArray(watchlists) &&
        watchlists.map((watchlist) => (
          <div key={watchlist.ID}>{watchlist.Name}</div>
        ))}
    </div>
  );
};

export default WatchlistComponent;
