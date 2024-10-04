"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IWatchlistHandlerProps, IWatchlistItem } from "@/app/types/watchlist";
import { useWatchlist } from "./watchlistContext";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "./watchlistUtils";
import { useRouter } from "next/navigation"; // For programmatic navigation
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons

const WatchlistItem = ({ media }: { media: IWatchlistItem }) => {
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(true);
  const router = useRouter();

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

  // Function to navigate to the media page
  const handleNavigate = () => {
    router.push(`/movies/${media.tmdb_id}`);
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">
      <div className="md:flex items-start p-4">
        <Image
          src={
            media.poster_path
              ? media.poster_path
              : "/images/no-image-available.png"
          }
          alt={media.title}
          className="w-24 h-36 mr-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg"
          width={96}
          height={144}
          onClick={handleNavigate}
        />
        <div className="">
          <div className="flex-col justify-between">
            <div className="flex justify-between items-center">
              <Link
                href={`/movies/${media.tmdb_id}`}
                passHref
                className="text-xl font-bold transition-transform transform hover:scale-105 "
              >
                {media.title}
              </Link>
              <div className="flex flex-col items-end">
                {media.tmdb_rating !== null && (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center">
                      <span className="text-gray-400 font-bold">
                        {media.tmdb_rating.toFixed(1)}
                      </span>
                      <div className="text-yellow-400 rounded-full p-1">
                        <FaStar size={15} />
                      </div>
                    </div>
                  </div>
                )}
                {media.user_rating !== null ? (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center">
                      <span className="text-gray-400 font-bold">
                        {media.user_rating.toFixed(1)}
                      </span>
                      <div className="text-blue-400 rounded-full p-1">
                        <FaStar size={15} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center">
                      <span className="text-gray-400 font-bold">Rate</span>
                      <div className="text-blue-400 rounded-full p-1">
                        <FaRegStar size={15} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400">{media.release_date}</p>
            <p className="text-sm mt-2">{media.overview}</p>
          </div>
          <div className="bg-transparent py-3 flex justify-between items-center">
            <div>
              <button className="text-gray-400 mr-2 hover:text-blue-500">
                Rate it!
              </button>
              <button className="text-gray-400 mr-2 hover:text-blue-500">
                Favorite
              </button>
              <button className="text-gray-400 hover:text-blue-500">
                Add to list
              </button>
            </div>
            {isInWatchlist ? (
              <button
                className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-105"
                onClick={handleRemove}
              >
                Remove
              </button>
            ) : (
              <button
                className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-105"
                onClick={handleAdd}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
