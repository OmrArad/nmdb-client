"use client";
import { useEffect, useState } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";
import StreamingServiceList from "./streamingServiceList";
import { getGradientColor } from "@/app/utils/colorUtils";

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
    Netflix1: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix2: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix3: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix4: {
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
  const [services, setServices] = useState<any>(mockServicesData.providers);
  const [activeService, setActiveService] = useState<string | null>(null);
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

  // Handle filtering when a service is selected
  const handleFilterByService = (serviceName: string) => {
    if (activeService === serviceName) {
      // Unselect the service if already active
      setActiveService(null);
      setFilteredWatchlist(watchlist); // Show full watchlist if no service is selected
    } else {
      setActiveService(serviceName);

      const service = services[serviceName];

      if (service) {
        const filteredItems = watchlist.filter((item) =>
          service.tmdb_ids.some(
            (tmdbItem: any) => tmdbItem.tmdb_id === item.tmdb_id
          )
        );
        setFilteredWatchlist(filteredItems);
      }
    }
  };

  return (
    <div className="streaming-services pb-1">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">Where to watch:</h2>
        {/* Remove filter button */}
        {activeService && (
          <button
            onClick={() => {
              setActiveService(null);
              setFilteredWatchlist(watchlist); // Show full watchlist when filter is removed
            }}
            className="text-red-500 font-bold hover:underline"
          >
            Remove Filter
          </button>
        )}
      </div>

      <StreamingServiceList
        services={services}
        activeService={activeService}
        getGradientColor={getGradientColor}
        handleFilterByService={handleFilterByService}
        minCount={minCount}
        maxCount={maxCount}
      />
    </div>
  );
};

export default WatchlistStreamingServices;
