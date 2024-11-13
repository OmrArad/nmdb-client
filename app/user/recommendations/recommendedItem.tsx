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
import StreamingServicesSection from "./StreamingServicesSection";

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
    streaming_services
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
      await sendRecommendationFeedback(
        is_movie,
        media.tmdb_id,
        isLiked,
        media.recommended_by
      );
      setFeedbackGiven(isLiked);
    } catch (error) {
      console.error("Error sending feedback", error);
      setFeedbackGiven(null);
    }
  };

  useEffect(() => {
    if (resetFeedbackOnRefresh) {
      setFeedbackGiven(null);
    }
  }, [resetFeedbackOnRefresh, media]);

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">
      <div className="md:flex items-start p-4">
        <div className="relative flex-shrink-0">
          <Image
            src={poster_path || "/images/no-image-available.png"}
            alt={title}
            className="w-24 h-36 mr-4 cursor-pointer transition-transform rounded-lg hover:brightness-105 hover:scale-105 duration-300 ease-in-out"
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
        </div>

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

          <div className="flex-grow" />

          <div className="mt-3 flex flex-col gap-3">
            {video_links?.length > 0 && (
              <TrailerButtonClientWrapper videoKey={video_links} />
            )}

            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition hover:scale-105 ${
                    feedbackGiven === true
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-green-500 hover:bg-opacity-50"
                  }`}
                  onClick={() => handleFeedback(true)}
                  disabled={feedbackGiven !== null}
                >
                  <FaThumbsUp className="text-xs" />
                  Like
                </button>

                <button
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition hover:scale-105 ${
                    feedbackGiven === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-red-500 hover:bg-opacity-50"
                  }`}
                  onClick={() => handleFeedback(false)}
                  disabled={feedbackGiven !== null}
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