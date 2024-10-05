"use client";
import React, { useState } from "react";
import { addRating, removeRating } from "@/app/api/ratings/ratingsServices";
import { Spinner } from "flowbite-react";
import { IWatchlistItem } from "@/app/types/watchlist";
import TMDBRating from "./tmdbRating";
import UserRating from "./userRating";

interface RatingComponentProps {
  contentId: string;
  isMovie: boolean;
  title: string;
  user_rating: number | null;
  tmdbRating: number | null;
  media?: IWatchlistItem;
}

const Ratings: React.FC<RatingComponentProps> = ({
  contentId,
  isMovie,
  title,
  user_rating,
  tmdbRating,
}) => {
  const [userRating, setUserRating] = useState<number | null>(user_rating);
  const [loading, setLoading] = useState(false);

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
      ) : (
        <UserRating
          mediaTitle={title}
          onRemoveSubmit={handleRemoveRatingSubmit}
          onSubmit={handleRatingSubmit}
          userRating={userRating}
        />
      )}
    </div>
  );
};

export default Ratings;
