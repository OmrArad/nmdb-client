import Image from "next/image";
import React from "react";
import { IWatchlistItem } from "@/app/types/watchlist";

const WatchlistItem = ({ movie }: { movie: IWatchlistItem }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">
      <div className="flex items-start p-4">
        <Image
          src={
            movie.poster_path
              ? movie.poster_path
              : "/images/no-image-available.png"
          }
          alt={movie.title}
          className="w-24 h-36 mr-4"
          width={96}
          height={144}
        />
        <div className="flex-grow">
          <div className="flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              {movie.tmdb_rating !== null && (
                <span className="text-green-400 font-bold">
                  {movie.tmdb_rating.toFixed(1)}
                </span>
              )}
            </div>
            <p className="text-gray-400">{movie.release_date}</p>
            <p className="text-sm mt-2">{movie.overview}</p>
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
            <button className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
