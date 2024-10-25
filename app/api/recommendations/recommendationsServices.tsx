import { Recommendation } from "@/app/types/recommendations";
import { apiClient } from "../auth/auth";

export const getRecommendations = async (
): Promise<Recommendation[]> => {
  const response = await apiClient.get<Recommendation[]>(
    "/api/Media_recommendation",
  );

  return response.data;
};