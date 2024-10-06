import {
  addRating,
  getRatingsByUser,
  removeRating,
} from "@/app/api/ratings/ratingsServices";
import { SetStateAction } from "react";
import { RatingsResponse } from "../types/ratings";

/**
 * Submits a new user rating.
 * @param {number} rating - The rating submitted by the user.
 * @param {string} contentId - The ID of the content being rated.
 * @param {boolean} isMovie - Whether the content is a movie or not.
 * @param {Function} setLoading - Function to update the loading state.
 */
export const handleRatingSubmit = async (
  rating: number,
  contentId: string,
  isMovie: boolean,
  updateRatings: (SetStateAction: RatingsResponse) => void,
  setLoading: (value: SetStateAction<boolean>) => void
) => {
  try {
    setLoading(true);
    await addRating(contentId, rating, isMovie);
    console.log(`User rated the content: ${rating} stars`);
    updateRatings(await getRatingsByUser());
    setLoading(false);
  } catch (error) {
    console.error("Error adding rating", error);
  } finally {
  }
};

/**
 * Removes the user rating for a given content.
 * @param {string} contentId - The ID of the content whose rating is to be removed.
 * @param {Function} setUserRating - Function to update the user rating state.
 */
export const handleRemoveRatingSubmit = async (
  contentId: string,
  updateRatings: (SetStateAction: RatingsResponse) => void,
  setUserRating?: (rating: number) => void
) => {
  try {
    await removeRating(contentId);
    // setUserRating(0);
    updateRatings(await getRatingsByUser());
  } catch (error) {
    console.error("Error removing rating", error);
  }
};

export const findRating = (userRatings: RatingsResponse, contentId: string) =>
  userRatings.ratings.find(
    (r: { media_ID: string }) => r.media_ID === contentId
  );
