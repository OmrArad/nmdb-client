"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import { useWatchlist } from "@/app/context/watchlistContext";
import { usePathname } from "next/navigation";
import { SearchResult } from "@/app/types/search";
import { FaStar } from "react-icons/fa";
import { FaFilm, FaTv } from "react-icons/fa"; // Importing movie and TV icons
import UserRating from "../../rating/listRating/userRating";

type SearchResultProps = { result: SearchResult };

const getHref = (pathname: string, result: SearchResult) =>
  result.media_kind === "movie"
    ? `${pathname}movies/${result.id}`
    : `${pathname}tv/${result.id}`;

const getRating = (vote_average: number) =>
  vote_average > 0 ? (
    <p className="text-sm text-gray-400 text-center">
      Rating: {vote_average % 1 !== 0 ? vote_average.toFixed(1) : vote_average}{" "}
      / 10
    </p>
  ) : (
    <p className="text-sm text-gray-400 text-center">No Rating</p>
  );

const fallbackImage = "/not-found-image.jpg";

const SingleSearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const {
    id,
    poster_path,
    title,
    name,
    release_date,
    first_air_date,
    vote_average,
    media_kind, // Added media_kind here
  } = result;

  const pathname = usePathname();
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Check if the media is in the watchlist
  useEffect(() => {
    const mediaExistsInWatchlist = watchlist?.Content.some(
      (item) => item.tmdb_id === id.toString()
    );
    setIsInWatchlist(mediaExistsInWatchlist || false);
  }, [watchlist, id]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200">
      <Link key={id} href={getHref(pathname, result)}>
        <div className="relative overflow-hidden rounded-sm">
          <Image
            priority = {true}
            src={
              poster_path
                ? poster_path
                : fallbackImage
            }
            alt={title || name || "No Title"}
            width={200}
            height={300}
          />
          <div className="absolute bottom-full translate-x-0.5">
            <WatchlistBookmark
              isInWatchlist={isInWatchlist}
              mediaId={id.toString()}
              setIsInWatchlist={setIsInWatchlist}
              updateWatchlist={updateWatchlist}
              watchlist={watchlist}
              isMovie={title ? true : false}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-2 text-white text-center">
          {title || name}
        </h3>
        <p className="text-sm text-gray-400 text-center">
          {release_date || first_air_date}
        </p>
      </Link>
      <div className="flex gap-2 items-center justify-between bottom-0 rounded-br-md py-1 px-2 text-sm font-bold cursor-default w-full">
        <div className="flex items-center text-neutral-300 gap-1">
          <span className="cursor-text">{vote_average.toFixed(1)}</span>
          <FaStar className="text-yellow-400" />
        </div>
        <UserRating
          mediaId={id.toString()}
          title={title || name!}
          isMovie={title ? true : false}
          setLoading={() => {}}
          darkTheme={true}
          classname="border-hidden"
        />
        {/* Add the TV or Movie icon */}
        <div className="flex items-center gap-1">
          {media_kind === "movie" ? (
            <FaFilm className="text-yellow-400" />
          ) : (
            <FaTv className="text-blue-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSearchResult;
