import React, { SetStateAction, useState } from "react";
import RatingPopup from "@/app/components/rating/ratingPopup";
import UserRatingDisplay from "./userRatingDisplay";
import RatePrompt from "./ratePrompt";
import { IWatchlistItem } from "@/app/types/watchlist";
import { TVShow } from "@/app/types/tvShow";
import { Movie } from "@/app/types/movie";
import { MediaAppearance } from "@/app/types/actor";
interface UserRatingProps {
  media: IWatchlistItem;
  isMovie: boolean;
  userRating: number | null;
  setUserRating: (value: SetStateAction<number | null>) => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  darkTheme?: boolean;
  showText?: boolean;
}

const UserRating: React.FC<UserRatingProps> = ({
  media,
  isMovie = true,
  userRating,
  setLoading,
  setUserRating,
  darkTheme = false,
  showText = true,
}) => {
  const { tmdb_id, title } = media;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const darkThemeClass =
    "border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:border-neutral-900  hover:brightness-125";

  const lightThemeClass =
    "border-gray-100 text-gray-400 hover:bg-blue-100 hover:border-blue-200 hover:text-blue-400 hover:brightness-90";

  return (
    <>
      <div
        className={`cursor-pointer rounded-sm px-1 border hover:shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105 ${
          darkTheme ? darkThemeClass : lightThemeClass
        }`}
        onClick={handleOpenPopup}
      >
        {userRating ? (
          <UserRatingDisplay userRating={userRating} />
        ) : (
          <RatePrompt showText={showText} />
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
