"use client";
import { useEffect, useState } from "react";
import StreamingServiceList from "./streamingServiceList";
import { getWatchlistStreamingServices } from "@/app/api/streaming/streamingServices";
import { getGradientColor } from "@/app/utils/colorUtils";
import { Services } from "@/app/types/streaming";
import { useWatchlist } from "@/app/context/watchlistContext";
import { IWatchlistItem } from "@/app/types/watchlist";

const mockServicesData = {
  providers: {
    "Amazon Prime Video": {
      count: 1,
      tmdb_ids: [{ is_movie: 0, tmdb_id: "62017" }],
    },
    "Apple TV Plus": {
      count: 1,
      tmdb_ids: [{ is_movie: 0, tmdb_id: "95396" }],
    },
    "Disney Plus": {
      count: 1,
      tmdb_ids: [{ is_movie: 1, tmdb_id: "1022789" }],
    },
    Hulu: {
      count: 2,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "550" },
        { is_movie: 0, tmdb_id: "111800" },
      ],
    },
    Netflix: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Max: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    "Paramount Plus": {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    fuboTV: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Other: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
  },
};

const WatchlistStreamingServices = ({
  setFilteredWatchlist,
}: {
  setFilteredWatchlist: (filteredWatchlist: IWatchlistItem[]) => void;
}) => {
  const { watchlist } = useWatchlist();
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [services, setServices] = useState<Services | null>(null);
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(3);

  // Fetch watchlist using the working API
  useEffect(() => {
    const fetchStreamingServicesForWatchlist = async () => {
      try {
        const streamingServices = await getWatchlistStreamingServices();
        console.log("streaming:", streamingServices);
        setServices(streamingServices.providers);
      } catch (error) {
        console.error(
          "Failed to fetch Streaming Services For watchlist",
          error
        );
      }
    };

    if (watchlist) fetchStreamingServicesForWatchlist();

    // Calculate the minimum and maximum counts
    if (services) {
      const counts = Object.values(services).map(
        (service: any) => service.count
      );
      setMinCount(Math.min(...counts));
      setMaxCount(Math.max(...counts));
    }
  }, [services, watchlist]);

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
        <h2 className="text-lg font-bold">Where to watch:</h2>
        {/* Remove filter button */}
        {activeServices.length > 0 && (
          <button
            onClick={() => {
              setActiveServices([]);
              setFilteredWatchlist(watchlist.Content); // Show full watchlist when filter is removed
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
    <></>
  );
};

export default WatchlistStreamingServices;
