import { JWT } from "next-auth/jwt";
import { Key } from "react";
import { apiClient } from "../auth/auth";

export type Watchlist = {
  id: Key | null | undefined;
  user_id: number;
  name: string;
  description: string;
  token: JWT;
};

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
export const getWatchlist = async (watchlistId: number) => {
  try {
    const response = await apiClient.get(`/api/watchlists/${watchlistId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all watchlists for a user
export const getUserWatchlists = async () => {
  try {
    const response = await apiClient.get(`/api/users/watchlists`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
