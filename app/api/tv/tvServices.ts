import type { DetailedTVSeries, TrendingTVShow } from "@/app/types/tvShow";
import { apiClient } from "../auth/auth";
import { CastMember } from "@/app/types/cast";

export const getTVShow = async (
  tvShowId: string
): Promise<DetailedTVSeries> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/tv/${tvShowId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTrendingTVShows = async (): Promise<TrendingTVShow[]> => {
  "use server";
  try {
    const res = await apiClient.get("/api/tv/trending");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTVShows = async (): Promise<DetailedTVSeries[]> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/tv/all`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTVCast = async (tv_id: string): Promise<CastMember[]> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/tv/cast/${tv_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
