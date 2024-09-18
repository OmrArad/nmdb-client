import React from "react";
import Image from "next/image";

type SearchResultsProps = {
  results: any[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="flex flex-col items-center bg-gray-800 p-4 rounded-lg"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
            alt={result.title || result.name}
            width={200}
            height={300}
            className="rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2 text-white">
            {result.title || result.name}
          </h3>
          <p className="text-sm text-gray-400">
            {result.release_date || result.first_air_date}
          </p>
          <p className="text-sm text-gray-400">
            Rating: {result.vote_average.toFixed(1)} / 10
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
