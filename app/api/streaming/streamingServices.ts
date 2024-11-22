import { StreamingServices } from "@/app/types/streaming";
import { apiClient } from "../auth/auth";

export const getWatchlistStreamingServices = async (
  userId?: string,
  watchlistId?: string,
): Promise<[{[countryCode: string]: StreamingServices}, {[countryCode: string]: string}, {[serviceName: string]: string}]> => {
  const body = {
    user_id: userId || "",
    watchlistId: watchlistId || "",
  };

  const response = await apiClient.post<[{[countryCode: string]: StreamingServices}, {[countryCode: string]: string},
   {[serviceName: string]: string}]>(
    "/api/watchlists/streaming_recommendation", 
    body,
  );
  console.log("Streaming services are", response.data);
  return response.data;
};