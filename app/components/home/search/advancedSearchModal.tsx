import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import regionsData from "@/app/utils/regions.json"; // Ensure this file is structured correctly
import ReactCountryFlag from "react-country-flag";
import handleAdvancedSearch from "@/app/components/home/search/searchSection";
import tvGenres from "@/app/utils/TVGenres.json"; // Import TV genres
import movieGenres from "@/app/utils/MovieGenres.json"; // Import movie genres

type Region = {
  country_code: string;
  name: string;
};

interface CustomDropdownProps {
  regions: Region[];
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

// Helper function to truncate region names
const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "..."; // Adjust for ellipsis length
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  regions,
  selectedRegion,
  setSelectedRegion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (region: Region) => {
    setSelectedRegion(region.country_code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full p-2 rounded text-gray-700 bg-white flex items-center justify-between"
      >
        {selectedRegion ? (
          <span className="flex items-center">
            <ReactCountryFlag
              countryCode={selectedRegion}
              svg
              style={{ width: "1.5em", height: "1.5em", marginRight: "5px" }}
            />
            <span className="truncate" style={{ maxWidth: '150px' }}>
              {truncateString(
                regions.find((region) => region.country_code === selectedRegion)?.name || "",
                16 // Adjusted max length for better truncation
              )}
            </span>
          </span>
        ) : (
          "Select a region"
        )}
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto">
          {regions.map((region) => (
            <div
              key={region.country_code}
              onClick={() => handleSelect(region)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200 text-gray-800"
            >
              <ReactCountryFlag
                countryCode={region.country_code}
                svg
                style={{ width: "1.5em", height: "1.5em", marginRight: "5px" }}
              />
              <span className="truncate" style={{ maxWidth: '120px' }}>
                {truncateString(region.name, 18)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type Genre = {
  id: number;
  name: string;
};

type AdvancedSearchModalProps = {
  onClose: () => void;
  onAdvancedSearch: (criteria: Record<string, string>) => void;
};

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  onClose,
  onAdvancedSearch,
}) => {
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("AD"); // Default region set to Andorra
  const [selectedProvider, setSelectedProvider] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [voteAverage, setVoteAverage] = useState("");
  const [title, setTitle] = useState("");
  const [mediaType, setMediaType] = useState("mixed"); // New state for media type
  const [genres, setGenres] = useState<Genre[]>([]); // State to hold genres based on media type

  useEffect(() => {
    const fetchProviders = async () => {
      if (!selectedRegion) return;

      try {
        const response = await fetch(`/api/available-providers?region=${selectedRegion}`);
        const data = await response.json();
        setProviders(data.results || []);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };

    fetchProviders();
  }, [selectedRegion]);

  // Set genres based on the selected media type
  useEffect(() => {
    if (mediaType === "tv") {
      setGenres(tvGenres.genres); // Set TV genres from the imported module
      setSelectedGenre(""); // Clear selected genre
    } else if (mediaType === "movies") {
      setGenres(movieGenres.genres); // Set movie genres from the JSON file
      setSelectedGenre(""); // Clear selected genre
    } else {
      setGenres([]); // Clear genres for mixed
    }
  }, [mediaType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const criteria: Record<string, string> = {};
    if (title) criteria.title = title;
    if (selectedRegion && selectedProvider) {
      criteria.region = selectedRegion;
      criteria.provider = selectedProvider;
    }
    if (releaseYear) criteria.year = releaseYear;
    if (selectedGenre) criteria.genre = selectedGenre; // Send the genre ID here
    if (voteAverage) criteria.vote_average = voteAverage;

    if (selectedRegion && !selectedProvider) {
      return;
    }

    onAdvancedSearch(criteria);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white"
        >
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Advanced Search</h2>
        <form onSubmit={handleSearch}>
          {/* Title Field */}
          <label className="block text-white mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 rounded text-gray-700"
            placeholder="Enter title"
          />

          {/* Media Type Selection */}
          <fieldset className="mb-4">
            <legend className="text-white mb-2">Media Type:</legend>
            <label className="flex items-center">
              <input
                type="radio"
                value="tv"
                checked={mediaType === "tv"}
                onChange={(e) => {
                  setMediaType(e.target.value);
                  setSelectedGenre(""); // Clear selected genre when switching media type
                }}
                className="mr-2"
              />
              TV Series
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="movies"
                checked={mediaType === "movies"}
                onChange={(e) => {
                  setMediaType(e.target.value);
                  setSelectedGenre(""); // Clear selected genre when switching media type
                }}
                className="mr-2"
              />
              Movies
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="mixed"
                checked={mediaType === "mixed"}
                onChange={(e) => {
                  setMediaType(e.target.value);
                  setSelectedGenre(""); // Clear selected genre when switching media type
                }}
                className="mr-2"
              />
              Mixed
            </label>
          </fieldset>

          {/* Streaming and Digital Section */}
          <div className="mb-4">
            <h3 className="text-white mb-2">Streaming and Digital Providers:</h3>
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block text-white mb-2">Select Region:</label>
                <CustomDropdown
                  regions={regionsData.regions}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
              </div>

              <div className="w-1/2 pl-2">
                <label className="block text-white mb-2">Select Provider:</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full p-2 rounded text-gray-700"
                >
                  <option value="">Select a provider</option>
                  {providers.map((provider) => (
                    <option key={provider.provider_id} value={provider.provider_id}>
                      {provider.provider_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Release Year Field */}
          <label className="block text-white mb-2">Release Year:</label>
          <input
            type="text"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full mb-4 p-2 rounded text-gray-700"
            placeholder="Enter release year"
          />

          {/* Genre Selection */}
          {genres.length > 0 && (
            <div className="mb-4">
              <label className="block text-white mb-2">Select Genre:</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full p-2 rounded text-gray-700"
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Vote Average Field */}
          <label className="block text-white mb-2">Vote Average:</label>
          <input
            type="number"
            value={voteAverage}
            onChange={(e) => setVoteAverage(e.target.value)}
            className="w-full mb-4 p-2 rounded text-gray-700"
            placeholder="Enter vote average"
            min="0"
            step="0.1"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
