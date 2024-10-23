import {
  addRating,
  getUserRatingsList,
  removeRating,
} from "@/app/api/ratings/ratingsServices";
import { SetStateAction } from "react";
import { RatedContentItem } from "../types/ratings";

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
  updateRatings: (SetStateAction: RatedContentItem[]) => void,
  setLoading: (value: SetStateAction<boolean>) => void
) => {
  try {
    setLoading(true);
    await addRating(contentId, rating, isMovie);
    console.log(`User rated the content: ${rating} stars`);
    const ratingRespone = await getUserRatingsList();
    updateRatings(ratingRespone.content);
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
  updateRatings: (SetStateAction: RatedContentItem[]) => void,
  setUserRating: (rating: number) => void
) => {
  try {
    await removeRating(contentId);
    // setUserRating(0);
    const ratingsRespone = await getUserRatingsList();
    updateRatings(ratingsRespone.content);
  } catch (error) {
    console.error("Error removing rating", error);
  }
};

export const findRating = (
  userRatings: RatedContentItem[] | null,
  contentId: string
) => userRatings?.find((rating) => rating.tmdb_id === contentId);
