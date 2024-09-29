import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (token?: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Function to log in the user or register them if they don't exist
export const login = async () => {
  try {
    const response = await apiClient.post("/api/login");
    return response.data;
  } catch (error) {
    console.error(`Failed to login user: ${error}`);
  }
};

export const setAuthTokenAndLogin = async (token?: string) => {
  return await setAuthToken(token).then(async () => await login());
};
