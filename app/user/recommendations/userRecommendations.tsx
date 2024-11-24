"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRatings } from "@/app/context/userRatingContext";
import { getRecommendations } from "@/app/api/recommendations/recommendationsServices";
import { IRecommendedItem } from "@/app/types/recommendations";
import { FaFilm, FaTv, FaRandom } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { VscSymbolKeyword } from "react-icons/vsc";
import RecommendedItem from "./recommendedItem";

// Define types for recommendation preferences
type MediaType = 'movies' | 'tvshows' | 'mixed';
type AlgorithmType = 'algorithm1' | 'algorithm2' | 'mixed';

 const UserRecommendations = () => {
  const { ratings } = useRatings();
  const [recommendations, setRecommendations] = useState<IRecommendedItem[]>([]);
  
  const [loading, setLoading] = useState(false);
  
  const { data: session, status } = useSession();
  
  // New state for recommendation preferences
  const [mediaType, setMediaType] = useState<MediaType>('mixed');
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>('mixed');

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [ratings, session, status]);

  const handleGetRecommendations = async () => {
    setRecommendations([])
    setLoading(true);
    try {
      const fetchedRecommendations = await getRecommendations(
        mediaType,
        algorithmType
      );
      console.log("recommendations: ", fetchedRecommendations);
      setRecommendations(fetchedRecommendations);
      
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const RecommendationSelectionSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Customize Your Recommendations
      </h2>

      {/* Media Type Selection */}
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-700">Select Content Type</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { type: 'movies', icon: <FaFilm />, label: 'Movies' },
            { type: 'tvshows', icon: <FaTv />, label: 'TV Shows' },
            { type: 'mixed', icon: <FaRandom />, label: 'Mixed' }
          ].map(({ type, icon, label }) => (
            <button 
              key={type}
              onClick={() => setMediaType(type as MediaType)}
              className={`
                flex flex-col items-center justify-center 
                py-4 rounded-xl transition-all duration-300 
                ${mediaType === type 
                  ? 'bg-blue-500 text-white scale-105 shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}
              `}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Type Selection */}
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-700">Select Algorithm</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { type: 'algorithm1', icon: <IoMdTrendingUp/>, label: 'Algorithm 1: Popularity' },
            { type: 'algorithm2' ,icon: <VscSymbolKeyword/>, label: 'Algorithm 2: Keywords' },
            { type: 'mixed', icon: <FaRandom/>, label: 'Mixed' }
          ].map(({ type, icon, label }) => (
            <button 
              key={type}
              onClick={() => setAlgorithmType(type as AlgorithmType)}
              className={`
                flex flex-col items-center justify-center 
                py-4 rounded-xl transition-all duration-300 
                ${algorithmType === type 
                  ? 'bg-purple-500 text-white scale-105 shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'}
              `}
            >
              <span className="text-2xl mb-2">{icon}</span>
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGetRecommendations}
          className="
            mt-6 px-8 py-3 
            bg-gradient-to-r from-blue-500 to-purple-600 
            text-white font-bold 
            rounded-full 
            hover:from-blue-600 hover:to-purple-700 
            transition-all duration-300 
            transform hover:scale-105 
            shadow-xl
          "
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );

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
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen py-12 px-4">      
      <div
      className={
        recommendations.length ===0
      ? "w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      : ""
      }
       >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">My Recommendations</h1>
          
         
        </div>

        <div className="p-8">
          {(recommendations.length ===0 && !loading && <RecommendationSelectionSection />)}

          {loading ? (
            <div className="flex flex-col justify-center items-center w-full h-48">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
              <p className="text-gray-600 text-center">
                We are working on finding the best content for you...
              </p>
            </div>
          ) : (
            recommendations.length > 0 && (
              <div className="container mx-auto flex justify-center">
                {/* Recommendations with Options */}
                <div className="w-1/3 bg-white rounded-lg p-4">
                  <RecommendationSelectionSection />
                </div>

                <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
                  {recommendations.map((media) => (
                    <RecommendedItem
                      key={media.tmdb_id}
                      media={media}
                      resetFeedbackOnRefresh
                      recommendations={recommendations}
                      setRecommendations={setRecommendations}
                      
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRecommendations;