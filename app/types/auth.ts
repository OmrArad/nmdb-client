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
