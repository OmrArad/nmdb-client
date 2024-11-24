"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IWatchlistItem } from "@/app/types/watchlist";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRouter } from "next/navigation";
import WatchlistBookmark from "./watchlistBookmark";
import Ratings from "@/app/components/rating/listRating/ratings";
import TrailerButtonClientWrapper from "../trailer/trailerButtonClientWrapper";
import { RatedContentItem } from "@/app/types/ratings";
import { isMediaInWatchlist } from "@/app/utils/watchlistUtils";
import {findRating} from "@/app/utils/ratingUtils"
import {FaFilm, FaTv, FaThumbsUp } from "react-icons/fa";
import RegionSelector from "../media/RegionSelector";
import {
  IRecommendedItem,
  IRecommendedWatchlistItem,
} from "@/app/types/recommendations";

const WatchlistItem = ({
  media,
  shouldCheckisInWatchlistStatus = false,
}: {
  media:
    | IWatchlistItem
    | RatedContentItem
    | IRecommendedItem
    | IRecommendedWatchlistItem;
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
    streaming_services
    
  } = media;

  const { watchlist, updateWatchlist } = useWatchlist();
  const [isRatingFound, setIsRatingFound] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(
    shouldCheckisInWatchlistStatus
      ? isMediaInWatchlist(watchlist, tmdb_id)
      : true
  );
  
  
  const router = useRouter();
  console.log("watchlist item is" , media)
  
  const navLink = is_movie ? `/movies/${tmdb_id}` : `/tv/${tmdb_id}`;

  const handleNavigate = () => router.push(navLink);
  if (!isInWatchlist && ("is_watchlistobject" in media))
  {
      return null
  }
  //if ("is_rating" in media  )
 // {
  //  return null
 // }
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
              <Ratings isMovie={is_movie} media={media}  />
            </div>
            <p className="text-sm mt-2">{overview}</p>

            {video_links?.length > 0 && (
              <TrailerButtonClientWrapper videoKey={media.video_links} />
            )}
            {/* Recommended Label */}
{ media.is_liked == true && (
  <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
    Liked Recommendation
    <FaThumbsUp />
  </div>
)}
          </div>
        </div>
      </div>

    </div>
  );
};

export default WatchlistItem;
