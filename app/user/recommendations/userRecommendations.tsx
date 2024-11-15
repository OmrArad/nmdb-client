"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { getRecommendations } from "@/app/api/recommendations/recommendationsServices";
import { IRecommendedItem } from "@/app/types/recommendations";
import RecommendedItem from "./recommendedItem";
import { FaFilm } from "react-icons/fa"; // Icon for button

const UserRecommendations = () => {
  const { ratings } = useRatings();
  const [recommendations, setRecommendations] = useState<IRecommendedItem[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [ratings, session, status]);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const fetchedRecommendations = await getRecommendations();
      console.log("recommendations: ", fetchedRecommendations);
      setRecommendations(fetchedRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Trigger the initial recommendation fetch on component mount
  }, []); // Empty dependency array means it runs once on mount

  if (!ratings) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <p className="text-center text-gray-600 font-semibold">
          Please rate to be able to get recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-xl md:px-12 pt-12 gap-4 w-5/6">
      <h1 className="text-3xl font-bold mb-4">My Recommendations</h1>

      <div className="flex flex-col items-center h-[calc(700px)] justify-center bg-white rounded-lg shadow-lg p-6">
        {!recommendations.length && !loading && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Discover Your Next Favorite!
            </h2>
            <p className="text-gray-600 mb-6">
              Click the button below to get personalized content recommendations
              based on your ratings.
            </p>
            <button
              onClick={handleGetRecommendations}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
            >
              <FaFilm className="text-lg" />
              Get Recommendations
            </button>
          </>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center w-full max-w-lg h-48">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-gray-600 text-center">
              We are working on finding the best content for you...
            </p>
          </div>
        ) : (
          <>
            {recommendations.length > 0 && (
              <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
                <div className="flex justify-center mb-4">
                  <button
                    onClick={handleGetRecommendations} // Call the same function for new recommendations
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
                  >
                    <FaFilm className="text-lg" />
                    Get More Recommendations
                  </button>
                </div>

                {recommendations.map((media) => (
                  <RecommendedItem
                    key={media.tmdb_id}
                    media={media}
                    resetFeedbackOnRefresh
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserRecommendations;
