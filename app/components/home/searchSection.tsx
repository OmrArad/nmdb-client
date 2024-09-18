"use client";
import React, { useState } from "react";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import { apiClient } from "@/app/api/auth/auth";

const SearchSection = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await apiClient.get(
        `/api/Media_search?query=${encodeURIComponent(query)}`
      );
      if (!response) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.data;
      setResults(data);
      setIsOverlayOpen(true); // Show the overlay when results are found
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const clearResults = () => {
    setIsOverlayOpen(false);
    setResults([]);
  };

  return (
    <div className="text-white text-left p-8 flex-1">
      <h1 className="text-3xl font-bold mb-4">Welcome.</h1>
      <h2 className="text-xl mb-6">
        Explore your favorite movies and TV shows
      </h2>
      <SearchBar onSearch={handleSearch} />

      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-11/12 max-w-4xl bg-gray-900 p-6 rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={clearResults}
              className="mb-4 text-white underline"
            >
              Close Search Results
            </button>

            {/* Scrollable Container */}
            <div className="h-[70vh] overflow-y-auto">
              <SearchResults results={results} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
