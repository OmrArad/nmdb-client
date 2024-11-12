"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRouter } from "next/navigation";
import Ratings from "@/app/components/rating/listRating/ratings";
import { isMediaInWatchlist } from "@/app/utils/watchlistUtils";
import { IRecommendedItem } from "@/app/types/recommendations";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import TrailerButtonClientWrapper from "@/app/components/trailer/trailerButtonClientWrapper";
import { FaThumbsUp, FaThumbsDown, FaFilm, FaTv } from "react-icons/fa";
import { sendRecommendationFeedback } from "@/app/api/recommendations/recommendationFeedbackServices";

const RecommendedItem = ({
  media,
  resetFeedbackOnRefresh,
}: {
  media: IRecommendedItem;
  resetFeedbackOnRefresh: boolean;
}) => {
  const {
    title,
    poster_path,
    release_date,
    overview,
    tmdb_id,
    video_links,
    is_movie,
  } = media;

  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(
    isMediaInWatchlist(watchlist, tmdb_id)
  );
  const router = useRouter();

  const navLink = is_movie ? `/movies/${tmdb_id}` : `/tv/${tmdb_id}`;

  const handleNavigate = () => router.push(navLink);

  const handleFeedback = async (isLiked: boolean) => {
    try {
      setFeedbackGiven(isLiked);
      const recommendationWatchlist = await sendRecommendationFeedback(
        is_movie,
        media.tmdb_id,
        isLiked,
        media.Recommended_by
      );

      //console.log("recommendationWatchlist: ", recommendationWatchlist);

      setFeedbackGiven(isLiked);
    } catch (error) {
      console.error("Error sending feedback", error);
      setFeedbackGiven(null);
    }
  };

  // Reset feedback state if required on refresh
  useEffect(() => {
    if (resetFeedbackOnRefresh) {
      setFeedbackGiven(null);
    }
  }, [resetFeedbackOnRefresh, media]);
  if (feedbackGiven !== null) return null;
  return (   
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4 relative">
      <div className="md:flex items-start p-4 relative">
        <Image
          src={poster_path || "/images/no-image-available.png"}
          alt={title}
          className="w-24 h-36 mr-4 cursor-pointer transition-transform transform rounded-lg hover:brightness-105 hover:scale-105 duration-300 ease-in-out"
          width={96}
          height={144}
          onClick={handleNavigate}
        />
        <WatchlistBookmark
          mediaId={tmdb_id}
          setIsInWatchlist={setIsInWatchlist}
          updateWatchlist={updateWatchlist}
          watchlist={watchlist}
          isInWatchlist={isInWatchlist}
          shouldShowIcon={false}
          isMovie={is_movie}
        />

        <div className="flex-col w-full relative">
          <div className="absolute top-0 right-0">
            <Ratings isMovie={is_movie} media={media} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                {is_movie ? <FaFilm /> : <FaTv />} {/* Icon */}
                {is_movie ? "Movie" : "TV Show"}
              </span>
              <Link
                href={navLink}
                className="text-xl font-bold transition-transform transform hover:scale-105"
              >
                {title}
              </Link>
              <p className="text-gray-400">{release_date}</p>
            </div>
          </div>
          <p className="text-sm mt-2">{overview}</p>
          
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
         Recommended by: {media.Recommended_by}
          </div>

          {video_links?.length > 0 && (
            <TrailerButtonClientWrapper videoKey={media.video_links} />
          )}

          <div className="flex gap-2 mt-4">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition hover:scale-105 hover:bg-green-500 hover:bg-opacity-50 ${
                feedbackGiven === true
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFeedback(true)}
              disabled={feedbackGiven !== null}
            >
              <FaThumbsUp />
              Like
            </button>

            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition hover:scale-105 hover:bg-red-500 hover:bg-opacity-50 ${
                feedbackGiven === false
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFeedback(false)}
              disabled={feedbackGiven !== null}
            >
              <FaThumbsDown />
              Dislike
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItem;
