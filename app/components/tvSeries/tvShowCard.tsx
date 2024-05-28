"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TrendingTVShow } from "@/app/types/tvShow";
type tvCardProps = {
  tvShow: TrendingTVShow;
};

const urlPrefix = "https://image.tmdb.org/t/p/w220_and_h330_face";
const urlPrefixOriginal = "https://image.tmdb.org/t/p/original";

function formatDate(date: string) {
  const formattedDate = new Date(date).toDateString().split(" ").slice(1);
  formattedDate[1] += ",";
  return formattedDate.join(" ");
}

const TvShowCard: React.FC<tvCardProps> = ({ tvShow }) => {
  const pathname = usePathname();
  const tvShowHref = {
    pathname: `${pathname}tv-shows/${tvShow.id}`,
    query: { id: tvShow.id },
  };
  return (
    <div className="min-w-[calc(150px)] min-h-[calc(21rem)] bg-white rounded-lg overflow-hidden relative ">
      <Link href={tvShowHref}>
        <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl-lg py-1 px-2 text-sm font-bold">
          {tvShow.vote_average ? tvShow.vote_average.toFixed(1) : "NR"}
        </div>
        <div className="h-[calc(225px)] bg-gray-200 rounded-xl ">
          <Image
            className="rounded-xl shadow-2xl hover:shadow-emerald-50"
            alt="poster"
            src={`${urlPrefixOriginal}/${tvShow.poster_path}`}
            width={150}
            height={225}
          />
        </div>
      </Link>
      <div className="p-3">
        <Link href={tvShowHref}>
          <h3 className="text-sm text-left font-bold mb-1 hover:text-blue-500">
            {tvShow.name}
          </h3>
        </Link>
        <p className="text-left text-zinc-400 text-sm">
          {formatDate(tvShow.first_air_date)}
        </p>
        {/* <p className="text-gray-600 text-sm">{movie.genre_ids}</p> */}
      </div>
    </div>
  );
};

export default TvShowCard;
