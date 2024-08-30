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

export const getRatingsByUser = async (
  contentId?: string,
  isMovie = 1
): Promise<RatingsResponse> => {
  if (contentId) {
    const response = await apiClient.get<RatingsResponse>(
      "/api/users/ratings",
      { data: { content_id: contentId, is_movie: isMovie } }
    );
    return response.data;
  }
  const response = await apiClient.get<RatingsResponse>("/api/users/ratings");
  return response.data;
};

export const removeRating = async (contentId: string, isMovie = true) => {
  const response = await apiClient.delete("/api/ratings", {
    data: { content_id: contentId, is_movie: isMovie },
  });
  return response.data;
};
