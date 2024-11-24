"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef,useEffect, useState } from "react";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRouter } from "next/navigation";
import Ratings from "@/app/components/rating/listRating/ratings";
import { isMediaInWatchlist } from "@/app/utils/watchlistUtils";
import { IRecommendedItem } from "@/app/types/recommendations";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import TrailerButtonClientWrapper from "@/app/components/trailer/trailerButtonClientWrapper";
import { FaThumbsUp, FaThumbsDown, FaFilm, FaTv } from "react-icons/fa";
import { sendRecommendationFeedback } from "@/app/api/recommendations/recommendationFeedbackServices";
import StreamingServicesSection from "./StreamingServicesSection";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import { useRatings } from "@/app/context/userRatingContext";


const RecommendedItem = ({
  media,
  resetFeedbackOnRefresh,
  recommendations,
  setRecommendations,
}: {
  media: IRecommendedItem;
  resetFeedbackOnRefresh: boolean;
  recommendations:IRecommendedItem[]
  setRecommendations: React.Dispatch<React.SetStateAction<IRecommendedItem[]>>
 
    
}) => {
  const {
    title,
    poster_path,
    release_date,
    overview,
    tmdb_id,
    video_links,
    is_movie,
    streaming_services,
    is_liked,
    user_rating,
    trailer
  } = media;

  const removeRecommendationById = (id: string, is_movie:boolean) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.filter((item) => (item.tmdb_id !== id && item.is_liked !=is_movie))
    );
  };
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [feedbackGiventoload, setFeedbackGiventoload] = useState<boolean | null>(null);

  const { watchlist, updateWatchlist } = useWatchlist();
  
  const [isInWatchlist, setIsInWatchlist] = useState(
    isMediaInWatchlist(watchlist, tmdb_id)
  );
  const router = useRouter();
  const navLink = is_movie ? `/movies/${tmdb_id}` : `/tv/${tmdb_id}`;
 
 

 
 
  
   
  const handleNavigate = () => router.push(navLink);

  const handleFeedback = async (isLiked: boolean) => {
    try {

      setFeedbackGiventoload(isLiked);
     

    // Use a ref to track the current value of canLoad
    

     
  
      
      
     await sendRecommendationFeedback(
        is_movie,
        media.tmdb_id,
        isLiked,
        media.Recommended_by
      );
      removeRecommendationById(media.tmdb_id,media.is_movie)
      setFeedbackGiven(isLiked);     
      
      
      const newWatchlist = await getWatchlist();
      updateWatchlist(newWatchlist);
    } catch (error) {
      console.error("Error sending feedback", error);
      setFeedbackGiven(null);
      setFeedbackGiventoload(null)
      
    }
  };

  useEffect(() => {
    if (resetFeedbackOnRefresh) {
      setFeedbackGiven(null);
    }
  }, [resetFeedbackOnRefresh, media]);
  if (feedbackGiven !== null) {
    return null; // Render nothing if feedback has been given
  }
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4 relative">
      <div className="md:flex items-start p-4 relative">
        <Image
          priority = {true}
          src={poster_path || "/images/no-image-available.png"}
          alt={title}
          className="w-24 h-36 mr-4 cursor-pointer transition-transform transform rounded-lg hover:brightness-105 hover:scale-105 duration-300 ease-in-out"
          width={96}
          height={144}
          onClick={handleNavigate}
        />
        {/*
        <WatchlistBookmark
          mediaId={tmdb_id}
          setIsInWatchlist={setIsInWatchlist}
          updateWatchlist={updateWatchlist}
          watchlist={watchlist}
          isInWatchlist={isInWatchlist}
          shouldShowIcon={false}
          isMovie={is_movie}
        />
        */}
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                {is_movie ? <FaFilm /> : <FaTv />}
                {is_movie ? "Movie" : "TV Show"}
              </span>
              <Link
                href={navLink}
                className="text-xl font-bold transition-transform hover:scale-105"
              >
                {title}
              </Link>
              <p className="text-gray-400 text-sm">{release_date}</p>
            </div>
            <Ratings isMovie={is_movie} media={media} />
          </div>
          <StreamingServicesSection
                services={Object.fromEntries(
                  Object.entries(streaming_services || {}).map(([country, services]) => [
                    country,
                    services.map((service) => ({
                      ...service,
                      provider_id: service.provider_id.toString(),
                      provider_name: service.provider_name,
                    })),
                  ])
                )}
              />
          <p className="text-sm mt-2 text-gray-700 line-clamp-2 hover:line-clamp-none">
            {overview}
          </p>
          
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
         Recommended by: {media.Recommended_by}
          </div>

          <div className="flex-grow" />

          <div className="mt-3 flex flex-col gap-3">
            {trailer!= null && (
              <TrailerButtonClientWrapper videoKey={trailer} />
            )}

            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition hover:scale-105 ${
                    feedbackGiventoload === true
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-green-500 hover:bg-opacity-50"
                  }`}
                  onClick={() => handleFeedback(true)}
                  disabled={feedbackGiventoload !== null}
                >
                  <FaThumbsUp className="text-xs" />
                  Like
                </button>

                <button
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition hover:scale-105 ${
                    feedbackGiventoload === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-red-500 hover:bg-opacity-50"
                  }`}
                  onClick={() => handleFeedback(false)}
                  disabled={feedbackGiventoload !== null}
                >
                  <FaThumbsDown className="text-xs" />
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItem;