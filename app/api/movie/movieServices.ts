import { DetailedMovie, TrendingMovie } from "@/app/types/movie";
import { apiClient } from "../auth/auth";
import { CastMember } from "@/app/types/cast";

export const getMovie = async (movie_id: string): Promise<DetailedMovie> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/${movie_id}`);
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

export const getMovies = async (): Promise<DetailedMovie[]> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/all`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieCast = async (movie_id: string): Promise<CastMember[]> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/movie/cast/${movie_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
