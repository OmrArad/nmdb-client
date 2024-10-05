"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import { useWatchlist } from "@/app/context/watchlistContext";
import { usePathname } from "next/navigation";
import { SearchResult } from "@/app/types/search";

type SearchResultProps = { result: SearchResult };
// result: {
//   id: string;
//   poster_path: string | null;
//   title?: string;
//   name?: string;
//   release_date?: string;
//   first_air_date?: string;
//   vote_average: number | null;
// };

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
    <Link
      key={id}
      href={getHref(pathname, result)}
      className="flex flex-col items-center bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
    >
      <div className="relative overflow-hidden rounded-sm">
        <Image
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w200${poster_path}`
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
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-2 text-white text-center">
        {title || name}
      </h3>
      <p className="text-sm text-gray-400 text-center">
        {release_date || first_air_date}
      </p>
      {getRating(vote_average)}
    </Link>
  );
};

export default SingleSearchResult;