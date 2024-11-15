"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRouter } from "next/navigation";
import Ratings from "@/app/components/rating/listRating/ratings";
import { isMediaInWatchlist } from "@/app/utils/watchlistUtils";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import TrailerButtonClientWrapper from "@/app/components/trailer/trailerButtonClientWrapper";
import {
  IRecommendedWatchlistItem,
  RecommendationWatchlistResponse,
} from "@/app/types/recommendations";
import { getRecommendationWatchlist } from "@/app/api/recommendations/recommendationsServices";
import { FaThumbsUp, FaThumbsDown, FaFilm, FaTv } from "react-icons/fa";

const RecommendationWatchlistItem = ({
  media,
  shouldCheckisInWatchlistStatus = false,
}: {
  media: IRecommendedWatchlistItem;
  shouldCheckisInWatchlistStatus?: boolean;
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

  // const [isInWatchlist, setIsInWatchlist] = useState(
  //   shouldCheckisInWatchlistStatus
  //     ? isMediaInWatchlist(recommendationWatchlist, tmdb_id)
  //     : true
  // );
  const router = useRouter();

  const navLink = is_movie ? `/movies/${tmdb_id}` : `/tv/${tmdb_id}`;

  const handleNavigate = () => router.push(navLink);

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
        {/* TODO: adjust watchlist bookmark to work with recommendation watchlist */}
        {/* <WatchlistBookmark
          mediaId={tmdb_id}
          setIsInWatchlist={setIsInWatchlist}
          updateWatchlist={updateWatchlist}
          watchlist={recommendationWatchlist}
          isInWatchlist={true}
          shouldShowIcon={false}
          isMovie={is_movie}
        /> */}

        <div className="flex-col">
          <div className="flex-col justify-between mt-4">
            <div className="flex justify-between items-center">
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
              <Ratings isMovie={is_movie} media={media} />
            </div>
            <p className="text-sm mt-2">{overview}</p>

            {video_links?.length > 0 && (
              <TrailerButtonClientWrapper videoKey={media.video_links} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationWatchlistItem;
