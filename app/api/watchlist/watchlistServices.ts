import { JWT } from "next-auth/jwt";
import { Key } from "react";
import { apiClient } from "../auth/auth";
import { Watchlist } from "@/app/types/watchlist";

// export type Watchlist = {
//   id: Key | null | undefined;
//   user_id: number;
//   name: string;
//   description: string;
//   token: JWT;
// };

// Create a new watchlist
export const createWatchlist = async (
  name = "Untitled Watchlist",
  description = ""
): Promise<Watchlist> => {
  try {
    const response = await apiClient.post("/api/watchlists", {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a specific watchlist
export const getWatchlist = async (
  watchlistId?: string | number
): Promise<Watchlist> => {
  try {
    const url = watchlistId
      ? `/api/watchlists?watchlist_id=${watchlistId}`
      : "/api/watchlists";
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all watchlists for a user
export const getUserWatchlists = async (): Promise<Watchlist> => {
  try {
    const response = await apiClient.get(`/api/watchlists/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a movie/show to the watchlist
export const addToWatchlist = async (
  watchlist_id: string,
  content_id: string,
  is_movie: boolean
) => {
  try {
    const response = await apiClient.put("/api/watchlists/content", {
      watchlist_id,
      content_id,
      is_movie,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a movie/show from the watchlist
export const removeFromWatchlist = async (
  content_id: string,
  watchlist_id?: string
) => {
  try {
    const response = await apiClient.delete("/api/watchlists/content", {
      data: { watchlist_id, content_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
