import React, { SetStateAction, useState } from "react";
import RatingPopup from "@/app/components/rating/ratingPopup";
import UserRatingDisplay from "./userRatingDisplay";
import RatePrompt from "./ratePrompt";
import { IWatchlistItem } from "@/app/types/watchlist";
interface UserRatingProps {
  media: IWatchlistItem;
  isMovie: boolean;
  userRating: number | null;
  setUserRating: (value: SetStateAction<number | null>) => void;
  setLoading: (value: SetStateAction<boolean>) => void;
}

const UserRating: React.FC<UserRatingProps> = ({
  media,
  isMovie = true,
  userRating,
  setLoading,
  setUserRating,
}) => {
  const { tmdb_id, title } = media;
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

      <RatingPopup
        title={title}
        contentId={tmdb_id}
        isMovie={isMovie}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        userRating={userRating}
        setUserRating={setUserRating}
        setLoading={setLoading}
      />
    </>
  );
};

export default UserRating;
