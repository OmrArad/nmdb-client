"use client";
import { useEffect, useState } from "react";
import StreamingServiceList from "./streamingServiceList";
import { getWatchlistStreamingServices } from "@/app/api/streaming/streamingServices";
import { getGradientColor } from "@/app/utils/colorUtils";
import { Services } from "@/app/types/streaming";
import { useWatchlist } from "@/app/context/watchlistContext";
import { IWatchlistItem } from "@/app/types/watchlist";

const WatchlistStreamingServices = ({
  setFilteredWatchlist,
  region,
}: {
  setFilteredWatchlist: (filteredWatchlist: IWatchlistItem[]) => void;
  region: string;
}) => {
  const { watchlist } = useWatchlist();
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [services, setServices] = useState<Services | null>(null);
  const [prices, setPrices] = useState<Record<string, string> | null>(null);
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(3);
  const [allServices, setAllServices] = useState<Record<string, { providers: Services }> | null>(null);

  useEffect(() => {
    const fetchStreamingServicesForWatchlist = async () => {
      try {
        const [servicesResponse, pricesResponse] = await getWatchlistStreamingServices();
        const streamingServices: Record<string, { providers: Services }> = servicesResponse;
        setAllServices(streamingServices);
        setPrices(pricesResponse);
        console.log("prices is" , pricesResponse)
        
        // Get services for current region
        const regionServices: Services = streamingServices[region]?.providers || {};
        setServices(regionServices);
        // Reset active services when region changes
        setActiveServices([]);
      } catch (error) {
        console.error(
          "Failed to fetch Streaming Services For watchlist",
          error
        );
        setServices(null);
        setPrices(null);
      }
    };

    if (watchlist && !allServices) {
      fetchStreamingServicesForWatchlist();
    } else if (allServices) {
      // If we already have all services, just update for the new region
      const regionServices: Services = allServices[region]?.providers || {};
      setServices(regionServices);
      setActiveServices([]);
    }

    // Calculate the minimum and maximum counts for current region's services
    if (services) {
      const counts = Object.values(services).map(
        (service: any) => service.count
      );
      setMinCount(Math.min(...counts));
      setMaxCount(Math.max(...counts));
    }
  }, [watchlist, region, allServices]);

  const handleFilterByService = (serviceName: string) => {
    const isAlreadyActive = activeServices.includes(serviceName);

    if (isAlreadyActive) {
      // Remove service if already selected
      const updatedServices = activeServices.filter(
        (service) => service !== serviceName
      );
      setActiveServices(updatedServices);

      // If no services are active, show full watchlist
      if (watchlist && updatedServices.length === 0) {
        setFilteredWatchlist(watchlist.Content);
      } else {
        filterByActiveServices(updatedServices);
      }
    } else {
      // Add service if not selected
      const updatedServices = [...activeServices, serviceName];
      setActiveServices(updatedServices);
      filterByActiveServices(updatedServices);
    }
  };

  const filterByActiveServices = (activeServices: string[]) => {
    const filteredItems =
      (watchlist &&
        watchlist.Content.filter((item) =>
          activeServices.some(
            (serviceName) =>
              services &&
              services[serviceName].tmdb_ids.some(
                (tmdbItem: any) => tmdbItem.tmdb_id === item.tmdb_id
              )
          )
        )) ||
      [];
    setFilteredWatchlist(filteredItems);
  };

  return watchlist && services ? (
    <div className="streaming-services pb-1">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold">Where to watch in {region}:</h2>
          {prices && prices[region] && (
            <p className="text-sm text-gray-600">
              Netflix subscription: {prices[region]}
            </p>
          )}
        </div>
        {activeServices.length > 0 && (
          <button
            onClick={() => {
              setActiveServices([]);
              setFilteredWatchlist(watchlist.Content);
            }}
            className="text-red-500 font-bold hover:underline"
          >
            Remove All Filters
          </button>
        )}
      </div>

      <StreamingServiceList
        services={services}
        activeServices={activeServices}
        getGradientColor={getGradientColor}
        handleFilterByService={handleFilterByService}
        minCount={minCount}
        maxCount={maxCount}
      />
    </div>
  ) : (
    <div className="streaming-services pb-1">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg text-gray-500">
          We did not find any streaming services for your watchlist in {region}
        </h2>
      </div>
    </div>
  );
};

export default WatchlistStreamingServices;