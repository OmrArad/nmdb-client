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
      <div className="cursor-pointer rounded px-1 border border-gray-100 text-gray-400  hover:bg-blue-100 hover:border-blue-200 hover:shadow-sm hover:text-blue-500 transition-transform transform duration-300 ease-in-out hover:scale-105">
        {userRating !== null ? (
          <div
            className="flex justify-center items-center "
            onClick={handleOpenPopup}
          >
            <span className=" font-bold ">{userRating.toFixed(1)}</span>
            <div className="text-blue-400 rounded-full p-1 ">
              <FaStar size={15} />
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center "
            onClick={handleOpenPopup}
          >
            <span className="font-bold">Rate</span>
            <div className="text-blue-400 rounded-full p-1">
              <FaRegStar size={15} />
            </div>
          </div>
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
