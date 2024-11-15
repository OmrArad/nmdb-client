import { UserDataRatings } from "./ratings";
import { MainWatchlist } from "./watchlist";

// Type for the login response
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

// Type for the logged-in check response
export interface LoggedInResponse {
  logged_in: boolean;
}

// Type for the logout response
export interface LogoutResponse {
  message: string;
}

// Type for the user data returned from the server
export interface UserData {
  main_watchlist: MainWatchlist;
  main_watchlist_id: string;
  ratings_list: UserDataRatings;
  watchlist_streaming_data: Record<string, any> | null; // Streaming data can be extended with more structure if needed
  region: string
}
