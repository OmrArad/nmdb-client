"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { getRecommendations } from "@/app/api/recommendations/recommendationsServices";
import { IRecommendedItem } from "@/app/types/recommendations";
import RecommendedItem from "./recommendedItem";

const UserRecommendations = () => {
  const { ratings } = useRatings();
  const [recommendations, setRecommendations] = useState<IRecommendedItem[]>(
    []
  );
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [ratings, session, status]);

  const handleGetRecommendations = async () => {
    try {
      const recommendations = await getRecommendations();
      console.log("recommendations: ", recommendations); // Replace this with whatever you want to do with the recommendations
      setRecommendations(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  if (!ratings) {
    return <p>Please rate to be able to get recommendations</p>;
  }

  return (
    <div className="flex bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold container mx-auto px-4">
            My Recommendations
          </h1>
          <button
            onClick={handleGetRecommendations}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Get Recommendations Based on my Rating List
          </button>
        </div>
        <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
          {recommendations.map((media) => (
            <RecommendedItem
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

export default UserRecommendations;
