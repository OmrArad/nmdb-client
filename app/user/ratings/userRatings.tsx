"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { RatedContentItem } from "@/app/types/ratings";
import WatchlistItem from "@/app/components/watchlist/watchlistItem";
import { getRecommendations } from "@/app/api/recommendations/recommendationsServices";

const UserRatings = () => {
  const { ratings } = useRatings();
  const [filteredRatings, setFilteredRatings] = useState<RatedContentItem[]>(
    ratings || []
  );
  const { data: session, status } = useSession();
  const filteredRatingsItems =
    filteredRatings.length > 0 ? filteredRatings : ratings || [];

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [ratings, session, status]);

  const handleGetRecommendations = async () => {
    try {
      const recommendations = await getRecommendations();
      console.log("recommendations: ", recommendations); // Replace this with whatever you want to do with the recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  if (!ratings) {
    return <p>Loading Ratings...</p>;
  }

  return (
    <div className="flex bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold container mx-auto px-4">
            My Ratings
          </h1>
          <button
            onClick={handleGetRecommendations}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Get Recommendations
          </button>
        </div>
        <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
          {filteredRatingsItems.map((media) => (
            <WatchlistItem
              key={media.item_id}
              media={media}
              shouldCheckisInWatchlistStatus={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRatings;
