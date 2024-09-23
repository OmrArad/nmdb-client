"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/app/types/movie";
import { TVShow } from "@/app/types/tvShow";
import { MediaAppearance } from "@/app/types/actor";
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
  const mediaKind = kind === "movie" ? "movies" : kind;
  const mediaHref = {
    pathname: `${root}/${mediaKind}/${media.id}`,
  };
  return (
    <div className="min-w-[calc(150px)] w-[calc(150px)] min-h-[calc(21rem)] bg-white rounded-lg overflow-hidden relative ">
      <Link href={mediaHref}>
        {media.vote_average && (
          <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl-lg py-1 px-2 text-sm font-bold">
            {media.vote_average.toFixed(1)}
          </div>
        )}
        <div className="h-[calc(225px)] bg-gray-200 rounded-xl ">
          <Image
            className="rounded-xl shadow-2xl hover:shadow-emerald-50"
            alt="poster"
            src={`${urlPrefix}/${media.poster_path}`}
            width={150}
            height={225}
          />
        </div>
      </Link>
      <div className="p-3">
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
        {/* <p className="text-gray-600 text-sm">{media.genre_ids}</p> */}
      </div>
    </div>
  );
};

export default MediaCard;
