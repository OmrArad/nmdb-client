"use client";
import React, { useEffect, useState } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import WatchlistItem from "../../components/watchlist/watchlistItem";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import WatchlistStreamingServices from "@/app/components/streamingServices/watchlistStreamingServices";
import { IWatchlistItem } from "@/app/types/watchlist";
import RegionSelector from "@/app/components/media/RegionSelector";

const MainWatchlist = () => {
  const { watchlist } = useWatchlist();
  const [filteredWatchlist, setFilteredWatchlist] = useState<IWatchlistItem[]>(
    []
  );
  const { data: session, status } = useSession();
  const [selectedRegion, setSelectedRegion] = useState('US');
  
  const filteredWatchlistItems =
    filteredWatchlist.length > 0 ? filteredWatchlist : watchlist?.Content || [];

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        // const watchlistData = await getWatchlist();
        // updateWatchlist(watchlistData);
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

  useEffect(() => {
    if (watchlist) {
      setFilteredWatchlist([]);
    }
  }, [selectedRegion, watchlist]);

  if (!watchlist) {
    return <p>Loading watchlist...</p>;
  }

  return (
    <div className="flex bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold container mx-auto px-4">
          My Watchlist
        </h1>
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Check Streaming Availability by Region:</h3>
          <RegionSelector 
            initialRegion={selectedRegion} 
            onRegionChange={setSelectedRegion}
          />
        </div>
        <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
          <WatchlistStreamingServices
            setFilteredWatchlist={setFilteredWatchlist}
            region={selectedRegion}
          />
          {filteredWatchlistItems.map((media) => (
            <WatchlistItem key={media.watchlist_item_id} media={media} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainWatchlist;