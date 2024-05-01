"use client";
import React, { useEffect, useState } from "react";
import {
  getUserWatchlists,
  createWatchlist,
  Watchlist,
} from "@/app/api/watchlist/watchlistServices";

const WatchlistComponent = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>();

  useEffect(() => {
    loadWatchlists();
  }, []);

  const loadWatchlists = async () => {
    try {
      const data = await getUserWatchlists(123);
      setWatchlists(data);
    } catch (error) {
      console.error("Failed to load watchlists:", error);
    }
  };

  const handleCreateWatchlist = async () => {
    try {
      const newWatchlist = await createWatchlist();
      setWatchlists([...(watchlists ?? []), newWatchlist]);
    } catch (error) {
      console.error("Failed to create watchlist:", error);
    }
  };

  return (
    <div>
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
