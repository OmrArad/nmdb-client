"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Services } from '@/app/types/streaming';
import { getWatchlistStreamingServices } from '@/app/api/streaming/streamingServices';

interface StreamingContextType {
  allServices: Record<string, { providers: Services }> | null;
  netflix_prices: Record<string, string> | null;
  usa_prices: Record<string, string> | null;
  isLoading: boolean;
  error: Error | null;
  refreshServices: () => Promise<void>;
}

const StreamingContext = createContext<StreamingContextType | undefined>(undefined);

export function StreamingProvider({ children }: { children: ReactNode }) {
  const [allServices, setAllServices] = useState<Record<string, { providers: Services }> | null>(null);
  const [netflix_prices, setNetflixPrices] = useState<Record<string, string> | null>(null);
  const [usa_prices, setUSAPrices] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [servicesResponse, netflixPricesResponse, usaResponse] = await getWatchlistStreamingServices();
      
      setAllServices(servicesResponse);
      setNetflixPrices(netflixPricesResponse);
      setUSAPrices(usaResponse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch streaming services'));
      console.error('Failed to fetch streaming services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <StreamingContext.Provider
      value={{
        allServices,
        netflix_prices,
        usa_prices,
        isLoading,
        error,
        refreshServices: fetchServices,
      }}
    >
      {children}
    </StreamingContext.Provider>
  );
}

export function useStreaming() {
  const context = useContext(StreamingContext);
  if (context === undefined) {
    throw new Error('useStreaming must be used within a StreamingProvider');
  }
  return context;
}