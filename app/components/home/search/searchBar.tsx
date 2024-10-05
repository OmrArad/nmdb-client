import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search for a movie, or a TV show..."
        value={query}
        onChange={handleInputChange}
        className="w-full h-12 pl-4 pr-12 rounded-full text-gray-700 focus:outline-none"
      />
      <button type="submit" className="absolute top-0 right-0 mt-3 mr-4">
        <MagnifyingGlassIcon stroke="#888" className="h-6 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
