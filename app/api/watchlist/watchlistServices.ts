import axios from "axios";
import { JWT } from "next-auth/jwt";
import { Key } from "react";

// Base setup for Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Adjust this to your actual API domain
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the authorization token
export const setAuthToken = (token?: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

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
export const getUserWatchlists = async (userId: number) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}/watchlists`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
