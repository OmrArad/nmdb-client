"use client";
import React, { useState } from "react";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults"; // Create this component as shown in the next step
import { apiClient } from "@/app/api/auth/auth";

const SearchSection = () => {
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      console.log(`/api/Media_search?query=${encodeURIComponent(query)}`);
      const response = await apiClient.get(
        `/api/Media_search?query=${encodeURIComponent(query)}`
      );
      if (!response) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.data;
      setResults(data);
    } catch (error: any) {
      console.error(error.message);
      // Handle error (show message, etc.)
    }
  };

  return (
    <div className="text-white text-left p-8 flex-1">
      <h1 className="text-3xl font-bold mb-4">Welcome.</h1>
      <h2 className="text-xl mb-6">
        Explore your favorite movies and TV shows
      </h2>
      <SearchBar onSearch={handleSearch} />

      {results.length > 0 && (
        <div className="mt-8">
          <SearchResults results={results} />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
