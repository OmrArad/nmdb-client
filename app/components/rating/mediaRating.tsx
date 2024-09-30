"use client";
import React, { useEffect, useState } from "react";
import RatingPopup from "./ratingPopup";
import {
  addRating,
  getRatingsByUser,
  removeRating,
} from "@/app/api/ratings/ratingsServices";
import { AxiosError } from "axios";
import { signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";

const STARS = 10;

const MediaRating = ({
  contentId,
  isMovie,
}: {
  contentId: string;
  isMovie: boolean;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        // TODO: get rating using contentId
        const userRatings = await getRatingsByUser();
        const contentRating = userRatings.ratings.find(
          (r: { media_ID: string }) => r.media_ID === contentId
        );
        if (contentRating) {
          setUserRating(contentRating.rating);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          await signOut();
        }
        console.error("Error fetching user ratings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [contentId]);

  const handleOpenPopup = () => {
    setShowMessage(false);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleRatingSubmit = async (rating: number) => {
    try {
      if (userRating === rating) {
        await removeRating(contentId);
        setUserRating(0);
        return;
      }
      await addRating(contentId, rating, isMovie);
      setUserRating(rating);
      console.log(`User rated the movie: ${rating} stars`);
    } catch (error) {
      console.error("Error adding rating", error);
    } finally {
      setIsPopupOpen(false); // Close popup after submitting
    }
  };

  const handleDisabledButtonClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="flex flex-col flex-grow items-stretch">
      <button
        onClick={session?.user ? handleOpenPopup : handleDisabledButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-full"
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
