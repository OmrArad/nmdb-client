import { apiClient } from "../auth/auth";

interface RegionResponse {
    region: string;
    // Optional field for error messages or other metadata, if applicable
    Error?: string;
  }  

export const getRegion = async (): Promise<RegionResponse> => {
  try {
    const res = await apiClient.get("/api/user/region");
    console.log("region returned", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching region:", error);
    throw error;
  }
};

export const updateServerRegion = async (
  data: { region: string }
): Promise<RegionResponse> => {
  try {
    const res = await apiClient.post("/api/user/region", data);
    console.log("region update returned", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating region:", error);
    throw error;
  }
};
