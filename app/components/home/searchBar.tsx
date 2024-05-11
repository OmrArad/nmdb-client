import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="search for a movie, or a TV show..."
        className="w-full h-12 pl-4 pr-12 rounded-full text-gray-700 focus:outline-none"
      />
      <button type="submit" className="absolute top-0 right-0 mt-3 mr-4">
        <MagnifyingGlassIcon stroke="#888" className="h-6 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
