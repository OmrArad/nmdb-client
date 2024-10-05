"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchResult } from "@/app/types/search";
import WatchlistBookmark from "@/app/user/watchlist/watchlistBookmark";
import { useWatchlist } from "@/app/user/watchlist/watchlistContext";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "@/app/user/watchlist/watchlistUtils";
import SingleSearchResult from "./singleSearchResults";

type SearchResultsProps = {
  results: SearchResult[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
      {results.map((result) => (
        <SingleSearchResult result={result} />
      ))}
    </div>
  );
};

export default SearchResults;
