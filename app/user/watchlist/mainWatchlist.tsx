"use client";
import React, { useEffect } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import WatchlistItem from "./watchlistItem";
import { useWatchlist } from "./watchlistContext";

const MainWatchlist = () => {
  const { watchlist, updateWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist();
        updateWatchlist(watchlistData);
      } catch (error) {
        console.error("Failed to load watchlist", error);
      }
    };

    if (!watchlist) {
      fetchWatchlist();
    }
  }, [watchlist, updateWatchlist]);

  if (!watchlist) {
    return <p>Loading watchlist...</p>;
  }

  return (
    <div className="bg-gray-100 rounded-xl px-12">
      <h1 className="text-2xl font-bold container mx-auto px-4 pt-12">
        My Watchlist
      </h1>
      <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
        {watchlist.Content?.map((media) => (
          <WatchlistItem key={media.watchlist_item_id} media={media} />
        ))}
      </div>
    </div>
  );
};

export default MainWatchlist;
