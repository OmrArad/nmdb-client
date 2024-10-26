import {
  GetRecommendationResponse,
  RecommendationWatchlistResponse,
} from "@/app/types/recommendations";
import { apiClient } from "../auth/auth";

export const getRecommendations =
  async (): Promise<GetRecommendationResponse> => {
    try {
      const response = await apiClient.get<GetRecommendationResponse>(
        "/api/Media_recommendation"
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch recommended items", error);
      throw error;
    }
  };

// Fetch recommendation watchlist for the logged-in user
export const getRecommendationWatchlist =
  async (): Promise<RecommendationWatchlistResponse> => {
    try {
      const response = await apiClient.get<RecommendationWatchlistResponse>(
        "/api/watchlists/recommendation"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch recommendation watchlist", error);
      throw error;
    }
  };
