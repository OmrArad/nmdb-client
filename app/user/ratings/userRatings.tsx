"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { RatedContentItem } from "@/app/types/ratings";
import WatchlistStreamingServices from "@/app/components/streamingServices/watchlistStreamingServices";
import WatchlistItem from "@/app/components/watchlist/watchlistItem";
import { IWatchlistItem } from "@/app/types/watchlist";
import { getUserRatingsList } from "@/app/api/ratings/ratingsServices";

const UserRatings = () => {
  const { ratings, updateRatings } = useRatings();
  const [filteredRatings, setFilteredRatings] = useState<RatedContentItem[]>(
    ratings || []
  );
  const { data: session, status } = useSession();
  const filteredRatingsItems =
    filteredRatings.length > 0 ? filteredRatings : ratings || [];

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        // const RatingsData = await getUserRatingsList();
        // updateRatings(RatingsData.content);
      } catch (error) {
        console.error("Failed to load Ratings", error);
      }
    };

    if (!ratings && status === "authenticated") {
      fetchRatings();
    }
    if (status === "unauthenticated") {
      redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings, session]);

  if (!ratings) {
    return <p>Loading Ratings...</p>;
  }

  return (
    <div className=" flex bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold container mx-auto px-4 ">
          My Ratings
        </h1>
        <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
          {/* <WatchlistStreamingServices
            setFilteredWatchlist={setFilteredRatings}
          /> */}
          {filteredRatingsItems.map((media) => (
            <WatchlistItem key={media.item_id} media={media} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRatings;
