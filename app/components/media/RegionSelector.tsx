"use client";
import { useEffect } from "react";
import CustomDropdown from "@/app/utils/CustomDropdown";
import regionsData from "@/app/utils/regions.json";
import { useRegion } from "@/app/context/RegionProvider";

type RegionSelectorProps = {
  initialRegion: string;
  onRegionChange?: (region: string) => void;  // Made optional since we're using context
};

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  initialRegion, 
  onRegionChange 
}) => {
  const { region, updateRegion } = useRegion();

  // Set initial region when component mounts
  useEffect(() => {
    if (initialRegion && region !== initialRegion) {
      updateRegion(initialRegion);
    }
  }, [initialRegion, region, updateRegion]);


  useEffect(() => {
    console.log("Updated region state:", region);
  }, [region]);

  const handleRegionChange = (newRegion: string) => {
    updateRegion(newRegion);
  };

  const clearRegion = () => {
    updateRegion("");
    if (onRegionChange) {
      onRegionChange("");
    }
  };

  return (
    <div>
      <CustomDropdown
        regions={regionsData.regions}
        selectedRegion={region}  // Use context region instead of local state
        setSelectedRegion={(value) => handleRegionChange(value as string)}
        clearRegion={clearRegion}
      />
    </div>
  );
};

export default RegionSelector;