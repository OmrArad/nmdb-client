import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Ensure you have @heroicons/react installed

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  // Update query state as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search for a movie, or a TV show..."
        value={query}
        onChange={handleInputChange}
        className="w-full h-12 pl-4 pr-12 rounded-full text-gray-700 focus:outline-none border border-gray-300 focus:border-blue-500"
      />
      <button
        type="submit"
        className="absolute top-0 right-0 mt-3 mr-4"
        aria-label="Search"
      >
        <MagnifyingGlassIcon stroke="#888" className="h-6 w-6" />
      </button>
    </form>
  );
};

export default SearchBar;
