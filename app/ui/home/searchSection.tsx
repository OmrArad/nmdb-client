import React from "react";
import SearchBar from "./searchBar";

const SearchSection = () => {
  return (
    <div className="bg-violet-800 text-white text-left p-8 flex-1">
      <h1 className="text-3xl font-bold mb-4">Welcome.</h1>
      <h2 className="text-xl mb-6">
        Explore your favorite movies and TV shows
      </h2>
      <SearchBar />
    </div>
  );
};

export default SearchSection;
