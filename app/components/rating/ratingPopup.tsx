"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Import star icons

interface RatingPopupProps {
  movieTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  onRemoveSubmit: () => void;
  userRating: number | null;
}

const RatingPopup: React.FC<RatingPopupProps> = ({
  movieTitle,
  isOpen,
  onClose,
  onSubmit,
  onRemoveSubmit,
  userRating,
}) => {
  const [rating, setRating] = useState<number>(0); // Manage the current rating
  const [hoverRating, setHoverRating] = useState<number>(0);

  if (!isOpen) return null;

  const handleRateClick = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  const handleRemoveRateClick = () => {
    onRemoveSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          &times;
        </button>

        {/* Star Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 text-white rounded-full p-4">
            <FaStar size={30} />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-yellow-500 uppercase font-semibold text-sm mb-1">
          Rate This
        </h2>
        <h1 className="text-white text-2xl font-bold mb-4">{movieTitle}</h1>

        {/* Star Ratings */}
        <div className="flex justify-center mb-4">
          {[...Array(10)].map((_, index) => (
            <FaStar
              key={index}
              size={30}
              className={`cursor-pointer pr-1 ${
                index < (hoverRating || rating)
                  ? "text-blue-500"
                  : "text-gray-500"
              } `}
              onClick={() => setRating(index + 1)} // Rating is index + 1
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        {/* Rate Button */}
        <button
          onClick={handleRateClick}
          className={`bg-gray-700 text-white rounded-full px-6 py-2 mt-4 w-full ${
            rating > 0 ? "hover:bg-blue-500" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={rating === 0}
        >
          Rate
        </button>

        {/* Remove Rating Button */}
        {userRating && (
          <button
            onClick={handleRemoveRateClick}
            className="text-blue-500 hover:bg-gray-800 rounded-full px-6 py-2 mt-4 w-full"
          >
            Remove Rating
          </button>
        )}
      </div>
    </div>
  );
};

export default RatingPopup;
