import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchResponse, SearchResult } from "@/app/types/search";

type SearchResultsProps = {
  results: SearchResult[];
};

const getHref = (pathname: string, result: SearchResult) =>
  result.media_kind === "movie"
    ? `${pathname}movies/${result.id}`
    : `${pathname}tv/${result.id}`;

const fallbackImage = "/not-found-image.jpg";

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
      {results.map((result) => (
        <Link
          key={result.id}
          href={getHref(pathname, result)}
          className="flex flex-col items-center bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
        >
          <Image
            src={
              result.poster_path
                ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                : fallbackImage
            }
            alt={result.title || result.name}
            width={200}
            height={300}
            className="rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2 text-white text-center">
            {result.title || result.name}
          </h3>
          <p className="text-sm text-gray-400 text-center">
            {result.release_date || result.first_air_date}
          </p>
          <p className="text-sm text-gray-400 text-center">
            Rating: {result.vote_average.toFixed(1)} / 10
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
