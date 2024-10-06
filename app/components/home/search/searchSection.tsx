"use client";
import { useState, useRef, useEffect } from "react";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import { apiClient } from "@/app/api/auth/auth";
import { AiOutlineClose } from "react-icons/ai"; // Import star icons

const SearchSection = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedQueries = sessionStorage.getItem("searchHistory");
    if (storedQueries) {
      setSearchHistory(JSON.parse(storedQueries));
    }
  }, []);

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
      setIsOverlayOpen(true);

      const updatedHistory = [
        query,
        ...searchHistory.filter((q) => q !== query),
      ];
      sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const clearResults = () => {
    setIsOverlayOpen(false);
    setResults([]);
  };

  const clearSearchHistory = () => {
    sessionStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        clearResults();
      }
    };

    if (isOverlayOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener when modal is closed
    };
  }, [isOverlayOpen]);

  return (
    <div className="text-white text-left p-8 pt-2 pb-4 flex-1 xl:max-w-4xl max-w-lg">
      <h1 className="text-2xl font-bold mb-3">Welcome.</h1>
      <h2 className="text-xl mb-7">
        Explore your favorite movies and TV shows
      </h2>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-4">
        <div
          className="mt-4"
          style={{
            height: searchHistory.length > 0 ? "auto" : "48px",
          }}
        >
          <div
            className={`flex flex-row gap-4 justify-between ${
              searchHistory.length === 0 ? "invisible" : "visible"
            }`}
          >
            <h3 className="text-lg font-semibold">Previous Searches</h3>
            <button
              onClick={clearSearchHistory}
              className="text-sm mt-1 text-gray-300 hover:underline"
            >
              Clear Search History
            </button>
          </div>
          <ul
            className={`flex flex-row flex-wrap gap-4 overflow-y-scroll ${
              searchHistory.length === 0 ? "invisible" : "visible"
            }`}
          >
            {searchHistory.map((query, index) => (
              <li
                key={index}
                className="text-sm text-gray-400 cursor-pointer hover:underline"
                onClick={() => handleSearch(query)}
              >
                {query}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="w-11/12 max-w-7xl bg-gray-900 bg-opacity-80 pb-6 pt-0 rounded-lg overflow-y-auto"
          >
            <div className="flex flex-row justify-end sticky top-0 backdrop-blur-md p-4 pr-5 bg-gray-900 bg-opacity-30">
              <button
                onClick={clearResults}
                className="text-white bg-gray-800 bg-opacity-60 hover:bg-gray-700 font-bold p-1.5 rounded-full hover:bg-opacity-100"
              >
                <AiOutlineClose>Close X</AiOutlineClose>
              </button>
            </div>

            <div className="h-[70vh] my-6 px-6">
              {results.length > 0 ? (
                <SearchResults results={results} />
              ) : (
                <h1 className="font-bold text-center">NO RESULTS FOUND</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
