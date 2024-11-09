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
  export default CustomDropdown;