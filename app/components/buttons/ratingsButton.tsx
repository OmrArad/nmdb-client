"use client";

import { useState, useEffect, useRef } from "react";
import {
  addRating,
  getRatingsByUser,
  removeRating,
} from "@/app/api/ratings/ratingsServices";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const RatingsButton = ({
  contentId,
  isMovie,
}: {
  contentId: string;
  isMovie: boolean;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  let ratingRef = useRef("");

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const userRatings = await getRatingsByUser();
        const contentRating = userRatings.ratings.find(
          (r: { media_ID: string }) => r.media_ID === contentId
        );
        if (contentRating) {
          setRating(contentRating.rating);
          ratingRef.current = contentRating.ID;
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          setIsLoggedIn(false);
        }
        console.error("Error fetching user ratings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [contentId, isLoggedIn]);

  const handleRating = async (newRating: number) => {
    try {
      if (!isLoggedIn) {
        handleDisabledButtonClick();
        return;
      }
      if (rating === newRating) {
        // TODO: should work after updates. should work with contentId
        await removeRating(ratingRef.current);
        setRating(0);
        return;
      }
      const newContentRating = await addRating(contentId, newRating, isMovie);
      setRating(newRating);
      toast.success("Successfully rated!");
    } catch (error) {
      console.error("Error adding rating", error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${
            i <= (hoverRating || rating || 0) ? "text-yellow-500" : ""
          } cursor-pointer`}
          onClick={() => handleRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const renderDisabledStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-gray-500 cursor-pointer`}
          onClick={() => handleRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleDisabledButtonClick = () => {
    setShowMessage(true);
  };

  if (loading) {
    return <div></div>; // Or use a spinner component
  }

  if (!isLoggedIn) {
    return (
      <div className="mt-4">
        <div className="rating">{renderDisabledStars()}</div>
        {showMessage && (
          <p className="text-red-500 mt-2">Please log in to rate this movie.</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="rating">{renderStars()}</div>
      {showMessage && (
        <p className="text-red-500 mt-2">Please log in to rate this movie.</p>
      )}
    </div>
  );
};
