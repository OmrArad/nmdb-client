import React, { SetStateAction, useEffect, useState } from "react";
import RatingPopup from "@/app/components/rating/ratingPopup";
import UserRatingDisplay from "./userRatingDisplay";
import RatePrompt from "./ratePrompt";
import { IWatchlistItem } from "@/app/types/watchlist";
import { TVShow } from "@/app/types/tvShow";
import { Movie } from "@/app/types/movie";
import { MediaAppearance } from "@/app/types/actor";
import { useRatings } from "@/app/context/userRatingContext";
import { findRating } from "@/app/utils/ratingUtils";
interface UserRatingProps {
  media?: IWatchlistItem;
  mediaId: string;
  title: string;
  isMovie: boolean;
  setLoading: (value: SetStateAction<boolean>) => void;
  darkTheme?: boolean;
  showText?: boolean;
}

const UserRating: React.FC<UserRatingProps> = ({
  media,
  mediaId: tmdb_id,
  title,
  isMovie = true,
  setLoading,
  darkTheme = false,
  showText = true,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const { ratings } = useRatings();

  useEffect(() => {
    const _userRatings =
      (ratings && findRating(ratings, tmdb_id)?.rating) || null;
    setUserRating(_userRatings);
  }, [userRating, ratings, tmdb_id]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const darkThemeClass =
    "border-neutral-800 translate-x-1 text-neutral-400 hover:bg-neutral-700 hover:border-neutral-900  hover:brightness-125 hover:translate-x-0";

  const lightThemeClass =
    "border-gray-100 text-gray-400 hover:bg-blue-100 hover:border-blue-200 hover:text-blue-400 hover:brightness-90 hover:scale-105";

  return (
    <>
      <div
        className={`cursor-pointer rounded-sm rounded-br-md px-1 border hover:shadow-sm transition-transform transform duration-300 ease-in-out hover:scale-105 ${
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
