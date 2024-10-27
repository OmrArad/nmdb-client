"use client"; // This component will be a Client Component

import { useState } from "react";
import { StreamingServiceData, Countries } from "@/app/types/streaming";

// Define the props type for the CountrySelector component
interface CountrySelectorProps {
  Countries: Countries; // Use the Countries type you defined
}

const CountrySelector = ({ Countries }: CountrySelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState("US"); // State to manage selected country
  const countries = Object.keys(Countries); // Get available country codes from streaming services

  return (
    <div className="mt-4">
      <label htmlFor="country-selector" className="font-bold mr-2">Select Country:</label>
      <select
        id="country-selector"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)} // Update selected country
        className="border rounded p-1"
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country} {/* You might want to replace this with the corresponding country name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
