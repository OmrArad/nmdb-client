"use client";
import { useState } from "react";
import CustomDropdown from "@/app/utils/CustomDropdown";
import regionsData from "@/app/utils/regions.json";

type RegionSelectorProps = {
  initialRegion: string;
  onRegionChange: (region: string) => void;
};

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  initialRegion, 
  onRegionChange 
}) => {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    onRegionChange(region);
  };

  const clearRegion = () => {
    setSelectedRegion("");
    onRegionChange("");
  };

  return (
    <div>
      <CustomDropdown
        regions={regionsData.regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={(value) => handleRegionChange(value as string)}
        clearRegion={clearRegion}
      />
    </div>
  );
};

export default RegionSelector;