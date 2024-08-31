import { ActorResponse } from "@/app/types/actor";
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

export default getActorDetails;
