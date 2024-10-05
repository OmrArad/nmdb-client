import { addRating, removeRating } from "@/app/api/ratings/ratingsServices";
import { SetStateAction } from "react";

/**
 * Submits a new user rating.
 * @param {number} rating - The rating submitted by the user.
 * @param {number | null} userRating - The current user rating (can be null if not rated).
 * @param {string} contentId - The ID of the content being rated.
 * @param {boolean} isMovie - Whether the content is a movie or not.
 * @param {Function} setUserRating - Function to update the user rating state.
 * @param {Function} setLoading - Function to update the loading state.
 */
export const handleRatingSubmit = async (
  rating: number,
  userRating: number | null,
  contentId: string,
  isMovie: boolean,
  setUserRating: (value: SetStateAction<number | null>) => void,
  setLoading: (value: SetStateAction<boolean>) => void
) => {
  try {
    if (userRating === rating) {
      console.log(`User's rating hasn't changed`);
      return;
    }
    setLoading(true);
    await addRating(contentId, rating, isMovie);
    setUserRating(rating);
    console.log(`User rated the content: ${rating} stars`);
  } catch (error) {
    console.error("Error adding rating", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Removes the user rating for a given content.
 * @param {string} contentId - The ID of the content whose rating is to be removed.
 * @param {Function} setUserRating - Function to update the user rating state.
 */
export const handleRemoveRatingSubmit = async (
  contentId: string,
  setUserRating: (rating: number) => void
) => {
  try {
    await removeRating(contentId);
    setUserRating(0); // Set to 0 or null based on your application's logic
  } catch (error) {
    console.error("Error removing rating", error);
  }
};
