"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Create an interface for the region context
interface RegionContextProps {
  region: string;
  updateRegion: (newRegion: string) => void;
}

// Export the context for direct access if needed
export const RegionContext = createContext<RegionContextProps | undefined>(undefined);

// Export the provider component
export const RegionProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with US as default, but check localStorage first
  const [region, setRegion] = useState<string>('US');

  // Load saved region from localStorage on initial mount
  useEffect(() => {
    const savedRegion = localStorage.getItem('userRegion');
    if (savedRegion) {
      setRegion(savedRegion);
    }
  }, []);

  const updateRegion = (newRegion: string) => {
    setRegion(newRegion);
    // Save to localStorage when region is updated
    localStorage.setItem('userRegion', newRegion);
  };

  return (
    <RegionContext.Provider value={{ region, updateRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

// Export the hook
export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};

// Default export for the provider if needed
export default RegionProvider;