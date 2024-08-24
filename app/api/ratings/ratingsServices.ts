import { RatingsResponse } from "@/app/types/ratings";
import { apiClient } from "../auth/auth";

export const addRating = async (
  contentId: string,
  rating: number,
  isMovie: boolean
) => {
  try {
    const response = await apiClient.post("/api/ratings", {
      content_id: contentId,
      rating,
      is_movie: isMovie,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRatingsByUser = async (): Promise<RatingsResponse> => {
  const response = await apiClient.get<RatingsResponse>("/api/users/ratings");
  return response.data;
};

export const removeRating = async (ratingId: string) => {
  const response = await apiClient.delete("/api/ratings", {
    data: { rating_object_id: ratingId },
  });
  return response.data;
};
