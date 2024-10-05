"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IWatchlist } from "@/app/types/watchlist";

// Create a context for the watchlist
interface WatchlistContextProps {
  watchlist: IWatchlist | null;
  updateWatchlist: (newWatchlist: IWatchlist) => void;
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(
  undefined
);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<IWatchlist | null>(null);

  const updateWatchlist = (newWatchlist: IWatchlist) => {
    setWatchlist(newWatchlist);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, updateWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
