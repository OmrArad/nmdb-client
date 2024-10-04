import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingComponentProps {
  tmdbRating: number | null;
  userRating: number | null;
}

const Ratings: React.FC<RatingComponentProps> = ({
  tmdbRating,
  userRating,
}) => {
  return (
    <div className="flex flex-col items-end">
      {/* TMDB Rating */}
      {tmdbRating !== null && (
        <div className="flex justify-center items-center">
          <div className="flex justify-center">
            <span className="text-gray-400 font-bold">
              {tmdbRating.toFixed(1)}
            </span>
            <div className="text-yellow-400 rounded-full p-1">
              <FaStar size={15} />
            </div>
          </div>
        </div>
      )}

      {/* User Rating */}
      {userRating !== null ? (
        <div className="flex justify-center items-center">
          <div className="flex justify-center">
            <span className="text-gray-400 font-bold">
              {userRating.toFixed(1)}
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
  );
};

export default Ratings;
