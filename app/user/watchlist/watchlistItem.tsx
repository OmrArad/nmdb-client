"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IWatchlistItem } from "@/app/types/watchlist";
import { useWatchlist } from "./watchlistContext";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "./watchlistUtils";
import { useRouter } from "next/navigation"; // For programmatic navigation
import WatchlistBookmark from "./watchlistBookmark";
import Ratings from "./ratings";

const WatchlistItem = ({ media }: { media: IWatchlistItem }) => {
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(true);
  const router = useRouter();

  const {
    title,
    poster_path,
    release_date,
    overview,
    tmdb_rating,
    user_rating,
  } = media;

  const handleRemove = () =>
    handleRemoveFromWatchlist(
      watchlist!,
      updateWatchlist,
      media.tmdb_id,
      setIsInWatchlist
    );

  const handleAdd = () =>
    handleAddToWatchlist(
      watchlist!,
      updateWatchlist,
      media.tmdb_id,
      setIsInWatchlist
    );

  const navLink = `/movies/${media.tmdb_id}`;

  const handleNavigate = () => {
    router.push(navLink);
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4 relative">
      <div className="md:flex items-start p-4 relative">
        <Image
          src={poster_path ? poster_path : "/images/no-image-available.png"}
          alt={title}
          className="w-24 h-36 mr-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg"
          width={96}
          height={144}
          onClick={handleNavigate}
        />
        <WatchlistBookmark
          isInWatchlist={isInWatchlist}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />

        <div>
          <div className="flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Link
                  href={navLink}
                  className="text-xl font-bold transition-transform transform hover:scale-105 "
                >
                  {title}
                </Link>
                <p className="text-gray-400">{release_date}</p>
              </div>
              <Ratings tmdbRating={tmdb_rating} userRating={user_rating} />
            </div>
            <p className="text-sm mt-2">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
