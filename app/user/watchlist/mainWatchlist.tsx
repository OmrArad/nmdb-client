"use client";
import React, { useEffect } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import WatchlistItem from "../../components/watchlist/watchlistItem";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MainWatchlist = () => {
  const { watchlist, updateWatchlist } = useWatchlist();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist();
        updateWatchlist(watchlistData);
      } catch (error) {
        console.error("Failed to load watchlist", error);
      }
    };

    if (!watchlist && status === "authenticated") {
      fetchWatchlist();
    }
    if (status === "unauthenticated") {
      redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist, session]);

  if (!watchlist) {
    return <p>Loading watchlist...</p>;
  }

  return (
    <div className="bg-gray-100 rounded-xl md:px-12 md:w-5/6">
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
