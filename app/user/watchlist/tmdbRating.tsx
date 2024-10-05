import React from "react";
import { FaStar } from "react-icons/fa";

interface TMDBRatingProps {
  tmdbRating: number | null;
}

const TMDBRating: React.FC<TMDBRatingProps> = ({ tmdbRating }) => {
  if (tmdbRating === null) {
    return null; // Do not render anything if there's no TMDB rating
  }

  return (
    <div className="flex justify-center items-center px-1 border border-gray-100">
      <div className="flex justify-center">
        <span className="text-gray-400 font-bold">{tmdbRating.toFixed(1)}</span>
        <div className="text-yellow-400 rounded-full p-1">
          <FaStar size={15} />
        </div>
      </div>
    </div>
  );
};

export default TMDBRating;
