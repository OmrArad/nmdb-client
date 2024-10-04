"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { addRating, removeRating } from "@/app/api/ratings/ratingsServices";
import { Spinner } from "flowbite-react";
import RatingPopup from "@/app/components/rating/ratingPopup";
import { IWatchlistItem } from "@/app/types/watchlist";
import TMDBRating from "./tmdbRating";

interface RatingComponentProps {
  contentId: string;
  isMovie: boolean;
  media: IWatchlistItem;
  tmdbRating: number | null;
}

const Ratings: React.FC<RatingComponentProps> = ({
  contentId,
  isMovie,
  media,
  tmdbRating,
}) => {
  const [userRating, setUserRating] = useState<number | null>(
    media.user_rating
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleRatingSubmit = async (rating: number) => {
    try {
      if (userRating === rating) {
        console.log(`User's rating hasn't changed`);
        return;
      }
      setLoading(true);
      await addRating(contentId, rating, isMovie);
      setUserRating(rating);
      console.log(`User rated the movie: ${rating} stars`);
    } catch (error) {
      console.error("Error adding rating", error);
    } finally {
      setIsPopupOpen(false); // Close popup after submitting
      setLoading(false);
    }
  };

  const handleRemoveRatingSubmit = async () => {
    try {
      await removeRating(contentId);
      setUserRating(null);
    } catch (error) {
      console.error("Error removing rating", error);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <TMDBRating tmdbRating={tmdbRating} />

      {/* User Rating or "Rate" Button */}
      {loading ? (
        <Spinner />
      ) : userRating !== null ? (
        <div
          className="flex justify-center items-center cursor-pointer rounded hover:bg-gray-200 hover:shadow-md px-1"
          onClick={handleOpenPopup}
        >
          <span className="text-gray-400 font-bold">
            {userRating.toFixed(1)}
          </span>
          <div className="text-blue-400 rounded-full p-1">
            <FaStar size={15} />
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center cursor-pointer rounded hover:bg-gray-300 hover:shadow-md text-gray-400 hover:text-gray-500 px-1"
          onClick={handleOpenPopup}
        >
          <span className="font-bold">Rate</span>
          <div className="text-blue-400 rounded-full p-1">
            <FaRegStar size={15} />
          </div>
        </div>
      )}

      {/* Rating Popup */}
      <RatingPopup
        movieTitle={media.title}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleRatingSubmit}
        onRemoveSubmit={handleRemoveRatingSubmit}
        userRating={userRating}
      />
    </div>
  );
};

export default Ratings;
