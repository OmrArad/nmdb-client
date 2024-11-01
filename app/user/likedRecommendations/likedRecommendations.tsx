"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { getRecommendationWatchlist } from "@/app/api/recommendations/recommendationsServices";
import { IRecommendedWatchlistItem } from "@/app/types/recommendations";
import RecommendationWatchlistItem from "./recommendationWatchlistItem";

const LikedRecommendations = () => {
  const { ratings } = useRatings();
  const [recommendationWatchlist, setRecommendationWatchlist] = useState<
    IRecommendedWatchlistItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [ratings, session, status]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendationWatchlist();
        setRecommendationWatchlist(data.Content);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <div className="flex bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6 h-[calc(800px)]">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold container mx-auto px-4">
            Liked Recommendations
          </h1>
        </div>
        <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
          {recommendationWatchlist.map((media) => (
            <RecommendationWatchlistItem
              key={media.watchlist_item_id}
              media={media}
              shouldCheckisInWatchlistStatus={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedRecommendations;
