import { LoggedInResponse } from "@/app/types/auth";
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

// Function to log out the user
export const logout = async () => {
  try {
    const response = await apiClient.post("/api/logout");
    return response.data; // This will return { "message": "Logged out successfully" }
  } catch (error) {
    console.error(`Failed to log out user: ${error}`);
    throw error; // Handle the error (e.g., redirect to the login page, etc.)
  }
};

export const setAuthTokenAndLogin = async (token?: string) => {
  return await setAuthToken(token).then(async () => await login());
};

// Function to check if the user is logged in
export const checkIfUserLoggedIn = async (): Promise<LoggedInResponse> => {
  try {
    const response = await apiClient.get("/api/is_logged_in");
    return response.data; // This will return { "logged_in": boolean }
  } catch (error) {
    console.error(`Failed to check if user is logged in: ${error}`);
    throw error; // You can handle the error as needed (e.g., redirect to login)
  }
};
