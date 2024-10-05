"use client";
import React, { useEffect, useState } from "react";
import RatingPopup from "../ratingPopup";
import { getRatingsByUser } from "@/app/api/ratings/ratingsServices";
import { AxiosError } from "axios";
import { signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";
import { Movie } from "@/app/types/movie";
import { TVShow } from "@/app/types/tvShow";
import { useRatings } from "@/app/context/userRatingContext";
import { findRating } from "@/app/utils/ratingUtils";

const MediaRating = ({
  contentId,
  isMovie,
  media,
}: {
  contentId: string;
  isMovie: boolean;
  media: Movie | TVShow;
}) => {
  const { ratings } = useRatings();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(
    (ratings && findRating(ratings, contentId)?.rating) || null
  );
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        // TODO: get rating using contentId
        const userRatings = await getRatingsByUser(
          undefined,
          contentId,
          isMovie
        );
        const contentRating = findRating(userRatings, contentId);
        setUserRating(contentRating?.rating || null);
      } catch (error) {
        setIsLoggedIn(false);
        const err = error as AxiosError;
        if (session && err.response?.status === 401) {
          await signOut();
        }
        console.error("Error fetching user ratings", error);
      } finally {
        setLoading(false);
      }
    };

    if (!ratings) fetchRating();
    else {
      const contentRating = findRating(ratings, contentId);
      setUserRating(contentRating?.rating || null);
      setLoading(false);
    }
  }, [contentId, isMovie, ratings, session, userRating]);

  const handleOpenPopup = () => {
    setShowMessage(false);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDisabledButtonClick = () => {
    setShowMessage(true);
  };

  const handleRateClick = () => {
    isLoggedIn ? handleOpenPopup() : handleDisabledButtonClick();
  };

  return (
    <div className="flex flex-col flex-grow items-stretch">
      <button
        onClick={handleRateClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
      >
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : userRating ? (
          <div className="flex justify-center items-center">
            <div className="">
              Your Rating:{" "}
              <span className="text-xl text-yellow-400 font-bold ">
                {userRating}
              </span>
              <span>/10</span>
            </div>
          </div>
        ) : (
          "Rate"
        )}
      </button>
      {showMessage && (
        <p className="text-red-500 mt-2 w-40 text-center">
          Please log in to rate this movie.
        </p>
      )}

      <RatingPopup
        title={isMovie ? (media as Movie).title : (media as TVShow).name}
        contentId={media.id.toString()}
        isMovie={isMovie}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        userRating={userRating}
        setUserRating={setUserRating}
        setLoading={setLoading}
      />
    </div>
  );
};

export default MediaRating;
