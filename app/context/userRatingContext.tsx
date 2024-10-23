"use client";
import { RatedContentItem } from "@/app/types/ratings";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ratingsContextType {
  ratings: RatedContentItem[] | null;
  updateRatings: (ratingsData: RatedContentItem[]) => void;
}

const ratingsContext = createContext<ratingsContextType | undefined>(undefined);

export const useRatings = () => {
  const context = useContext(ratingsContext);
  if (context === undefined) {
    throw new Error("useratings must be used within a ratingsProvider");
  }
  return context;
};

export const RatingsProvider = ({ children }: { children: ReactNode }) => {
  const [ratings, setRatings] = useState<RatedContentItem[] | null>(null);

  // Memoize the updateRatings function
  const updateRatings = React.useCallback((ratingsData: RatedContentItem[]) => {
    setRatings(ratingsData);
  }, []);

  return (
    <ratingsContext.Provider value={{ ratings, updateRatings }}>
      {children}
    </ratingsContext.Provider>
  );
};
