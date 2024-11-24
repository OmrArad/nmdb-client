import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Check, Search } from "lucide-react";
import tvGenres from "@/app/utils/TVGenres.json";
import movieGenres from "@/app/utils/MovieGenres.json";
import regionsData from "@/app/utils/regions.json";
import Providers from "@/app/utils/regions_providers.json";
import CustomDropdown from "@/app/utils/CustomDropdown";
import { useRegion } from "@/app/context/RegionProvider";

type Genre = {
  id: number;
  name: string;
};

type AdvancedSearchModalProps = {
  onClose: () => void;
  onAdvancedSearch: (criteria: Record<string, string | string[]>) => void;
};

const AdvancedSearchWizard: React.FC<AdvancedSearchModalProps> = ({
  onClose,
  onAdvancedSearch,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [voteAverage, setVoteAverage] = useState("");
  const [mediaType, setMediaType] = useState("mixed");
  const { region, updateRegion } = useRegion();
  const currentYear = new Date().getFullYear();

  // Reset genres when media type changes
  useEffect(() => {
    setSelectedGenres([]);
  }, [mediaType]);

  const handleClearRegion = () => {
    updateRegion("");
    setSelectedProvider("");
  };

  const handleRegionChange: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const newRegion = typeof value === 'function' ? value(region) : value;
    updateRegion(newRegion);
    setSelectedProvider("");
  };

  const getGenresForMediaType = () => {
    switch (mediaType) {
      case "tvseries":
        return tvGenres.genres;
      case "movies":
        return movieGenres.genres;
      default:
        return [];
    }
  };

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

  const handleSearch = () => {
    const criteria: Record<string, string | string[]> = {
      mediaType
    };
    
    if (region && selectedProvider) {
      criteria.region = region;
      criteria.provider = selectedProvider;
    }
    if (releaseYear) criteria.year = releaseYear;
    if (selectedGenres.length > 0) criteria.genres = selectedGenres;
    if (voteAverage) criteria.vote_average = voteAverage;

    onAdvancedSearch(criteria);
    onClose();
  };

  const getSteps = () => {
    const steps = [
      {
        title: "Media Type",
        content: (
          <div className="space-y-6">
            <p className="text-gray-400">Choose what type of content you want to search for</p>
            <div className="grid grid-cols-3 gap-4">
              {["TV Series", "Movies", "Mixed"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setMediaType(type.toLowerCase().replace(" ", ""));
                    // If switching to mixed and currently on genres step, skip to rating
                    if (type.toLowerCase().replace(" ", "") === "mixed" && currentStep === 4) {
                      setCurrentStep(5);
                    }
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    mediaType === type.toLowerCase().replace(" ", "")
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                  }`}
                >
                  <div className="text-lg font-medium">{type}</div>
                </button>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "Provider",
        content: (
          <div className="space-y-6">
            <p className="text-gray-400">Select your region and streaming provider (optional)</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <CustomDropdown
                  regions={regionsData.regions}
                  selectedRegion={region}
                  setSelectedRegion={handleRegionChange}
                  clearRegion={handleClearRegion}
                />
              </div>
              {region && (
                <div>
                  <label className="block text-sm font-medium mb-2">Streaming Provider</label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Any provider</option>
                    {Object.entries(
                      (Providers as Record<string, Record<string, string>>)[region] || {}
                    )
                      .sort(([, a], [, b]) => a.localeCompare(b))
                      .map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "Year",
        content: (
          <div className="space-y-6">
            <p className="text-gray-400">Filter by earliest release year (optional)</p>
            <select
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Any year</option>
              {Array.from({ length: currentYear - 1950 + 1 }, (_, i) => (
                <option key={i} value={String(currentYear - i)}>
                  {currentYear - i}
                </option>
              ))}
            </select>
          </div>
        ),
      }
    ];

    // Only add genres step if media type is not mixed
    if (mediaType !== "mixed") {
      steps.push({
        title: "Genres",
        content: (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">
                Select one or more {mediaType === "tvseries" ? "TV" : "movie"} genres (optional)
              </p>
              {selectedGenres.length > 0 && (
                <button 
                  onClick={() => setSelectedGenres([])}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="relative">
              <div className="h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800/50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {getGenresForMediaType().map((genre) => {
                    const isSelected = selectedGenres.includes(String(genre.id));
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreChange(String(genre.id))}
                        className={`
                          flex items-center justify-between p-3 rounded-lg
                          transition-all duration-200
                          ${isSelected 
                            ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20" 
                            : "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"}
                          border
                        `}
                      >
                        <span className="text-sm">{genre.name}</span>
                        {isSelected && (
                          <Check size={16} className="text-blue-400 ml-2 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {selectedGenres.length > 0 && (
              <div className="pt-2">
                <p className="text-sm text-gray-400">
                  Selected: {selectedGenres.length} {selectedGenres.length === 1 ? 'genre' : 'genres'}
                </p>
              </div>
            )}
          </div>
        ),
      });
    }

    steps.push({
      title: "Rating",
      content: (
        <div className="space-y-6">
          <p className="text-gray-400">Set minimum vote average (optional)</p>
          <input
            type="text"
            value={voteAverage}
            onChange={handleVoteAverageChange}
            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter a value between 0 and 10"
          />
        </div>
      ),
    });

    return steps;
  };

  const steps = getSteps();

  // Ensure currentStep is valid
  useEffect(() => {
    if (currentStep > steps.length) {
      setCurrentStep(steps.length);
    }
  }, [steps.length, currentStep]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-gray-900/95 rounded-2xl border border-gray-800 shadow-xl">
        <div className="relative border-b border-gray-800 p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-semibold mb-6">Discovery Wizard</h2>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setCurrentStep(index + 1)}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentStep > index + 1
                      ? "bg-green-500 shadow-lg shadow-green-500/20"
                      : currentStep === index + 1
                      ? "bg-blue-500 shadow-lg shadow-blue-500/20"
                      : "bg-gray-700"
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <Check size={16} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs ${
                    currentStep === index + 1 ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {steps[currentStep - 1]?.content}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                currentStep === 1
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
            {currentStep < steps.length ? (
              <button
                onClick={() => {
                  const nextStep = currentStep + 1;
                  // Skip genres step if media type is mixed
                  if (mediaType === "mixed" && nextStep === 4) {
                    setCurrentStep(5);
                  } else {
                    setCurrentStep(nextStep);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 flex items-center space-x-2 transition-all shadow-lg shadow-green-500/20"
              >
                <span>Search</span>
                <Search size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchWizard;