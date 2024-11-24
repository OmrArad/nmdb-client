"use server";
import { SearchResponse } from "@/app/types/search";
import { apiClient } from "../auth/auth";
import { DiscoverResponse } from "@/app/types/discover";


export const getDiscovery = async (
    filters?: {
      genres?: string[];
      year?: string;
      vote_average?: string;
      region?: string;
      provider?: string;
      content_type: string;
    }
  ): Promise<any> => {
    try {
      const payload: Record<string, any> = {};
      payload.content_type = filters?.content_type
      // Add filters to payload only if they exist
      if (filters?.genres) payload.genres = filters.genres;
      if (filters?.year) payload.year = filters.year;
      if (filters?.vote_average) payload.vote_average = filters.vote_average;
  
      // Include region and provider only if both are present
      if (filters?.region && filters?.provider) {
        payload.region = filters.region;
        payload.provider = filters.provider;
      }
      console.log("payload")
      const res = await apiClient.post(`/api/discover`, payload);
      console.log("discovery returned" , res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  