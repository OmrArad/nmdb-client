import { DetailedMovie, TrendingMovie } from "@/app/types/movie";
import { apiClient } from "../auth/auth";

export const getMovie = async (movieId: string): Promise<DetailedMovie> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/${movieId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/trending`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
