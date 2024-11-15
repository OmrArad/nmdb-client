import { StreamingServices } from "@/app/types/streaming";
import { apiClient } from "../auth/auth";

export const getWatchlistStreamingServices = async (
  userId?: string,
  watchlistId?: string,
): Promise<{ [countryCode: string]: StreamingServices }> => {
  const body = {
    user_id: userId || "",
    watchlistId: watchlistId || "",
  };

  const response = await apiClient.post<{ [countryCode: string]: StreamingServices }>(
    "/api/watchlists/streaming_recommendation", 
    body,
  );
  return response.data;
};





