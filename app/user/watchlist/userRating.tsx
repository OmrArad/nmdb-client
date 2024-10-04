import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import RatingPopup from "@/app/components/rating/ratingPopup";

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
      {userRating !== null ? (
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
