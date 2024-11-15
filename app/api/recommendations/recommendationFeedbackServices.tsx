import { RecommendationFeedbackResponse } from "@/app/types/recommendations";
import { apiClient } from "../auth/auth";

export const sendRecommendationFeedback = async (
  isMovie: boolean,
  mediaId: string,
  isLiked: boolean,
  algorithm2: string
): Promise<RecommendationFeedbackResponse> => {
  try {
    const response = await apiClient.post<RecommendationFeedbackResponse>(
      "/api/recommendation_feedback",
      {
        is_movie: isMovie ? 1 : 0,
        media_id: mediaId,
        is_liked: isLiked ? 1 : 0,
        algorithm :algorithm2,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to send recommendation feedback", error);
    throw error;
  }
};
