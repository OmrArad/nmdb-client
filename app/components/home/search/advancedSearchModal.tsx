import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import regionsData from "@/app/utils/regions.json";
import Providers from "@/app/utils/regions_providers.json";
import ReactCountryFlag from "react-country-flag";
import tvGenres from "@/app/utils/TVGenres.json";
import movieGenres from "@/app/utils/MovieGenres.json";
import { getDiscovery } from "@/app/api/discover/DiscoverServices";

type Region = {
  country_code: string;
  name: string;
};

interface CustomDropdownProps {
  regions: Region[];
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  clearRegion: () => void;
}

const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  regions,
  selectedRegion,
  setSelectedRegion,
  clearRegion,
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
        type="button"
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
            <span className="truncate" style={{ maxWidth: "250px" }}>
              {truncateString(
                regions.find((region) => region.country_code === selectedRegion)?.name || "",
                50
              )}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                clearRegion();
              }}
              className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <AiOutlineClose size={16} />
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
              <span className="truncate" style={{ maxWidth: "280px" }}>
                {truncateString(region.name, 50)}
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
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [voteAverage, setVoteAverage] = useState("");
  const [mediaType, setMediaType] = useState("mixed");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Currently unused, might be used later to show a loading spinner
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (mediaType === "tv") {
      setGenres(tvGenres.genres);
      setSelectedGenres([]);
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

  const handleVoteAverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^(\d(\.\d{0,1})?|10(\.0?)?)$/.test(value) || value === "") {
      setVoteAverage(value);
    }
  };

  const clearRegion = () => {
    setSelectedRegion("");
    setSelectedProvider("");
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

          <div className="mb-3">
            <h3 className="text-white mb-2">Streaming and Digital Providers:</h3>
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block text-white mb-1">Select Region:</label>
                <CustomDropdown
                  regions={regionsData.regions}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  clearRegion={clearRegion}
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
  {Object.entries(
    (Providers as Record<string, Record<string, string>>)[selectedRegion] || {}
  )
    .sort(([providerIdA, providerNameA], [providerIdB, providerNameB]) =>
      providerNameA.localeCompare(providerNameB)
    ) // Sort providers alphabetically
    .map(([provider_id, provider_name]) => (
      <option key={provider_id} value={provider_id}>
        {provider_name}
      </option>
    ))}
</select>

              </div>
            </div>
          </div>

          <label className="block text-white mb-1">Release Year:</label>
          <select
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full mb-3 p-2 rounded text-gray-700"
          >
            <option value="">Any year</option>
            {Array.from({ length: currentYear - 1950 + 1 }, (_, index) => (
              <option key={index} value={String(currentYear - index)}>
                {currentYear - index}
              </option>
            ))}
          </select>

          {genres.length > 0 && (
            <div className="mb-3">
              <h3 className="text-white mb-2">Genres:</h3>
              <div className="flex flex-wrap">
                {genres.map((genre) => (
                  <label key={genre.id} className="mr-4 mb-2 flex items-center text-white">
                    <input
                      type="checkbox"
                      value={genre.id}
                      checked={selectedGenres.includes(String(genre.id))}
                      onChange={() => handleGenreChange(String(genre.id))}
                      className="mr-2"
                    />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          <label className="block text-white mb-1">Minimum Vote Average (0-10):</label>
          <input
            type="text"
            value={voteAverage}
            onChange={handleVoteAverageChange}
            className="w-full mb-3 p-2 rounded text-gray-700"
            placeholder="Enter a value between 0 and 10"
          />

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
