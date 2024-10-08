"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/app/types/movie";
import { TVShow } from "@/app/types/tvShow";
import { MediaAppearance } from "@/app/types/actor";
import WatchlistBookmark from "@/app/components/watchlist/watchlistBookmark";
import { useWatchlist } from "@/app/context/watchlistContext";
import { FaStar } from "react-icons/fa";
import UserRating from "../rating/listRating/userRating";

type MediaCardProps = {
  media: Movie | TVShow | MediaAppearance;
  kind: "movie" | "tv";
  type: "Movie" | "TVShow" | "MediaAppearance";
};

function isMovie(
  media: Movie | TVShow | MediaAppearance,
  kind: "movie" | "tv"
): media is Movie {
  return kind === "movie";
}

function isMediaAppearence(
  type: "Movie" | "TVShow" | "MediaAppearance",
  media: Movie | TVShow | MediaAppearance
): media is MediaAppearance {
  return type === "MediaAppearance";
}

const urlPrefix = "https://image.tmdb.org/t/p/w220_and_h330_face";

function formatDate(date: string) {
  const formattedDate = new Date(date).toDateString().split(" ").slice(1);
  formattedDate[1] += ",";
  return formattedDate.join(" ");
}

const root = "http://localhost:3000";

const MediaCard: React.FC<MediaCardProps> = ({ type, kind, media }) => {
  const { id, vote_average, poster_path } = media;
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [_, setLoading] = useState(true);

  const mediaKind = kind === "movie" ? "movies" : kind;
  const mediaHref = {
    pathname: `${root}/${mediaKind}/${id}`,
  };

  // Check if the media is in the watchlist
  useEffect(() => {
    const mediaExistsInWatchlist = watchlist?.Content.some(
      (item) => item.tmdb_id === id.toString()
    );
    setIsInWatchlist(mediaExistsInWatchlist || false);
  }, [watchlist, id]);

  return (
    <div className="min-w-[calc(150px)] w-[calc(150px)] min-h-[calc(21rem)] bg-white rounded-sm overflow-hidden relative">
      <Link href={mediaHref}>
        {isMediaAppearence(type, media) && (
          <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl-lg py-1 px-2 text-sm font-bold cursor-default">
            {vote_average.toFixed(1)}
          </div>
        )}

        <div className="h-[calc(225px)] bg-gray-200">
          <Image
            className="rounded-sm shadow-2xl hover:shadow-gray-500"
            alt="poster"
            src={`${urlPrefix}/${poster_path}`}
            width={150}
            height={225}
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
      </Link>

      {!isMediaAppearence(type, media) && (
        <div className="flex items-center justify-between bottom-0 rounded-br-md  py-1 px-2 text-sm font-bold cursor-default bg-neutral-800">
          <div className="flex items-center text-neutral-300 gap-1">
            <span className="cursor-text">{vote_average.toFixed(1)}</span>
            <FaStar className="text-yellow-400" />
          </div>
          <UserRating
            // media={media}
            mediaId={media.id.toString()}
            title={isMovie(media, kind) ? media.title : media.name}
            isMovie={isMovie(media, kind)}
            setLoading={setLoading}
            darkTheme={true}
          />
        </div>
      )}
      <div className="p-2">
        <Link href={mediaHref}>
          <h3 className="text-sm text-left font-bold mb-1 hover:text-blue-500">
            {isMovie(media, kind) ? media.title : media.name}
          </h3>
        </Link>
        {isMediaAppearence(type, media) && (
          <>
            <p className="text-left text-sm text-gray-400">
              {media.character ? `as ${media.character}` : ""}
            </p>
            <p className="text-left text-sm text-gray-400">{media.job}</p>
          </>
        )}

        <p className="text-left text-zinc-400 text-sm">
          {formatDate(
            isMovie(media, kind) ? media.release_date : media.first_air_date
          )}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
