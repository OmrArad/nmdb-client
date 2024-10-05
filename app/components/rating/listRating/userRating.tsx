import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import RatingPopup from "@/app/components/rating/ratingPopup";
import UserRatingDisplay from "./userRatingDisplay";
import RatePrompt from "./ratePrompt";

interface UserRatingProps {
  userRating: number | null;
  mediaTitle: string;
  onSubmit: (rating: number) => void;
  onRemoveSubmit: () => void;
}

const UserRating: React.FC<UserRatingProps> = ({
  userRating,
  mediaTitle,
  onSubmit,
  onRemoveSubmit,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div
        className="cursor-pointer rounded px-1 border border-gray-100 text-gray-400  hover:bg-blue-100 hover:border-blue-200 hover:shadow-sm hover:text-blue-500 transition-transform transform duration-300 ease-in-out hover:scale-105"
        onClick={handleOpenPopup}
      >
        {userRating ? (
          <UserRatingDisplay userRating={userRating} />
        ) : (
          <RatePrompt />
        )}
      </div>
      {/* Rating Popup */}
      <RatingPopup
        movieTitle={mediaTitle}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={onSubmit}
        onRemoveSubmit={onRemoveSubmit}
        userRating={userRating}
      />
    </>
  );
};

export default UserRating;
