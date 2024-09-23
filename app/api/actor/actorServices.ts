import { ActorMediaResponse, ActorResponse } from "@/app/types/actor";
import { apiClient } from "../auth/auth";

export const getActorDetails = async (
  actor_id: string
): Promise<ActorResponse> => {
  "use server";
  try {
    const res = await apiClient.get(`/api/actor/${actor_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMediaAppearances = async (
  actor_id: string
): Promise<ActorMediaResponse> => {
  "use server";
  try {
    const response = await apiClient.get(
      `/api/actor/combine_credits/${actor_id}`
    );
    if (!response) {
      throw new Error("Failed to fetch actor media appearances");
    }
    console.error(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export default getActorDetails;
