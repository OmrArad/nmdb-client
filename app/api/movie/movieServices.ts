import { DetailedMovie } from "@/app/types/movie";
import { apiClient } from "../auth/login";

export const getMovie = async (movieId: string): Promise<DetailedMovie> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/${movieId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
