"use client";
import { useEffect, useState } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import StreamingServiceList from "./streamingServiceList";
import { getGradientColor } from "@/app/utils/colorUtils";

type TMDBItem = {
  is_movie: number;
  tmdb_id: string;
};

type StreamingService = {
  count: number;
  tmdb_ids: TMDBItem[];
};

type Services = {
  [key: string]: StreamingService;
};

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
  setFilteredWatchlist: (filteredWatchlist: any[]) => void;
}) => {
  const [services, setServices] = useState<Services>(
    mockServicesData.providers
  );
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]); // Store the actual watchlist
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(3);

  // Fetch watchlist using the working API
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist();
        setWatchlist(watchlistData.Content); // Ensure this matches your watchlist structure
      } catch (error) {
        console.error("Failed to fetch watchlist", error);
      }
    };

    fetchWatchlist();

    // Calculate the minimum and maximum counts
    const counts = Object.values(services).map((service: any) => service.count);
    setMinCount(Math.min(...counts));
    setMaxCount(Math.max(...counts));
  }, [services]);

  const handleFilterByService = (serviceName: string) => {
    const isAlreadyActive = activeServices.includes(serviceName);

    if (isAlreadyActive) {
      // Remove service if already selected
      const updatedServices = activeServices.filter(
        (service) => service !== serviceName
      );
      setActiveServices(updatedServices);

      // If no services are active, show full watchlist
      if (updatedServices.length === 0) {
        setFilteredWatchlist(watchlist);
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
    const filteredItems = watchlist.filter((item) =>
      activeServices.some((serviceName) =>
        services[serviceName].tmdb_ids.some(
          (tmdbItem: any) => tmdbItem.tmdb_id === item.tmdb_id
        )
      )
    );
    setFilteredWatchlist(filteredItems);
  };

  return (
    <div className="streaming-services pb-1">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">Where to watch:</h2>
        {/* Remove filter button */}
        {activeServices.length > 0 && (
          <button
            onClick={() => {
              setActiveServices([]);
              setFilteredWatchlist(watchlist); // Show full watchlist when filter is removed
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
  );
};

export default WatchlistStreamingServices;
