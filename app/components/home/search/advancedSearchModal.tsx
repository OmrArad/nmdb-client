import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import regionsData from "@/app/utils/regions.json";
import Providers from "@/app/utils/regions_providers.json";
import ReactCountryFlag from "react-country-flag";
import tvGenres from "@/app/utils/TVGenres.json"; // Import TV genres
import movieGenres from "@/app/utils/MovieGenres.json"; // Import movie genres
import { getDiscovery } from "@/app/api/discover/DiscoverServices";

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
  return str.slice(0, maxLength - 3) + "...";
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
        type = "button"
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
                16
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
  onAdvancedSearch: (criteria: Record<string, string | string[]>) => void;
};

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  onClose,
  onAdvancedSearch,
}) => {
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(""); // Default region set to Andorra
  const [selectedProvider, setSelectedProvider] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Modified to handle multiple genres
  const [voteAverage, setVoteAverage] = useState("");
  const [mediaType, setMediaType] = useState("mixed");
  const [genres, setGenres] = useState<Genre[]>([]);

  // Set genres based on the selected media type
  useEffect(() => {
    if (mediaType === "tv") {
      setGenres(tvGenres.genres);
      setSelectedGenres([]); // Clear selected genres
    } else if (mediaType === "movies") {
      setGenres(movieGenres.genres);
      setSelectedGenres([]);
    } else {
      setGenres([]);
    }
  }, [mediaType]);

  const handleGenreChange = (genreId: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const criteria: Record<string, string | string[]> = {};
    if (selectedRegion && selectedProvider) {
      criteria.region = selectedRegion;
      criteria.provider = selectedProvider;
    }
    if (releaseYear) criteria.year = releaseYear;
    if (selectedGenres.length > 0) criteria.genres = selectedGenres;
    if (voteAverage) criteria.vote_average = voteAverage;

    if (selectedRegion && !selectedProvider) {
      alert("Please select a provider");
      return;
    }

    onAdvancedSearch(criteria);
    onClose();
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
  <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-4 relative">
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-white"
    >
      <AiOutlineClose size={20} />
    </button>
    <h2 className="text-xl font-bold mb-3">Advanced Search</h2>
    <form onSubmit={handleSearch}>
      <fieldset className="mb-3">
        <legend className="text-white mb-2">Media Type:</legend>
        <label className="flex items-center">
          <input
            type="radio"
            value="tv"
            checked={mediaType === "tv"}
            onChange={(e) => {
              setMediaType(e.target.value);
              setSelectedGenres([]); 
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
              setSelectedGenres([]); 
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
              setSelectedGenres([]);
            }}
            className="mr-2"
          />
          Mixed
        </label>
      </fieldset>

      {/* Streaming and Digital Section */}
      <div className="mb-3">
        <h3 className="text-white mb-2">Streaming and Digital Providers:</h3>
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-white mb-1">Select Region:</label>
            <CustomDropdown
              regions={regionsData.regions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>

          <div className="w-1/2 pl-2">
            <label className="block text-white mb-1">Select Provider:</label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full p-2 rounded text-gray-700"
            >
              <option value="">Select a provider</option>
              { Object.entries((Providers as Record<string, Record<string, string>>)[selectedRegion] || {}).map(([provider_id, provider_name]) => (
                <option key={provider_id} value={provider_id}>
                  {provider_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <label className="block text-white mb-1">Release Year:</label>
      <input
        type="text"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        className="w-full mb-3 p-2 rounded text-gray-700"
        placeholder="Enter latest release year"
      />

      {genres.length > 0 && (
        <div className="mb-3">
          <label className="block text-white mb-1">Select Genres:</label>
          <div className="flex flex-wrap overflow-y-auto max-h-32">
            {genres.map((genre) => (
              <label key={genre.id} className="flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  value={genre.id.toString()}
                  onChange={() => handleGenreChange(genre.id.toString())}
                  checked={selectedGenres.includes(genre.id.toString())}
                  className="mr-2"
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <label className="block text-white mb-1">Minimum Vote Average:</label>
      <input
        type="text"
        value={voteAverage}
        onChange={(e) => setVoteAverage(e.target.value)}
        className="w-full mb-3 p-2 rounded text-gray-700"
        placeholder="Enter minimum vote average"
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick = {handleSearch}
      >
        Search
      </button>
    </form>
  </div>
</div>

  );
};

export default AdvancedSearchModal;
