"use client";
import { RatingsResponse } from "@/app/types/ratings";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserRatingsContextType {
  ratings: RatingsResponse | null;
  updateRatings: (ratingsData: RatingsResponse) => void;
}

const UserRatingsContext = createContext<UserRatingsContextType | undefined>(
  undefined
);

export const useUserRatings = () => {
  const context = useContext(UserRatingsContext);
  if (context === undefined) {
    throw new Error("useUserRatings must be used within a UserRatingsProvider");
  }
  return context;
};

export const UserRatingsProvider = ({ children }: { children: ReactNode }) => {
  const [ratings, setRatings] = useState<RatingsResponse | null>(null);

  // Memoize the updateRatings function
  const updateRatings = React.useCallback((ratingsData: RatingsResponse) => {
    setRatings(ratingsData);
  }, []);

  return (
    <UserRatingsContext.Provider value={{ ratings, updateRatings }}>
      {children}
    </UserRatingsContext.Provider>
  );
};
