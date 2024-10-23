import { RatingsResponse, UserRatingsListResponse } from "@/app/types/ratings";
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

export const getUserRatingsList =
  async (): Promise<UserRatingsListResponse> => {
    try {
      const response = await apiClient.get<UserRatingsListResponse>(
        "/api/users/ratings_list"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user ratings list", error);
      throw error;
    }
  };

export const getRatingsByUser = async (
  userId?: string,
  contentId?: string,
  isMovie?: boolean
): Promise<RatingsResponse> => {
  const body = JSON.stringify({
    user_id: userId,
    content_id: contentId,
    is_movie: isMovie,
  });

  const response = await apiClient.get<RatingsResponse>("/api/users/ratings", {
    data: body,
  });
  return response.data;
};

export const removeRating = async (contentId: string, isMovie = true) => {
  const response = await apiClient.delete("/api/ratings", {
    data: { content_id: contentId, is_movie: isMovie },
  });
  return response.data;
};
