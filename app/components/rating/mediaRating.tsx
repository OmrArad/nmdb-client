"use client";
import React, { useState } from "react";
import RatingPopup from "./ratingPopup";

const MediaRating = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleRatingSubmit = (rating: number) => {
    setUserRating(rating);
    setIsPopupOpen(false); // Close popup after submitting
    console.log(`User rated the movie: ${rating} stars`);
  };

  return (
    <div className="flex flex-col flex-grow items-stretch mb-4">
      <button
        onClick={handleOpenPopup}
        className="bg-blue-500 text-white text-xl font-bold px-4 py-3 rounded hover:bg-blue-700"
      >
        Rate This Movie
      </button>

      {/* Show the user's rating */}
      {userRating && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            Your Rating: {userRating}/10
          </h2>
        </div>
      )}

      {/* Rating Popup */}
      <RatingPopup
        movieTitle="The Perfect Couple"
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
};

export default MediaRating;
