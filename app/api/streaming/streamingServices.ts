import { StreamingServices } from "@/app/types/streaming";
import { apiClient } from "../auth/auth";

export const getWatchlistStreamingServices = async (
  userId?: string,
  watchlistId?: string,
): Promise<StreamingServices> => {
  const body = {
    user_id: userId || "",
    watchlistId: watchlistId || "",
  };

  const response = await apiClient.post<StreamingServices>(
    "/api/watchlists/streaming_recommendation", 
    body,
  );

  return response.data;
};





